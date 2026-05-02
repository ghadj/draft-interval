import { useEffect, useRef } from 'react'
import { useSessionStore } from '../store/useSessionStore'

export const useTimer = () => {
  const {
    isActive,
    timerMode,
    timerDuration,
    classSequence,
    currentImageIndex,
    setTimeLeft,
    setEndTime,
    setIsActive,
    nextImage,
  } = useSessionStore()

  const intervalRef = useRef(null)
  const currentSequenceIndexRef = useRef(0)

  const getDuration = () => {
    if (timerMode === 'class') {
      return classSequence[currentSequenceIndexRef.current] || timerDuration
    }
    if (timerMode === 'memory') {
      return 5 // Memory flash shows image for 5 seconds
    }
    return timerDuration
  }

  const startTimer = () => {
    const duration = getDuration()
    const startTime = Date.now()
    const targetEndTime = startTime + duration * 1000

    setEndTime(targetEndTime)
    setIsActive(true)
  }

  useEffect(() => {
    if (!isActive) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
      return
    }

    // Anti-drift logic: compare performance.now() against target endTime
    intervalRef.current = setInterval(() => {
      const now = Date.now()
      const remaining = Math.max(0, useSessionStore.getState().endTime - now)
      const timeLeftInSeconds = Math.ceil(remaining / 1000)

      setTimeLeft(timeLeftInSeconds)

      if (remaining <= 0) {
        // Timer expired
        clearInterval(intervalRef.current)

        if (timerMode === 'class') {
          currentSequenceIndexRef.current = 
            (currentSequenceIndexRef.current + 1) % classSequence.length
        }

        nextImage()
        
        // Auto-restart timer for next image
        if (timerMode !== 'fixed' || timerMode === 'fixed') {
          setTimeout(() => {
            startTimer()
          }, 300)
        } else {
          setIsActive(false)
        }
      }
    }, 100) // Check every 100ms for smoothness

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isActive])

  return {
    startTimer,
    stopTimer: () => setIsActive(false),
    getDuration,
  }
}

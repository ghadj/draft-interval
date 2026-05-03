import { useEffect, useRef, useCallback } from 'react'
import { useSessionStore } from '../store/useSessionStore'

export const useTimer = () => {
  const {
    isActive,
    isPaused,
    timerMode,
    timerDuration,
    classSequence,
    endTime,
    setTimeLeft,
    setEndTime,
    setIsActive,
    setIsPaused,
    nextImage,
    previousImage,
  } = useSessionStore()

  const intervalRef = useRef(null)
  const currentSequenceIndexRef = useRef(0)
  const remainingMsRef = useRef(0)

  const getDuration = useCallback(() => {
    if (timerMode === 'class') {
      return classSequence[currentSequenceIndexRef.current] || timerDuration
    }
    if (timerMode === 'memory') {
      return 5 + Math.floor(Math.random() * 10)
    }
    return timerDuration
  }, [timerMode, classSequence, timerDuration])

  const startTimer = useCallback(() => {
    const duration = getDuration()
    const targetEndTime = Date.now() + duration * 1000

    setEndTime(targetEndTime)
    setIsActive(true)
    setIsPaused(false)
  }, [getDuration, setEndTime, setIsActive, setIsPaused])

  const pauseTimer = useCallback(() => {
    const state = useSessionStore.getState()
    if (!state.isActive || state.isPaused) return
    remainingMsRef.current = Math.max(0, state.endTime - Date.now())
    setIsPaused(true)
  }, [setIsPaused])

  const resumeTimer = useCallback(() => {
    const state = useSessionStore.getState()
    if (!state.isActive || !state.isPaused) return
    setEndTime(Date.now() + remainingMsRef.current)
    setIsPaused(false)
  }, [setEndTime, setIsPaused])

  const togglePause = useCallback(() => {
    const state = useSessionStore.getState()
    state.isPaused ? resumeTimer() : pauseTimer()
  }, [resumeTimer, pauseTimer])

  const stopTimer = useCallback(() => {
    setIsActive(false)
    setIsPaused(false)
    setEndTime(null)
    setTimeLeft(0)
  }, [setIsActive, setIsPaused, setEndTime, setTimeLeft])

  const handleNextImage = useCallback(() => {
    nextImage()
    if (isActive) startTimer()
  }, [nextImage, isActive, startTimer])

  const handlePreviousImage = useCallback(() => {
    previousImage()
    if (isActive) startTimer()
  }, [previousImage, isActive, startTimer])

  useEffect(() => {
    if (!isActive || isPaused || !endTime) {
      if (intervalRef.current) clearInterval(intervalRef.current)
      return
    }

    intervalRef.current = setInterval(() => {
      const now = Date.now()
      const remaining = Math.max(0, endTime - now)
      const timeLeftInSeconds = Math.ceil(remaining / 1000)

      if (useSessionStore.getState().timeLeft !== timeLeftInSeconds) {
        setTimeLeft(timeLeftInSeconds)
      }

      if (remaining <= 0) {
        clearInterval(intervalRef.current)

        if (timerMode === 'class') {
          currentSequenceIndexRef.current = (currentSequenceIndexRef.current + 1) % classSequence.length
        }

        nextImage()
        startTimer()
      }
    }, 100)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isActive, isPaused, endTime, timerMode, classSequence, nextImage, setTimeLeft, startTimer])

  return { startTimer, stopTimer, pauseTimer, resumeTimer, togglePause, getDuration, handleNextImage, handlePreviousImage }
}
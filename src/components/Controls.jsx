import React from 'react'
import { Play, Pause, SkipForward, SkipBack, Grid3x3, Zap, Pen } from 'lucide-react'
import { useSessionStore } from '../store/useSessionStore'
import { useTimer } from '../hooks/useTimer'

export default function Controls() {
  const {
    isActive,
    timeLeft,
    timerDuration,
    filters,
    showRuleOfThirds,
    setIsActive,
    toggleFilter,
    toggleRuleOfThirds,
    toggleLineOfAction,
    nextImage,
    previousImage,
  } = useSessionStore()

  const { startTimer } = useTimer()

  const handlePlayPause = () => {
    if (isActive) {
      setIsActive(false)
    } else {
      startTimer()
    }
  }

  return (
    <div>
      <div className="fixed top-0 left-0 bg-black text-white text-xs ">
        (G)rayscale (F)lip (B)lur (H)igh Contrast (R)ule of Thirds (L)ine of Action
      </div>

      <div className="fixed top-0 right-0 bg-black text-white text-xs ">
        (Space) Play/Pause (←) Previous (→) Next
      </div>

      <div className="fixed bottom-0 right-0 bg-black text-white text-xs flex items-center">
        {isActive ? <Play size={12} />:<Pause size={12} />} 
        {String(timeLeft || timerDuration).padStart(3, '0')}s
      </div>
    </div>
  )
}

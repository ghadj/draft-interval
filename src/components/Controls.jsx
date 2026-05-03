import React from 'react'
import { Play, Pause, SkipForward, SkipBack, Grid3x3, Zap, Pen } from 'lucide-react'
import { useSessionStore } from '../store/useSessionStore'
import { useTimer } from '../hooks/useTimer'

export default function Controls() {
  const {
    isShowControls,
    isPaused,
    timeLeft,
    timerDuration,
    getCurrentImage,
  } = useSessionStore()

  const { startTimer } = useTimer()
  const currentImage = getCurrentImage()

  if (!isShowControls && !isPaused) return null

  return (
    <div>
      <div className="fixed top-0 left-0 pl-4 pr-1 bg-black text-white text-xs ">
        (G)rayscale (F)lip (B)lur (H)igh Contrast (R)ule of Thirds (L)ine of Action
      </div>

      <div className="fixed top-0 right-0 pl-1 pr-4 bg-black text-white text-xs ">
        (Space) Play/Pause (←) Previous (→) Next
      </div>

      <div className="fixed bottom-0 right-0 pl-1 pr-4 bg-black text-white text-xs flex items-center">
        {isPaused ? <Pause size={13} /> : <Play size={13} />}
        {String(timeLeft || timerDuration).padStart(3, '0')}s
      </div>

      {/* Image Info - Subtle text in corner */}
      <div className="absolute bottom-0 text-xs pl-4 pr-1 bg-black text-white pointer-events-none">
        {currentImage.name}
      </div>

    </div>
  )
}

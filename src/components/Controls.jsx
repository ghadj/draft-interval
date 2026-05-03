import React from 'react'
import { Play, Pause } from 'lucide-react'
import { useSessionStore } from '../store/useSessionStore'

export default function Controls() {
  const {
    isShowControls,
    isPaused,
    timeLeft,
    timerDuration,
    getCurrentImage,
  } = useSessionStore()

  const currentImage = getCurrentImage()

  let timerBgColor = 'bg-black'
  let timerTextColor = 'text-white'
  if (timeLeft < 5) {
    timerBgColor = 'bg-[#FF605C]'
    timerTextColor = 'text-white'
  } else if (timeLeft < 10) {
    timerBgColor = 'bg-[#FFBD44]'
    timerTextColor = 'text-black'
  }

  return (
    <div>
      {(isShowControls || isPaused) && (
        <>
          <div className="fixed top-0 left-0 pl-4 pr-1 bg-black text-white text-xs ">
            (G)rayscale (F)lip (B)lur (H)igh Contrast (R)ule of Thirds (L)ine of Action
          </div>

          <div className="fixed top-0 right-0 pl-1 pr-4 bg-black text-white text-xs ">
            (Space) Play/Pause (←) Previous (→) Next
          </div>

          <div className="absolute bottom-0 text-xs pl-4 pr-1 bg-black text-white pointer-events-none">
            {currentImage.name}
          </div>
        </>
      )}

      <div className={`fixed bottom-0 right-0 pl-1 pr-4 ${timerBgColor} ${timerTextColor} text-xs flex items-center tabular-nums`}>
        {isPaused ? <Pause size={13} /> : <Play size={13} />}
        {String(timeLeft || timerDuration).padStart(3, '0')}s
      </div>
    </div>
  )
}

import React from 'react'
import { Play, Pause, SkipForward, SkipBack, Grid3x3, Zap } from 'lucide-react'
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
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-4 bg-black bg-opacity-70 rounded-lg p-4 backdrop-blur">
      {/* Timer Display */}
      <div className="text-center min-w-[60px]">
        <div className="text-3xl  font-bold text-white">
          {String(timeLeft || timerDuration).padStart(2, '0')}
        </div>
        <div className="text-xs text-gray-500">seconds</div>
      </div>

      {/* Divider */}
      <div className="h-12 w-px bg-gray-600"></div>

      {/* Playback Controls */}
      <div className="flex gap-2">
        <button
          onClick={handlePlayPause}
          className="p-2 hover:bg-gray-800 rounded-lg transition-colors text-white"
          title={isActive ? 'Pause (Space)' : 'Play (Space)'}
        >
          {isActive ? (
            <Pause size={20} />
          ) : (
            <Play size={20} />
          )}
        </button>

        <button
          onClick={previousImage}
          className="p-2 hover:bg-gray-800 rounded-lg transition-colors text-white"
          title="Previous (← Arrow)"
        >
          <SkipBack size={20} />
        </button>

        <button
          onClick={nextImage}
          className="p-2 hover:bg-gray-800 rounded-lg transition-colors text-white"
          title="Next (→ Arrow)"
        >
          <SkipForward size={20} />
        </button>
      </div>

      {/* Divider */}
      <div className="h-12 w-px bg-gray-600"></div>

      {/* Filter Toggles */}
      <div className="flex gap-2">
        {/* Grayscale */}
        <button
          onClick={() => toggleFilter('grayscale')}
          className={`px-3 py-2 rounded-lg transition-colors text-sm  ${
            filters.grayscale
              ? 'bg-white text-black'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
          title="Grayscale (G)"
        >
          G
        </button>

        {/* Flip */}
        <button
          onClick={() => toggleFilter('flip')}
          className={`px-3 py-2 rounded-lg transition-colors text-sm  ${
            filters.flip
              ? 'bg-white text-black'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
          title="Flip (F)"
        >
          F
        </button>

        {/* Blur */}
        <button
          onClick={() => toggleFilter('blur')}
          className={`px-3 py-2 rounded-lg transition-colors text-sm  ${
            filters.blur
              ? 'bg-white text-black'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
          title="Blur (B)"
        >
          B
        </button>

        {/* High Contrast */}
        <button
          onClick={() => toggleFilter('highContrast')}
          className={`px-3 py-2 rounded-lg transition-colors text-sm  ${
            filters.highContrast
              ? 'bg-white text-black'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
          title="High Contrast (H)"
        >
          HC
        </button>
      </div>

      {/* Divider */}
      <div className="h-12 w-px bg-gray-600"></div>

      {/* Overlays */}
      <div className="flex gap-2">
        <button
          onClick={toggleRuleOfThirds}
          className={`p-2 rounded-lg transition-colors ${
            showRuleOfThirds
              ? 'bg-white text-black'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
          title="Rule of Thirds"
        >
          <Grid3x3 size={20} />
        </button>

        <button
          onClick={toggleLineOfAction}
          className="p-2 hover:bg-gray-800 rounded-lg transition-colors text-white"
          title="Line of Action"
        >
          <Zap size={20} />
        </button>
      </div>
    </div>
  )
}

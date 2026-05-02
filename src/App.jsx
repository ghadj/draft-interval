import { useEffect } from 'react'
import { useSessionStore } from './store/useSessionStore'
import Dashboard from './components/Dashboard'
import Viewport from './components/Viewport'
import Controls from './components/Controls'
import { useTimer } from './hooks/useTimer'

function App() {
  const {
    isActive,
    images,
    toggleFilter,
    toggleRuleOfThirds,
    toggleLineOfAction,
    nextImage,
    previousImage,
    setIsActive,
  } = useSessionStore()

  const { startTimer } = useTimer()

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isActive) return

      switch (e.code) {
        case 'Space':
          e.preventDefault()
          setIsActive(!isActive)
          if (!isActive) {
            startTimer()
          }
          break
        case 'ArrowRight':
          e.preventDefault()
          nextImage()
          break
        case 'ArrowLeft':
          e.preventDefault()
          previousImage()
          break
        case 'KeyF':
          e.preventDefault()
          toggleFilter('flip')
          break
        case 'KeyG':
          e.preventDefault()
          toggleFilter('grayscale')
          break
        case 'KeyB':
          e.preventDefault()
          toggleFilter('blur')
          break
        case 'KeyH':
          e.preventDefault()
          toggleFilter('highContrast')
          break
        case 'KeyR':
          e.preventDefault()
          toggleRuleOfThirds()
          break
        case 'KeyL':
          e.preventDefault()
          toggleLineOfAction()
          break
        default:
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [
    isActive,
    toggleFilter,
    toggleRuleOfThirds,
    toggleLineOfAction,
    nextImage,
    previousImage,
    setIsActive,
    startTimer,
  ])

  // Show Dashboard if no images loaded, otherwise show Practice View
  if (images.length === 0) {
    return <Dashboard />
  }

  return (
    <div className="w-full h-screen bg-black overflow-hidden">
      {/* Practice View */}
      <Viewport />

      {/* Controls HUD */}
      {isActive && <Controls />}

      {/* Keyboard Help (optional, when not active) */}
      {!isActive && (
        <div className="absolute top-4 right-4 bg-black bg-opacity-70 rounded p-4 text-xs text-gray-500 font-mono max-w-xs">
          <p className="font-bold text-white mb-2">Shortcuts</p>
          <ul className="space-y-1">
            <li>Space: Play/Pause</li>
            <li>← →: Previous/Next</li>
            <li>G: Grayscale | F: Flip | B: Blur | H: High Contrast</li>
            <li>R: Rule of Thirds | L: Line of Action</li>
          </ul>
        </div>
      )}
    </div>
  )
}

export default App

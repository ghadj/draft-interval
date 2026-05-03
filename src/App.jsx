import { useEffect } from 'react'
import { useSessionStore } from './store/useSessionStore'
import Dashboard from './components/Dashboard'
import Viewport from './components/Viewport'
import Controls from './components/Controls'
import { useTimer } from './hooks/useTimer'

function App() {
    const {
        isActive,
        isPaused,
        images,
        toggleFilter,
        toggleRuleOfThirds,
        toggleLineOfAction,
        nextImage,
        previousImage,
        setIsPaused,
        setIsActive
    } = useSessionStore()

    const { startTimer } = useTimer()

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!isActive) return

            switch (e.code) {
                case 'Escape':
                    e.preventDefault()
                    setIsActive(false)
                    break
                case 'Space':
                    e.preventDefault()
                    setIsPaused(!isPaused)
                    if (!isPaused) {
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
        setIsPaused,
        startTimer,
    ])

    // Show Dashboard if no images loaded, otherwise show Practice View
    if (!isActive) {
        return <Dashboard />
    }

    return (
        <div className="w-full h-screen bg-black overflow-hidden">
            {/* Practice View */}
            <Viewport />

            {/* Controls HUD */}
            {<Controls />}
        </div>
    )
}

export default App

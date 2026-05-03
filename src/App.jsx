import { useEffect } from 'react'
import { useSessionStore } from './store/useSessionStore'
import { useTimer } from './hooks/useTimer'
import Dashboard from './components/Dashboard'
import Viewport from './components/Viewport'
import Controls from './components/Controls'

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
        resetAll
    } = useSessionStore()

    const { togglePause, handleNextImage, handlePreviousImage } = useTimer()

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!isActive) return

            switch (e.code) {
                case 'Escape':
                    e.preventDefault()
                    resetAll()
                    break
                case 'Space':
                    e.preventDefault()
                    togglePause()
                    break
                case 'ArrowRight':
                    e.preventDefault()
                    handleNextImage()
                    break
                case 'ArrowLeft':
                    e.preventDefault()
                    handlePreviousImage()
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
        setIsActive,
        toggleFilter,
        toggleRuleOfThirds,
        toggleLineOfAction,
        nextImage,
        previousImage,
        togglePause,
        handleNextImage,
        handlePreviousImage,
        resetAll,
    ])

    if (!isActive) {
        return <Dashboard />
    }

    return (
        <div className="w-full h-screen bg-black overflow-hidden">
            <Viewport />
            {<Controls />}
        </div>
    )
}

export default App

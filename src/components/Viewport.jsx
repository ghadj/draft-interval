import React, { useRef, useEffect, useState } from 'react'
import { useSessionStore } from '../store/useSessionStore'
import RuleOfThirds from './overlays/RuleOfThirds'
import LineOfAction from './overlays/LineOfAction'

export default function Viewport() {
    const {
        getCurrentImage,
        filters,
        showRuleOfThirds,
        showLineOfAction,
        isActive,
        setShowControls,
    } = useSessionStore()

    const imgRef = useRef(null)
    const containerRef = useRef(null)

    const getFilterStyle = () => {
        let filterString = ''
        if (filters.grayscale) filterString += 'grayscale(100%)'
        if (filters.blur) filterString += ' blur(10px)'
        if (filters.highContrast) filterString += ' contrast(200%) brightness(80%)'
        return filterString
    }

    const getTransformStyle = () => {
        let transform = ''
        if (filters.flip) transform += 'scaleX(-1)'
        return transform
    }

    useEffect(() => {
        if (!isActive) return

        let timeoutId
        const handleMouseMove = () => {
            setShowControls(true)
            clearTimeout(timeoutId)
            timeoutId = setTimeout(() => {
                setShowControls(false)
            }, 3000) // Hide UI after 3 seconds of inactivity
        }

        window.addEventListener('mousemove', handleMouseMove)
        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
            clearTimeout(timeoutId)
        }
    }, [isActive])

    const currentImage = getCurrentImage()

    if (!currentImage) {
        return (
            <div className="w-full h-screen flex items-center justify-center bg-black">
                <p className="text-white">No images loaded</p>
            </div>
        )
    }

    return (
        <div
            ref={containerRef}
            className="w-full h-screen bg-black overflow-hidden flex items-center justify-center"
        >
            <div className="relative inline-block">
                <img
                    ref={imgRef}
                    src={currentImage.url}
                    alt={currentImage.name}
                    className="block max-h-screen max-w-full object-contain"
                    style={{
                        filter: getFilterStyle(),
                        transform: getTransformStyle(),
                    }}
                />

                {showRuleOfThirds && <RuleOfThirds />}
                {showLineOfAction && <LineOfAction />}
            </div>
        </div>
    )
}

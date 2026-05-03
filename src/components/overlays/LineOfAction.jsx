import React, { useRef, useState } from 'react'

export default function LineOfAction() {
    const canvasRef = useRef(null)
    const [isDrawing, setIsDrawing] = useState(false)
    const [startPoint, setStartPoint] = useState(null)

    const handleMouseDown = (e) => {
        const rect = canvasRef.current.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        setIsDrawing(true)
        setStartPoint({ x, y })
    }

    const handleMouseMove = (e) => {
        if (!isDrawing || !canvasRef.current) return

        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        const rect = canvas.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        // Clear and redraw
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        // Draw line from start to current
        ctx.strokeStyle = 'rgba(255, 100, 100, 0.7)'
        ctx.lineWidth = 2
        ctx.lineCap = 'round'
        ctx.beginPath()
        ctx.moveTo(startPoint.x, startPoint.y)
        ctx.lineTo(x, y)
        ctx.stroke()
    }

    const handleMouseUp = () => {
        setIsDrawing(false)
    }

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 cursor-crosshair"
            width={window.innerWidth}
            height={window.innerHeight}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
        />
    )
}

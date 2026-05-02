import React from 'react'

export default function RuleOfThirds() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      {/* Vertical lines */}
      <line x1="33.333" y1="0" x2="33.333" y2="100" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="0.2" />
      <line x1="66.667" y1="0" x2="66.667" y2="100" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="0.2" />
      
      {/* Horizontal lines */}
      <line x1="0" y1="33.333" x2="100" y2="33.333" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="0.2" />
      <line x1="0" y1="66.667" x2="100" y2="66.667" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="0.2" />
      
      {/* Intersection points */}
      <circle cx="33.333" cy="33.333" r="0.5" fill="rgba(255, 255, 255, 0.3)" />
      <circle cx="66.667" cy="33.333" r="0.5" fill="rgba(255, 255, 255, 0.3)" />
      <circle cx="33.333" cy="66.667" r="0.5" fill="rgba(255, 255, 255, 0.3)" />
      <circle cx="66.667" cy="66.667" r="0.5" fill="rgba(255, 255, 255, 0.3)" />
    </svg>
  )
}

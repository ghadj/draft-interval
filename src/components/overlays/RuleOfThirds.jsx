import React from 'react'

const RULE_OF_THIRDS_COLOR = 'rgba(255, 96, 92, 0.7)'

export default function RuleOfThirds() {
    return (
        <svg
            /* absolute inset-0 ensures it matches the parent div (the image box) */
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
        >
            {/* Vertical lines */}
            <line x1="33.333" y1="0" x2="33.333" y2="100" stroke={RULE_OF_THIRDS_COLOR} strokeWidth="0.2" />
            <line x1="66.667" y1="0" x2="66.667" y2="100" stroke={RULE_OF_THIRDS_COLOR} strokeWidth="0.2" />

            {/* Horizontal lines */}
            <line x1="0" y1="33.333" x2="100" y2="33.333" stroke={RULE_OF_THIRDS_COLOR} strokeWidth="0.2" />
            <line x1="0" y1="66.667" x2="100" y2="66.667" stroke={RULE_OF_THIRDS_COLOR} strokeWidth="0.2" />
        </svg>
    )
}
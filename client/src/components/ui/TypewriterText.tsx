import { useState, useEffect } from "react"

interface TypewriterTextProps {
    text: string
    speed?: number
    onComplete?: () => void
}

export function TypewriterText({ text, speed = 3, onComplete }: TypewriterTextProps) {
    const [displayedText, setDisplayedText] = useState("")
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        if (currentIndex < text.length) {
            const timer = setTimeout(() => {
                setDisplayedText(prev => prev + text[currentIndex])
                setCurrentIndex(prev => prev + 1)
            }, speed)

            return () => clearTimeout(timer)
        } else if (currentIndex === text.length && onComplete) {
            onComplete()
        }
    }, [currentIndex, text, speed, onComplete])

    useEffect(() => {
        // Reset when text changes
        setDisplayedText("")
        setCurrentIndex(0)
    }, [text])

    return (
        <span>
            {displayedText}
            {currentIndex < text.length && (
                <span className="animate-pulse">|</span>
            )}
        </span>
    )
}
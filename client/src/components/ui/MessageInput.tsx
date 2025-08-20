import { useState, useRef, useEffect } from "react"
import { Send } from "lucide-react"

interface MessageInputProps {
    onSendMessage: (message: string) => void
    isLoading: boolean
    personaColor: string
    personaName?: string
}

export function MessageInput({ onSendMessage, isLoading, personaColor, personaName }: MessageInputProps) {
    const [message, setMessage] = useState("")
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (message.trim() && !isLoading) {
            onSendMessage(message.trim())
            setMessage("")
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSubmit(e)
        }
    }

    // Auto-resize textarea
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto'
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
        }
    }, [message])

    return (
        <form onSubmit={handleSubmit} className="flex gap-3 items-end p-4 bg-white border-t border-gray-200">
            <div className="flex-1 relative">
                <textarea
                    ref={textareaRef}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={`Message ${personaName || 'Assistant'}...`}
                    className="w-full px-4 py-3 border border-gray-300 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent max-h-32 min-h-[48px]"
                    rows={1}
                    disabled={isLoading}
                />
            </div>
            <button
                type="submit"
                disabled={!message.trim() || isLoading}
                className={`p-3 rounded-full text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r ${personaColor} hover:shadow-lg transform hover:scale-105 active:scale-95`}
            >
                <Send className="h-5 w-5" />
            </button>
        </form>
    )
}
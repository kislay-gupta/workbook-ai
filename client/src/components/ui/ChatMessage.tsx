import { Bot, User, Copy } from "lucide-react"
import { TypewriterText } from "./TypewriterText"
import { MarkdownRenderer } from "./MarkdownRenderer"
import { Message } from "@/types/chat"

interface ChatMessageProps {
    message: Message
    personaColor: string
    personaImage?: string
    personaName?: string
    onTypingComplete?: (messageId: string) => void
}

export function ChatMessage({ message, personaColor, personaImage, personaName, onTypingComplete }: ChatMessageProps) {
    const handleTypingComplete = () => {
        if (onTypingComplete) {
            onTypingComplete(message.id)
        }
    }

    return (
        <div className={`group flex gap-4 mb-4 animate-in fade-in slide-in-from-bottom-2 duration-300 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            {message.sender === 'bot' && (
                <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 shadow-md border-2 border-white animate-in zoom-in duration-200 delay-100">
                    {personaImage ? (
                        <img
                            src={personaImage}
                            alt={`${personaName || 'Persona'} avatar`}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className={`w-full h-full bg-gradient-to-r ${personaColor} flex items-center justify-center`}>
                            <Bot className="h-5 w-5 text-white" />
                        </div>
                    )}
                </div>
            )}

            <div
                className={`max-w-2xl px-4 py-3 rounded-2xl shadow-sm transition-all duration-200 hover:shadow-md ${message.sender === 'user'
                    ? `bg-gradient-to-r ${personaColor} text-white`
                    : 'bg-gray-50 text-gray-800 border border-gray-100'
                    }`}
            >
                <div className="text-sm leading-relaxed prose prose-sm max-w-none chat-message">
                    {message.isTyping && message.sender === 'bot' ? (
                        <TypewriterText
                            text={message.content}
                            onComplete={handleTypingComplete}
                        />
                    ) : message.sender === 'bot' ? (
                        <MarkdownRenderer content={message.content} />
                    ) : (
                        <div className="whitespace-pre-wrap">{message.content}</div>
                    )}
                </div>
                <div className={`text-xs mt-3 flex items-center justify-between ${message.sender === 'user' ? 'text-white/70' : 'text-gray-500'}`}>
                    <span>
                        {message.timestamp.toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit'
                        })}
                    </span>
                    {message.sender === 'bot' && !message.isTyping && (
                        <button
                            onClick={() => navigator.clipboard.writeText(message.content)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-gray-200 rounded"
                            title="Copy message"
                        >
                            <Copy className="h-3 w-3" />
                        </button>
                    )}
                </div>
            </div>

            {message.sender === 'user' && (
                <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center flex-shrink-0 shadow-md animate-in zoom-in duration-200 delay-100">
                    <User className="h-5 w-5 text-white" />
                </div>
            )}
        </div>
    )
}
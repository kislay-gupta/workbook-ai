import { Bot } from "lucide-react"

interface LoadingIndicatorProps {
    personaColor: string
    personaAccent?: string
}

export function LoadingIndicator({ personaColor, personaAccent }: LoadingIndicatorProps) {
    return (
        <div className="flex gap-4 mb-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 shadow-md border-2 border-white animate-spin">
                <div className={`w-full h-full bg-gradient-to-r ${personaColor} flex items-center justify-center`}>
                    <Bot className="h-5 w-5 text-white" />
                </div>
            </div>

            <div className="bg-gray-50 text-gray-800 border border-gray-100 px-4 py-3 rounded-2xl shadow-sm">
                <div className="flex items-center gap-2">
                    <span className="text-sm">Thinking</span>
                    <div className="flex gap-1">
                        {[0, 1, 2].map((i) => (
                            <div
                                key={i}
                                className="w-2 h-2 rounded-full animate-bounce"
                                style={{
                                    backgroundColor: personaAccent || '#3b82f6',
                                    animationDelay: `${i * 0.2}s`
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
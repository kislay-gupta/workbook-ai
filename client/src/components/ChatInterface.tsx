import { useParams } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowDown } from "lucide-react"
import { ChatHeader } from "@/components/ui/ChatHeader"
import { ChatMessage } from "@/components/ui/ChatMessage"
import { MessageInput } from "@/components/ui/MessageInput"
import { LoadingIndicator } from "@/components/ui/LoadingIndicator"
import { useChat } from "@/hooks/useChat"
import { getPersonaConfig } from "@/utils/personas"
import "highlight.js/styles/github-dark.css"
import "./ChatInterface.css"
import usePageTitle from "@/hooks/usePageTitle"

interface ChatInterfaceProps {
    onBack: () => void
}

export function ChatInterface({ onBack }: ChatInterfaceProps) {
    const { persona } = useParams<{ persona: string }>()
    const {
        messages,
        isLoading,
        showScrollButton,
        messagesEndRef,
        chatContainerRef,
        sendMessage,
        handleTypingComplete,
        scrollToBottom
    } = useChat()

    const currentPersona = getPersonaConfig(persona)

    const handleSendMessage = (message: string) => {
        sendMessage(message)
    }
    usePageTitle(`${persona?.toUpperCase()} AI`)
    return (
        <div className="flex-1 flex flex-col h-screen bg-white">
            {/* Compact Header */}
            <div className="flex-shrink-0 border-b border-gray-200 bg-white/95 backdrop-blur-sm">
                <ChatHeader persona={currentPersona} onBack={onBack} />
            </div>

            {/* Messages Area - Takes up remaining space */}
            <div className="flex-1 overflow-hidden">
                <div
                    ref={chatContainerRef}
                    className="h-full overflow-y-auto"
                >
                    <div className="w-full mx-auto px-4 py-6 space-y-6">
                        {messages.length === 0 && (
                            <div className="text-center text-gray-500 py-20">
                                <div className="w-16 h-16 mx-auto mb-4 rounded-full overflow-hidden border-4 border-white shadow-lg">
                                    <img
                                        src={currentPersona.image}
                                        alt={`${currentPersona.name} avatar`}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                                    Chat with {currentPersona.name}
                                </h3>
                                <p className="text-gray-500 max-w-md mx-auto">
                                    Ask questions about programming, career guidance, or any tech-related topics.
                                    I'm here to help you learn and grow!
                                </p>
                            </div>
                        )}

                        <AnimatePresence>
                            {messages.map((message) => (
                                <ChatMessage
                                    key={message.id}
                                    message={message}
                                    personaColor={currentPersona.color}
                                    personaImage={currentPersona.image}
                                    personaName={currentPersona.name}
                                    onTypingComplete={handleTypingComplete}
                                />
                            ))}
                        </AnimatePresence>

                        <AnimatePresence>
                            {isLoading && (
                                <LoadingIndicator
                                    personaColor={currentPersona.color}
                                    personaAccent={currentPersona.accent}
                                />
                            )}
                        </AnimatePresence>

                        <div ref={messagesEndRef} />
                    </div>

                    {/* Scroll to bottom button */}
                    <AnimatePresence>
                        {showScrollButton && (
                            <motion.button
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                onClick={scrollToBottom}
                                className="fixed bottom-24 right-6 p-3 bg-white border border-gray-200 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 z-10"
                                title="Scroll to bottom"
                            >
                                <ArrowDown className="h-4 w-4 text-gray-600" />
                            </motion.button>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Fixed Input at Bottom */}
            <div className="flex-shrink-0 border-t border-gray-200 bg-white">
                <div className=" mx-auto">
                    <MessageInput
                        onSendMessage={handleSendMessage}
                        isLoading={isLoading}
                        personaColor={currentPersona.color}
                        personaName={currentPersona.name}
                    />
                </div>
            </div>
        </div>
    )
}
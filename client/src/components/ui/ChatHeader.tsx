import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import type { PersonaInfo } from "@/utils/personas"

interface ChatHeaderProps {
    persona: PersonaInfo
    onBack: () => void
}

export function ChatHeader({ persona, onBack }: ChatHeaderProps) {
    return (
        <div className="px-4 py-3">
            <div className="flex items-center justify-between w-11/12 mx-auto">
                <div className="flex items-center gap-3">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onBack}
                        className="text-gray-600 hover:bg-gray-100 rounded-full"
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-sm">
                            <img
                                src={persona.image}
                                alt={`${persona.name} avatar`}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div>
                            <h1 className="text-lg font-semibold text-gray-900">
                                {persona.name}
                            </h1>
                            <p className="text-sm text-gray-500">
                                {persona.title}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-green-50 rounded-full">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-green-700 font-medium">Online</span>
                </div>
            </div>
        </div>
    )
}
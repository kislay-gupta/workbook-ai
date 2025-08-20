import { useState } from "react"
import { Copy, Check } from "lucide-react"

interface CopyButtonProps {
    text: string
    className?: string
}

export function CopyButton({ text, className = "" }: CopyButtonProps) {
    const [copied, setCopied] = useState(false)

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(text)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            console.error('Failed to copy text: ', err)
        }
    }

    return (
        <button
            onClick={handleCopy}
            className={`absolute top-2 right-2 p-2 bg-gray-700 hover:bg-gray-600 text-white rounded transition-colors ${className}`}
            title="Copy code"
        >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        </button>
    )
}
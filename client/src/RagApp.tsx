import { useState, useRef, useEffect } from 'react'
import { chatService } from '@/services/chatService'
import { useChat } from '@/hooks/useChat'
import { ChatMessage } from '@/components/ui/ChatMessage'
import { MessageInput } from '@/components/ui/MessageInput'
import { LoadingIndicator } from '@/components/ui/LoadingIndicator'
import './App.css'

function RagApp() {
    const {
        messages,
        isLoading,
        messagesEndRef,
        chatContainerRef,
        sendMessage,
        addBotMessage,
        handleTypingComplete,
        setIsLoading
    } = useChat()

    const [file, setFile] = useState<File | null>(null)
    const [textToIndex, setTextToIndex] = useState('')
    const [urlToIndex, setUrlToIndex] = useState('')
    const [status, setStatus] = useState('')
    const fileInputRef = useRef<HTMLInputElement>(null)

    const checkStatus = async () => {
        try {
            const result = await chatService.getStatus()
            showStatus(`🟢 ${result.status}${result.message ? ' - ' + result.message : ''}`, 'success')
        } catch (error) {
            showStatus('🔴 Server connection failed', 'error')
        }
    }

    useEffect(() => {
        // Check status on component mount
        checkStatus()
    }, [])

    const addInfoMessage = (text: string) => {
        addBotMessage(text, false)
    }

    const showStatus = (message: string, type: 'success' | 'error' | 'info') => {
        setStatus(message)
        if (type === 'success') {
            setTimeout(() => setStatus(''), 3000)
        }
    }

    const handleSendMessage = async (question: string) => {
        sendMessage(question)
        setIsLoading(true)

        try {
            const result = await chatService.sendMessage(question)


            if (result.sources && result.sources > 0) {
                setTimeout(() => {
                    const sourceInfo = result.sourceTypes
                        ? `📚 Found information from ${result.sources} source(s) (${result.sourceTypes.join(', ')})`
                        : `📚 Found information from ${result.sources} source(s)`
                    addInfoMessage(sourceInfo)
                }, 1000)
            }
        } catch (error) {
            addBotMessage(`❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`, false)
        } finally {
            setIsLoading(false)
        }
    }

    const uploadFile = async () => {
        if (!file) return

        setIsLoading(true)

        try {
            const result = await chatService.uploadFile(file)
            addInfoMessage(`✅ ${result.message} Indexed ${result.documentsCount} documents.`)
            setFile(null)
            if (fileInputRef.current) {
                fileInputRef.current.value = ''
            }
        } catch (error) {
            addBotMessage(`❌ Upload error: ${error instanceof Error ? error.message : 'Unknown error'}`, false)
        } finally {
            setIsLoading(false)
        }
    }

    const indexText = async () => {
        if (!textToIndex.trim()) return

        setIsLoading(true)

        try {
            const result = await chatService.indexText(textToIndex)
            addInfoMessage(`✅ ${result.message} Created ${result.chunksCount} chunks.`)
            setTextToIndex('')
        } catch (error) {
            addBotMessage(`❌ Indexing error: ${error instanceof Error ? error.message : 'Unknown error'}`, false)
        } finally {
            setIsLoading(false)
        }
    }

    const indexWebsite = async () => {
        if (!urlToIndex.trim()) return

        // Basic URL validation
        try {
            new URL(urlToIndex)
        } catch {
            addBotMessage('❌ Please enter a valid URL (e.g., https://example.com)', false)
            return
        }

        setIsLoading(true)

        try {
            const result = await chatService.indexWebsite(urlToIndex)
            addInfoMessage(`✅ ${result.message} Created ${result.chunksCount} chunks from ${result.url}`)
            setUrlToIndex('')
        } catch (error) {
            addBotMessage(`❌ Website indexing error: ${error instanceof Error ? error.message : 'Unknown error'}`, false)
        } finally {
            setIsLoading(false)
        }
    }



    return (
        <div className="app">
            <div className="sidebar">
                <h2>📁 Data Sources</h2>

                <div className="upload-section">
                    <h3>📄 Upload PDF Files</h3>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept=".pdf"
                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                        className="file-input"
                    />
                    <button
                        onClick={uploadFile}
                        disabled={!file || isLoading}
                        className="upload-btn"
                    >
                        {isLoading ? 'Uploading...' : 'Upload & Index'}
                    </button>
                </div>

                <div className="text-section">
                    <h3>📝 Add Text Data</h3>
                    <textarea
                        value={textToIndex}
                        onChange={(e) => setTextToIndex(e.target.value)}
                        placeholder="Enter text to index (articles, notes, documentation...)"
                        className="text-input"
                        rows={6}
                    />
                    <button
                        onClick={indexText}
                        disabled={!textToIndex.trim() || isLoading}
                        className="index-btn"
                    >
                        {isLoading ? 'Indexing...' : 'Index Text'}
                    </button>
                </div>

                <div className="website-section">
                    <h3>🌐 Index Website</h3>
                    <input
                        type="url"
                        value={urlToIndex}
                        onChange={(e) => setUrlToIndex(e.target.value)}
                        placeholder="Enter website URL (e.g., https://example.com)"
                        className="url-input"
                    />
                    <button
                        onClick={indexWebsite}
                        disabled={!urlToIndex.trim() || isLoading}
                        className="index-btn"
                    >
                        {isLoading ? 'Indexing...' : 'Index Website'}
                    </button>
                </div>

                {status && (
                    <div className={`status ${status.includes('🟢') ? 'success' : status.includes('🔴') ? 'error' : 'info'}`}>
                        {status}
                    </div>
                )}
            </div>

            <div className="chat-container">
                <div className="chat-header">
                    <h2>💬 Chat with Your Data</h2>
                    <button onClick={checkStatus} className="status-btn">
                        Check Status
                    </button>
                </div>

                <div
                    ref={chatContainerRef}
                    className="messages flex-1 overflow-y-auto p-4 space-y-4"
                >
                    {messages.map((message) => (
                        <ChatMessage
                            key={message.id}
                            message={message}
                            personaColor="from-blue-500 to-blue-600"
                            personaName="Assistant"
                            onTypingComplete={handleTypingComplete}
                        />
                    ))}
                    {isLoading && (
                        <LoadingIndicator
                            personaColor="from-blue-500 to-blue-600"
                            personaAccent="#3b82f6"
                        />
                    )}
                    <div ref={messagesEndRef} />
                </div>

                <MessageInput
                    onSendMessage={handleSendMessage}
                    isLoading={isLoading}
                    personaColor="from-blue-500 to-blue-600"
                    personaName="Assistant"
                />
            </div>
        </div>
    )
}

export default RagApp
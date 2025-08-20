import { useState, useRef, useEffect, useCallback } from "react";
import { Message } from "@/types/chat";

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hello! Upload some documents, add text data, or index a website, then ask me questions about it.",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const handleScroll = useCallback(() => {
    if (chatContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } =
        chatContainerRef.current;
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
      setShowScrollButton(!isNearBottom);
    }
  }, []);

  useEffect(() => {
    const container = chatContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [handleScroll]);

  const sendMessage = useCallback((content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    return userMessage.id;
  }, []);

  const addBotMessage = useCallback((content: string, isTyping = false) => {
    const botMessage: Message = {
      id: Date.now().toString() + "_bot",
      content,
      sender: "bot",
      timestamp: new Date(),
      isTyping,
    };
    setMessages((prev) => [...prev, botMessage]);
    return botMessage.id;
  }, []);

  const updateMessage = useCallback(
    (messageId: string, updates: Partial<Message>) => {
      setMessages((prev) =>
        prev.map((msg) => (msg.id === messageId ? { ...msg, ...updates } : msg))
      );
    },
    []
  );

  const handleTypingComplete = useCallback(
    (messageId: string) => {
      updateMessage(messageId, { isTyping: false });
    },
    [updateMessage]
  );

  const clearMessages = useCallback(() => {
    setMessages([
      {
        id: "1",
        content:
          "Hello! Upload some documents, add text data, or index a website, then ask me questions about it.",
        sender: "bot",
        timestamp: new Date(),
      },
    ]);
  }, []);

  return {
    messages,
    isLoading,
    showScrollButton,
    messagesEndRef,
    chatContainerRef,
    sendMessage,
    addBotMessage,
    updateMessage,
    handleTypingComplete,
    scrollToBottom,
    clearMessages,
    setIsLoading,
  };
}

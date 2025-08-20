# Reusable Chat Components

This directory contains a collection of reusable React components for building chat interfaces. The components are designed to be modular, customizable, and easy to integrate.

## Components Overview

### Core Components

#### `ChatMessage`

Displays individual chat messages with support for:

- User and bot messages
- Typewriter animation for bot responses
- Markdown rendering
- Copy functionality
- Timestamps

```tsx
import { ChatMessage } from "@/components/ui/ChatMessage";

<ChatMessage
  message={message}
  personaColor="from-blue-500 to-blue-600"
  onTypingComplete={handleTypingComplete}
/>;
```

#### `MessageInput`

Input component for sending messages with:

- Auto-resizing textarea
- Keyboard shortcuts (Enter to send, Shift+Enter for new line)
- Loading states
- Custom styling based on persona

```tsx
import { MessageInput } from "@/components/ui/MessageInput";

<MessageInput
  onSendMessage={handleSendMessage}
  isLoading={isLoading}
  personaColor="from-blue-500 to-blue-600"
  personaName="Assistant"
/>;
```

#### `ChatHeader`

Header component displaying:

- Persona information
- Back navigation
- Online status indicator

```tsx
import { ChatHeader } from "@/components/ui/ChatHeader";

<ChatHeader persona={personaConfig} onBack={() => navigate("/personas")} />;
```

#### `LoadingIndicator`

Animated loading component with:

- Rotating icon
- Bouncing dots
- Customizable colors

```tsx
import { LoadingIndicator } from "@/components/ui/LoadingIndicator";

<LoadingIndicator
  personaColor="from-blue-500 to-blue-600"
  personaAccent="#3b82f6"
/>;
```

### Utility Components

#### `MarkdownRenderer`

Renders markdown content with:

- Syntax highlighting for code blocks
- Copy buttons for code
- Custom styling for all markdown elements

```tsx
import { MarkdownRenderer } from "@/components/ui/MarkdownRenderer";

<MarkdownRenderer content="# Hello\n\nThis is **markdown**!" />;
```

#### `TypewriterText`

Animated text component that types out content:

- Configurable typing speed
- Markdown support
- Completion callbacks

```tsx
import { TypewriterText } from "@/components/ui/TypewriterText";

<TypewriterText
  text="Hello, how can I help you today?"
  speed={50}
  onComplete={() => console.log("Typing complete")}
/>;
```

#### `CopyButton`

Button for copying text to clipboard:

- Visual feedback on copy
- Customizable styling

```tsx
import { CopyButton } from "@/components/ui/CopyButton";

<CopyButton text="Code to copy" />;
```

#### `ErrorBoundary`

Error boundary component for handling React errors:

- Graceful error display
- Retry functionality
- Error details for debugging

```tsx
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";

<ErrorBoundary>
  <YourComponent />
</ErrorBoundary>;
```

## Hooks

### `useChat`

Custom hook for managing chat state and functionality:

```tsx
import { useChat } from "@/hooks/useChat";

const {
  messages,
  isLoading,
  showScrollButton,
  messagesEndRef,
  chatContainerRef,
  sendMessage,
  handleTypingComplete,
  scrollToBottom,
  clearMessages,
} = useChat();
```

## Services

### `chatService`

Service for handling API communication:

```tsx
import { chatService } from "@/services/chatService";

// Send a message
const response = await chatService.sendMessage({
  message: "Hello",
  persona: "hitesh",
});

// Get available personas
const personas = await chatService.getPersonas();
```

## Configuration

### Axios Configuration

Centralized HTTP client configuration in `config/axios.ts`:

- Request/response interceptors
- Error handling
- Timeout configuration
- Base URL setup

### Persona Configuration

Persona definitions in `utils/personas.ts`:

```tsx
import { getPersonaConfig } from "@/utils/personas";

const persona = getPersonaConfig("hitesh");
// Returns: { name, title, description, color, accent }
```

## Usage Examples

### Basic Chat Interface

```tsx
import { useChat } from "@/hooks/useChat";
import { ChatMessage } from "@/components/ui/ChatMessage";
import { MessageInput } from "@/components/ui/MessageInput";
import { LoadingIndicator } from "@/components/ui/LoadingIndicator";

export function MyChatComponent() {
  const { messages, isLoading, sendMessage, handleTypingComplete } = useChat();

  const handleSendMessage = (message: string) => {
    sendMessage(message, "hitesh");
  };

  return (
    <div>
      {messages.map((message) => (
        <ChatMessage
          key={message.id}
          message={message}
          personaColor="from-blue-500 to-blue-600"
          onTypingComplete={handleTypingComplete}
        />
      ))}

      {isLoading && (
        <LoadingIndicator
          personaColor="from-blue-500 to-blue-600"
          personaAccent="#3b82f6"
        />
      )}

      <MessageInput
        onSendMessage={handleSendMessage}
        isLoading={isLoading}
        personaColor="from-blue-500 to-blue-600"
        personaName="Assistant"
      />
    </div>
  );
}
```

### Custom Styling

All components accept className props and use Tailwind CSS classes. You can customize the appearance by:

1. Passing custom className props
2. Modifying the persona color configurations
3. Overriding CSS classes in your stylesheets

### Error Handling

Wrap your components in the ErrorBoundary for graceful error handling:

```tsx
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";

<ErrorBoundary>
  <ChatInterface />
</ErrorBoundary>;
```

## Key Benefits

1. **Modularity**: Each component has a single responsibility
2. **Reusability**: Components can be used in different contexts
3. **Type Safety**: Full TypeScript support with proper interfaces
4. **Performance**: Optimized with React best practices
5. **Accessibility**: Built with accessibility in mind
6. **Customization**: Easy to theme and customize
7. **Error Handling**: Robust error boundaries and validation
8. **HTTP Client**: Centralized axios configuration with interceptors

## Dependencies

- React 18+
- TypeScript
- Tailwind CSS
- Framer Motion (for animations)
- Axios (for HTTP requests)
- React Markdown (for markdown rendering)
- Lucide React (for icons)

## File Structure

```
src/
├── components/
│   ├── ui/
│   │   ├── ChatMessage.tsx
│   │   ├── MessageInput.tsx
│   │   ├── ChatHeader.tsx
│   │   ├── LoadingIndicator.tsx
│   │   ├── MarkdownRenderer.tsx
│   │   ├── TypewriterText.tsx
│   │   ├── CopyButton.tsx
│   │   └── ErrorBoundary.tsx
│   └── ChatInterface.tsx
├── hooks/
│   └── useChat.ts
├── services/
│   └── chatService.ts
├── config/
│   └── axios.ts
├── utils/
│   └── personas.ts
└── examples/
    └── ChatExample.tsx
```

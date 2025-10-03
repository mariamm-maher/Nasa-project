// filepath: c:\Users\maher\Desktop\NASA_Project\front-end\nasa-project\src\pages\ChatbotPage.jsx
import { useEffect, useRef } from "react";
import useChatbotStore from "../stores/chatbotStore";
import {
  GalaxyBackground,
  ChatbotHeader,
  MessagesContainer,
  ChatInput,
} from "../components/chatbot";

const ChatbotPage = () => {
  const messagesContainerRef = useRef(null);
  // Store state and actions
  const {
    messages,
    input,
    loading,
    typingText,
    expandedReferences,
    // Actions
    initializeTypewriter,
    cleanupTypewriter,
    initializeWebSocket,
    cleanupWebSocket,
    sendMessage,
    handleInputChange,
    handleInputKeyDown,
    toggleReferences,
    handleScrollBehavior,
    completeTyping,
  } = useChatbotStore();

  // Initialize effects
  useEffect(() => {
    initializeTypewriter();
    initializeWebSocket();

    return () => {
      cleanupTypewriter();
      cleanupWebSocket();
    };
  }, [
    initializeTypewriter,
    initializeWebSocket,
    cleanupTypewriter,
    cleanupWebSocket,
  ]);

  // Handle scroll behavior when messages change
  useEffect(() => {
    handleScrollBehavior(messagesContainerRef);
  }, [messages, handleScrollBehavior]);

  return (
    <div className="min-h-screen">
      {/* Galaxy Background Effects */}
      <GalaxyBackground />

      <div className="relative z-10 h-screen flex flex-col">
        {/* Header */}
        <ChatbotHeader messages={messages} typingText={typingText} />

        {/* Messages Container */}
        <MessagesContainer
          ref={messagesContainerRef}
          messages={messages}
          loading={loading}
          expandedReferences={expandedReferences}
          onToggleReferences={toggleReferences}
          onCompleteTyping={completeTyping}
        />

        {/* Input Area */}
        <ChatInput
          input={input}
          loading={loading}
          onInputChange={handleInputChange}
          onInputKeyDown={handleInputKeyDown}
          onSendMessage={sendMessage}
        />
      </div>
    </div>
  );
};

export default ChatbotPage;

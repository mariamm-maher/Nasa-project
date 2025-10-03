// filepath: c:\Users\maher\Desktop\NASA_Project\front-end\nasa-project\src\pages\ChatbotPage.jsx
import { useEffect, useRef } from "react";
import useChatbotStore from "../stores/chatbotStore";
import { ChatbotHeader, ChatInput } from "../components/chatbot";
import OptimizedGalaxyBackground from "../components/chatbot/OptimizedGalaxyBackground";
import OptimizedMessagesContainer from "../components/chatbot/OptimizedMessagesContainer";
import OptimizedNavigation from "@/components/OptimizedNavigation";
import "../components/chatbot/performance.css";

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
    <div className="min-h-screen relative chatbot-page">
      {" "}
      {/* Galaxy Background Effects - Isolated layer */}
      <div className="absolute inset-0 background-layer" style={{ zIndex: 0 }}>
        <OptimizedGalaxyBackground />
      </div>
      
      {/* Main Content Layer */}
      <div
        className="relative h-screen flex flex-col content-layer"
        style={{ zIndex: 1 }}
      >
        {/* Header */}
        <ChatbotHeader messages={messages} typingText={typingText} />{" "}
        {/* Messages Container */}
        <OptimizedMessagesContainer
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
        />{" "}
      </div>
      <OptimizedNavigation />
    </div>
  );
};

export default ChatbotPage;

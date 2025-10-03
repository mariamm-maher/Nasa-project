import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

// Mock reference data for demonstration
const mockReferences = [
  {
    id: 1,
    title: "Microgravity Effects on Plant Growth in Space",
    link: "https://nasa.gov/research/plant-growth",
    year: "2023",
    type: "Research Paper",
  },
  {
    id: 2,
    title: "Space Biology Database - Cellular Adaptation",
    link: "https://nasa.gov/space-biology",
    year: "2024",
    type: "Database",
  },
  {
    id: 3,
    title: "Astrobiology and Life Detection Methods",
    link: "https://nasa.gov/astrobiology",
    year: "2023",
    type: "Study",
  },
];

const useChatbotStore = create(
  subscribeWithSelector((set, get) => ({
    // State
    messages: [],
    input: "",
    loading: false,
    typingText: "",
    expandedReferences: {},
    isTyping: false,
    ws: null,
    streamingMessage: "",
    initialRender: true,
    fullText: "Ask me anything about the universe... 🌌",

    // Typewriter animation state
    typingIndex: 0,
    isDeleting: false,
    typingInterval: null,

    // Actions
    setMessages: (messages) => set({ messages }),
    setInput: (input) => set({ input }),
    setLoading: (loading) => set({ loading }),
    setTypingText: (typingText) => set({ typingText }),
    setExpandedReferences: (expandedReferences) => set({ expandedReferences }),
    setIsTyping: (isTyping) => set({ isTyping }),
    setStreamingMessage: (streamingMessage) => set({ streamingMessage }),
    setInitialRender: (initialRender) => set({ initialRender }),

    // Initialize typewriter effect
    initializeTypewriter: () => {
      const { fullText } = get();
      let index = 0;
      let deleting = false;

      const interval = setInterval(() => {
        const state = get();

        if (!deleting) {
          set({ typingText: fullText.slice(0, index + 1) });
          index++;
          if (index === fullText.length) {
            setTimeout(() => (deleting = true), 1000);
          }
        } else {
          set({ typingText: fullText.slice(0, index - 1) });
          index--;
          if (index === 0) deleting = false;
        }
      }, 100);

      set({ typingInterval: interval });
    },

    // Clean up typewriter effect
    cleanupTypewriter: () => {
      const { typingInterval } = get();
      if (typingInterval) {
        clearInterval(typingInterval);
        set({ typingInterval: null });
      }
    },

    // Initialize WebSocket connection
    initializeWebSocket: () => {
      const socket = new WebSocket("ws://localhost:8000/ws/chat");

      socket.onopen = () => {
        console.log("✅ WebSocket connected");
        set({ ws: socket });
      };

      socket.onclose = () => {
        console.log("❌ WebSocket disconnected");
        set({ ws: null });
      };

      socket.onmessage = (event) => {
        const { streamingMessage, messages } = get();

        if (event.data === "[DONE]") {
          set({ loading: false });
        } else {
          const newStreamingMessage = streamingMessage + event.data;
          set({ streamingMessage: newStreamingMessage });

          // Update the last message content
          const updatedMessages = [...messages];
          if (updatedMessages.length > 0) {
            updatedMessages[updatedMessages.length - 1].content =
              newStreamingMessage;
            set({ messages: updatedMessages });
          }
        }
      };

      socket.onerror = (error) => {
        console.error("WebSocket error:", error);
        set({ loading: false });
      };

      return socket;
    },

    // Clean up WebSocket connection
    cleanupWebSocket: () => {
      const { ws } = get();
      if (ws) {
        ws.close();
        set({ ws: null });
      }
    },

    // Send message
    sendMessage: () => {
      const { input, ws, messages } = get();
      const trimmedInput = input.trim();

      if (!trimmedInput || !ws) return;

      // Reset streaming message
      set({ streamingMessage: "" });

      // Add user message and empty assistant message
      const newMessages = [
        ...messages,
        { role: "user", content: trimmedInput },
        { role: "assistant", content: "", references: mockReferences },
      ];

      set({
        messages: newMessages,
        input: "",
        loading: true,
        isTyping: true,
      });

      // Send message through WebSocket
      ws.send(trimmedInput);
    },

    // Handle input change
    handleInputChange: (value) => {
      set({ input: value });
    },

    // Handle input key down
    handleInputKeyDown: (event) => {
      const { loading, sendMessage } = get();
      if (event.key === "Enter" && !loading) {
        sendMessage();
      }
    },

    // Toggle references visibility
    toggleReferences: (messageIndex) => {
      const { expandedReferences } = get();
      set({
        expandedReferences: {
          ...expandedReferences,
          [messageIndex]: !expandedReferences[messageIndex],
        },
      });
    },

    // Handle scroll behavior
    handleScrollBehavior: (messagesContainerRef) => {
      const { initialRender } = get();
      const container = messagesContainerRef.current;

      if (!container) return;

      if (initialRender) {
        container.scrollTop = 0;
        set({ initialRender: false });
      } else {
        if (container.scrollHeight > container.clientHeight) {
          container.scrollTop = container.scrollHeight;
        }
      }
    },

    // Complete typing animation
    completeTyping: () => {
      set({ isTyping: false });
    },

    // Reset chat
    resetChat: () => {
      set({
        messages: [],
        input: "",
        loading: false,
        expandedReferences: {},
        isTyping: false,
        streamingMessage: "",
        initialRender: true,
      });
    },

    // Get current chat state
    getChatState: () => {
      const state = get();
      return {
        hasMessages: state.messages.length > 0,
        isConnected: state.ws !== null,
        canSend:
          state.input.trim().length > 0 && !state.loading && state.ws !== null,
      };
    },

    // Add message programmatically
    addMessage: (role, content, references = null) => {
      const { messages } = get();
      const newMessage = { role, content };
      if (references) {
        newMessage.references = references;
      }

      set({
        messages: [...messages, newMessage],
      });
    },

    // Update last message content (for streaming)
    updateLastMessageContent: (content) => {
      const { messages } = get();
      if (messages.length > 0) {
        const updatedMessages = [...messages];
        updatedMessages[updatedMessages.length - 1].content = content;
        set({ messages: updatedMessages });
      }
    },

    // Get message by index
    getMessageByIndex: (index) => {
      const { messages } = get();
      return messages[index] || null;
    },

    // Check if references are expanded for a message
    areReferencesExpanded: (messageIndex) => {
      const { expandedReferences } = get();
      return expandedReferences[messageIndex] || false;
    },

    // Set connection status
    setConnectionStatus: (isConnected) => {
      set({ isConnected });
    },

    // Handle typing completion
    handleTypingComplete: () => {
      set({ isTyping: false });
    },
  }))
);

export default useChatbotStore;

import { useEffect, useRef, useState } from "react";

const ChatbotPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [typingText, setTypingText] = useState("");
  const ws = useRef(null);
  const streamingMessage = useRef("");
  const messagesContainerRef = useRef(null);
  const initialRender = useRef(true); 
  const fullText = "Ask me anything about the universe... 🌌";

  useEffect(() => {
    let index = 0;
    let deleting = false;
    const interval = setInterval(() => {
      if (!deleting) {
        setTypingText(fullText.slice(0, index + 1));
        index++;
        if (index === fullText.length) {
          setTimeout(() => (deleting = true), 1000);
        }
      } else {
        setTypingText(fullText.slice(0, index - 1));
        index--;
        if (index === 0) deleting = false;
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8000/ws/chat");
    ws.current = socket;

    socket.onopen = () => console.log("✅ WebSocket connected");
    socket.onclose = () => console.log("❌ WebSocket disconnected");

    socket.onmessage = (event) => {
      if (event.data === "[DONE]") {
        setLoading(false);
      } else {
        streamingMessage.current += event.data;
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1].content = streamingMessage.current;
          return updated;
        });
      }
    };

    return () => socket.close();
  }, []);

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;

    if (initialRender.current) {
      container.scrollTop = 0; 
      initialRender.current = false;
    } else {
      if (container.scrollHeight > container.clientHeight) {
        container.scrollTop = container.scrollHeight;
      }
    }
  }, [messages]);

  const sendMessage = () => {
    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    streamingMessage.current = "";
    setMessages((prev) => [
      ...prev,
      { role: "user", content: trimmedInput },
      { role: "assistant", content: "" },
    ]);

    ws.current.send(trimmedInput);
    setInput("");
    setLoading(true);
  };

  return (
    <div className="h-screen w-screen bg-cover bg-center flex flex-col">
      <div className="flex-1 relative overflow-hidden flex flex-col backdrop-blur-sm bg-black/30 text-white">
        <div
          className={`absolute z-20 text-white transition-all duration-700 ease-in-out ${
            messages.length === 0
              ? "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl font-bold text-center"
              : "top-4 left-4 translate-x-0 translate-y-0 text-xl font-semibold"
          }`}
        >
          🚀 NASA Chat-Bot
          {messages.length === 0 && (
            <p className="text-lg text-gray-300 h-6 mt-2">{typingText}</p>
          )}
        </div>
        <div
          ref={messagesContainerRef}
          className="flex-1 overflow-y-auto p-4 space-y-4 pt-24"
        >
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`max-w-[70%] w-fit text-center text- p-3 rounded-lg whitespace-pre-wrap ${
                msg.role === "user" ? "bg-blue-600 ml-auto" : "bg-gray-800 mr-auto"
              }`}
            >
              {msg.content}
            </div>
          ))}
        </div>
      </div>
      <div className="p-4 backdrop-blur bg-black/40 flex gap-2">
        <input
          type="text"
          className="flex-1 p-2 rounded bg-gray-800 text-white focus:outline-none"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !loading && sendMessage()}
          disabled={loading}
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2 rounded text-white"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatbotPage;

import { motion } from "framer-motion";
import { Send, Mic, X } from "lucide-react";

const ChatInput = ({
  input,
  loading,
  onInputChange,
  onInputKeyDown,
  onSendMessage,
}) => {
  return (
    <motion.div
      className="p-6 backdrop-blur-lg bg-black/30 border-t border-white/10 shadow-2xl"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 200 }}
    >
      <div className="max-w-4xl mx-auto relative">
        <motion.div
          className="relative flex gap-3 p-4 rounded-3xl backdrop-blur-2xl bg-gray-900/60 border border-cyan-400/20 focus-within:border-cyan-400/70 shadow-lg transition-all duration-300"
          whileFocusWithin={{ scale: 1.03 }}
        >
          {/* Icon inside input */}
          <span className="absolute left-6 top-1/2 -translate-y-1/2 text-cyan-400/80 pointer-events-none">
            <Send className="w-5 h-5 opacity-60" />
          </span>
          <input
            type="text"
            className="flex-1 bg-transparent text-white placeholder-gray-400 focus:outline-none text-lg pl-10 pr-8 focus:ring-2 focus:ring-cyan-400/40 rounded-xl transition-all duration-200 shadow-inner"
            placeholder="Ask about space biology, astrobiology, or cosmic research..."
            value={input}
            onChange={(e) => onInputChange(e.target.value)}
            onKeyDown={onInputKeyDown}
            disabled={loading}
            aria-label="Chat input"
            autoComplete="off"
          />
          {/* Clear button */}
          {input && !loading && (
            <button
              type="button"
              className="absolute right-20 top-1/2 -translate-y-1/2 text-gray-400 hover:text-cyan-400 transition-colors"
              onClick={() => onInputChange("")}
              tabIndex={-1}
              aria-label="Clear input"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          {/* Voice input button (future) */}
          <button
            type="button"
            className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 hover:text-cyan-400 transition-colors"
            tabIndex={-1}
            aria-label="Voice input (coming soon)"
            disabled
          >
            <Mic className="w-5 h-5 opacity-60" />
          </button>
          <motion.button
            onClick={onSendMessage}
            disabled={loading || !input.trim()}
            className={`relative overflow-hidden px-6 py-2 rounded-xl font-semibold transition-all duration-300 ${
              loading || !input.trim()
                ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-cyan-600 to-purple-600 text-white hover:from-cyan-500 hover:to-purple-500 transform hover:scale-105"
            }`}
            whileHover={!loading && input.trim() ? { scale: 1.05 } : {}}
            whileTap={!loading && input.trim() ? { scale: 0.95 } : {}}
          >
            <motion.div
              className="flex items-center space-x-2"
              animate={loading ? { x: [0, 5, 0] } : {}}
              transition={{ duration: 0.5, repeat: loading ? Infinity : 0 }}
            >
              <Send className="w-5 h-5" />
              <span>Send</span>
            </motion.div>

            {/* Glow effect */}
            {!loading && input.trim() && (
              <motion.div
                className="absolute inset-0 rounded-xl"
                animate={{
                  boxShadow: [
                    "0 0 0 rgba(34, 211, 238, 0)",
                    "0 0 20px rgba(34, 211, 238, 0.4)",
                    "0 0 0 rgba(34, 211, 238, 0)",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            )}
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ChatInput;

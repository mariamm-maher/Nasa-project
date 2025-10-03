import { motion } from "framer-motion";
import { Bot, FileText, Sparkles, Zap } from "lucide-react";

const ChatbotHeader = ({ messages, typingText }) => {
  return (
    <motion.div
      className={`transition-all duration-700 ease-in-out backdrop-blur-md bg-white/5 border-b border-white/10 rounded-2xl shadow-xl mx-auto mt-8 max-w-2xl w-full p-6 flex flex-col items-center justify-center ${
        messages.length === 0 ? "min-h-[320px]" : "h-20"
      }`}
      layout
    >
      <motion.div
        className={`text-center ${
          messages.length === 0 ? "space-y-6" : "flex items-center space-x-4"
        }`}
        layout
      >
        <motion.div className="flex items-center justify-center space-x-3">
          <motion.h1
            className={`font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent ${
              messages.length === 0 ? "text-6xl" : "text-2xl"
            }`}
            layout
          >
            NASA Space Biology AI
          </motion.h1>
        </motion.div>

        {messages.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-4"
          >
            <p className="text-xl text-gray-300 h-8">
              {typingText}
              <motion.span
                className="text-cyan-400 ml-1"
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              >
                |
              </motion.span>
            </p>
            <motion.div
              className="flex justify-center space-x-8 text-sm text-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <div className="flex items-center space-x-2">
                <Bot className="w-4 h-4" />
                <span>AI-Powered</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4" />
                <span>Real-time Research</span>
              </div>
              <div className="flex items-center space-x-2">
                <FileText className="w-4 h-4" />
                <span>Sourced Data</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default ChatbotHeader;

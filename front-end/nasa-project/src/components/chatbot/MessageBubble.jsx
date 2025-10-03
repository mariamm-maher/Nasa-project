import { motion } from "framer-motion";
import { Bot, User } from "lucide-react";
import TypewriterText from "./TypewriterText";
import ReferencesSection from "./ReferencesSection";

const MessageBubble = ({
  message,
  messageIndex,
  isLastMessage,
  loading,
  expandedReferences,
  onToggleReferences,
  onCompleteTyping,
}) => {
  const isUser = message.role === "user";
  const isAssistant = message.role === "assistant";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[70%] space-y-3 ${
          isAssistant ? "w-full max-w-4xl" : ""
        }`}
      >
        {/* Message Bubble */}
        <motion.div
          className={`relative p-4 rounded-2xl backdrop-blur-md border ${
            isUser
              ? "bg-gradient-to-r from-blue-600/80 to-purple-600/80 border-blue-400/30 text-white"
              : "bg-gradient-to-r from-gray-900/80 to-gray-800/80 border-cyan-400/30 text-white"
          }`}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {/* Role Icon */}
          <div className={`absolute -top-2 ${isUser ? "-right-2" : "-left-2"}`}>
            <motion.div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                isUser
                  ? "bg-blue-600 border-2 border-blue-400"
                  : "bg-gray-800 border-2 border-cyan-400"
              }`}
              whileHover={{ scale: 1.1 }}
            >
              {isUser ? (
                <User className="w-4 h-4" />
              ) : (
                <Bot className="w-4 h-4 text-cyan-400" />
              )}
            </motion.div>
          </div>

          {/* Message Content */}
          <div className="pt-2">
            {isAssistant && loading && isLastMessage ? (
              <TypewriterText
                text={message.content}
                isComplete={!loading}
                onComplete={onCompleteTyping}
              />
            ) : (
              <div className="whitespace-pre-wrap">{message.content}</div>
            )}
          </div>

          {/* Glow Effect for AI Messages */}
          {isAssistant && (
            <motion.div
              className="absolute inset-0 rounded-2xl border border-cyan-400/20"
              animate={{
                boxShadow: [
                  "0 0 0 rgba(34, 211, 238, 0)",
                  "0 0 20px rgba(34, 211, 238, 0.3)",
                  "0 0 0 rgba(34, 211, 238, 0)",
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          )}
        </motion.div>

        {/* References Section */}
        {isAssistant && (
          <ReferencesSection
            references={message.references}
            messageIndex={messageIndex}
            isExpanded={expandedReferences[messageIndex]}
            onToggle={onToggleReferences}
          />
        )}
      </div>
    </motion.div>
  );
};

export default MessageBubble;

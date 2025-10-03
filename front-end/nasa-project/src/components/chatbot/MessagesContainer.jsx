import { forwardRef } from "react";
import { AnimatePresence } from "framer-motion";
import MessageBubble from "./MessageBubble";
import LoadingIndicator from "./LoadingIndicator";

const MessagesContainer = forwardRef(
  (
    {
      messages,
      loading,
      expandedReferences,
      onToggleReferences,
      onCompleteTyping,
    },
    ref
  ) => {
    return (
      <div className="relative flex-1 flex justify-center items-stretch">
        <div
          ref={ref}
          className="flex-1 overflow-y-auto p-6 space-y-6 border border-cyan-400/60 rounded-2xl shadow-[0_0_16px_2px_rgba(34,211,238,0.3)]"
          style={{
            boxShadow:
              "0 0 0 1.5px #67e8f9, 0 0 12px 2px #a21caf55, 0 0 32px 8px #06b6d422",
            background: "rgba(12,18,34,0.55)",
            backdropFilter: "blur(2px)",
          }}
        >
          <AnimatePresence>
            {messages.map((msg, idx) => (
              <MessageBubble
                key={idx}
                message={msg}
                messageIndex={idx}
                isLastMessage={idx === messages.length - 1}
                loading={loading}
                expandedReferences={expandedReferences}
                onToggleReferences={onToggleReferences}
                onCompleteTyping={onCompleteTyping}
              />
            ))}
          </AnimatePresence>

          {/* Loading Indicator */}
          {loading && <LoadingIndicator />}
        </div>
      </div>
    );
  }
);

MessagesContainer.displayName = "MessagesContainer";

export default MessagesContainer;

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
      <div ref={ref} className="flex-1 overflow-y-auto p-6 space-y-6">
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
    );
  }
);

MessagesContainer.displayName = "MessagesContainer";

export default MessagesContainer;

import { forwardRef, memo, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import MessageBubble from "./MessageBubble";
import LoadingIndicator from "./LoadingIndicator";
import { useThrottle } from "../../hooks/usePerformance";

const OptimizedMessagesContainer = memo(
  forwardRef(
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
      // Throttle scroll events to improve performance
      const throttledScrollHandler = useThrottle(
        useCallback((e) => {
          // Optional: Add custom scroll handling logic here
          console.log("Scroll event throttled");
        }, []),
        100
      );

      return (
        <div
          ref={ref}
          className="flex-1 overflow-y-auto p-6 space-y-6"
          onScroll={throttledScrollHandler}
          style={{ willChange: "scroll-position" }}
        >
          <AnimatePresence mode="popLayout">
            {messages.map((msg, idx) => (
              <MessageBubble
                key={`${idx}-${msg.role}`}
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
  )
);

OptimizedMessagesContainer.displayName = "OptimizedMessagesContainer";

export default OptimizedMessagesContainer;

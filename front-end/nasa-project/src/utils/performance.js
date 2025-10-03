// Performance monitoring utility for ChatbotPage
export const performanceMonitor = {
  // Track rendering performance
  measureRender: (componentName) => {
    const start = performance.now();

    return () => {
      const end = performance.now();
      const duration = end - start;

      if (duration > 16) {
        // 60fps threshold
        console.warn(
          `${componentName} render took ${duration.toFixed(
            2
          )}ms (>16ms threshold)`
        );
      } else {
        console.log(`${componentName} render: ${duration.toFixed(2)}ms`);
      }
    };
  },

  // Monitor animation frame drops
  monitorAnimationFrames: () => {
    let lastTime = performance.now();
    let frameCount = 0;

    const checkFrame = (currentTime) => {
      const delta = currentTime - lastTime;

      if (delta > 20) {
        // More than 20ms = dropped frame
        console.warn(`Animation frame drop detected: ${delta.toFixed(2)}ms`);
      }

      frameCount++;
      lastTime = currentTime;

      if (frameCount < 1000) {
        // Monitor for 1000 frames
        requestAnimationFrame(checkFrame);
      }
    };

    requestAnimationFrame(checkFrame);
  },

  // Check memory usage (if available)
  checkMemory: () => {
    if (performance.memory) {
      const { usedJSHeapSize, totalJSHeapSize, jsHeapSizeLimit } =
        performance.memory;
      const usagePercent = (usedJSHeapSize / jsHeapSizeLimit) * 100;

      console.log(`Memory usage: ${usagePercent.toFixed(2)}%`);

      if (usagePercent > 80) {
        console.warn("High memory usage detected");
      }
    }
  },
};

// Development only - remove in production
if (process.env.NODE_ENV === "development") {
  // Auto-monitor animation frames on ChatbotPage
  if (window.location.pathname === "/chatbot") {
    performanceMonitor.monitorAnimationFrames();

    // Check memory every 10 seconds
    setInterval(() => {
      performanceMonitor.checkMemory();
    }, 10000);
  }
}

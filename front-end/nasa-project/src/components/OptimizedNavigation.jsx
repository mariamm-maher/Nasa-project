import { memo } from "react";
import NavigationMenu from "./resusableNavigationOptimized";

// Memoized navigation to prevent re-renders during typing
const OptimizedNavigation = memo(() => {
  return <NavigationMenu />;
});

OptimizedNavigation.displayName = "OptimizedNavigation";

export default OptimizedNavigation;

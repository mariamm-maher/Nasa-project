// Example usage of PlanetOrbitNavWithSizeControl component
// This file demonstrates the various ways to use the new size-controlled navigation

import { useState } from "react";
import PlanetOrbitNavWithSizeControl from "./PlanetOrbitNavWithSizeControl";

// Example 1: Using predefined sizes
const ExampleUsage = () => {
  const [isMainNavExpanded, setIsMainNavExpanded] = useState(false);
  const [isCustomNavExpanded, setIsCustomNavExpanded] = useState(true);

  return (
    <div>
      {/* Small size navigation */}
      <PlanetOrbitNavWithSizeControl
        size="small"
        position={{ top: "2rem", left: "2rem" }}
      />

      {/* Controlled navigation with external state */}
      <PlanetOrbitNavWithSizeControl
        size="normal"
        position={{ top: "2rem", right: "2rem" }}
        isExpanded={isMainNavExpanded}
        onExpandedChange={setIsMainNavExpanded}
      />

      {/* Large size navigation */}
      <PlanetOrbitNavWithSizeControl
        size="large"
        position={{ bottom: "2rem", left: "2rem" }}
      />

      {/* Controlled custom navigation that starts expanded */}
      <PlanetOrbitNavWithSizeControl
        size="huge"
        position={{ bottom: "2rem", right: "2rem" }}
        isExpanded={isCustomNavExpanded}
        onExpandedChange={setIsCustomNavExpanded}
      />

      {/* Custom size navigation with specific values */}
      <PlanetOrbitNavWithSizeControl
        size="normal"
        customSunSize={150}
        customOrbitRadius={250}
        customPlanetSize={36}
        position={{ top: "50%", left: "50%" }}
        className="transform -translate-x-1/2 -translate-y-1/2"
      />

      {/* Compact navigation for mobile */}
      <PlanetOrbitNavWithSizeControl
        size="small"
        position={{ top: "1rem", right: "1rem" }}
        className="md:hidden"
      />

      {/* Desktop navigation */}
      <PlanetOrbitNavWithSizeControl
        size="normal"
        position={{ top: "auto", right: "auto" }}
        className="hidden md:block"
      />

      {/* Example controls for controlled navigation */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white p-4 rounded-lg backdrop-blur-sm">
        <button
          onClick={() => setIsMainNavExpanded(!isMainNavExpanded)}
          className="mr-2 px-3 py-1 bg-blue-600 rounded hover:bg-blue-700"
        >
          Toggle Main Nav: {isMainNavExpanded ? "Expanded" : "Collapsed"}
        </button>
        <button
          onClick={() => setIsCustomNavExpanded(!isCustomNavExpanded)}
          className="px-3 py-1 bg-purple-600 rounded hover:bg-purple-700"
        >
          Toggle Custom Nav: {isCustomNavExpanded ? "Expanded" : "Collapsed"}
        </button>
      </div>
    </div>
  );
};

/*
Available Props:

1. size: "small" | "normal" | "large" | "huge"
   - Predefined size configurations

2. customSunSize: number
   - Override the sun/central element size

3. customOrbitRadius: number  
   - Override the base orbit radius for planets

4. customPlanetSize: number
   - Override the planet size

5. position: { top, right, bottom, left }
   - Control positioning (use "auto" for default behavior)

6. className: string
   - Additional CSS classes

7. isExpanded: boolean (optional)
   - Control the expanded state externally (controlled component)
   - If not provided, component manages its own state (uncontrolled)

8. onExpandedChange: (isExpanded: boolean) => void (optional)
   - Callback fired when the expanded state changes
   - Useful for controlled components or tracking state changes

Usage Patterns:

// Uncontrolled (component manages its own state)
<PlanetOrbitNavWithSizeControl size="normal" />

// Controlled (you manage the state)
const [expanded, setExpanded] = useState(false);
<PlanetOrbitNavWithSizeControl 
  size="normal" 
  isExpanded={expanded}
  onExpandedChange={setExpanded}
/>

// Hybrid (listen to changes but let component manage state)
<PlanetOrbitNavWithSizeControl 
  size="normal" 
  onExpandedChange={(expanded) => console.log('Nav expanded:', expanded)}
/>

Size Configurations:
- small: 60px sun, 80px orbit base, 18px planets
- normal: 80px sun, 120px orbit base, 24px planets  
- large: 100px sun, 160px orbit base, 32px planets
- huge: 120px sun, 200px orbit base, 40px planets

The component automatically scales all related elements proportionally
based on the selected size or custom values.
*/

export default ExampleUsage;

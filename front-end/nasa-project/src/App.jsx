import "./App.css";
import { motion } from "framer-motion";
import GalacticBackground from "@/components/GalacticBackground";
import StarField from "@/components/StarField";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import Footer from "@/components/Footer";

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Deep space galactic background */}
      <GalacticBackground />

      {/* Animated starfield overlay */}
      <StarField />

      {/* Page content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative z-10"
      >
        {/* Navigation */}
        <Navigation />

        {/* Main content */}
        <main>
          <HeroSection />
          <FeaturesSection />
        </main>

        {/* Footer */}
        <Footer />
      </motion.div>
    </div>
  );
}

export default App;

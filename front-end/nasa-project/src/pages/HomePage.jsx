import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";

import OptimizedNavigation from "@/components/OptimizedNavigation";

const HomePage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative"
    >
      {/* PlanetOrbitNavWithSizeControl removed, now global in App.jsx */}
      <OptimizedNavigation />
      <HeroSection />
      <FeaturesSection />
    </motion.div>
  );
};

export default HomePage;

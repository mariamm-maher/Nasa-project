import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronDown, Dna, Atom, Telescope, Microscope } from "lucide-react";
import { useState, useEffect } from "react";

// Array of texts for the typing/deleting effect (moved outside component)
const TYPING_TEXTS = [
  "biological experiments in space",
  "microgravity effects on living organisms",
  "astrobiology research data",
  "cellular adaptation studies",
  "genetic responses to space travel",
  "space agriculture innovations",
];

const HeroSection = () => {
  // Typewriter effect state
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  // Typewriter effect with typing and deleting
  useEffect(() => {
    const handleTyping = () => {
      const fullText = TYPING_TEXTS[currentTextIndex];

      if (!isDeleting) {
        // Typing
        setCurrentText(fullText.substring(0, currentText.length + 1));
        setTypingSpeed(150 + Math.random() * 100); // Variable speed for realism

        if (currentText === fullText) {
          setTimeout(() => setIsDeleting(true), 2000); // Pause before deleting
        }
      } else {
        // Deleting
        setCurrentText(fullText.substring(0, currentText.length - 1));
        setTypingSpeed(75); // Faster deleting

        if (currentText === "") {
          setIsDeleting(false);
          setCurrentTextIndex((prev) => (prev + 1) % TYPING_TEXTS.length);
        }
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentTextIndex, typingSpeed]);

  // Simple typewriter for main title
  const [titleText, setTitleText] = useState("");
  const fullTitle = "NASA Space Biology Knowledge Engine";

  useEffect(() => {
    if (titleText.length < fullTitle.length) {
      const timer = setTimeout(() => {
        setTitleText(fullTitle.substring(0, titleText.length + 1));
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [titleText, fullTitle]);
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        duration: 0.8,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Bio Icons */}
        {[Dna, Atom, Telescope, Microscope].map((Icon, i) => (
          <motion.div
            key={i}
            className="absolute text-gray-700/10"
            style={{
              left: `${15 + i * 25}%`,
              top: `${20 + i * 15}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 360],
              opacity: [0.05, 0.15, 0.05],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          >
            <Icon className="w-24 h-24" />
          </motion.div>
        ))}
      </div>
      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-5xl mx-auto"
        >
          {/* Main Heading with Typewriter Effect */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-bold mb-8 text-glow leading-tight"
          >
            <div className="mb-2">
              <span className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                {titleText}
              </span>
              {/* Blinking cursor for title */}
              {titleText.length < fullTitle.length && (
                <motion.span
                  className="text-green-400 ml-1"
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                >
                  |
                </motion.span>
              )}
            </div>
          </motion.h1>

          {/* Subheading with Dynamic Typewriter */}
          <motion.div
            variants={itemVariants}
            className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed min-h-[80px] flex flex-col items-center justify-center"
          >
            <p className="mb-4">
              the power of AI to explore, understand, and analyze
            </p>
            <div className="text-cyan-400 font-semibold">
              <span className="text-white">NASA's </span>
              <span className="relative">
                {currentText}
                <motion.span
                  className="text-cyan-400 ml-1"
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                >
                  |
                </motion.span>
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>{" "}
      {/* Enhanced Floating elements with typewriter-style reveals */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* DNA Particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`dna-${i}`}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 0.6, 0],
              scale: [0, 1, 0],
              y: [0, -100],
              rotate: [0, 360],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              delay: i * 1.5,
              ease: "easeInOut",
            }}
          >
            <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-blue-500 rounded-full" />
          </motion.div>
        ))}

        {/* Bio Symbols appearing like typewriter */}
        {["🧬", "🔬", "🛸", "⚛️", "🌌", "🚀"].map((symbol, i) => (
          <motion.div
            key={`symbol-${i}`}
            className="absolute text-4xl opacity-20"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 2) * 60}%`,
            }}
            initial={{ opacity: 0, scale: 0, rotate: -180 }}
            animate={{
              opacity: [0, 0.2, 0],
              scale: [0, 1, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              delay: 3 + i * 0.8,
              ease: "easeInOut",
            }}
          >
            {symbol}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default HeroSection;

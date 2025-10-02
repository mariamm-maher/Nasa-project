import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MessageCircle, Search, Telescope } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: MessageCircle,
      title: "AI Chatbot",
      description:
        "Ask AI questions about NASA biology experiments and get instant, intelligent responses.",
      gradient: "from-cyan-500 to-blue-500",
      delay: 0.2,
    },
    {
      icon: Search,
      title: "Smart Search",
      description:
        "Find relevant research papers and data with advanced AI-powered search capabilities.",
      gradient: "from-purple-500 to-pink-500",
      delay: 0.4,
    },
    {
      icon: Telescope,
      title: "Knowledge Explorer",
      description:
        "Visualize insights and connections across different space biology studies.",
      gradient: "from-pink-500 to-orange-500",
      delay: 0.6,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.8,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section id="features" className="py-20 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Powerful Features
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Explore the cosmos of knowledge with our cutting-edge AI tools
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={feature.title}
                variants={cardVariants}
                whileHover={{
                  y: -10,
                  transition: { duration: 0.3 },
                }}
                className="group"
              >
                <Card className="h-full card-glow bg-card/50 backdrop-blur-sm border-0 overflow-hidden relative">
                  {/* Gradient overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                  />

                  <CardHeader className="text-center pb-4 relative z-10">
                    <motion.div
                      className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${feature.gradient} p-4 shadow-lg`}
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <IconComponent className="w-full h-full text-white" />
                    </motion.div>
                    <CardTitle className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="text-center relative z-10">
                    <CardDescription className="text-gray-300 text-base leading-relaxed">
                      {feature.description}
                    </CardDescription>

                    {/* Learn more link */}
                    <motion.div
                      className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      whileHover={{ scale: 1.05 }}
                    >
                      <span
                        className={`text-sm font-semibold bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent cursor-pointer hover:underline`}
                      >
                        Learn More →
                      </span>
                    </motion.div>
                  </CardContent>

                  {/* Floating particles effect */}
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        className={`absolute w-1 h-1 bg-gradient-to-r ${feature.gradient} rounded-full opacity-0 group-hover:opacity-60`}
                        style={{
                          left: `${20 + i * 15}%`,
                          top: `${30 + i * 10}%`,
                        }}
                        animate={{
                          y: [0, -20, 0],
                          x: [0, 10, 0],
                          opacity: [0, 0.6, 0],
                        }}
                        transition={{
                          duration: 2 + i * 0.5,
                          repeat: Infinity,
                          delay: i * 0.2,
                        }}
                      />
                    ))}
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Call to action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-300 mb-6">
            Ready to explore the universe of space biology data?
          </p>
          <motion.button
            className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold rounded-lg hover:from-cyan-400 hover:to-purple-400 transition-all duration-300 animate-glow"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Your Journey
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;

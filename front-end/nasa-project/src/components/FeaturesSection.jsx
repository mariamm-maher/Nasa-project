import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  MessageCircle,
  Search,
  BarChart3,
  Dna,
  Atom,
  FlaskConical,
  Microscope,
  Rocket,
  Sparkles,
} from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: MessageCircle,
      title: "AI Bio Chatbot",
      description:
        "Engage with our intelligent AI assistant trained on NASA's space biology database. Get instant answers about microgravity effects, astrobiology, and biological experiments in space.",
      gradient: "from-green-400 via-emerald-500 to-teal-600",
      bgGradient: "from-green-900/20 to-teal-900/20",
      particles: "🧬🔬🌱",
      stats: "10K+ Queries",
      delay: 0.2,
    },
    {
      icon: Search,
      title: "Data Search",
      description:
        "Dive deep into NASA's biological research archives. Search through thousands of experiments, papers, and datasets with advanced AI-powered semantic search.",
      gradient: "from-blue-400 via-indigo-500 to-purple-600",
      bgGradient: "from-blue-900/20 to-purple-900/20",
      particles: "🔍🛸📡",
      stats: "1M+ Documents",
      delay: 0.4,
    },
    {
      icon: BarChart3,
      title: "Bio Graph Insights",
      description:
        "Visualize complex biological relationships and trends in space research. Interactive graphs reveal patterns in organism adaptation, cell behavior, and genetic responses to space.",
      gradient: "from-orange-400 via-red-500 to-pink-600",
      bgGradient: "from-orange-900/20 to-pink-900/20",
      particles: "📊🚀🌌",
      stats: "500+ Visualizations",
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
    <section id="features" className="py-20 relative overflow-hidden">
      {/* Animated DNA Helix Background */}
      <div className="absolute inset-0 opacity-5">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${20 + i * 30}%`,
              top: 0,
              bottom: 0,
            }}
          >
            <Dna className="w-32 h-32 text-green-500" />
          </motion.div>
        ))}
      </div>

      {/* Floating Bio Icons */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[Microscope, FlaskConical, Atom, Rocket].map((Icon, i) => (
          <motion.div
            key={i}
            className="absolute text-gray-700/20"
            style={{
              left: `${10 + i * 25}%`,
              top: `${20 + i * 15}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 360],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          >
            <Icon className="w-16 h-16" />
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              Explore Life Beyond Earth
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Unlock the secrets of space biology with AI-powered tools designed
            for researchers, students, and space enthusiasts
          </p>

          {/* Decorative DNA Strand */}
          <motion.div
            className="flex items-center justify-center gap-2 mt-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
          >
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="w-3 h-3 rounded-full bg-gradient-to-r from-green-400 to-blue-500"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </motion.div>
        </motion.div>{" "}
        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto"
        >
          {features.map((feature) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={feature.title}
                variants={cardVariants}
                whileHover={{
                  y: -15,
                  transition: { duration: 0.3 },
                }}
                className="group"
              >
                <Card className="h-full card-glow bg-gradient-to-br from-gray-900/80 to-gray-950/80 backdrop-blur-xl border border-gray-800/50 overflow-hidden relative">
                  {/* Animated Background Gradient */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                    }}
                  />

                  {/* Glowing Border Effect */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500`}
                  />

                  <CardHeader className="text-center pb-4 relative z-10 pt-8">
                    {/* Icon with Orbital Animation */}
                    <div className="relative mx-auto mb-6 w-20 h-20">
                      {/* Orbit Ring */}
                      <motion.div
                        className={`absolute inset-0 rounded-full border-2 border-dashed opacity-20`}
                        style={{
                          borderColor: feature.gradient.includes("green")
                            ? "#10b981"
                            : feature.gradient.includes("blue")
                            ? "#3b82f6"
                            : "#f97316",
                        }}
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 10,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />

                      {/* Icon Container */}
                      <motion.div
                        className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${feature.gradient} p-4 shadow-2xl relative z-10`}
                        whileHover={{ scale: 1.15, rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <IconComponent className="w-full h-full text-white" />

                        {/* Icon Glow */}
                        <div
                          className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.gradient} blur-lg opacity-50`}
                        />
                      </motion.div>
                    </div>

                    <CardTitle
                      className={`text-2xl font-bold bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300`}
                    >
                      {feature.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="text-center relative z-10 px-6 pb-8">
                    <CardDescription className="text-gray-300 text-base leading-relaxed mb-6">
                      {feature.description}
                    </CardDescription>

                    {/* CTA Button */}
                    <motion.button
                      className={`w-full py-3 rounded-lg bg-gradient-to-r ${feature.gradient} text-white font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg hover:shadow-2xl`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Explore Now →
                    </motion.button>
                  </CardContent>

                  {/* Floating Bio Particles */}
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {[...Array(8)].map((_, i) => (
                      <motion.div
                        key={i}
                        className={`absolute w-2 h-2 rounded-full bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-60`}
                        style={{
                          left: `${10 + i * 12}%`,
                          top: `${20 + (i % 3) * 25}%`,
                        }}
                        animate={{
                          y: [0, -40, 0],
                          x: [0, 15, 0],
                          scale: [1, 1.5, 1],
                          opacity: [0, 0.6, 0],
                        }}
                        transition={{
                          duration: 3 + i * 0.3,
                          repeat: Infinity,
                          delay: i * 0.2,
                        }}
                      />
                    ))}
                  </div>

                  {/* Corner Accent */}
                  <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden opacity-20">
                    <div
                      className={`absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br ${feature.gradient} rounded-full blur-xl`}
                    />
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;

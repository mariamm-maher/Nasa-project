import { motion } from "framer-motion";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  const socialLinks = [
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Mail, href: "#", label: "Email" },
  ];

  return (
    <footer className="relative py-16 border-t border-gray-800/50">
      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center">
          {/* Logo and tagline */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-cyan-400 text-glow mb-2">
              NASA Bio Engine
            </h3>
            <p className="text-gray-400 max-w-md mx-auto">
              Advancing space biology research through the power of artificial
              intelligence
            </p>
          </motion.div>

          {/* Social links */}
          <motion.div
            className="flex justify-center space-x-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {socialLinks.map((social, index) => {
              const IconComponent = social.icon;
              return (
                <motion.a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 bg-gray-800/50 rounded-full flex items-center justify-center text-gray-400 hover:text-cyan-400 hover:bg-cyan-400/10 transition-all duration-300 border border-gray-700 hover:border-cyan-400/50"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  viewport={{ once: true }}
                >
                  <IconComponent className="w-5 h-5" />
                </motion.a>
              );
            })}
          </motion.div>

          {/* Links */}
          <motion.div
            className="flex flex-wrap justify-center gap-6 mb-8 text-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            {[
              "About",
              "Research",
              "Documentation",
              "API",
              "Support",
              "Privacy",
            ].map((link, index) => (
              <motion.a
                key={link}
                href="#"
                className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 relative group"
                whileHover={{ y: -2 }}
              >
                {link}
                <motion.div
                  className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400"
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}
          </motion.div>

          {/* Copyright */}
          <motion.div
            className="border-t border-gray-800/50 pt-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="text-gray-500 text-sm mb-2">
              © 2024 NASA Space Biology Knowledge Engine. All rights reserved.
            </p>
            <p className="text-gray-600 text-xs">
              Built with ❤️ for the advancement of space biology research
            </p>
          </motion.div>

          {/* Decorative elements */}
          <motion.div
            className="mt-8 flex justify-center space-x-4"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
            <div
              className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"
              style={{ animationDelay: "0.5s" }}
            ></div>
            <div
              className="w-2 h-2 bg-pink-400 rounded-full animate-pulse"
              style={{ animationDelay: "1s" }}
            ></div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

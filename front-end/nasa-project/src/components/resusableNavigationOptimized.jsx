import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Home, Orbit, Search, BarChart3, MessageCircle } from "lucide-react";

const navLinks = [
  { label: "Home", to: "/", icon: Home },
  { label: "Source", to: "/sources", icon: Orbit },
  { label: "Semantic Search", to: "/search", icon: Search },
  { label: "Graph", to: "/graph", icon: BarChart3 },
  { label: "Chatbot", to: "/chatbot", icon: MessageCircle },
];

const NavigationMenu = ({ position = "bottom-left" }) => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const posClass =
    position === "top-left"
      ? "fixed top-6 left-6"
      : position === "top-right"
      ? "fixed top-6 right-6"
      : position === "bottom-left"
      ? "fixed bottom-6 left-6"
      : "fixed bottom-6 right-6";

  return (
    <div className={posClass + " z-[100]"} style={{ willChange: "transform" }}>
      {/* Moon Trigger Button */}
      <motion.div
        className="relative cursor-pointer"
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        style={{ willChange: "transform" }}
      >
        {/* Moon Glow */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(180,200,255,0.5) 0%, rgba(120,140,200,0.3) 60%, transparent 90%)",
            width: "130px",
            height: "130px",
            left: "-25px",
            top: "-25px",
            filter: "blur(2px)",
          }}
          animate={{
            scale: open ? [1, 1.12, 1] : [1, 1.06, 1],
            rotate: [0, 360],
          }}
          transition={{
            scale: { duration: 2, repeat: Infinity },
            rotate: { duration: 25, repeat: Infinity, ease: "linear" },
          }}
        />

        {/* Central Moon */}
        <motion.div
          className="w-20 h-20 rounded-full flex items-center justify-center shadow-2xl relative overflow-hidden"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, #e6e9f0 0%, #cfd9df 40%, #aebdca 70%, #6c7a89 100%)",
          }}
          animate={{
            boxShadow: open
              ? "0 0 60px 15px #9ab7ff, 0 0 120px 30px #9ab7ff55"
              : "0 0 30px 8px #9ab7ff, 0 0 60px 15px #9ab7ff44",
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {/* Moon craters */}
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-black/20"
              style={{
                width: `${8 + i * 4}px`,
                height: `${8 + i * 4}px`,
                top: `${20 + i * 6}px`,
                left: `${15 + i * 10}px`,
              }}
              animate={{
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 3 + i,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            />
          ))}
        </motion.div>
      </motion.div>

      {/* Overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="absolute left-20 bottom-20 flex flex-col gap-5 p-8 rounded-3xl bg-[#0B0B1E]/95 border border-blue-400/20 shadow-2xl min-w-[220px]"
            initial={{ opacity: 0, scale: 0.7, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: 40 }}
            transition={{ type: "spring", stiffness: 200, damping: 18 }}
          >
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 px-4 py-2 rounded-xl font-semibold text-lg transition-all duration-200 relative group
                    ${
                      active
                        ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg"
                        : "bg-transparent text-blue-200 hover:text-indigo-400"
                    }
                  `}
                >
                  <Icon className="w-6 h-6 z-10" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NavigationMenu;

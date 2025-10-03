import { motion } from "framer-motion";
import { Search, Telescope, Satellite, Rocket } from "lucide-react";
import { useState } from "react";
import StarField from "../components/StarField";
import GalacticBackground from "@/components/GalacticBackground";

const mockResults = [
  {
    title: "Effects of Microgravity on Plant Growth",
    year: 2022,
    summary: "This study explores how microgravity impacts the cellular structure and growth patterns of Arabidopsis thaliana aboard the ISS.",
    link: "#",
  },
  {
    title: "Spaceflight-Induced Changes in Human Immune Response",
    year: 2021,
    summary: "NASA's bioscience experiment reveals altered immune cell activity in astronauts after long-duration missions.",
    link: "#",
  },
  {
    title: "Astrobiology: Searching for Life on Mars",
    year: 2023,
    summary: "A review of biosignature detection methods and findings from the Perseverance rover's first year on Mars.",
    link: "#",
  },
];

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    // TODO: Replace with real API call
    setTimeout(() => {
      setResults(mockResults);
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0B0B1E] to-[#1B262C] text-white relative overflow-hidden flex flex-col">
      <GalacticBackground />
      <div className="relative z-10 flex flex-col items-center justify-center pt-24 pb-12">
        <motion.h1
          className="text-4xl md:text-6xl font-extrabold text-center mb-4 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-glow"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Explore NASA’s Space Biology Knowledge
        </motion.h1>
        <motion.p
          className="text-lg md:text-2xl text-center mb-10 text-cyan-200/80 max-w-2xl"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Enter a question or keyword to discover insights from 600+ NASA bioscience experiments.
        </motion.p>
        {/* Search Bar */}
        <motion.div
          className="w-full max-w-2xl flex items-center bg-[#181A2A]/80 border-2 border-cyan-400/40 rounded-2xl shadow-xl px-6 py-4 mb-8 backdrop-blur-md focus-within:border-cyan-400/80 transition-all duration-300 relative group"
          whileHover={{ scale: 1.03, boxShadow: "0 0 32px 4px #67e8f9" }}
          whileFocusWithin={{ scale: 1.05, boxShadow: "0 0 48px 8px #a21caf" }}
        >
          <Search className="w-6 h-6 text-cyan-400/80 mr-3" />
          <input
            type="text"
            className="flex-1 bg-transparent text-white placeholder-cyan-300/60 text-xl focus:outline-none"
            placeholder="Search NASA bioscience..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSearch()}
            aria-label="Search NASA bioscience"
            autoFocus
          />
          <motion.button
            onClick={handleSearch}
            disabled={loading || !query.trim()}
            className={`ml-4 px-6 py-2 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg ${
              loading || !query.trim()
                ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-cyan-500 to-purple-500 text-white hover:from-cyan-400 hover:to-purple-600 transform hover:scale-105"
            }`}
            whileHover={!loading && query.trim() ? { scale: 1.08 } : {}}
            whileTap={!loading && query.trim() ? { scale: 0.96 } : {}}
          >
            {loading ? "Searching..." : "Search"}
          </motion.button>
          <span className="absolute -inset-1 rounded-2xl pointer-events-none group-focus-within:shadow-[0_0_32px_8px_#a21caf55] group-hover:shadow-[0_0_24px_4px_#67e8f955] transition-all duration-300" />
        </motion.div>
      </div>
      {/* Results Section */}
      <div className="relative z-10 flex flex-col items-center w-full px-4 pb-24">
        {results.length > 0 && (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.15 } },
            }}
          >
            {results.map((res, idx) => (
              <motion.div
                key={idx}
                className="bg-[#181A2A]/90 border border-cyan-400/20 rounded-2xl p-6 shadow-2xl flex flex-col gap-3 hover:border-cyan-400/60 hover:shadow-cyan-500/20 transition-all duration-300 backdrop-blur-md"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: idx * 0.1 }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Telescope className="w-5 h-5 text-purple-400" />
                  <span className="font-bold text-lg text-cyan-300">{res.title}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-cyan-200/80 mb-1">
                  <Rocket className="w-4 h-4 text-pink-400" />
                  <span>{res.year}</span>
                </div>
                <div className="text-base text-cyan-100/90 mb-2">{res.summary}</div>
                <a
                  href={res.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-auto text-cyan-400 hover:text-pink-400 underline underline-offset-4 transition-colors"
                >
                  View full paper
                </a>
              </motion.div>
            ))}
          </motion.div>
        )}
        {results.length === 0 && !loading && (
          <motion.div
            className="text-center text-cyan-200/60 mt-12 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Start your search to see results from NASA's bioscience experiments.
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;

import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import GalacticBackground from "@/components/GalacticBackground";
import StarField from "@/components/StarField";
import PlanetOrbitNav from "@/components/PlanetOrbitNav";
import Footer from "@/components/Footer";
import HomePage from "@/pages/HomePage";
import ChatbotPage from "@/pages/ChatbotPage";
import SearchPage from "@/pages/SearchPage";
import GraphPage from "@/pages/GraphPage";
import SourcesPage from "@/pages/sources";
import PlanetOrbitNavWithSizeControl from "./components/PlanetOrbitNavWithSizeControl";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
        {/* Deep space galactic background */}
        <GalacticBackground />

        {/* Animated starfield overlay */}
        <StarField />

        {/* Futuristic Planet Orbit Navigation */}
        <PlanetOrbitNav />

        {/* Page content */}
        <div className="relative z-10">
          {/* Main content with routing */}
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/chatbot" element={<ChatbotPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/graph" element={<GraphPage />} />
              <Route path="/sources" element={<SourcesPage />} />
            </Routes>
          </main>

          {/* Footer */}
          {/* <Footer /> */}
        </div>
      </div>
    </Router>
  );
}

export default App;

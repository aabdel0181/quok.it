"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { MetricCounter } from "./MetricCounter";
import { TabsWithDescription } from "./TabsWithDescription";

const words = ["Hosting", "Renting", "Managing"];
const wordCycleTime = 3500;

const HomeView: React.FC = () => {
  const router = useRouter();
  const [wordIndex, setWordIndex] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const [globalGlitch, setGlobalGlitch] = useState(false);

  useEffect(() => {
    // Reveal content after load
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 500);

    // Cycle through words for the carousel effect
    const wordCycleInterval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, wordCycleTime);

    // 🔥 Sync glitch effect for all metrics
    const triggerGlobalGlitch = () => {
      setGlobalGlitch(true);
      setTimeout(() => setGlobalGlitch(false), 1000); // Glitch lasts 1s

      // Schedule next glitch at a random interval (4s-7s)
      setTimeout(triggerGlobalGlitch, Math.random() * 3000 + 4000);
    };

    triggerGlobalGlitch(); // Start glitch cycle

    return () => {
      clearTimeout(timer);
      clearInterval(wordCycleInterval);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center bg-[var(--background)] pt-24 pb-20">
      <div className="full-width-container flex flex-col items-center text-center">
        
        {/* ========== HERO SECTION ========== */}
        <div className="w-full max-w-5xl text-center">
          <h1 className="text-6xl md:text-7xl font-extrabold leading-tight flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="relative flex items-center justify-center min-w-[200px]">
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={wordIndex}
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  exit={{ y: "-100%", opacity: 0 }}
                  transition={{
                    duration: 0.6,
                    ease: "easeInOut",
                  }}
                  className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)]"
                >
                  {words[wordIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
            <span className="text-[var(--foreground)] whitespace-nowrap sm:ml-6 ml-2">
              GPUs?
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-[var(--text-secondary)] mt-6 font-medium">
            The trust layer for decentralized compute
          </p>
        </div>

        {/* ========== CTA BUTTON (LARGE & ANIMATED BORDER) ========== */}
        <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: 0.4 }}
  className="mt-12 flex justify-center"
>
  <div className="relative inline-block group">
    {/* 🔥 The Button */}
    <button
      onClick={() => router.push("/waitlist")}
      className="relative z-10 px-10 py-5 text-xl font-bold 
                 text-[var(--foreground)] bg-[var(--surface)] 
                 rounded-xl shadow-lg transition-all duration-300 
                 hover:scale-105 hover:shadow-2xl"
    >
      Join The Waitlist
    </button>

    {/* 🔥 Animated Themed Glow */}
    <div className="absolute inset-0 rounded-xl border-2 border-transparent animate-glowTrail pointer-events-none"></div>
  </div>
</motion.div>




        {/* ========== METRICS SECTION ========== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 w-full max-w-7xl"
        >
          <div className="bg-[var(--surface)] rounded-xl shadow-lg border border-[var(--border-light)] p-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
              <MetricCounter label="Networks Tracked" metricType="networks" isGlitching={globalGlitch} />
              <MetricCounter label="Total GPUs" metricType="total" isGlitching={globalGlitch} />
              <MetricCounter label="Available GPUs" metricType="available" isGlitching={globalGlitch} />
              <MetricCounter label="Network Utilization" metricType="utilization" isGlitching={globalGlitch} />
            </div>
          </div>
        </motion.div>

        {/* ========== TABS & CALL TO ACTION ========== */}
        <motion.div
          className="w-full flex flex-col items-center pt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="w-full max-w-6xl">
            <TabsWithDescription />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HomeView;

"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { MetricCounter } from "./MetricCounter";
import { TabsWithDescription } from "./TabsWithDescription";
import { CarouselHeader } from "./CarouselHeader";
import Image from "next/image";

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

    // Sync glitch effect for all metrics
    const triggerGlobalGlitch = () => {
      setGlobalGlitch(true);
      setTimeout(() => setGlobalGlitch(false), 1000); // Glitch lasts 1s

      // Schedule next glitch every 3s
      setTimeout(triggerGlobalGlitch, 3000);
    };

    triggerGlobalGlitch(); // Start glitch cycle

    return () => {
      clearTimeout(timer);
      clearInterval(wordCycleInterval);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center bg-[var(--background)] pt-16 pb-16">
      <div className="full-width-container flex flex-col items-center text-center">
        <div className="relative w-[150px] h-[150px] flex justify-center">
          <Image
            src="/logo.png"
            alt="Quok.it Logo"
            fill
            className="object-contain"
            priority
          />
        </div>

        <CarouselHeader />

        {/* ========== CTA BUTTON (LARGE & ANIMATED BORDER) ========== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-8 flex justify-center"
        >
          <div className="relative inline-block group">
            <button
              onClick={() => router.push("/waitlist")}
              className="relative z-10 px-8 py-4 text-lg font-bold 
                        text-[var(--foreground)] bg-[var(--surface)] 
                        rounded-lg shadow-md transition-all duration-300 
                        hover:scale-105 hover:shadow-lg"
            >
              Join The Waitlist
            </button>
            <div className="absolute inset-0 rounded-lg border-2 border-transparent animate-glowTrail pointer-events-none"></div>
          </div>
        </motion.div>

        {/* ========== METRICS SECTION ========== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-8 w-full max-w-5xl"
        >
          <div className="bg-[var(--surface)] rounded-lg shadow-md border border-[var(--border-light)] p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <MetricCounter
                label="Networks Tracked"
                metricType="networks"
                isGlitching={globalGlitch}
              />
              <MetricCounter
                label="Total GPUs"
                metricType="total"
                isGlitching={globalGlitch}
              />
              <MetricCounter
                label="Available GPUs"
                metricType="available"
                isGlitching={globalGlitch}
              />
              <MetricCounter
                label="Network Utilization"
                metricType="utilization"
                isGlitching={globalGlitch}
              />
            </div>
          </div>
        </motion.div>

        {/* ========== TABS & CALL TO ACTION ========== */}
        <motion.div
          className="w-full flex flex-col items-center pt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="w-full max-w-5xl">
            <TabsWithDescription />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HomeView;

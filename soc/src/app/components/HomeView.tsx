"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { MetricCounter } from "./MetricCounter";
import { TabsWithDescription } from "./TabsWithDescription";

const words = ["Hosting", "Renting", "Manage"];
const averageWordLength =
  words.reduce((acc, word) => acc + word.length, 0) / words.length;
const baseWidth = 200; // Base width in pixels
const adjustedWidth = baseWidth + averageWordLength * 16; // Adjust factor as needed

interface HomeViewProps {
  data: any; // Replace 'any' with the appropriate type if known
}

const HomeView: React.FC<HomeViewProps> = ({ data }) => {
  const router = useRouter();
  const [showContent, setShowContent] = useState(false);
  const [globalGlitch, setGlobalGlitch] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 500);
    const interval = setInterval(() => {
      setWordIndex((current) => (current + 1) % words.length);
    }, 2500);

    const glitchInterval = setInterval(() => {
      if (Math.random() > 0) {
        setGlobalGlitch(true);
        setTimeout(() => setGlobalGlitch(false), 500);
      }
    }, 2500);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
      clearInterval(glitchInterval);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[var(--background)] overflow-hidden pt-20">
      <div className="container flex-grow">
        {/* Responsive Header */}
        <div className="mt-8 md:mt-0">
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold metallic-text flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
              <div className="relative flex items-center justify-center">
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={wordIndex}
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -40, opacity: 0 }}
                    transition={{
                      y: { type: "spring", stiffness: 200, damping: 25 },
                      opacity: { duration: 0.3 },
                    }}
                    className="flex items-center justify-center whitespace-nowrap"
                  >
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] whitespace-nowrap leading-relaxed">
                      {words[wordIndex]}
                    </span>
                  </motion.div>
                </AnimatePresence>
              </div>
              <span className="text-[var(--foreground)] whitespace-nowrap">GPUs?</span>
            </div>
          </h1>
        </div>
        {/* Subtitle */}
        <div className="flex flex-col items-center justify-center flex-grow">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-2xl md:text-3xl text-center text-[var(--foreground)] font-semibold mt-6 px-4"
          >
            The trust layer for decentralized compute
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-base md:text-lg text-center text-[var(--text-secondary)] mt-4 px-4"
          >
            Proof of Health, Proof of Hardware
          </motion.p>
        </div>

        {/* Mobile CTA Button */}
        <motion.div
          className="w-full md:hidden mt-8 flex flex-col justify-between"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <button
            onClick={() => router.push("/waitlist")}
            className="w-full py-4 text-lg font-semibold bg-[var(--primary)] text-[var(--foreground)] hover:bg-[var(--primary-dark)] transition-all duration-300 shadow-md"
          >
            Join The Waitlist
          </button>
        </motion.div>

        {/* Metrics Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="hidden md:block w-full mt-8 md:mt-16"
        >
          <div className="bg-[var(--surface)] backdrop-blur-sm border border-[var(--text-secondary)] rounded-2xl p-4 md:p-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
              <MetricCounter label="Networks Tracked" metricType="networks" isGlitching={globalGlitch} />
              <MetricCounter label="Total GPUs" metricType="total" isGlitching={globalGlitch} />
              <MetricCounter label="Available GPUs" metricType="available" isGlitching={globalGlitch} />
              <MetricCounter label="Network Utilization" metricType="utilization" isGlitching={globalGlitch} />
            </div>
          </div>
        </motion.div>

        {/* Tabs Section */}
        <motion.div
          className="w-full flex flex-col items-center pt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="hidden md:block w-full">
            <TabsWithDescription />
          </div>
        </motion.div>

        {/* Desktop CTA Button */}
        <motion.div
          className="hidden md:block w-full mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <div className="container">
            <button
              onClick={() => router.push("/waitlist")}
              className="w-full py-6 text-xl font-semibold bg-[var(--primary)] text-white shadow-md hover:shadow-lg hover:bg-[var(--primary-dark)] transform hover:scale-105 transition-all duration-300"
            >
              Join The Waitlist
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HomeView;

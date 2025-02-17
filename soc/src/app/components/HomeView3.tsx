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
    }, 2500); // Increased from 2500 to 3500 for slower cycling

    // Global glitch effect trigger
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
    <div className="min-h-screen flex flex-col justify-between bg-black overflow-hidden pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-grow">
        {/* Responsive Header */}
        <div className="mt-8 md:mt-0">
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
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
                    <span
                      className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-800 whitespace-nowrap leading-relaxed"
                      style={{
                        lineHeight: "1.3", // Provides space for descenders
                        padding: "0.1em 0", // Extra padding for safety
                      }}
                    >
                      {words[wordIndex]}
                    </span>
                  </motion.div>
                </AnimatePresence>
              </div>
              <span className="text-white whitespace-nowrap">GPUs?</span>
            </div>
          </h1>
        </div>
        {/* Subtitle */}
        <div className="flex flex-col items-center justify-center flex-grow">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-2xl md:text-3xl text-center text-white font-semibold mt-6 px-4"
          >
            The trust layer for decentralized compute
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-base md:text-lg text-center text-gray-400 mt-4 px-4"
          >
            Proof of Health, Proof of Hardware
          </motion.p>
        </div>
        <motion.div
          className="w-full md:hidden mt-8 min-h-screen flex flex-col justify-between"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <button
            onClick={() => router.push("/waitlist")}
            className="w-full py-4 text-lg font-semibold bg-[var(--primary)] text-[var(--foreground)] hover:bg-[var(--primary-dark)] transition-all duration-300"
            >
            Join The Waitlist
          </button>
        </motion.div>
        {/* Metrics Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="hidden md:block w-full max-w-7xl mx-auto mt-8 md:mt-16 px-4"
        >
          <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-4 md:p-10 -mt-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
              {/* Each metric in a responsive grid */}
              <div className="flex flex-col items-center">
                <MetricCounter
                  label={
                    <span className="h-[2.5em] md:h-[2em] flex items-center">
                      Networks Tracked
                    </span>
                  }
                  metricType="networks"
                  isGlitching={globalGlitch}
                />
              </div>
              <MetricCounter
                label={
                  <span className="h-[2.5em] md:h-[2em] flex items-center">
                    Total GPUs
                  </span>
                }
                metricType="total"
                isGlitching={globalGlitch}
              />
              <MetricCounter
                label={
                  <span className="h-[2.5em] md:h-[2em] flex items-center">
                    Available GPUs
                  </span>
                }
                metricType="available"
                isGlitching={globalGlitch}
              />
              <MetricCounter
                label={
                  <span className="h-[2.5em] md:h-[2em] flex items-center">
                    Network Utilization
                  </span>
                }
                metricType="utilization"
                isGlitching={globalGlitch}
              />
            </div>
          </div>
        </motion.div>
        <motion.div
          className="w-full flex flex-col items-center pt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="hidden md:block w-full">
            <TabsWithDescription />
          </div>
          <div className="md:hidden w-full px-4 mt-8 space-y-6">
            <div className="text-left">
              <h3 className="text-xl font-semibold text-red-500">
                For GPU Owners
              </h3>
              <p className="mt-2 text-gray-300">
                Maximize your GPU fleet's potential{" "}
              </p>
            </div>

            <div className="text-left">
              <h3 className="text-xl font-semibold text-red-500">
                For Developers
              </h3>
              <p className="mt-2 text-gray-300">
                Access only the most reliable decentralized GPUs. AWS
                reliability, DePIN pricing.
              </p>
            </div>

            <div className="text-left">
              <h3 className="text-xl font-semibold text-red-500">
                For Compute Networks
              </h3>
              <p className="mt-2 text-gray-300">
                Enhance your network reliability and performance.
              </p>
            </div>
          </div>
        </motion.div>
        <motion.div
          className="hidden md:block w-full mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            {" "}
            {/* Match main container width */}
            <button
              onClick={() => router.push("/waitlist")}
              className="w-full py-6 text-xl font-semibold
              bg-[#cc0000] text-white
              shadow-[0_0_15px_rgba(204,0,0,0.5)]
              hover:shadow-[0_0_30px_rgba(204,0,0,0.8)]
              hover:bg-red-700
              transform hover:scale-105 
              transition-all duration-300"
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

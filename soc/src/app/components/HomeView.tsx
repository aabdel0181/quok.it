"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { MetricCounter } from "./MetricCounter";
import { TabsWithDescription } from "./TabsWithDescription";

interface HomeViewProps {
  data: Array<{
    date: string;
    provider: string;
    capacity_gpu: number;
    available_gpu: number;
    utilization_gpu: number;
    leases: number;
    daily_earnings: number;
    protocol_earnings: number;
  }>;
}
const words = ["Hosting", "Renting", "Manage"];
const averageWordLength =
  words.reduce((acc, word) => acc + word.length, 0) / words.length;
const baseWidth = 200; // Base width in pixels
const adjustedWidth = baseWidth + averageWordLength * 16; // Adjust factor as needed

const HomeView = ({ data }: HomeViewProps) => {
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
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
      <div className="text-center flex flex-col items-center px-4 pt-20 md:pt-24">
        {/* Responsive Header */}
        <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            {/* Carousel container - uses relative sizing */}
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

            {/* Question mark - uses inherited font size */}
            <span className="text-white whitespace-nowrap">GPUs?</span>
          </div>
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto mt-6 px-4"
        >
          Quok.it: The trust layer for decentralized compute
        </motion.p>

        {/* Metrics Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="w-full max-w-7xl mx-auto mt-8 md:mt-16 px-4"
        >
          <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-4 md:p-10 overflow-x-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 min-w-[300px]">
              {/* Responsive metric cards */}
              <div className="flex flex-col items-center p-4">
                <MetricCounter
                  label="Networks Tracked"
                  metricType="networks"
                  isGlitching={globalGlitch}
                />
              </div>
              <div className="flex flex-col items-center p-4">
                <MetricCounter
                  label="Total GPUs"
                  metricType="total"
                  isGlitching={globalGlitch}
                />
              </div>
              <div className="flex flex-col items-center p-4">
                <MetricCounter
                  label="Available GPUs"
                  metricType="available"
                  isGlitching={globalGlitch}
                />
              </div>
              <div className="flex flex-col items-center p-4">
                <MetricCounter
                  label="Network Utilization"
                  metricType="utilization"
                  isGlitching={globalGlitch}
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tabs and Button Section */}
        <motion.div
          className="w-full mt-8 md:mt-16 flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="w-full max-w-7xl px-4">
            <TabsWithDescription />
          </div>

          {/* Full-width button container */}
          <motion.div
            className="w-full bg-[#cc0000] mt-8 md:mt-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <button
              onClick={() => router.push("/app")}
              className="w-full py-6 md:py-8 text-lg md:text-xl font-semibold
                      text-white
                      hover:bg-red-700
                      transition-all duration-300"
            >
              Join The Waitlist
            </button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
export default HomeView;

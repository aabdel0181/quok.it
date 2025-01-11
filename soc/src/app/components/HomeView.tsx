"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Globe } from "./Globe";
import { MetricCounter } from "./MetricCounter";
import { ParticleBackground } from "./ParticleBackground";

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
const words = ["Hosting", "Renting", "Managing"];

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
    }, 2500);

    // Global glitch effect trigger
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.6) {
        setGlobalGlitch(true);
        setTimeout(() => setGlobalGlitch(false), 500);
      }
    }, 2000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
      clearInterval(glitchInterval);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white">
      <div className="flex flex-col h-screen">
        {/* Hero Section */}
        <div className="text-center flex flex-col items-center pt-15">
          {/* Main question */}
          <h1 className="text-6xl font-bold flex items-center justify-center">
            <div className="flex items-center">
              <div className="relative w-[300px] h-[72px] overflow-hidden">
                <motion.div
                  animate={{ y: -wordIndex * 72 }}
                  transition={{
                    duration: 0.8,
                    ease: "easeInOut",
                  }}
                  className="flex flex-col items-end"
                >
                  {words.map((word) => (
                    <span
                      key={word}
                      className="h-[72px] w-full flex items-center justify-end
                                bg-clip-text text-transparent 
                                bg-gradient-to-r from-red-500 to-red-800"
                    >
                      {word}
                    </span>
                  ))}
                </motion.div>
              </div>
              <span className="text-white ml-4 flex-shrink-0">GPUs?</span>
            </div>
          </h1>
          {/* Quok it! text with enhanced metallic effect */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.6, delay: 0.4 }}
            className="relative group mt-6 text-center"
          >
            <span className="text-5xl font-bold inline-block metallic-text transition-transform duration-300">
              Quok it!
            </span>
          </motion.div>
          {/* VARIATIONS BEGIN  */}
          {/* Option 1: Modern Chrome Effect */}
          {/* <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative group mt-6 text-center"
          >
            <span className="text-5xl font-bold inline-block chrome-text cursor-pointer hover:scale-105 transition-transform duration-300">
              Quok it!
            </span>
          </motion.div> */}
          {/* Option 2: Glossy Effect */}
          {/* <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative group mt-6 text-center"
          >
            <span className="text-5xl font-bold inline-block glossy-text cursor-pointer hover:scale-105 transition-transform duration-300">
              Quok it!
            </span>
          </motion.div> */}
          {/* Option 3: Neon Glow */}
          {/* <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative group mt-6 text-center"
          >
            <span className="text-5xl font-bold inline-block neon-text cursor-pointer hover:scale-105 transition-transform duration-300">
              Quok it!
            </span>
          </motion.div> */}
          {/* Laser Outline Trace Effect */}
          {/* <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative group mt-6 text-center"
          >
            <svg
              className="absolute top-0 left-0 w-full h-full"
              width="0"
              height="0"
            >
              <defs>
                <linearGradient
                  id="laser-gradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="rgba(255,255,255,0)" />
                  <stop offset="50%" stopColor="rgba(255,255,255,0.9)" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                </linearGradient>
              </defs>
            </svg>
            <span className="text-5xl font-bold inline-block laser-outline-text cursor-pointer">
              Quok it!
            </span>
          </motion.div> */}

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg text-gray-400 max-w-2xl mx-auto mt-6"
          >
            The intelligent platform for decentralized GPU infrastructure
          </motion.p>
        </div>

        {/* Content Container with Metrics and Globe */}
        <div className="absolute top-[5%] left-0 right-0 bottom-0">
          {/* Metrics Column with Coming Soon Badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="absolute left-16 top-0 z-10"
          >
            {/* Coming Soon Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mb-6 ml-1 inline-flex items-center 
                     text-red-500 text-sm font-medium
                     opacity-80"
            >
              <span className="mr-2 h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
              Coming Soon
            </motion.div>

            {/* Metrics Container */}
            <div className="flex flex-col gap-6 w-72">
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
              <MetricCounter
                label="Daily Revenue"
                metricType="revenue"
                isGlitching={globalGlitch}
              />
            </div>
          </motion.div>

          {/* Globe Container */}
          <div className="absolute inset-0 top-[10%] flex items-center justify-center">
            <Globe data={data} />
          </div>
          {/* Action Buttons */}
          <motion.div
            className="absolute bottom-24 left-0 right-0 z-20 flex justify-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <button
              onClick={() => router.push("/app")}
              className="px-10 py-3 text-xl font-semibold
             bg-[#cc0000] text-white
             rounded-full
             shadow-[0_0_15px_rgba(204,0,0,0.5)]
             hover:shadow-[0_0_30px_rgba(204,0,0,0.8)]
             transform hover:scale-105 
             transition-all duration-300"
            >
              Join Waitlist
            </button>

            <button
              onClick={() => router.push("/learn")}
              className="px-10 py-3 text-xl font-semibold
             border-2 border-[#cc0000] text-[#cc0000]
             rounded-full
             hover:bg-[#cc0000] hover:text-white
             transform hover:scale-105 
             transition-all duration-300"
            >
              Learn More
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
export default HomeView;

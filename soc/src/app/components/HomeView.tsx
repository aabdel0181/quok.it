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

export const HomeView: React.FC<HomeViewProps> = ({ data }) => {
  const router = useRouter();
  const [showContent, setShowContent] = useState(false);
  const [globalGlitch, setGlobalGlitch] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 500);

    // Global glitch effect trigger
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.25) {
        setGlobalGlitch(true);
        setTimeout(() => setGlobalGlitch(false), 500);
      }
    }, 2000);

    return () => {
      clearTimeout(timer);
      clearInterval(glitchInterval);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white">
      <ParticleBackground />

      {/* Main Content */}
      <div className="flex flex-col h-screen">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center pt-2 pb-8"
        >
          <h1 className="text-5xl font-bold mb-2">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-800">
              The State of Compute
            </span>
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg text-gray-400"
          >
            Real-time analytics of decentralized GPU networks
          </motion.p>
        </motion.div>

        {/* Content Container */}
        <div className="flex-1 relative">
          {/* Metrics Column with Coming Soon Badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="absolute left-16 top-[-100px] z-10"
          >
            {/* Coming Soon Badge - More subtle version */}
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
            <div className="flex flex-col gap-4 w-72">
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
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="mt-[-200px]">
              <Globe data={data} />
            </div>
          </div>

          {/* Action Buttons */}
          <motion.div
            className="absolute bottom-40 left-0 right-0 z-20 flex justify-center gap-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <button
              className="px-10 py-3 text-xl font-semibold
                         bg-[#cc0000] text-white
                         rounded-full
                         shadow-[0_0_15px_rgba(204,0,0,0.5)]
                         hover:shadow-[0_0_30px_rgba(204,0,0,0.8)]
                         transform hover:scale-105 
                         transition-all duration-300"
              onClick={() => router.push("/app")}
            >
              Join Waitlist
            </button>

            <button
              className="px-10 py-3 text-xl font-semibold rounded-full
                         border-2 border-[#cc0000] text-[#cc0000]
                         hover:bg-[#cc0000] hover:text-white
                         transform hover:scale-105 
                         transition-all duration-300"
              onClick={() => router.push("/learn")}
            >
              Learn More
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

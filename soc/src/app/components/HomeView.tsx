"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
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

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);
  // Extract metrics from the 'All' provider data
  const allProviderData = data.find((d) => d.provider === "All");
  const totalGPUs = allProviderData ? allProviderData.capacity_gpu : 0;
  const availableGPUs = allProviderData ? allProviderData.available_gpu : 0;
  // Calculate the utilization percentage
  const utilization =
    totalGPUs > 0 ? ((totalGPUs - availableGPUs) / totalGPUs) * 100 : 0;
  const dailyEarnings = allProviderData ? allProviderData.daily_earnings : 0;
  return (
    <div className="relative min-h-screen bg-black text-white">
      <ParticleBackground />

      {/* Metrics Sidebar */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: showContent ? 1 : 0, x: showContent ? 0 : -20 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="fixed left-0 top-0 h-full w-80 bg-black/30 backdrop-blur-sm border-r border-red-900/20 pt-24 px-6 z-20"
      >
        <div className="flex flex-col gap-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2 bg-gradient-to-r from-red-500 to-red-800 bg-clip-text text-transparent">
              Network Stats
            </h2>
            <p className="text-sm text-gray-400">
              Real-time metrics from our GPU network
            </p>
          </div>

          <MetricCounter
            label="Total GPUs"
            value={totalGPUs}
            theme="glass"
            metricType="total"
          />
          <MetricCounter
            label="Available GPUs"
            value={availableGPUs}
            theme="glass"
            metricType="available"
          />
          <MetricCounter
            label="Network Utilization"
            value={utilization}
            suffix="%"
            theme="glass"
            metricType="utilization"
          />
          <MetricCounter
            label="Daily Revenue"
            value={dailyEarnings}
            prefix="$"
            theme="glass"
            metricType="revenue"
          />
        </div>
      </motion.div>

      {/* Main Content Area */}
      <div className="relative ml-80">
        <div className="max-w-[calc(100vw-320px)] mx-auto">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center pt-24 pb-8"
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
              className="text-lg text-gray-400 max-w-2xl mx-auto"
            >
              Real-time analytics of decentralized GPU networks
            </motion.p>
          </motion.div>

          {/* Globe Container */}
          <div
            className="relative flex justify-center items-center"
            style={{ height: "calc(100vh - 200px)" }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <Globe data={data} />
            </div>

            {/* Action Buttons */}
            <motion.div
              className="absolute bottom-16 left-0 right-0 z-20 flex justify-center gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: showContent ? 1 : 0,
                y: showContent ? 0 : 20,
              }}
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
                Enter
              </button>

              <button
                className="px-10 py-3 text-xl font-semibold rounded-full
                           border-2 border-[#cc0000] text-[#cc0000]
                           hover:bg-[#cc0000] hover:text-white
                           transform hover:scale-105 transition-all duration-300"
                onClick={() => router.push("/learn")}
              >
                Learn More
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

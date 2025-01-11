'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Globe } from './Globe';
import { MetricCounter } from './MetricCounter';

import { ParticleBackground } from './ParticleBackground';

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
  const allProviderData = data.find(d => d.provider === 'All');
  const totalGPUs = allProviderData ? allProviderData.capacity_gpu : 0;
  const availableGPUs = allProviderData ? allProviderData.available_gpu : 0;
// Calculate the utilization percentage
  const utilization = totalGPUs > 0 ? ((totalGPUs - availableGPUs) / totalGPUs) * 100 : 0;
  const dailyEarnings = allProviderData ? allProviderData.daily_earnings : 0;
  return (
    <div className="relative min-h-screen bg-black text-white">
      <ParticleBackground />
      
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="container mx-auto px-4 pt-0 pb-4 text-center"
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
      <div className="relative flex-1" style={{ height: 'calc(100vh - 200px)' }}>
        {/* Globe */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Globe data={data} />
        </div>

        {/* <div className="absolute inset-0 flex items-center justify-center">
          <Globe
            data={data}
            globeImageUrl="https://unpkg.com/three-globe@2.37.5/example/img/earth-dark.jpg"
            pointsData={data.map(metric => ({
              lat: metric.location.latitude,
              lng: metric.location.longitude,
              size: 0.5,
              color: '#00cc00' // Default color, you can use a function to determine this
            }))}
            pointAltitude={0.01}
            pointColor="color"
            pointRadius={0.5}
            atmosphereColor="#cc0000"
            atmosphereAltitude={0.15}
            width={900}
            height={900}
            enablePointerInteraction={false}
          />
        </div> */}
        
        {/* Metrics Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: showContent ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="relative z-10 container mx-auto px-4"
        >
         <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <MetricCounter
              label="Total GPUs"
              value={totalGPUs}
              theme="glass"
            />
            <MetricCounter
              label="Available GPUs"
              value={availableGPUs}
              theme="glass"
            />
            <MetricCounter
              label="Utilization"
              value={utilization}
              suffix="%"
              theme="glass"
            />
            <MetricCounter
              label="Daily Earnings"
              value={dailyEarnings}
              theme="glass"
            />
          </div>
      
            </motion.div>
 {/* Action Buttons */}
 <motion.div 
          className="absolute bottom-16 left-0 right-0 z-20 flex justify-center gap-6"
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
            onClick={() => router.push('/app')}
          >
            Enter
          </button>

          <button 
            className="px-10 py-3 text-xl font-semibold rounded-full
                       border-2 border-[#cc0000] text-[#cc0000]
                       hover:bg-[#cc0000] hover:text-white
                       transform hover:scale-105 transition-all duration-300"
            onClick={() => router.push('/learn')}
          >
            Learn More
          </button>
        </motion.div>
      </div>
    </div>
  );
};
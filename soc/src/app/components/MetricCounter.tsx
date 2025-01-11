'use client';

import { motion, animate } from 'framer-motion';
import { useState, useEffect } from 'react';

interface MetricCounterProps {
  label: string;
  value?: number;
  loading?: boolean;
  suffix?: string;
  theme?: string;
}
export const MetricCounter: React.FC<MetricCounterProps> = ({
    label,
    value = 0,
    loading,
    suffix = '',
    theme = 'glass'
  }) => {
    const [displayValue, setDisplayValue] = useState(0);
  
    useEffect(() => {
      const controls = animate(displayValue, value, {
        duration: 1,
        onUpdate: (value) => setDisplayValue(value),
      });
  
      return () => controls.stop();
    }, [value]);
  
    if (loading) {
      return <div className="metric-skeleton animate-pulse" />;
    }
  
    return (
      <motion.div
        whileHover={{ scale: 1.05 }}
        className={`glass-card rounded-lg p-6 ${theme}`} // Use the theme prop
        >
        <h3 className="text-lg text-gray-400 mb-2">{label}</h3>
        <div className="text-3xl font-bold text-primary">
          {Math.round(displayValue)}
          {suffix}
        </div>
      </motion.div>
    );
  };
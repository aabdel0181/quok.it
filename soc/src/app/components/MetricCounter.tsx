"use client";

import { motion, animate } from "framer-motion";
import { useState, useEffect } from "react";
import {
  HiOutlineChip,
  HiOutlineCube,
  HiOutlineChartBar,
  HiOutlineCurrencyDollar,
} from "react-icons/hi";

interface MetricCounterProps {
  label: string;
  value?: number;
  loading?: boolean;
  suffix?: string;
  prefix?: string;
  theme?: string;
  metricType: "total" | "available" | "utilization" | "revenue";
}

export const MetricCounter: React.FC<MetricCounterProps> = ({
  label,
  value = 0,
  loading,
  suffix = "",
  prefix = "",
  theme = "glass",
  metricType,
}) => {
  const [displayValue, setDisplayValue] = useState(0);

  const getIcon = () => {
    const iconClass =
      "w-5 h-5 text-red-500 group-hover:text-red-400 transition-colors duration-300";

    switch (metricType) {
      case "total":
        return <HiOutlineChip className={iconClass} />;
      case "available":
        return <HiOutlineCube className={iconClass} />;
      case "utilization":
        return <HiOutlineChartBar className={iconClass} />;
      case "revenue":
        return <HiOutlineCurrencyDollar className={iconClass} />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="relative p-4 rounded-xl 
                 bg-black/40 backdrop-blur-md
                 border-2 border-red-900/50 hover:border-red-500/70
                 transition-all duration-300
                 shadow-[0_0_20px_rgba(204,0,0,0.15)]
                 hover:shadow-[0_0_30px_rgba(204,0,0,0.3)]
                 before:content-[''] before:absolute before:inset-0 
                 before:rounded-xl before:bg-gradient-to-r 
                 before:from-red-900/10 before:to-transparent 
                 before:opacity-50 before:pointer-events-none
                 group"
    >
      <div className="relative flex items-center gap-3 mb-2">
        {getIcon()}
        <h3 className="text-sm font-medium text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
          {label}
        </h3>
      </div>
      <div
        className="relative text-2xl font-bold bg-gradient-to-r from-red-500 to-red-800 bg-clip-text text-transparent
                      group-hover:from-red-400 group-hover:to-red-700 transition-all duration-300"
      >
        {prefix}
        {Math.round(displayValue).toLocaleString()}
        {suffix}
      </div>

      <div
        className="absolute -inset-[1px] bg-gradient-to-r from-red-900/50 to-transparent 
                      rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-sm"
      />
    </motion.div>
  );
};

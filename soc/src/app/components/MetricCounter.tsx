import {
  HiOutlineChip,
  HiOutlineCube,
  HiOutlineChartBar,
  HiOutlineCurrencyDollar,
} from "react-icons/hi";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface MetricCounterProps {
  label: string;
  metricType: "total" | "available" | "utilization" | "revenue";
  isGlitching: boolean;
}

export const MetricCounter: React.FC<MetricCounterProps> = ({
  label,
  metricType,
  isGlitching,
}) => {
  const [glitchText, setGlitchText] = useState("----");

  // Generate random characters for glitch effect
  const generateGlitchText = () => {
    const chars = "01234567890ABCDEF※#@$";
    return Array(4)
      .fill(0)
      .map(() => chars[Math.floor(Math.random() * chars.length)])
      .join("");
  };

  useEffect(() => {
    if (isGlitching) {
      const glitchInterval = setInterval(() => {
        setGlitchText(generateGlitchText());
      }, 100);

      setTimeout(() => {
        clearInterval(glitchInterval);
        setGlitchText("----");
      }, 500);

      return () => clearInterval(glitchInterval);
    }
  }, [isGlitching]);

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
                 group"
    >
      <div className="relative flex items-center gap-3 mb-2">
        {getIcon()}
        <h3 className="text-sm font-medium text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
          {label}
        </h3>
      </div>

      {/* Glitch text container */}
      <div
        className={`relative font-mono ${
          isGlitching ? "glitch-container" : ""
        }`}
      >
        <div className="text-2xl font-bold">
          {/* Base text */}
          <span className="relative z-10 bg-gradient-to-r from-red-500 to-red-800 bg-clip-text text-transparent">
            {glitchText}
          </span>

          {/* Glitch effects - only visible during glitch */}
          {isGlitching && (
            <>
              <span
                className="glitch-layer absolute inset-0 text-red-500"
                aria-hidden="true"
              >
                {glitchText}
              </span>
              <span
                className="glitch-layer absolute inset-0 text-blue-500"
                aria-hidden="true"
              >
                {glitchText}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Coming Soon Badge */}
      <div
        className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full 
                      shadow-lg animate-pulse"
      >
        Coming Soon
      </div>
    </motion.div>
  );
};

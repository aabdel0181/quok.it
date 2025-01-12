import {
  HiOutlineChip,
  HiOutlineGlobeAlt,
  HiOutlineCube,
  HiOutlineChartBar,
  HiOutlineCurrencyDollar,
} from "react-icons/hi";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface MetricCounterProps {
  label: string;
  metricType: "networks" | "total" | "available" | "utilization" | "revenue";
  isGlitching: boolean;
  className?: string;
}
export const MetricCounter = ({
  label,
  metricType,
  isGlitching,
  className = "",
}: MetricCounterProps) => {
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

  // Update the getIcon function to include the new networks icon
  const getIcon = () => {
    const iconClass =
      "w-12 h-12 text-red-500 group-hover:text-red-400 transition-colors"; // Adjusted size

    switch (metricType) {
      case "networks":
        return <HiOutlineGlobeAlt className={iconClass} />;
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
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className="flex flex-col items-center justify-center">
        <div className="mb-2">{getIcon()}</div>
        <div className="text-base text-gray-400 uppercase tracking-wider font-medium">
          {label}
        </div>
      </div>

      {/* Glitch text container */}
      <div
        className={`relative font-mono mt-3 ${
          isGlitching ? "glitch-container" : ""
        }`}
      >
        <div className="text-3xl font-bold">
          <span className="relative z-10 bg-gradient-to-r from-red-500 to-red-800 bg-clip-text text-transparent">
            {glitchText}
          </span>

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
    </div>
  );
};

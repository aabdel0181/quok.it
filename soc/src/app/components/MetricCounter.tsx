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
  label: string | React.ReactNode;
  metricType: "networks" | "total" | "available" | "utilization" | "revenue";
  isGlitching: boolean;
  className?: string;
}

export const MetricCounter = ({
  label,
  metricType,
  isGlitching,
  className,
}: MetricCounterProps) => {
  const [glitchText, setGlitchText] = useState("----");

  // Generate random characters for glitch effect
  const generateGlitchText = () => {
    const chars = "0123456789ABCDEF#@$%&";
    return Array(4)
      .fill(0)
      .map(() => chars[Math.floor(Math.random() * chars.length)])
      .join("");
  };

  useEffect(() => {
    if (isGlitching) {
      const glitchInterval = setInterval(() => {
        setGlitchText(generateGlitchText());
      }, 80);

      setTimeout(() => {
        clearInterval(glitchInterval);
        setGlitchText("----");
      }, 1000);

      return () => clearInterval(glitchInterval);
    }
  }, [isGlitching]);

  // FIX: Ensure all icons are rendered correctly
  const getIcon = () => {
    const iconClass =
      "w-12 h-12 text-[var(--primary)] group-hover:text-[var(--primary-dark)] transition-colors";

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
    <motion.div
      className={`flex flex-col items-center justify-center ${
        isGlitching ? "glitch-container" : ""
      } ${className}`}
    >
      <div className="flex flex-col items-center justify-center">
        {/* FIX: Ensure icon always renders */}
        <div className="mb-2">{getIcon()}</div>

        <div className="text-sm md:text-base text-[var(--text-secondary)] uppercase tracking-wide font-medium">
          {label}
        </div>
      </div>

      <motion.div className="relative font-mono mt-3 text-3xl font-bold">
        <span className="relative z-10 bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] bg-clip-text text-transparent">
          {glitchText}
        </span>
      </motion.div>
    </motion.div>
  );
};

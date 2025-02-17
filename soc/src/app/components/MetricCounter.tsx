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

  // Icon selector with global color styles
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
      className={`flex flex-col items-center justify-center ${className}`}
      animate={
        isGlitching
          ? {
              x: [0, -2, 2, -1, 1, 0], // Small horizontal shake
              y: [0, -2, 2, -1, 1, 0], // Small vertical shake
              rotate: [0, -0.5, 0.5, -0.3, 0.3, 0], // Tiny rotation for added effect
            }
          : {}
      }
      transition={{
        duration: 0.2,
        repeat: Infinity,
        repeatType: "mirror",
      }}
    >
      <div className="flex flex-col items-center justify-center">
        <div className="mb-2">{getIcon()}</div>
        <div className="text-sm md:text-base text-[var(--text-secondary)] uppercase tracking-wide font-medium">
          {label}
        </div>
      </div>

      {/* Glitch text container */}
      <div className="relative font-mono mt-3 text-3xl font-bold">
        <span className="relative z-10 bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] bg-clip-text text-transparent">
          {glitchText}
        </span>

        {isGlitching && (
          <>
            <motion.span
              className="glitch-layer absolute inset-0 text-[var(--primary)] opacity-75"
              aria-hidden="true"
              animate={{
                x: [-1, 1, -1], // Quick left-right glitch
                opacity: [0.8, 0.5, 0.8], // Flicker effect
              }}
              transition={{ duration: 0.1, repeat: Infinity }}
            >
              {glitchText}
            </motion.span>
            <motion.span
              className="glitch-layer absolute inset-0 text-[var(--primary-dark)] opacity-75"
              aria-hidden="true"
              animate={{
                x: [1, -1, 1], // Opposite direction for second glitch
                opacity: [0.8, 0.5, 0.8],
              }}
              transition={{ duration: 0.1, repeat: Infinity }}
            >
              {glitchText}
            </motion.span>
          </>
        )}
      </div>
    </motion.div>
  );
};

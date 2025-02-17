"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const words = ["Hosting", "Renting", "Manage"];
const wordCycleTime = 3500;

export const CarouselHeader = () => {
  const [wordIndex, setWordIndex] = useState(0);
  const [hasMounted, setHasMounted] = useState(false);

  // Custom spacing per word to balance alignment
  const wordWidths = useMemo(() => {
    return words.map((word) => {
      const baseWidth = 120; // Reduced default width
      const charWidthFactor = word.length * 12; // Scales width dynamically
      const extraPadding = word === "Manage" ? 40 : 20; // Extra space for "Managing"

      return baseWidth + charWidthFactor + extraPadding;
    });
  }, []);

  const currentWidth = wordWidths[wordIndex];

  useEffect(() => {
    setHasMounted(true);

    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, wordCycleTime);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex flex-col items-center text-center">
      {/* === Heading with Dynamic Width === */}
      <h1 className="text-4xl md:text-6xl font-bold leading-tight flex items-center justify-center gap-4">
        {/* === Word Carousel Wrapper === */}
        <div
          className="relative flex items-center justify-center overflow-hidden"
          style={{
            minWidth: `${currentWidth}px`,
            paddingBottom: "0.1em", // Adjusted for better spacing
            height: "1.2em", // Increased height to prevent cut-off
            display: "flex",
            alignItems: "center",
          }}
        >
          {hasMounted && (
            <AnimatePresence mode="wait">
              <motion.span
                key={wordIndex}
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                exit={{ y: "-100%", opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="absolute w-full text-center bg-clip-text text-transparent bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] leading-[1.2em] flex items-center justify-center"
              >
                {words[wordIndex]}
              </motion.span>
            </AnimatePresence>
          )}
        </div>

        {/* === Static "GPUs?" Text - PERFECTLY ALIGNED === */}
        <span className="text-[var(--foreground)] flex items-center">
          GPUs?
        </span>
      </h1>

      {/* Subtitle */}
      <p className="text-lg md:text-lg text-[var(--text-secondary)] mt-3 font-medium">
        The trust layer for decentralized compute
      </p>
    </div>
  );
};

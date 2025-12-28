"use client";

export const dynamic = "force-static";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TextAnimate } from "./ui/text-animate";

// Lyrics array with delay (ms), duration (ms), and animation time (s)
const lyrics = [
  {
    text: "Tune Daara Jo Preet Ka Dora",
    delay: 800,
    duration: 3200,
    anim: 2.5,
  },
  {
    text: "Manava Bairi Raha Na Yeh Mora",
    delay: 600,
    duration: 3500,
    anim: 2.5,
  },
  {
    text: "Badla Na Tha Yeh Qismat Ka Phera",
    delay: 500,
    duration: 3800,
    anim: 2.5,
  },
  {
    text: "Jab Tak Tu Na Tha Tara Mora",
    delay: 600,
    duration: 4000,
    anim: 2.5,
  },
  {
    text: "Mori Ratiyon Se Chhoota Andhera",
    delay: 600,
    duration: 4000,
    anim: 2.5,
  },
  {
    text: "Tune Muskaanon Ko Yun Bikhera",
    delay: 600,
    duration: 4000,
    anim: 2.5,
  },
  {
    text: "Main Tha Bhatka Na Mora Basera",
    delay: 600,
    duration: 4000,
    anim: 2.5,
  },
  {
    text: "Thori Saanson Mein Ghar Hai Mila",
    delay: 600,
    duration: 4000,
    anim: 2.5,
  },
  { text: "Vaaroon Vaaroon", delay: 600, duration: 4000, anim: 2.5 },

  { text: "Main Vaaroon Thori", delay: 600, duration: 4000, anim: 2.5 },

  {
    text: "Ab Na Jag Ki Hai Parvaah Koi",
    delay: 600,
    duration: 4000,
    anim: 2.5,
  },

  { text: "Thaam Le Tu Mori Zindagi", delay: 600, duration: 4000, anim: 2.5 },

  {
    text: "Tohase Badh Ke Na Koi Khushi",
    delay: 600,
    duration: 4000,
    anim: 2.5,
  },

  {
    text: "Vaaroon Vaaroon Main Vaaroon Thori",
    delay: 600,
    duration: 4000,
    anim: 2.5,
  },
];

export default function LyricsScreen({ onComplete }) {
  const [currentLyricIndex, setCurrentLyricIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    if (!isAnimating) return;

    const { delay, duration } = lyrics[currentLyricIndex];

    // Set timeout for next lyric including delay + duration
    const timer = setTimeout(() => {
      if (currentLyricIndex < lyrics.length - 1) {
        setCurrentLyricIndex((prev) => prev + 1);
      } else {
        setIsAnimating(false);
        onComplete?.();
      }
    }, delay + duration);

    return () => clearTimeout(timer);
  }, [currentLyricIndex, isAnimating, onComplete]);

  return (
    <div className="w-full max-w-2xl lg:max-w-3xl flex flex-col items-center justify-center relative">
      <AnimatePresence mode="wait">
        {isAnimating && currentLyricIndex < lyrics.length && (
          <motion.div
            key={currentLyricIndex}
            initial={{ opacity: 0, y: 10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.97 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="text-center"
          >
            <TextAnimate
              by="word"
              duration={lyrics[currentLyricIndex].anim}
              delay={lyrics[currentLyricIndex].delay / 1000} // Convert ms to seconds
              animation="blurInUp"
              className="text-4xl md:text-5xl lg:text-6xl text-foreground drop-shadow-[0_0_8px_rgba(255,255,255,0.4)] text-balance leading-normal"
            >
              {lyrics[currentLyricIndex].text}
            </TextAnimate>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

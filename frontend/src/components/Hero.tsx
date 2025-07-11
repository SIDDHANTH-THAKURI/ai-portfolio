// src/components/Hero.tsx
"use client";

import React from 'react';
import { Scene } from './Scene';
import { motion } from 'framer-motion';

export const Hero = () => {
  const nameVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.5 } },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.7 } },
  };

  return (
    <section id="hero" className="relative w-full h-screen mx-auto">
      <div className="absolute inset-0 z-0 cursor-grab active:cursor-grabbing"><Scene /></div>

      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4 pointer-events-none">
        <motion.h1
          variants={nameVariants}
          initial="hidden"
          animate="visible"
          className="text-5xl md:text-7xl font-bold font-poppins text-white select-none" // <-- select-none class added
        >
          Siddhanth Thakuri
        </motion.h1>
        <motion.h2
          variants={titleVariants}
          initial="hidden"
          animate="visible"
          className="text-2xl md:text-4xl text-gray-300 mt-2 font-normal select-none" // <-- select-none class added
        >
          Software Engineer & AI Developer
        </motion.h2>
      </div>

      <div className="absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center">
        <a href="#about"><div className="w-[35px] h-[64px] rounded-3xl border-4 border-gray-300 flex justify-center items-start p-2"><div className="w-3 h-3 rounded-full bg-gray-300 animate-bounce" /></div></a>
      </div>
    </section>
  );
};
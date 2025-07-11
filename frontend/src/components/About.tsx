// src/components/About.tsx
"use client";

import Image from 'next/image';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faCode, faGraduationCap, faPuzzlePiece, faGuitar, faFutbol } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const InfoCard = ({ icon, title, text }: { icon: any; title: string; text: string; }) => (
  <motion.div variants={itemVariants} className="bg-[#1A1A2E] p-6 rounded-lg text-center h-full">
    <FontAwesomeIcon icon={icon} className="text-4xl text-[#00BFFF] mb-4" />
    <h4 className="text-xl font-bold font-poppins">{title}</h4>
    <p className="text-gray-400">{text}</p>
  </motion.div>
);

export const About = () => {
  return (
    <section id="about" className="container mx-auto px-4 py-24 overflow-hidden">
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={containerVariants}
      >
        <motion.h2 variants={itemVariants} className="text-center text-4xl font-bold font-poppins mb-12">
          About Me
        </motion.h2>

        <div className="grid md:grid-cols-5 gap-10 items-center">
          <motion.div variants={itemVariants} className="md:col-span-2">
            <Image src="/me.jpg" alt="Siddhanth Thakuri" width={500} height={500} className="rounded-lg shadow-2xl"/>
          </motion.div>
          <motion.div variants={itemVariants} className="md:col-span-3">
            <div className="text-lg text-gray-300 space-y-4">
              <p>My journey into technology began unexpectedly during my Aeronautical Engineering studies. A second-year IoT project introduced me to Python, sparking a fascination with how code could solve tangible, real-world problems. This curiosity quickly became a passion.</p>
              <p>I dove into the world of competitive programming on platforms like LeetCode and HackerRank, building a strong foundation in data structures and algorithms that went far beyond my core curriculum. This self-driven path led me to a nearly two-year role as a Software Engineer at Accenture.</p>
              <p>Inspired by the explosive capabilities of modern AI, I chose to specialize further, pursuing a Master's in Computer Science at the University of Wollongong. Now, I'm eager to combine my engineering discipline, professional experience, and AI expertise to build the next generation of intelligent applications.</p>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
          className="mt-20"
        >
          <motion.h3 variants={itemVariants} className="text-center text-3xl font-bold font-poppins mb-10">Beyond the Code</motion.h3>
          <div className="grid md:grid-cols-3 gap-8">
            <InfoCard icon={faPuzzlePiece} title="Problem Solver" text="Actively compete on LeetCode (275+ problems solved) and Clash of Code to continuously sharpen my algorithmic thinking." />
            <InfoCard icon={faGuitar} title="Creative Hobbies" text="Outside of tech, I enjoy the creative outlets of playing guitar and the strategic challenges of solving a Rubik's Cube." />
            <InfoCard icon={faFutbol} title="Active Lifestyle" text="I believe in a balanced life, staying active with interests like football (soccer), table tennis, trekking, and travelling." />
          </div>
        </motion.div>

      </motion.div>
    </section>
  );
};
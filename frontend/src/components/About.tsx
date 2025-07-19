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
  <motion.div
    variants={itemVariants}
    className="glass-card p-6 rounded-2xl text-center h-full shadow-xl border border-white/10 backdrop-blur-md relative overflow-hidden group"
    whileHover={{ scale: 1.05, boxShadow: '0 8px 32px #00BFFF33' }}
    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
  >
    <span className="absolute -top-6 -right-6 w-20 h-20 bg-[#00BFFF22] rounded-full blur-2xl opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
    <motion.div
      className="flex items-center justify-center mb-4"
      whileHover={{ rotate: [0, 15, -15, 0], scale: 1.2 }}
      transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
    >
      <FontAwesomeIcon icon={icon} className="text-4xl text-[#00BFFF] drop-shadow-lg" />
    </motion.div>
    <h4 className="text-xl font-bold font-poppins mb-2 text-white/90">{title}</h4>
    <p className="text-gray-200/90">{text}</p>
  </motion.div>
);

export const About = () => {
  return (
    <motion.section
      id="about"
      className="relative container mx-auto px-4 py-24 overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } } }}
    >
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="w-full h-full animate-stars" />
      </div>
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={containerVariants}
        className="relative z-10"
      >
        <motion.h2 variants={itemVariants} className="text-center text-4xl font-bold font-poppins mb-12">
          About Me
        </motion.h2>
        <motion.div
          className="grid md:grid-cols-5 gap-10 items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut', staggerChildren: 0.15 } } }}
        >
          <motion.div variants={itemVariants} className="md:col-span-2 flex justify-center items-end">
            <div className="relative flex flex-col items-center">
              <div className="bg-white rounded-xl shadow-2xl p-3 pb-6 flex flex-col items-center w-[290px] rotate-[-4deg] hover:rotate-1 transition-transform duration-300">
                <Image src="/me.png" alt="Siddhanth Thakuri" width={240} height={240} className="rounded-lg object-cover" />
                <span className="mt-4 text-base font-semibold text-gray-700 font-poppins">Siddhanth Thakuri</span>
                <span className="text-sm text-gray-400 font-poppins">“Always curious.”</span>
              </div>
            </div>
          </motion.div>
          <motion.div variants={itemVariants} className="md:col-span-3">
            <div className="text-lg text-gray-300 space-y-4">
              <p>My journey into technology began unexpectedly during my Aeronautical Engineering studies. A second-year IoT project introduced me to Python, sparking a fascination with how code could solve tangible, real-world problems. This curiosity quickly became a passion.</p>
              <p>I dove into the world of competitive programming on platforms like LeetCode and HackerRank, building a strong foundation in data structures and algorithms that went far beyond my core curriculum. This self-driven path led me to a nearly two-year role as a Software Engineer at Accenture.</p>
              <p>Inspired by the explosive capabilities of modern AI, I chose to specialize further, pursuing a Master's in Computer Science at the University of Wollongong. Now, I'm eager to combine my engineering discipline, professional experience, and AI expertise to build the next generation of intelligent applications.</p>
            </div>
          </motion.div>
        </motion.div>
        
      </motion.div>
      <style jsx global>{`
        @keyframes stars {
          0% { background-position: 0 0, 0 0, 0 0; }
          100% { background-position: 1000px 500px, 400px 200px, 600px 300px; }
        }
        .animate-stars {
          width: 100%;
          height: 100%;
          background: 
            url('/stars_milky_way.jpg') repeat,
            radial-gradient(ellipse at 20% 30%, #fff3 1px, transparent 40%),
            radial-gradient(ellipse at 80% 70%, #fff2 1.5px, transparent 50%);
          background-size: 1200px 800px, 1000px 600px, 800px 400px;
          animation: stars 60s linear infinite;
          opacity: 0.18;
        }
        .animate-gradient-spin {
          background-size: 200% 200%;
          animation: gradientSpin 8s linear infinite;
        }
        .group-hover\:animate-gradient-spin-hover:hover {
          animation: gradientSpin 2s linear infinite;
        }
        @keyframes gradientSpin {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
        .glass-profile-card {
          background: rgba(26, 26, 46, 0.65);
          box-shadow: 0 8px 32px 0 rgba(0,191,255,0.10);
          border: 1.5px solid rgba(255,255,255,0.10);
          backdrop-filter: blur(14px);
        }
      `}</style>
    </motion.section>
  );
};
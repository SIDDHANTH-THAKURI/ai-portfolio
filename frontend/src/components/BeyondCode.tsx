// src/components/BeyondCode.tsx
"use client";
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPuzzlePiece, faGuitar, faFutbol, faKeyboard } from '@fortawesome/free-solid-svg-icons';
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

const InfoCard = ({ icon, title, text, badge }: { icon: any; title: string; text: string; badge?: string; }) => (
  <motion.div
    variants={itemVariants}
    className="glass-card p-6 rounded-2xl text-center h-full shadow-xl border border-white/10 backdrop-blur-md relative overflow-hidden group"
    whileHover={{ scale: 1.08, boxShadow: '0 8px 32px #00BFFF66', y: -8 }}
    initial={{ opacity: 0, y: 30, rotate: -2 }}
    whileInView={{ opacity: 1, y: 0, rotate: 0 }}
    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
  >
    <span className="absolute -top-6 -right-6 w-20 h-20 bg-[#00BFFF22] rounded-full blur-2xl opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
    {badge && (
      <span className="absolute top-4 left-4 bg-[#00BFFF] text-white text-xs font-bold px-3 py-1 rounded-full shadow-md animate-bounce">{badge}</span>
    )}
    <motion.div
      className="flex items-center justify-center mb-4"
      whileHover={{ rotate: [0, 15, -15, 0], scale: 1.2 }}
      transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
    >
      <FontAwesomeIcon icon={icon} className="text-4xl text-[#00BFFF] drop-shadow-lg group-hover:animate-spin-slow" />
    </motion.div>
    <h4 className="text-xl font-bold font-poppins mb-2 text-white/90">{title}</h4>
    <p className="text-gray-200/90">{text}</p>
  </motion.div>
);

export const BeyondCode = () => {
  return (
    <motion.section
      id="beyond-code"
      className="relative container mx-auto px-4 py-24 overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } } }}
    >
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="w-full h-full animate-gradient-bg" />
      </div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
        className="relative z-10"
      >
        <motion.h3 variants={itemVariants} className="text-center text-3xl font-bold font-poppins mb-10">
          <span className="inline-block mr-2">🚀</span>
          <span className="bg-gradient-to-r from-[#00BFFF] via-[#7F7FD5] to-[#86A8E7] bg-clip-text text-transparent animate-gradient-text">Beyond the Code</span>
        </motion.h3>
        <div className="grid md:grid-cols-4 gap-8">
          <InfoCard icon={faPuzzlePiece} title="Problem Solver" text="Actively compete on LeetCode (275+ problems solved) and Clash of Code to continuously sharpen my algorithmic thinking." />
          <InfoCard icon={faGuitar} title="Creative Hobbies" text="Outside of tech, I enjoy the creative outlets of playing guitar and the strategic challenges of solving a Rubik's Cube." />
          <InfoCard icon={faFutbol} title="Active Lifestyle" text="I believe in a balanced life, staying active with interests like football (soccer), table tennis, trekking, and travelling." />
          <InfoCard icon={faKeyboard} title="Fast Typist" text="I love fast typing and regularly practice to improve my speed and accuracy. It helps me code efficiently and enjoy hackathons even more!" />
        </div>
        {/* Animated Quote */}
        <motion.div
          className="mt-16 flex justify-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <span className="text-xl font-poppins text-center bg-gradient-to-r from-[#00BFFF] via-[#7F7FD5] to-[#86A8E7] bg-clip-text text-transparent animate-gradient-text drop-shadow-lg">
            "Creativity is intelligence having fun."
          </span>
        </motion.div>
      </motion.div>
      <style jsx global>{`
        .glass-card {
          background: rgba(26, 26, 46, 0.55);
          box-shadow: 0 8px 32px 0 rgba(0,191,255,0.10);
          border: 1.5px solid rgba(255,255,255,0.10);
          backdrop-filter: blur(12px);
        }
        .animate-gradient-bg {
          width: 100%;
          height: 100%;
          background: linear-gradient(120deg, #232526 0%, #00BFFF 50%, #232526 100%);
          background-size: 200% 200%;
          animation: gradientMove 12s ease-in-out infinite;
          opacity: 0.18;
        }
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-text {
          background-size: 200% 200%;
          animation: gradientMove 6s ease-in-out infinite;
        }
      `}</style>
    </motion.section>
  );
};

export default BeyondCode; 
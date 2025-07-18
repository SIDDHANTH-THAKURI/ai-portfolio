// src/components/Loader.tsx
"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export const Loader = ({ progress = 0 }: { progress?: number }) => {
  return (
    <AnimatePresence>
      <motion.div
        key="loader"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.5 } }}
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#12121F] transition-opacity duration-700"
      >
        <div className="relative w-32 h-32 flex items-center justify-center mb-8">
          <div className="absolute w-16 h-16 bg-yellow-400 rounded-full blur-2xl animate-pulse" style={{ boxShadow: "0 0 60px 20px #FFD700" }} />
          <div className="absolute w-12 h-12 bg-yellow-300 rounded-full animate-pulse" />
          <div className="absolute w-32 h-32 flex items-center justify-center">
            <div className="absolute w-full h-full animate-spin-slow">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-6 h-6 bg-blue-400 rounded-full shadow-lg border-2 border-white" />
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-red-400 rounded-full shadow-md border-2 border-white" />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-green-400 rounded-full shadow-sm border-2 border-white" />
            </div>
          </div>
        </div>
        <div className="w-64 h-4 bg-[#23243a] rounded-full overflow-hidden shadow-inner mb-4">
          <motion.div
            className="h-full bg-gradient-to-r from-yellow-400 to-blue-400"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ type: "spring", stiffness: 120, damping: 20, duration: 0.4 }}
            style={{ minWidth: 0 }}
          />
        </div>
        <motion.span
          className="text-white text-lg font-poppins tracking-wide text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          Loading... <motion.span key={progress} animate={{}}>{progress}</motion.span>%
        </motion.span>
        <style jsx>{`
          .animate-spin-slow {
            animation: spin 2.5s linear infinite;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </motion.div>
    </AnimatePresence>
  );
};

export default Loader; 
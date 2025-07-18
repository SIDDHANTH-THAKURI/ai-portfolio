// src/components/Loader.tsx
"use client";
import React from "react";

export const Loader = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#12121F] transition-opacity duration-700">
      <div className="relative w-32 h-32 flex items-center justify-center">
        {/* Glowing Sun */}
        <div className="absolute w-16 h-16 bg-yellow-400 rounded-full blur-2xl animate-pulse" style={{ boxShadow: "0 0 60px 20px #FFD700" }} />
        <div className="absolute w-12 h-12 bg-yellow-300 rounded-full animate-pulse" />
        {/* Orbiting Planets */}
        <div className="absolute w-32 h-32 flex items-center justify-center">
          <div className="absolute w-full h-full animate-spin-slow">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-6 h-6 bg-blue-400 rounded-full shadow-lg border-2 border-white" />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-red-400 rounded-full shadow-md border-2 border-white" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-green-400 rounded-full shadow-sm border-2 border-white" />
          </div>
        </div>
      </div>
      {/* Loader Text */}
      <span className="mt-8 text-white text-lg font-poppins tracking-wide animate-bounce text-center">Loading Universe...</span>
      <style jsx>{`
        .animate-spin-slow {
          animation: spin 2.5s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Loader; 
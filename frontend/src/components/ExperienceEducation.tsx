// src/components/ExperienceEducation.tsx
"use client";
import React from "react";
import { motion } from "framer-motion";

const experience = [
  {
    title: "Software Engineer (Full Stack)",
    org: "Accenture, India",
    date: "Aug 2021 – June 2023",
    description:
      "Worked as a full stack developer on .NET, React, Node.js, C#, SQL Server, REST APIs, Python, Azure, and core web technologies (HTML, CSS, JS).",
  },
];

const education = [
  {
    title: "M.S. Computer Science (ML & Big Data)",
    org: "University of Wollongong, Australia",
    date: "2023 – 2025",
  },
  {
    title: "B.Tech Aeronautical Engineering",
    org: "MLR Institute of Technology (JNTUH), India",
    date: "2017 – 2021",
  },
];

export const ExperienceEducation = () => (
  <motion.section
    id="experience-education"
    className="container mx-auto px-4 py-24"
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.2 }}
    variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } } }}
  >
    <h2 className="text-center text-4xl font-bold font-poppins mb-16">Experience & Education</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
      
      <div>
        <h3 className="text-2xl font-semibold font-poppins mb-8 text-[#00BFFF]">Experience</h3>
        <div className="relative">
          <div className="border-l-4 border-[#00BFFF] absolute h-full left-6 top-0 z-0 opacity-30" />
          <ul className="space-y-12 pl-12">
            {experience.map((item, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: idx * 0.1 }}
                className="relative z-10"
              >
                <div className="absolute -left-8 top-2 w-6 h-6 rounded-full bg-gradient-to-tr from-[#00BFFF] to-[#7F7FD5] border-4 border-white shadow-lg" />
                <div className="bg-[#18182F] rounded-xl shadow-lg p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 gap-2 sm:gap-8">
                    <span className="text-lg font-semibold text-white font-poppins">
                      {item.title}
                    </span>
                    <span className="text-sm text-[#00BFFF] font-medium font-poppins mt-1 sm:mt-0">
                      {item.date}
                    </span>
                  </div>
                  <span className="block text-gray-300 font-poppins text-base mb-1">
                    {item.org}
                  </span>
                  {item.description && (
                    <span className="block text-gray-400 text-sm mt-2">{item.description}</span>
                  )}
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
      
      <div>
        <h3 className="text-2xl font-semibold font-poppins mb-8 text-[#00BFFF]">Education</h3>
        <div className="relative">
          <div className="border-l-4 border-[#00BFFF] absolute h-full left-6 top-0 z-0 opacity-30" />
          <ul className="space-y-12 pl-12">
            {education.map((item, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: idx * 0.1 }}
                className="relative z-10"
              >
                <div className="absolute -left-8 top-2 w-6 h-6 rounded-full bg-gradient-to-tr from-[#00BFFF] to-[#7F7FD5] border-4 border-white shadow-lg" />
                <div className="bg-[#18182F] rounded-xl shadow-lg p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                    <span className="text-lg font-semibold text-white font-poppins">
                      {item.title}
                    </span>
                    <span className="text-sm text-[#00BFFF] font-medium font-poppins mt-1 sm:mt-0">
                      {item.date}
                    </span>
                  </div>
                  <span className="block text-gray-300 font-poppins text-base mb-1">
                    {item.org}
                  </span>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </motion.section>
);

export default ExperienceEducation; 
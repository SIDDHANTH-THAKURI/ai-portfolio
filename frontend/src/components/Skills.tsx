// src/components/Skills.tsx
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import * as d3 from 'd3-force';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPython, faReact, faNodeJs, faJs, faHtml5, faCss3Alt, faGitAlt, faDocker, faAws, faTypo3 } from '@fortawesome/free-brands-svg-icons';
import { faDatabase, faRobot, faCogs, faCloud, faServer, faLock, faCode } from '@fortawesome/free-solid-svg-icons';

const skills = [
  // Core & AI
  { id: 'Python' }, { id: 'AI/ML' }, { id: 'LLMs' }, { id: 'Deep Learning' },
  { id: 'PyTorch' }, { id: 'Scikit-learn' }, { id: 'Pandas' }, { id: 'TypeScript' },
  
  // Web Stack
  { id: 'React' }, { id: 'Next.js' }, { id: 'Node.js' }, { id: 'Express.js' },
  { id: 'FastAPI' }, { id: 'HTML/CSS' }, { id: 'JavaScript' },
  
  // Databases & DevOps
  { id: 'MongoDB' }, { id: 'MySQL' }, { id: 'SQL Server' }, { id: 'Azure' },
  { id: 'Docker' }, { id: 'Git/GitHub' }, { id: 'CI/CD' }, { id: 'REST APIs' },
  
  // Game Dev & Other
  { id: 'Unity' }, { id: 'C#' }, { id: 'Security' }, { id: 'PHP' },
].map(skill => ({ ...skill, x: 0, y: 0 })); 

const skillCategories = [
  {
    name: 'Programming Languages',
    skills: [
      { id: 'Python', icon: faPython },
      { id: 'TypeScript', icon: 'typescript' },
      { id: 'JavaScript', icon: faJs },
      { id: 'C', icon: faCode },
    ],
  },
  {
    name: 'AI/ML & Data Science',
    skills: [
      { id: 'AI/ML', icon: faRobot },
      { id: 'LLMs', icon: faRobot },
      { id: 'Deep Learning', icon: faRobot },
      { id: 'NLP', icon: faRobot },
      { id: 'RAG', icon: faRobot },
      { id: 'Computer Vision', icon: faRobot },
    ],
  },
  {
    name: 'Web & App Development',
    skills: [
      { id: 'React', icon: faReact },
      { id: 'Next.js', icon: faReact },
      { id: 'Node.js', icon: faNodeJs },
      { id: 'Express.js', icon: faNodeJs },
      { id: 'FastAPI', icon: faServer },
      { id: 'HTML/CSS', icon: faHtml5 },
      { id: '.NET', icon: faCode },
      { id: 'PHP', icon: faCode },
      { id: 'Unity', icon: faCogs },
    ],
  },
  {
    name: 'Databases & Cloud',
    skills: [
      { id: 'Supabase', icon: faDatabase },
      { id: 'MongoDB', icon: faDatabase },
      { id: 'MySQL', icon: faDatabase },
      { id: 'SQL Server', icon: faDatabase },
      { id: 'Azure', icon: faCloud },
    ],
  },
  {
    name: 'DevOps & Tools',
    skills: [
      { id: 'Docker', icon: faDocker },
      { id: 'Git/GitHub', icon: faGitAlt },
      { id: 'CI/CD', icon: faCogs },
      { id: 'REST APIs', icon: faServer },
      { id: 'Cursor', icon: faCode },
    ],
  },
  {
    name: 'Security & Other',
    skills: [
      { id: 'Security', icon: faLock },
    ],
  },
];

export const Skills = () => {
  return (
    <motion.section
      id="skills"
      className="py-24 overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } } }}
    >
      <div className="container mx-auto px-4">
        <h2 className="text-center text-4xl font-bold font-poppins mb-16">
          Technical Skills
        </h2>
        <div className="grid md:grid-cols-2 gap-12">
          {skillCategories.map((cat) => (
            <div key={cat.name}>
              <h3 className="text-2xl font-semibold font-poppins mb-6 text-[#00BFFF]">{cat.name}</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                {cat.skills.map((skill, i) => (
                  <motion.div
                    key={skill.id}
                    className="glass-skill-card flex flex-col items-center justify-center p-6 rounded-2xl shadow-lg border border-white/10 backdrop-blur-md transition-transform relative group"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.08, boxShadow: '0 8px 32px #00BFFF33' }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 18, delay: i * 0.05 }}
                  >
                    <span className="absolute -top-4 -right-4 w-12 h-12 bg-[#00BFFF22] rounded-full blur-2xl opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                    {skill.icon === 'typescript' ? (
                      <span className="mb-3 flex items-center justify-center" style={{ height: 32 }}>
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
                          <rect width="32" height="32" rx="6" fill="#3178C6" />
                          <path d="M19.5 23.5V21.9c0-.2.1-.3.3-.3.1 0 .2 0 .3.1.4.3.8.5 1.3.5.5 0 .8-.2.8-.5 0-.2-.1-.4-.6-.6l-.8-.3c-1.1-.4-1.6-1-1.6-2 0-1.2 1-2 2.4-2 .7 0 1.4.2 2 .6.1.1.2.2.2.3v1.5c0 .2-.1.3-.3.3-.1 0-.2 0-.3-.1-.3-.2-.7-.4-1.2-.4-.5 0-.7.2-.7.4 0 .2.1.3.7.5l.7.3c1.2.4 1.7 1 1.7 2.1 0 1.3-1 2.1-2.5 2.1-.8 0-1.6-.2-2.2-.7-.1-.1-.2-.2-.2-.3zm-7.2-5.7c0-.2.1-.3.3-.3h2.2c.2 0 .3.1.3.3v7.2c0 .2-.1.3-.3.3h-2.2c-.2 0-.3-.1-.3-.3v-7.2z" fill="#fff"/>
                        </svg>
                      </span>
                    ) : (
                      typeof skill.icon !== 'string' && (
                        <FontAwesomeIcon icon={skill.icon} className="text-3xl text-[#00BFFF] mb-3 drop-shadow-lg group-hover:animate-spin-slow" />
                      )
                    )}
                    <span className="text-base font-medium text-white/90 text-center">{skill.id}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <style jsx global>{`
        .glass-skill-card {
          background: rgba(26, 26, 46, 0.55);
          box-shadow: 0 8px 32px 0 rgba(0,191,255,0.10);
          border: 1.5px solid rgba(255,255,255,0.10);
          backdrop-filter: blur(12px);
        }
        .animate-spin-slow {
          animation: spin 2.5s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </motion.section>
  );
};
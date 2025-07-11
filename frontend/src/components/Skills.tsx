// src/components/Skills.tsx
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import * as d3 from 'd3-force';

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

export const Skills = () => {
  const [nodes, setNodes] = useState(skills);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { damping: 25, stiffness: 200 });
  const smoothMouseY = useSpring(mouseY, { damping: 25, stiffness: 200 });
  const spotlight = useMotionTemplate`radial-gradient(circle at ${smoothMouseX}px ${smoothMouseY}px, rgba(0, 191, 255, 0.1), transparent 35%)`;

  useEffect(() => {
    if (!containerRef.current) return;
    const { width, height } = containerRef.current.getBoundingClientRect();

    const initialNodes = skills.map(node => ({ ...node, x: width / 2, y: height / 2 }));

    const simulation = d3.forceSimulation(initialNodes)
      .force('center', d3.forceCenter(width / 2, height / 2).strength(0.01))
      .force('charge', d3.forceManyBody().strength(5))
      .force('collide', d3.forceCollide(55)) 
      .on('tick', () => {
        setNodes([...initialNodes]);
      });

    return () => {
        simulation.stop();
        };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!containerRef.current) return;
    const { left, top } = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  return (
    <section id="skills" className="py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-4xl font-bold font-poppins mb-16">
          Technical Skills
        </h2>
        <motion.div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          style={{ background: spotlight }}
          className="relative w-full h-[600px] bg-[#161625] rounded-2xl"
        >
          {nodes.map((node) => (
            <motion.div
              key={node.id}
              className="absolute bg-[#1A1A2E] text-white rounded-full flex items-center justify-center text-sm font-medium cursor-pointer"
              style={{
                width: 100, height: 100,
                left: -50, top: 0,
              }}
              initial={{ x: "50%", y: "50%" }} 
              animate={{ x: node.x, y: node.y }} 
              whileHover={{ scale: 1.15, zIndex: 10, color: '#00BFFF' }}
              transition={{ type: 'spring', stiffness: 100, damping: 15 }}
            >
              <motion.span
                 animate={{ y: [0, -5, 0] }}
                 transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
              >
                {node.id}
              </motion.span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
// src/components/ProjectCard.tsx
"use client";

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

type ProjectProps = { project: any };

export const ProjectCard = ({ project }: ProjectProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['7.5deg', '-7.5deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-7.5deg', '7.5deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const mouseX = e.clientX - left;
    const mouseY = e.clientY - top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className="relative h-full w-full rounded-xl bg-[#161625] shadow-2xl flex flex-col"
    >
      <div style={{ transform: 'translateZ(0px)', transformStyle: 'preserve-3d' }} className="relative w-full h-60 rounded-t-xl overflow-hidden">
        <Image src={project.image} alt={project.title} layout="fill" objectFit="cover" />
      </div>
      <div style={{ transform: 'translateZ(30px)', transformStyle: 'preserve-3d' }} className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold font-poppins mb-2">{project.title}</h3>
        <p className="text-gray-400 text-sm mb-4">{project.description}</p>
        
        <div className="flex-grow" />
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.map((t: string) => <span key={t} className="bg-[#1A1A2E] text-xs py-1 px-3 rounded-full">{t}</span>)}
        </div>
        <div>
          <a href={project.liveUrl} target="_blank" className="mr-4 font-semibold text-[#00BFFF] hover:underline">Live Demo &rarr;</a>
          <a href={project.codeUrl} target="_blank" className="font-semibold text-[#00BFFF] hover:underline">View Code &rarr;</a>
        </div>
      </div>
    </motion.div>
  );
};
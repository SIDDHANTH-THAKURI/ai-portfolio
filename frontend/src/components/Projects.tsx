// src/components/Projects.tsx
"use client";
import React from 'react';
import { ProjectCard } from './ProjectCard';
import { motion } from 'framer-motion';

const projectData = [
  { 
    id: 'medmatch', 
    title: 'MedMatch - Secure Health Platform', 
    image: '/medmatch.jpeg',
    description: 'A full-stack clinical decision support system featuring an LLM-powered assistant to help doctors analyze drug interactions.', // <-- EDITED: More concise description
    tech: ['React', 'Node.js', 'FastAPI', 'MongoDB', 'LLM'], 
    liveUrl: 'https://medmatch-frontend.onrender.com/', 
    codeUrl: 'https://github.com/Team-DDI-CSIT998/Personalised_DDI_Checker' 
  },
  { 
    id: 'travelmate', 
    title: 'TravelMate - Microservices App', 
    image: '/travel.jpeg',
    description: 'A distributed travel booking platform with a microservices architecture for user authentication, bookings, and payments.', 
    tech: ['React', 'Node.js', 'Express.js', 'MySQL', 'Docker'], 
    liveUrl: 'https://github.com/SIDDHANTH-THAKURI/travelMate_Website', 
    codeUrl: 'https://github.com/SIDDHANTH-THAKURI/travelMate_Website' 
  },
  { 
    id: 'escapevelocity', 
    title: 'Escape Velocity - 3D Platformer Game', 
    image: '/game.png',
    description: 'A thrilling 3D platformer game inspired by Takeshi\'s Castle, built with Unity. Features multiple difficulty modes and cross-platform controls.', 
    tech: ['Unity', 'C#', '3D Modeling', 'Game Development'], 
    liveUrl: 'https://team-aero.itch.io/escape-velocity',
    codeUrl: 'https://team-aero.itch.io/escape-velocity'  
  }
];

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export const Projects = () => {
  return (
    <motion.section
      id="projects"
      className="container mx-auto px-4 py-24 overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } } }}
    >
      <motion.h2 
        initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={cardVariants}
        className="text-center text-4xl font-bold font-poppins mb-12"
      >
        Featured Projects
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10" style={{ perspective: '1000px' }}>
        {projectData.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </motion.section>
  );
};
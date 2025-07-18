// src/components/Earth.tsx
"use client";

import React, { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useTexture, Sphere, Html } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faCode } from '@fortawesome/free-solid-svg-icons';

export const Earth = () => {
  const groupRef = useRef<THREE.Group>(null!);
  const earthRef = useRef<THREE.Mesh>(null!);
  const moonRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);
  const [interactionState, setInteractionState] = useState('initial');
  const [earthTexture, moonTexture] = useTexture(['/earth.jpg', '/moon.jpg']);

  useEffect(() => {
    const timer = setTimeout(() => {
      setInteractionState('prompt');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useFrame(({ clock }) => {
    if (groupRef.current && moonRef.current && earthRef.current) {
      const earthOrbitAngle = clock.getElapsedTime() * 0.25;
      const earthDistance = 12;
      groupRef.current.position.x = Math.cos(earthOrbitAngle) * earthDistance;
      groupRef.current.position.z = -Math.sin(earthOrbitAngle) * earthDistance;
      earthRef.current.rotation.y += 0.05;

      const moonOrbitAngle = clock.getElapsedTime() * 1.5;
      const moonDistance = 1.8;
      moonRef.current.position.x = Math.cos(moonOrbitAngle) * moonDistance;
      moonRef.current.position.z = -Math.sin(moonOrbitAngle) * moonDistance;
      // Tidal locking: rotate the moon so the same side always faces the Earth
      moonRef.current.rotation.y = moonOrbitAngle;
    }
  });

  const handleClick = () => {
    setInteractionState(prevState => (prevState === 'links' ? 'prompt' : 'links'));
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: (i: number = 0) => ({
      opacity: 1,
      scale: 1,
      transition: { delay: i * 0.15 },
    }),
    exit: { opacity: 0, scale: 0.5, transition: { duration: 0.2 } }
  };

  const links = [
    { name: 'LinkedIn', icon: faLinkedin, url: 'https://linkedin.com/in/siddhanththakuri', position: [-3, 1, 0] as const, custom: 0 },
    { name: 'GitHub', icon: faGithub, url: 'https://github.com/SIDDHANTH-THAKURI', position: [0, 3, 0] as const, custom: 1 },
    { name: 'LeetCode', icon: faCode, url: 'https://leetcode.com/u/siddhanththakuri/', position: [3, 1, 0] as const, custom: 2 },
  ];

  return (
    <group ref={groupRef}>
      <Sphere ref={earthRef} args={[1, 32, 32]} onClick={handleClick} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
        <meshStandardMaterial map={earthTexture} emissive={hovered ? '#00BFFF' : '#000000'} emissiveIntensity={hovered ? 0.5 : 0} />
      </Sphere>
      <Sphere ref={moonRef} args={[0.27, 32, 32]}><meshStandardMaterial map={moonTexture} /></Sphere>
      
      <AnimatePresence>
        {interactionState === 'prompt' && (
          <Html position={[0, 1.8, 0]} center>
            <motion.div variants={itemVariants} initial="hidden" animate="visible" exit="exit" className="bg-black/60 text-white text-xs p-1 px-2 rounded-md whitespace-nowrap select-none">
              Click Me!
            </motion.div>
          </Html>
        )}

        {interactionState === 'links' && links.map(link => (
          <Html key={link.name} position={link.position} center>
            <motion.a href={link.url} target="_blank" rel="noopener noreferrer" variants={itemVariants} initial="hidden" animate="visible" exit="exit" custom={link.custom} className="bg-[#1A1A2E]/80 backdrop-blur-sm p-3 rounded-lg flex items-center gap-2 text-white no-underline transform transition-transform hover:scale-110">
              <FontAwesomeIcon icon={link.icon} className="w-5 h-5" />
              <span className="text-sm font-poppins">{link.name}</span>
            </motion.a>
          </Html>
        ))}
      </AnimatePresence>
    </group>
  );
};
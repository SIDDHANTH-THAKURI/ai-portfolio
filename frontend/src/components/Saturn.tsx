// src/components/Saturn.tsx
"use client";

import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useTexture, Sphere, Ring } from '@react-three/drei';

export const Saturn = () => {
  const groupRef = useRef<THREE.Group>(null!);
  const [saturnTexture, ringTexture] = useTexture(['/saturn.jpg', '/saturn_ring.jpg']);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      const angle = clock.getElapsedTime() * 0.08;
      const distance = 35;
      groupRef.current.position.x = -Math.cos(angle) * distance;
      groupRef.current.position.z = Math.sin(angle) * distance;

      groupRef.current.rotation.y += 0.02;
      groupRef.current.rotation.z = 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      <Sphere args={[2, 32, 32]}>
        <meshStandardMaterial map={saturnTexture} />
      </Sphere>
      <Ring args={[3, 4.5, 64]} rotation-x={Math.PI / 2} >
        <meshBasicMaterial map={ringTexture} side={THREE.DoubleSide} transparent={true} opacity={1} />
      </Ring>
    </group>
  );
};
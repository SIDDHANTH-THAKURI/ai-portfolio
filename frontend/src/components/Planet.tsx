// src/components/Planet.tsx
"use client";

import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useTexture, Sphere, Ring } from '@react-three/drei';

// Define the props our component will accept
type PlanetProps = {
  textureUrl: string;
  size: number;
  distance: number;
  speed: number;
};

export const Planet = ({ textureUrl, size, distance, speed }: PlanetProps) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [texture] = useTexture([textureUrl]);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const elapsedTime = clock.getElapsedTime();
      const angle = elapsedTime * speed;
      const x = Math.cos(angle) * distance;
      const z = Math.sin(angle) * distance;
      meshRef.current.position.set(-x, 0, z);

      meshRef.current.rotation.y += 0.05;
    }
  });

  return (
    <group>
      <Ring args={[distance - 0.05, distance + 0.05, 128]} rotation-x={-Math.PI / 2}>
        <meshBasicMaterial color="#333" side={THREE.DoubleSide} />
      </Ring>

      <Sphere ref={meshRef} args={[size, 32, 32]}>
        <meshStandardMaterial map={texture} />
      </Sphere>
    </group>
  );
};
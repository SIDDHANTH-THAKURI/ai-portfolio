// src/components/Planet.tsx
"use client";

import React, { useRef, useState } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useTexture, Sphere, Ring } from '@react-three/drei';

// Define the props our component will accept
type PlanetProps = {
  textureUrl: string;
  size: number;
  distance: number;
  speed: number;
  onClick?: () => void;
};

export const Planet = ({ textureUrl, size, distance, speed, onClick }: PlanetProps) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [texture] = useTexture([textureUrl]);
  const [hovered, setHovered] = useState(false);

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

      <Sphere
        ref={meshRef}
        args={[size, 32, 32]}
        onClick={onClick}
        onPointerOver={onClick ? () => setHovered(true) : undefined}
        onPointerOut={onClick ? () => setHovered(false) : undefined}
        scale={hovered && onClick ? 1.12 : 1}
      >
        <meshStandardMaterial
          map={texture}
          emissive={onClick && hovered ? '#00BFFF' : '#000000'}
          emissiveIntensity={onClick && hovered ? 0.5 : 0}
        />
      </Sphere>
    </group>
  );
};
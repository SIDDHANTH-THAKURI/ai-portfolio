// src/components/MilkyWay.tsx
"use client";

import * as THREE from 'three';
import { useTexture, Sphere } from '@react-three/drei';

export const MilkyWay = () => {
  const texture = useTexture('/stars_milky_way.jpg');

  return (
    <Sphere args={[500, 60, 40]}>
      <meshBasicMaterial map={texture} side={THREE.BackSide} />
    </Sphere>
  );
};
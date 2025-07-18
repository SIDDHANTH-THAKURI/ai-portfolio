// src/components/AsteroidBelt.tsx
"use client";

import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Instances, Instance, Icosahedron } from '@react-three/drei';

export const AsteroidBelt = () => {
  const groupRef = useRef<THREE.Group>(null!);

  const count = 2000;
  const innerRadius = 20;
  const outerRadius = 23;

  const asteroidData = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = innerRadius + Math.random() * (outerRadius - innerRadius);
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = (Math.random() - 0.5) * 0.5; // Give the belt some thickness

      const scale = 0.3 + Math.random() * 0.4;

      temp.push({ position: [x, y, z], scale });
    }
    return temp;
  }, []);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <Instances limit={count}>
        <icosahedronGeometry args={[0.1, 0]} />
        <meshStandardMaterial color="#888888" roughness={0.5} />

        {asteroidData.map((data, i) => (
          <Instance key={i} position={data.position as [number, number, number]} scale={data.scale} />
        ))}
      </Instances>
    </group>
  );
};
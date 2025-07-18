// src/components/Scene.tsx
"use client";
import { useRef } from 'react';
import { useFrame, Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { OrbitControls, Stars, Sphere, Ring, useTexture } from '@react-three/drei';
import { Planet } from './Planet';
import { Saturn } from './Saturn';
import { Earth } from './Earth';
import { MilkyWay } from './MilkyWay';
import { AsteroidBelt } from './AsteroidBelt'; // <-- Import the new component

const Sun = () => {
  const sunRef = useRef<THREE.Mesh>(null!);
  const sunTexture = useTexture('/sun.jpg');

  useFrame((state, delta) => {
    sunRef.current.rotation.y += delta * 0.1;
  });

  return (
    <Sphere ref={sunRef} args={[2.5, 32, 32]}>
      <meshBasicMaterial map={sunTexture} toneMapped={false} />
    </Sphere>
  );
};

export const Scene = ({ onJupiterClick }: { onJupiterClick?: () => void }) => {
  return (
    <Canvas camera={{ position: [0, 20, 70], fov: 45 }}>
      <color args={['#12121F']} attach="background" />

      <ambientLight intensity={0.1} />
      <pointLight position={[0, 0, 0]} intensity={1000} color="#FFDAB9" />
      <Stars radius={400} depth={50} count={20000} factor={7} saturation={0} fade speed={1} />
      <MilkyWay />

      <Ring args={[5 - 0.05, 5 + 0.05, 128]} rotation-x={-Math.PI / 2}><meshBasicMaterial color="#333" side={THREE.DoubleSide} /></Ring>
      <Ring args={[8 - 0.05, 8 + 0.05, 128]} rotation-x={-Math.PI / 2}><meshBasicMaterial color="#333" side={THREE.DoubleSide} /></Ring>
      <Ring args={[12 - 0.05, 12 + 0.05, 128]} rotation-x={-Math.PI / 2}><meshBasicMaterial color="#333" side={THREE.DoubleSide} /></Ring>
      <Ring args={[18 - 0.05, 18 + 0.05, 128]} rotation-x={-Math.PI / 2}><meshBasicMaterial color="#333" side={THREE.DoubleSide} /></Ring>
      <Ring args={[26 - 0.05, 26 + 0.05, 128]} rotation-x={-Math.PI / 2}><meshBasicMaterial color="#333" side={THREE.DoubleSide} /></Ring>
      <Ring args={[35 - 0.05, 35 + 0.05, 128]} rotation-x={-Math.PI / 2}><meshBasicMaterial color="#333" side={THREE.DoubleSide} /></Ring>

      <Sun />
      <Planet textureUrl="/mercury.jpg" size={0.5} distance={5} speed={0.5} />
      <Planet textureUrl="/venus.jpg" size={0.8} distance={8} speed={0.35} />
      <Earth />
      <Planet textureUrl="/mars.jpg" size={0.7} distance={18} speed={0.2} />
      <AsteroidBelt /> {/* <-- Add the asteroid belt here */}
      <Planet textureUrl="/jupiter.jpg" size={2.2} distance={26} speed={0.15} onClick={onJupiterClick} />
      <Saturn />

      <OrbitControls enableZoom={true} enablePan={true} minDistance={5} maxDistance={150} />
    </Canvas>
  );
};
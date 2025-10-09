'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshWobbleMaterial } from '@react-three/drei';
import * as THREE from 'three';

export default function Hero3D() {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.3;
    }

    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Main geometric shape */}
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <icosahedronGeometry args={[1.2, 0]} />
        <MeshWobbleMaterial
          color="#228B22"
          wireframe
          factor={0.3}
          speed={2}
        />
      </mesh>

      {/* Accent shapes */}
      <mesh position={[-2, 1, -1]}>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color="#800020" wireframe />
      </mesh>

      <mesh position={[2, -1, -1]}>
        <octahedronGeometry args={[0.4, 0]} />
        <meshStandardMaterial color="#D3D3D3" wireframe />
      </mesh>

      {/* Floating particles */}
      {Array.from({ length: 50 }).map((_, i) => (
        <mesh
          key={i}
          position={[
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
          ]}
        >
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshBasicMaterial color="#228B22" />
        </mesh>
      ))}
    </group>
  );
}

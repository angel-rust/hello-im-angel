'use client';

import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { MeshWobbleMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';

// Floating particle component with animation
function FloatingParticle({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const speed = useMemo(() => Math.random() * 0.5 + 0.2, []);
  const radius = useMemo(() => Math.random() * 3 + 2, []);
  const offset = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime * speed + offset;
      meshRef.current.position.x = position[0] + Math.sin(time) * radius * 0.3;
      meshRef.current.position.y = position[1] + Math.cos(time * 0.7) * radius * 0.3;
      meshRef.current.position.z = position[2] + Math.sin(time * 0.5) * radius * 0.3;

      // Pulse effect
      const scale = 1 + Math.sin(time * 3) * 0.3;
      meshRef.current.scale.setScalar(scale);
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.03, 8, 8]} />
      <meshBasicMaterial color="#00A3FF" transparent opacity={0.6} />
    </mesh>
  );
}

// Orbiting shape component
function OrbitingShape({
  geometry,
  color,
  orbitRadius,
  speed,
  offset = 0,
}: {
  geometry: React.ReactElement;
  color: string;
  orbitRadius: number;
  speed: number;
  offset?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime * speed + offset;
      meshRef.current.position.x = Math.sin(time) * orbitRadius;
      meshRef.current.position.z = Math.cos(time) * orbitRadius;
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={meshRef}>
      {geometry}
      <meshStandardMaterial color={color} wireframe />
    </mesh>
  );
}

export default function Hero3D() {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const { mouse } = useThree();

  // Generate particle positions
  const particlePositions = useMemo(
    () =>
      Array.from({ length: 100 }, () => [
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 15,
      ] as [number, number, number]),
    []
  );

  useFrame((state, delta) => {
    // Main mesh rotation with mouse influence
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.3;

      // Subtle mouse tracking
      meshRef.current.rotation.x += mouse.y * 0.1 * delta;
      meshRef.current.rotation.y += mouse.x * 0.1 * delta;
    }

    // Group rotation
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Main central shape with float effect */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh ref={meshRef} position={[0, 0, 0]}>
          <icosahedronGeometry args={[1.5, 1]} />
          <MeshWobbleMaterial
            color="#00A3FF"
            wireframe
            factor={0.2}
            speed={1.5}
            transparent
            opacity={0.9}
          />
        </mesh>

        {/* Inner glow sphere */}
        <mesh position={[0, 0, 0]}>
          <icosahedronGeometry args={[1.3, 1]} />
          <meshBasicMaterial color="#00A3FF" transparent opacity={0.1} />
        </mesh>
      </Float>

      {/* Orbiting shapes */}
      <OrbitingShape
        geometry={<boxGeometry args={[0.3, 0.3, 0.3]} />}
        color="#00A3FF"
        orbitRadius={2.5}
        speed={0.5}
        offset={0}
      />
      <OrbitingShape
        geometry={<octahedronGeometry args={[0.25, 0]} />}
        color="#D3D3D3"
        orbitRadius={3}
        speed={-0.3}
        offset={Math.PI}
      />
      <OrbitingShape
        geometry={<tetrahedronGeometry args={[0.2, 0]} />}
        color="#00A3FF"
        orbitRadius={3.5}
        speed={0.4}
        offset={Math.PI / 2}
      />

      {/* Ring structure */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2, 0.01, 16, 100]} />
        <meshBasicMaterial color="#00A3FF" transparent opacity={0.3} />
      </mesh>

      <mesh rotation={[0, Math.PI / 2, Math.PI / 4]}>
        <torusGeometry args={[2.2, 0.01, 16, 100]} />
        <meshBasicMaterial color="#00A3FF" transparent opacity={0.2} />
      </mesh>

      {/* Floating particles with animation */}
      {particlePositions.map((position, i) => (
        <FloatingParticle key={i} position={position} />
      ))}

      {/* Ambient light for better visibility */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00A3FF" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00A3FF" />
    </group>
  );
}

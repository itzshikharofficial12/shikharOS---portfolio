"use client";

import { Float } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Mesh } from "three";

function PlanetMesh() {
  const planetRef = useRef<Mesh>(null);

  useFrame((state, delta) => {
    if (!planetRef.current) {
      return;
    }

    planetRef.current.rotation.y += delta * 0.16;
    planetRef.current.rotation.x = state.pointer.y * 0.08;
    planetRef.current.rotation.z = state.pointer.x * 0.045;
  });

  return (
    <Float floatIntensity={0.35} rotationIntensity={0.12} speed={1.2}>
      <group>
        <mesh ref={planetRef}>
          <sphereGeometry args={[1, 64, 64]} />
          <meshStandardMaterial
            color="#0a2a1a"
            emissive="#4ade80"
            emissiveIntensity={0.32}
            metalness={0.42}
            roughness={0.58}
          />
        </mesh>
        <mesh scale={1.08}>
          <sphereGeometry args={[1, 48, 48]} />
          <meshBasicMaterial color="#4ade80" depthWrite={false} opacity={0.08} transparent />
        </mesh>
      </group>
    </Float>
  );
}

export function HeroPlanet() {
  return (
    <Canvas
      camera={{ fov: 38, position: [0, 0, 3.25] }}
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true }}
    >
      <ambientLight intensity={0.42} />
      <pointLight color="#4ade80" intensity={18} position={[2.5, 2.5, 3]} />
      <pointLight color="#60a5fa" intensity={8} position={[-3, -1.5, 2]} />
      <PlanetMesh />
    </Canvas>
  );
}
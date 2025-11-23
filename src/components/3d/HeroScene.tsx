import { Float, PerspectiveCamera } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react';
import type { Mesh } from 'three';

function GeometricShape(props: any) {
  const meshRef = useRef<Mesh>(null!);
  const [hovered, setHover] = useState(false);

  useFrame((state, delta) => {
    meshRef.current.rotation.x += delta * 0.2;
    meshRef.current.rotation.y += delta * 0.3;

    const { x, y } = state.pointer;
    meshRef.current.rotation.x += y * 0.05;
    meshRef.current.rotation.y += x * 0.05;
  });

  const primaryColor = '#A855F7';
  const hoverColor = '#FFD600';

  return (
    <mesh
      {...props}
      ref={meshRef}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      scale={hovered ? 1.2 : 1}
    >
      <icosahedronGeometry args={[2.5, 0]} />

      <meshStandardMaterial
        color={hovered ? hoverColor : primaryColor}
        emissive={hovered ? hoverColor : primaryColor}
        emissiveIntensity={2}
        wireframe={true}
        wireframeLinewidth={2}
        toneMapped={false}
      />
    </mesh>
  );
}

export default function HeroScene() {
  return (
    <div className='h-[500px] w-full cursor-grab active:cursor-grabbing bg-transparent'>
      <Canvas gl={{ alpha: true, antialias: true }}>
        <PerspectiveCamera makeDefault position={[0, 0, 6]} />

        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />

        <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
          <GeometricShape position={[0, 0, 0]} />
        </Float>
      </Canvas>
    </div>
  );
}

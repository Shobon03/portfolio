import { useRef, useState, useEffect } from 'react';
import { Float, PerspectiveCamera } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import type { Mesh } from 'three';

// Custom hook to detect mobile screen
const useIsMobile = (query: string = '(max-width: 768px)') => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia(query);
    const handleChange = () => setIsMobile(mediaQuery.matches);

    handleChange(); // Set initial value
    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [query]);

  return isMobile;
};

function GeometricShape({
  isMobile,
  ...props
}: {
  isMobile: boolean;
  [key: string]: any;
}) {
  const meshRef = useRef<Mesh>(null!);
  const [hovered, setHover] = useState(false);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    // Constant rotation
    meshRef.current.rotation.x += delta * 0.1;
    meshRef.current.rotation.y += delta * 0.15;

    // Pointer-based rotation only on desktop
    if (!isMobile) {
      const { x, y } = state.pointer;
      meshRef.current.rotation.x += y * 0.05;
      meshRef.current.rotation.y += x * 0.05;
    }
  });

  const primaryColor = '#A855F7';
  const hoverColor = '#FFD600';

  const handlePointerOver = () => {
    if (!isMobile) setHover(true);
  };

  const handlePointerOut = () => {
    if (!isMobile) setHover(false);
  };

  const isHovered = hovered && !isMobile;

  return (
    <mesh
      {...props}
      ref={meshRef}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      scale={isHovered ? 1.2 : 1}
    >
      <icosahedronGeometry args={isMobile ? [2.0, 0] : [2.5, 0]} />

      <meshStandardMaterial
        color={isHovered ? hoverColor : primaryColor}
        emissive={isHovered ? hoverColor : primaryColor}
        emissiveIntensity={2}
        wireframe={true}
        wireframeLinewidth={2}
        toneMapped={false}
      />
    </mesh>
  );
}

export default function HeroScene() {
  const isMobile = useIsMobile();
  const [contextLost, setContextLost] = useState(false);

  const handleContextLost = (event: Event) => {
    event.preventDefault();
    setContextLost(true);
    console.warn('WebGL context lost. Attempting to restore...');
  };

  const handleContextRestored = () => {
    setContextLost(false);
    console.info('WebGL context restored.');
  };

  return (
    <div
      className={`h-[500px] w-full bg-transparent ${!isMobile ? 'cursor-grab active:cursor-grabbing' : ''}`}
    >
      {contextLost ? (
        <div className='flex items-center justify-center h-full text-gray-400'>
          <p>Recarregando visualização 3D...</p>
        </div>
      ) : (
        <Canvas
          gl={{ alpha: true, antialias: true, preserveDrawingBuffer: true }}
          onCreated={({ gl }) => {
            gl.domElement.addEventListener(
              'webglcontextlost',
              handleContextLost,
              false,
            );
            gl.domElement.addEventListener(
              'webglcontextrestored',
              handleContextRestored,
              false,
            );
          }}
        >
          <PerspectiveCamera makeDefault position={[0, 0, 6]} />

          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />

          <Float
            speed={2}
            rotationIntensity={isMobile ? 0.5 : 1.5}
            floatIntensity={isMobile ? 1 : 2}
          >
            <GeometricShape position={[0, 0, 0]} isMobile={isMobile} />
          </Float>
        </Canvas>
      )}
    </div>
  );
}

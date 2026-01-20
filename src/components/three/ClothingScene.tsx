import { useRef, useMemo, Suspense, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Box, Torus, Environment, MeshWobbleMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { ErrorBoundary } from '../ErrorBoundary';

function FloatingShape({ 
  position, 
  shape, 
  color, 
  speed = 1,
  distort = 0.3,
  scale = 1,
  wobble = false,
}: { 
  position: [number, number, number]; 
  shape: 'sphere' | 'box' | 'torus' | 'octahedron' | 'icosahedron';
  color: string;
  speed?: number;
  distort?: number;
  scale?: number;
  wobble?: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.15 * speed;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2 * speed;
      
      const mouseX = state.pointer.x * viewport.width * 0.05;
      const mouseY = state.pointer.y * viewport.height * 0.05;
      meshRef.current.position.x = THREE.MathUtils.lerp(
        meshRef.current.position.x,
        position[0] + mouseX * 0.3,
        0.02
      );
      meshRef.current.position.y = THREE.MathUtils.lerp(
        meshRef.current.position.y,
        position[1] + mouseY * 0.3,
        0.02
      );
    }
  });

  const renderShape = () => {
    const Material = wobble ? (
      <MeshWobbleMaterial
        color={color}
        factor={0.4}
        speed={2}
        roughness={0.2}
        metalness={0.8}
      />
    ) : shape === 'sphere' ? (
      <MeshDistortMaterial
        color={color}
        distort={distort}
        speed={2}
        roughness={0.2}
        metalness={0.8}
      />
    ) : (
      <meshStandardMaterial
        color={color}
        roughness={0.1}
        metalness={0.9}
      />
    );

    switch (shape) {
      case 'sphere':
        return (
          <Sphere ref={meshRef} args={[1, 64, 64]} scale={scale}>
            {Material}
          </Sphere>
        );
      case 'box':
        return (
          <Box ref={meshRef} args={[1.5, 1.5, 1.5]} scale={scale}>
            {Material}
          </Box>
        );
      case 'torus':
        return (
          <Torus ref={meshRef} args={[1, 0.4, 32, 64]} scale={scale}>
            {Material}
          </Torus>
        );
      case 'octahedron':
        return (
          <mesh ref={meshRef} scale={scale}>
            <octahedronGeometry args={[1, 0]} />
            {Material}
          </mesh>
        );
      case 'icosahedron':
        return (
          <mesh ref={meshRef} scale={scale}>
            <icosahedronGeometry args={[1, 0]} />
            {Material}
          </mesh>
        );
      default:
        return null;
    }
  };

  return (
    <Float
      speed={speed * 1.5}
      rotationIntensity={0.4}
      floatIntensity={0.8}
      floatingRange={[-0.3, 0.3]}
    >
      <group position={position}>
        {renderShape()}
      </group>
    </Float>
  );
}

function GlowingSphere({ position, color, scale = 1 }: { 
  position: [number, number, number]; 
  color: string;
  scale?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
      const pulseScale = scale + Math.sin(state.clock.elapsedTime * 2) * 0.05;
      meshRef.current.scale.setScalar(pulseScale);
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshBasicMaterial color={color} transparent opacity={0.6} />
    </mesh>
  );
}

function MovingRing({ position, color, scale = 1 }: {
  position: [number, number, number];
  color: string;
  scale?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <Float speed={2} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <torusGeometry args={[1.5, 0.02, 16, 100]} />
        <meshBasicMaterial color={color} transparent opacity={0.4} />
      </mesh>
    </Float>
  );
}

function Particles() {
  const count = 150;
  const particlesRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 25;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 25;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 25;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.015;
      particlesRef.current.rotation.x = state.clock.elapsedTime * 0.01;
      
      const scale = 1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.02;
      particlesRef.current.scale.setScalar(scale);
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#666666"
        transparent
        opacity={0.5}
        sizeAttenuation
      />
    </points>
  );
}

function Scene() {
  return (
    <>
      <Environment preset="studio" environmentIntensity={0.5} />
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <directionalLight position={[-10, -10, -5]} intensity={0.4} color="#f0f0f0" />
      
      {/* Main focal shapes - larger and more prominent */}
      <FloatingShape position={[-3, 0.5, 0]} shape="sphere" color="#0a0a0a" distort={0.5} scale={1.5} speed={0.6} />
      <FloatingShape position={[3, -0.5, -2]} shape="icosahedron" color="#ffffff" scale={1} speed={0.8} />
      <FloatingShape position={[0, 2, -1]} shape="torus" color="#d4d4d4" scale={0.8} speed={0.7} />
      
      {/* Secondary shapes */}
      <FloatingShape position={[-2, -1.5, 1]} shape="octahedron" color="#f5f5f5" scale={0.6} speed={1.2} wobble />
      <FloatingShape position={[2.5, 1.5, 0.5]} shape="box" color="#1a1a1a" scale={0.5} speed={0.9} />
      <FloatingShape position={[-3, 2, -1]} shape="sphere" color="#e5e5e5" distort={0.3} scale={0.4} speed={1.1} />
      <FloatingShape position={[1.5, -2, 0]} shape="torus" color="#333333" scale={0.35} speed={1.3} />
      
      {/* Accent elements */}
      <GlowingSphere position={[-1, 2.5, -1.5]} color="#999999" scale={0.25} />
      <GlowingSphere position={[2.5, -0.5, 1.5]} color="#666666" scale={0.2} />
      
      {/* Decorative rings */}
      <MovingRing position={[0, 0, -3]} color="#d4d4d4" scale={1.2} />
      
      {/* Atmospheric elements */}
      <Particles />
    </>
  );
}

function isWebGLAvailable() {
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}

function WebGLCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 50 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  );
}

export default function ClothingScene() {
  const [canRender, setCanRender] = useState(false);

  useEffect(() => {
    setCanRender(isWebGLAvailable());
  }, []);

  if (!canRender) {
    return null;
  }

  return (
    <div className="absolute inset-0" style={{ zIndex: 0 }}>
      <ErrorBoundary fallback={null}>
        <WebGLCanvas />
      </ErrorBoundary>
    </div>
  );
}

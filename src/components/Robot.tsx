import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { RobotFallback } from "./RobotFallback";
function Box({
  size,
  position = [0, 0, 0],
  color = "#e9e9e2",
  radius = 0.15,
  metalness = 0.25,
  roughness = 0.3,
}: {
  size: [number, number, number];
  position?: [number, number, number];
  color?: string;
  radius?: number;
  metalness?: number;
  roughness?: number;
}) {
  const geometry = useMemo(
    () => new RoundedBoxGeometry(...size, 4, radius),
    [size[0], size[1], size[2], radius],
  );
  useEffect(() => () => geometry.dispose(), [geometry]);
  return (
    <mesh geometry={geometry} position={position} castShadow receiveShadow>
      <meshStandardMaterial
        color={color}
        metalness={metalness}
        roughness={roughness}
      />
    </mesh>
  );
}
function Joint({
  position,
  radius = 0.16,
}: {
  position: [number, number, number];
  radius?: number;
}) {
  return (
    <mesh position={position} castShadow>
      <sphereGeometry args={[radius, 20, 12]} />
      <meshStandardMaterial color="#292c28" roughness={0.46} metalness={0.6} />
    </mesh>
  );
}
function Scene({ paused }: { paused: boolean }) {
  const rig = useRef<THREE.Group>(null),
    head = useRef<THREE.Group>(null),
    cursor = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const move = (e: PointerEvent) => {
      cursor.current = {
        x: (e.clientX / innerWidth) * 2 - 1,
        y: -((e.clientY / innerHeight) * 2 - 1),
      };
    };
    if (!paused)
      window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [paused]);
  useFrame(({ clock }, delta) => {
    if (paused) return;
    const t = clock.getElapsedTime();
    const smooth = 1 - Math.exp(-Math.min(delta, 0.05) * 5);
    if (rig.current) {
      rig.current.position.y = Math.sin(t * 0.9) * 0.028;
      rig.current.rotation.z = Math.sin(t * 0.55) * 0.012;
    }
    if (head.current) {
      head.current.rotation.y = THREE.MathUtils.lerp(
        head.current.rotation.y,
        cursor.current.x * 0.22,
        smooth,
      );
      head.current.rotation.x = THREE.MathUtils.lerp(
        head.current.rotation.x,
        -cursor.current.y * 0.11,
        smooth,
      );
      head.current.rotation.z = Math.sin(t * 0.6) * 0.02;
    }
  });
  return (
    <>
      <ambientLight intensity={1.4} />
      <hemisphereLight args={["#ffffff", "#b8b8ac", 2]} />
      <directionalLight
        position={[3, 7, 5]}
        intensity={4}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-left={-4}
        shadow-camera-right={4}
        shadow-camera-top={5}
        shadow-camera-bottom={-4}
        shadow-normalBias={0.03}
      />
      <directionalLight position={[-5, 3, -3]} intensity={3} color="#ffffff" />
      <group ref={rig} rotation={[0, -0.2, -0.035]}>
        <group ref={head} position={[0, 1.48, 0]}>
          <Box size={[1.35, 1.04, 0.92]} radius={0.27} />
          <Box
            size={[1.12, 0.47, 0.14]}
            position={[0, 0.015, 0.456]}
            radius={0.16}
            color="#252a27"
            metalness={0.6}
            roughness={0.23}
          />
          <Box
            size={[0.84, 0.015, 0.018]}
            position={[0, 0.105, 0.534]}
            radius={0.005}
            color="#747b70"
            metalness={0.4}
          />
          <mesh position={[-0.701, -0.015, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.19, 0.19, 0.09, 24]} />
            <meshStandardMaterial
              color="#b8bcb3"
              metalness={0.7}
              roughness={0.3}
            />
          </mesh>
          <mesh position={[0.701, -0.015, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.19, 0.19, 0.09, 24]} />
            <meshStandardMaterial
              color="#b8bcb3"
              metalness={0.7}
              roughness={0.3}
            />
          </mesh>
        </group>
        <mesh position={[0, 0.85, 0]}>
          <cylinderGeometry args={[0.19, 0.22, 0.3, 24]} />
          <meshStandardMaterial
            color="#333831"
            metalness={0.65}
            roughness={0.3}
          />
        </mesh>
        <Box size={[1.06, 1.12, 0.68]} position={[0, 0.33, 0]} radius={0.26} />
        <Box
          size={[0.58, 0.035, 0.026]}
          position={[0, 0.59, 0.351]}
          radius={0.01}
          color="#93978d"
        />
        <mesh position={[0, 0.19, 0.356]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.09, 0.09, 0.018, 32]} />
          <meshStandardMaterial
            color="#444b41"
            metalness={0.5}
            roughness={0.3}
          />
        </mesh>
        <Box
          size={[0.73, 0.21, 0.46]}
          position={[0, -0.27, 0]}
          color="#454b40"
          radius={0.08}
        />
        {[-1, 1].map((side) => (
          <group key={side}>
            <group
              position={[side * 0.69, 0.58, 0]}
              rotation={[0, 0, side * 0.12]}
            >
              <Joint position={[0, 0, 0]} radius={0.19} />
              <mesh position={[0, -0.28, 0]} castShadow>
                <capsuleGeometry args={[0.18, 0.34, 5, 20]} />
                <meshStandardMaterial
                  color="#e1e3db"
                  metalness={0.25}
                  roughness={0.3}
                />
              </mesh>
              <Joint position={[0, -0.6, 0.02]} radius={0.15} />
              <group
                position={[0, -0.66, 0.02]}
                rotation={[0.09, 0, side * 0.08]}
              >
                <mesh position={[0, -0.2, 0]} castShadow>
                  <capsuleGeometry args={[0.16, 0.28, 5, 20]} />
                  <meshStandardMaterial
                    color="#daddd3"
                    metalness={0.3}
                    roughness={0.32}
                  />
                </mesh>
                <Joint position={[0, -0.42, 0]} radius={0.1} />
                <Box
                  size={[0.27, 0.33, 0.25]}
                  position={[0, -0.58, 0.03]}
                  radius={0.1}
                />
              </group>
            </group>
            <group position={[side * 0.275, -0.43, 0]}>
              <Joint position={[0, 0, 0]} radius={0.2} />
              <Box
                size={[0.38, 0.56, 0.43]}
                position={[0, -0.25, 0]}
                radius={0.15}
              />
              <Joint position={[0, -0.56, 0]} radius={0.15} />
              <Box
                size={[0.34, 0.53, 0.37]}
                position={[0, -0.82, 0.02]}
                radius={0.12}
              />
              <Box
                size={[0.44, 0.23, 0.69]}
                position={[0, -1.15, 0.14]}
                radius={0.1}
              />
              <Box
                size={[0.44, 0.05, 0.66]}
                position={[0, -1.255, 0.14]}
                radius={0.02}
                color="#555a50"
              />
            </group>
          </group>
        ))}
      </group>
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -1.72, 0]}
        receiveShadow
      >
        <planeGeometry args={[20, 20]} />
        <shadowMaterial transparent opacity={0.1} />
      </mesh>
    </>
  );
}
export default function Robot({
  active,
  paused,
}: {
  active: boolean;
  paused: boolean;
}) {
  const [visible, setVisible] = useState(!document.hidden);
  useEffect(() => {
    const update = () => setVisible(!document.hidden);
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);
  return (
    <Canvas
      orthographic
      camera={{ position: [3, 2.1, 7], zoom: 94, near: 0.1, far: 40 }}
      dpr={[1, 1.5]}
      shadows
      frameloop={active && visible && !paused ? "always" : "demand"}
      gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
      fallback={<RobotFallback />}
    >
      <Scene paused={paused} />
    </Canvas>
  );
}

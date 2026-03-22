"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";

const PARTICLE_COUNT = 36;
const NODE = "#22c55e";

const HUB: [number, number, number] = [0.55, 0.02, -7.85];

type CallScreenOpts = {
  callerName: string;
  line: string;
  accent: string;
};

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  const rr = Math.min(r, w / 2, h / 2);
  ctx.moveTo(x + rr, y);
  ctx.arcTo(x + w, y, x + w, y + h, rr);
  ctx.arcTo(x + w, y + h, x, y + h, rr);
  ctx.arcTo(x, y + h, x, y, rr);
  ctx.arcTo(x, y, x + w, y, rr);
  ctx.closePath();
}

/** Textura tipo ecrã de chamada (estilo mockup real). */
function createCallScreenTexture(opts: CallScreenOpts): THREE.CanvasTexture {
  const W = 400;
  const H = 780;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d")!;
  const { callerName, line, accent } = opts;

  ctx.save();
  ctx.beginPath();
  roundRect(ctx, 0, 0, W, H, 36);
  ctx.clip();

  const bg = ctx.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, "#35353d");
  bg.addColorStop(0.45, "#1c1c22");
  bg.addColorStop(1, "#0e0e12");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // ícone + timer
  ctx.fillStyle = accent;
  ctx.beginPath();
  ctx.arc(40, 56, 9, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "rgba(255,255,255,0.92)";
  ctx.font = "500 20px ui-sans-serif, system-ui, sans-serif";
  ctx.fillText("00 : 14 : 32", 58, 62);

  ctx.fillStyle = "#ffffff";
  ctx.font = "700 32px ui-sans-serif, system-ui, sans-serif";
  const nw = ctx.measureText(callerName).width;
  ctx.fillText(callerName, (W - nw) / 2, 128);

  ctx.fillStyle = accent;
  ctx.font = "24px ui-sans-serif, system-ui, sans-serif";
  const lw = ctx.measureText(line).width;
  ctx.fillText(line, (W - lw) / 2, 168);

  // avatar
  const cy = H * 0.4;
  ctx.shadowColor = "rgba(0,0,0,0.55)";
  ctx.shadowBlur = 28;
  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  ctx.arc(W / 2, cy, 78, 0, Math.PI * 2);
  ctx.fill();
  ctx.shadowBlur = 0;

  ctx.fillStyle = "#9ca3af";
  ctx.beginPath();
  ctx.arc(W / 2, cy, 52, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#d1d5db";
  ctx.beginPath();
  ctx.arc(W / 2, cy - 8, 20, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillRect(W / 2 - 24, cy + 6, 48, 44);

  // grelha de ícones (simplificada)
  ctx.strokeStyle = "rgba(255,255,255,0.35)";
  ctx.lineWidth = 2;
  const rowY = H * 0.62;
  const cols = [0.22, 0.5, 0.78];
  for (let r = 0; r < 2; r++) {
    for (let c = 0; c < 3; c++) {
      const x = W * cols[c];
      const y = rowY + r * 56;
      ctx.beginPath();
      ctx.arc(x, y, 14, 0, Math.PI * 2);
      ctx.stroke();
    }
  }

  // desligar
  ctx.shadowColor = "rgba(220,38,38,0.45)";
  ctx.shadowBlur = 22;
  ctx.fillStyle = "#e11d48";
  ctx.beginPath();
  ctx.arc(W / 2, H - 86, 42, 0, Math.PI * 2);
  ctx.fill();
  ctx.shadowBlur = 0;

  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 3;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.arc(W / 2, H - 86, 16, 2.2, 5.5);
  ctx.stroke();

  ctx.restore();

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.minFilter = THREE.LinearFilter;
  tex.generateMipmaps = false;
  return tex;
}

type PhoneDims = {
  chassisW: number;
  chassisH: number;
  chassisD: number;
  cornerR: number;
  screenW: number;
  screenH: number;
};

const HERO_DIMS: PhoneDims = {
  chassisW: 0.74,
  chassisH: 1.74,
  chassisD: 0.115,
  cornerR: 0.05,
  screenW: 0.62,
  screenH: 1.46,
};

const SAT_DIMS: PhoneDims = {
  chassisW: 0.38,
  chassisH: 0.84,
  chassisD: 0.095,
  cornerR: 0.026,
  screenW: 0.31,
  screenH: 0.68,
};

function RealisticPhoneMesh({
  texture,
  dims,
}: {
  texture: THREE.CanvasTexture;
  dims: PhoneDims;
}) {
  const { chassisW, chassisH, chassisD, cornerR, screenW, screenH } = dims;
  const zFace = chassisD / 2 + 0.001;

  return (
    <group>
      <RoundedBox
        args={[chassisW, chassisH, chassisD]}
        radius={cornerR}
        smoothness={5}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          color="#4a4e5a"
          metalness={0.9}
          roughness={0.28}
        />
      </RoundedBox>

      {/* alto-falante */}
      <mesh position={[0, chassisH * 0.455, zFace + 0.012]}>
        <boxGeometry args={[0.1, 0.016, 0.024]} />
        <meshStandardMaterial color="#0c0c0e" metalness={0.3} roughness={0.8} />
      </mesh>

      {/* botões laterais */}
      <mesh position={[-chassisW * 0.5 - 0.006, chassisH * 0.12, 0]}>
        <boxGeometry args={[0.014, 0.12, 0.04]} />
        <meshStandardMaterial
          color="#2d3038"
          metalness={0.6}
          roughness={0.45}
        />
      </mesh>
      <mesh position={[-chassisW * 0.5 - 0.006, -chassisH * 0.08, 0]}>
        <boxGeometry args={[0.014, 0.1, 0.04]} />
        <meshStandardMaterial
          color="#2d3038"
          metalness={0.6}
          roughness={0.45}
        />
      </mesh>

      {/* bezel */}
      <mesh position={[0, 0, zFace - 0.003]}>
        <planeGeometry args={[screenW + 0.028, screenH + 0.04]} />
        <meshStandardMaterial
          color="#050508"
          metalness={0.2}
          roughness={0.85}
        />
      </mesh>

      <mesh position={[0, 0, zFace + 0.001]}>
        <planeGeometry args={[screenW, screenH]} />
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>
    </group>
  );
}

function HubPhone() {
  const groupRef = useRef<THREE.Group>(null);
  const texture = useMemo(
    () =>
      createCallScreenTexture({
        callerName: "Linea IA",
        line: "+351 927 699 882",
        accent: "#38bdf8",
      }),
    []
  );

  useEffect(() => () => texture.dispose(), [texture]);

  useFrame(state => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.rotation.y = Math.sin(t * 0.32) * 0.1;
    groupRef.current.rotation.x = Math.sin(t * 0.24) * 0.05;
  });

  return (
    <group ref={groupRef} position={HUB} rotation={[0, 0.2, 0]}>
      <RealisticPhoneMesh texture={texture} dims={HERO_DIMS} />
    </group>
  );
}

const SAT_VARIANTS: CallScreenOpts[] = [
  { callerName: "Cliente", line: "+351 21 234 5678", accent: "#22c55e" },
  { callerName: "Marcação", line: "+351 912 345 678", accent: "#38bdf8" },
  { callerName: "Suporte", line: "+351 93 123 4567", accent: "#60a5fa" },
  { callerName: "Pedido", line: "Chamada entrante", accent: "#4ade80" },
];

function SatellitePhone({
  position: p,
  index,
  texture,
}: {
  position: [number, number, number];
  index: number;
  texture: THREE.CanvasTexture;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const yaw = Math.atan2(p[0], p[2]) + Math.PI;

  useFrame(state => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.rotation.x = Math.sin(t * 1.6 + index * 0.7) * 0.07 + 0.04;
    groupRef.current.rotation.z = Math.cos(t * 1.1 + index) * 0.04;
    groupRef.current.position.y = p[1] + Math.sin(t * 2.1 + index * 0.9) * 0.12;
  });

  return (
    <group ref={groupRef} position={[p[0], p[1], p[2]]} rotation={[0, yaw, 0]}>
      <group rotation={[0, -0.32, 0]}>
        <RealisticPhoneMesh texture={texture} dims={SAT_DIMS} />
      </group>
    </group>
  );
}

function CallNetwork() {
  const nodeGroup = useRef<THREE.Group>(null);
  const nodeCount = 8;
  const radius = 3.45;

  const satTextures = useMemo(
    () => SAT_VARIANTS.map(v => createCallScreenTexture(v)),
    []
  );

  useEffect(() => () => satTextures.forEach(t => t.dispose()), [satTextures]);

  const nodePositions = useMemo(() => {
    return Array.from({ length: nodeCount }, (_, i) => {
      const a = (i / nodeCount) * Math.PI * 2 + 0.28;
      return [
        Math.cos(a) * radius,
        Math.sin(a * 1.12) * 1.05,
        Math.sin(a) * 0.55,
      ] as [number, number, number];
    });
  }, [nodeCount, radius]);

  useFrame(state => {
    if (!nodeGroup.current) return;
    nodeGroup.current.rotation.y = state.clock.elapsedTime * 0.09;
  });

  return (
    <group ref={nodeGroup} position={HUB}>
      {nodePositions.map((p, i) => (
        <SatellitePhone
          key={i}
          position={p}
          index={i}
          texture={satTextures[i % satTextures.length]}
        />
      ))}
    </group>
  );
}

function Particles() {
  const pointsRef = useRef<THREE.Points>(null);
  const positions = useRef<Float32Array | null>(null);

  if (!positions.current) {
    positions.current = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const radius = 6 + Math.random() * 11;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions.current[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions.current[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions.current[i * 3 + 2] = radius * Math.cos(phi) - 10;
    }
  }

  useFrame(state => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.009;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions.current!, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.075}
        color="#94a3b8"
        transparent
        opacity={0.13}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/** ~1,5× face à versão anterior (2,55 × 1,5) */
const SCENE_SCALE = 3.825;

export default function Hero3DScene() {
  return (
    <group position={[0.42, 0, 0]} scale={SCENE_SCALE}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[8, 12, 8]} intensity={1.1} />
      <directionalLight
        position={[-6, 4, -4]}
        intensity={0.25}
        color="#38bdf8"
      />
      <pointLight position={[-4, -2, -6]} color="#0ea5e9" intensity={0.52} />
      <pointLight position={[5, 6, -2]} color={NODE} intensity={0.4} />
      <HubPhone />
      <CallNetwork />
      <Particles />
    </group>
  );
}

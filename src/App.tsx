import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useState, memo, useRef } from "react";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

const COLORS = [
  { hex: "#8B7355", name: "Natural" },
  { hex: "#2C3E50", name: "Midnight" },
  { hex: "#E74C3C", name: "Coral" },
  { hex: "#27AE60", name: "Forest" },
];

/* ---------- Scene Objects ---------- */

const Floor = memo(function Floor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[8, 8]} />
      <meshStandardMaterial color="#f0e6d3" />
    </mesh>
  );
});

type SofaProps = { color: string };

function Sofa({ color }: SofaProps) {
  return (
    <group position={[0, 0.15, 0]}>
      {/* legs */}
      {[-0.85, 0.85].map((x) =>
        [-0.3, 0.3].map((z) => (
          <mesh key={`${x}-${z}`} position={[x, 0, z]} castShadow receiveShadow>
            <boxGeometry args={[0.08, 0.15, 0.08]} />
            <meshStandardMaterial color="#3d2b1f" />
          </mesh>
        )),
      )}

      {/* seat — two cushions */}
      <mesh position={[-0.52, 0.22, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.9, 0.22, 0.75]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0.52, 0.22, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.9, 0.22, 0.75]} />
        <meshStandardMaterial color={color} />
      </mesh>

      {/* back */}
      <mesh position={[0, 0.6, -0.34]} castShadow receiveShadow>
        <boxGeometry args={[2, 0.6, 0.12]} />
        <meshStandardMaterial color={color} />
      </mesh>

      {/* armrests */}
      <mesh position={[-1.0, 0.42, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.12, 0.38, 0.75]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[1.0, 0.42, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.12, 0.38, 0.75]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </group>
  );
}

const Table = memo(function Table() {
  return (
    <group position={[0, 0, 1.5]}>
      {/* tabletop */}
      <mesh position={[0, 0.28, 0]} castShadow receiveShadow>
        <boxGeometry args={[1, 0.05, 0.6]} />
        <meshStandardMaterial color="#5C4033" />
      </mesh>
      {/* legs */}
      {[-0.45, 0.45].map((x) =>
        [-0.25, 0.25].map((z) => (
          <mesh
            key={`${x}-${z}`}
            position={[x, 0.13, z]}
            castShadow
            receiveShadow
          >
            <boxGeometry args={[0.05, 0.26, 0.05]} />
            <meshStandardMaterial color="#3d2b1f" />
          </mesh>
        )),
      )}
    </group>
  );
});

/* ---------- UI ---------- */

type ColorPickerProps = {
  colors: typeof COLORS;
  selected: string;
  onSelect: (color: string) => void;
};

function ColorPicker({ colors, selected, onSelect }: ColorPickerProps) {
  return (
    <div style={{ marginBottom: 12 }}>
      <p
        style={{
          margin: "0 0 8px",
          fontSize: 12,
          fontWeight: 700,
          color: "#666",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        }}
      >
        Finish
      </p>
      <div style={{ display: "flex", gap: 8 }}>
        {colors.map((c) => (
          <button
            key={c.hex}
            onClick={() => onSelect(c.hex)}
            title={c.name}
            style={{
              width: 32,
              height: 32,
              background: c.hex,
              border:
                selected === c.hex ? "3px solid #111" : "2px solid transparent",
              borderRadius: 6,
              cursor: "pointer",
              transition: "transform 0.1s",
              transform: selected === c.hex ? "scale(1.15)" : "scale(1)",
            }}
          />
        ))}
      </div>
      <p
        style={{
          margin: "8px 0 0",
          fontSize: 13,
          color: "#444",
          fontWeight: 600,
        }}
      >
        Selected: {colors.find((c) => c.hex === selected)?.name}
      </p>
    </div>
  );
}

/* ---------- App ---------- */

export default function App() {
  const [color, setColor] = useState(COLORS[0].hex);
  const [grabbing, setGrabbing] = useState(false);
  const orbitRef = useRef<OrbitControlsImpl>(null);

  const handleResetView = () => {
    orbitRef.current?.reset();
  };

  return (
    <>
      {/* Info panel */}
      <div
        style={{
          position: "fixed",
          top: 20,
          right: 20,
          zIndex: 1,
          background: "white",
          padding: 20,
          borderRadius: 12,
          boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
          width: 220,
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <h3 style={{ margin: "0 0 4px", fontSize: 16, fontWeight: 700 }}>
          Modular Sofa
        </h3>
        <p style={{ margin: "0 0 4px", fontSize: 13, color: "#888" }}>
          W 198 × D 99 × H 83 cm
        </p>
        <p
          style={{
            margin: "0 0 16px",
            fontSize: 13,
            color: "#444",
            fontWeight: 600,
          }}
        >
          €799
        </p>
        <p
          style={{
            margin: "0 0 16px",
            fontSize: 12,
            color: "#888",
            lineHeight: 1.5,
          }}
        >
          Drag to orbit · Scroll to zoom · Select a finish below
        </p>

        <ColorPicker colors={COLORS} selected={color} onSelect={setColor} />

        <div
          style={{ borderTop: "1px solid #eee", paddingTop: 12, marginTop: 4 }}
        >
          <button
            onClick={handleResetView}
            style={{
              width: "100%",
              padding: "8px 0",
              background: "#111",
              color: "white",
              border: "none",
              borderRadius: 6,
              cursor: "pointer",
              fontSize: 13,
              fontWeight: 600,
            }}
          >
            Reset View
          </button>
        </div>
      </div>

      {/* 3D Canvas */}
      <Canvas
        shadows
        style={{
          width: "100vw",
          height: "100vh",
          background: "#e8e0d5",
          cursor: grabbing ? "grabbing" : "grab",
        }}
        camera={{ position: [5, 5, 5], fov: 50 }}
        onPointerDown={() => setGrabbing(true)}
        onPointerUp={() => setGrabbing(false)}
        onPointerLeave={() => setGrabbing(false)}
      >
        <ambientLight intensity={0.7} />
        <directionalLight
          position={[5, 8, 5]}
          intensity={1.2}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />

        <Floor />
        <Sofa color={color} />
        <Table />

        <OrbitControls
          ref={orbitRef}
          enableDamping
          target={[0, 0.45, 0]}
          minDistance={3}
          maxDistance={8}
          maxPolarAngle={Math.PI / 2.1}
        />
      </Canvas>
    </>
  );
}

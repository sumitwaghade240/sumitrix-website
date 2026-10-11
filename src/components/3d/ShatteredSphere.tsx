import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface ShatteredSphereProps {
  chargeProgress: number; // 0 to 1
  isShattered: boolean;
  onExplosionTrigger?: () => void;
  pointerPos: { x: number; y: number };
}

// Generate triangle shard geometry
function createShardGeometry(scale = 0.28): THREE.BufferGeometry {
  const geom = new THREE.BufferGeometry();
  // Triangular prism or faceted shard
  const v1 = new THREE.Vector3(0, scale * 1.1, 0);
  const v2 = new THREE.Vector3(-scale * 0.9, -scale * 0.7, scale * 0.15);
  const v3 = new THREE.Vector3(scale * 0.9, -scale * 0.7, scale * 0.15);
  const v4 = new THREE.Vector3(0, 0, -scale * 0.35); // back apex for faceted volume

  // 4 triangular faces to form a 3D glass crystal shard
  const positions = new Float32Array([
    // Front face
    v1.x, v1.y, v1.z,  v2.x, v2.y, v2.z,  v3.x, v3.y, v3.z,
    // Left face
    v1.x, v1.y, v1.z,  v4.x, v4.y, v4.z,  v2.x, v2.y, v2.z,
    // Right face
    v1.x, v1.y, v1.z,  v3.x, v3.y, v3.z,  v4.x, v4.y, v4.z,
    // Bottom face
    v2.x, v2.y, v2.z,  v4.x, v4.y, v4.z,  v3.x, v3.y, v3.z,
  ]);

  geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geom.computeVertexNormals();
  return geom;
}

export const ShatteredSphere: React.FC<ShatteredSphereProps> = ({
  chargeProgress,
  isShattered,
  pointerPos
}) => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const innerMeshRef = useRef<THREE.InstancedMesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const coreLightRef = useRef<THREE.PointLight>(null);
  const flashLightRef = useRef<THREE.PointLight>(null);

  const { camera } = useThree();

  // Shards count
  const COUNT = 320;
  const INNER_COUNT = 120;

  // Pre-generate shard transform metadata
  const shardData = useMemo(() => {
    const data = [];
    const radius = 2.4;

    // Golden spiral distribution on sphere surface
    for (let i = 0; i < COUNT; i++) {
      const y = 1 - (i / (COUNT - 1)) * 2; // -1 to 1
      const radAtY = Math.sqrt(1 - y * y);
      const theta = 2.399963 * i; // Golden angle

      const x = Math.cos(theta) * radAtY;
      const z = Math.sin(theta) * radAtY;

      const norm = new THREE.Vector3(x, y, z).normalize();
      const pos = norm.clone().multiplyScalar(radius);

      // Random explosion vector (outward with scatter)
      const explodeDir = norm.clone().add(
        new THREE.Vector3(
          (Math.random() - 0.5) * 0.8,
          (Math.random() - 0.5) * 0.8,
          (Math.random() - 0.5) * 0.8
        )
      ).normalize();

      const explodeDist = 4.0 + Math.random() * 6.5;
      const rotationAxis = new THREE.Vector3(
        Math.random() - 0.5,
        Math.random() - 0.5,
        Math.random() - 0.5
      ).normalize();

      const rotationSpeed = (Math.random() * 8.0 + 3.0) * (Math.random() > 0.5 ? 1 : -1);
      const scaleVariation = 0.8 + Math.random() * 0.5;

      data.push({
        origPos: pos,
        normal: norm,
        explodeDir,
        explodeDist,
        rotationAxis,
        rotationSpeed,
        scaleVariation,
        currentPos: pos.clone(),
        currentRotation: new THREE.Quaternion(),
      });
    }
    return data;
  }, []);

  // Inner shards data
  const innerShardData = useMemo(() => {
    const data = [];
    const radius = 1.6;
    for (let i = 0; i < INNER_COUNT; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = Math.cbrt(Math.random()) * radius * 0.8 + 0.5;
      const sinPhi = Math.sin(phi);
      const x = r * sinPhi * Math.cos(theta);
      const y = r * sinPhi * Math.sin(theta);
      const z = r * Math.cos(phi);

      const pos = new THREE.Vector3(x, y, z);
      const norm = pos.clone().normalize();
      const explodeDir = norm.clone().add(new THREE.Vector3((Math.random() - 0.5) * 0.6, (Math.random() - 0.5) * 0.6, (Math.random() - 0.5) * 0.6)).normalize();
      const explodeDist = 3.0 + Math.random() * 5.0;

      data.push({
        origPos: pos,
        explodeDir,
        explodeDist,
        rotationAxis: new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize(),
        rotationSpeed: Math.random() * 10 - 5,
        currentPos: pos.clone()
      });
    }
    return data;
  }, []);

  const shardGeometry = useMemo(() => createShardGeometry(0.24), []);
  const innerShardGeometry = useMemo(() => createShardGeometry(0.16), []);

  // Dynamic animation state
  const explosionAnim = useRef({
    factor: 0, // 0 = intact, 1 = exploded
    velocity: 0,
    shake: 0,
    flashIntensity: 0
  });

  const dummyMatrix = useMemo(() => new THREE.Matrix4(), []);
  const dummyQuat = useMemo(() => new THREE.Quaternion(), []);
  const dummyScale = useMemo(() => new THREE.Vector3(), []);
  const dummyPos = useMemo(() => new THREE.Vector3(), []);

  // Idle and mouse rotation smooth state
  const targetRot = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    const dt = Math.min(delta, 0.05);

    // 1. Mouse response with smooth interpolation
    targetRot.current.x = THREE.MathUtils.lerp(targetRot.current.x, pointerPos.y * 0.45, dt * 3.5);
    targetRot.current.y = THREE.MathUtils.lerp(targetRot.current.y, pointerPos.x * 0.65, dt * 3.5);

    if (groupRef.current) {
      // Base idle rotation + mouse parallax
      groupRef.current.rotation.y = t * 0.2 + targetRot.current.y;
      groupRef.current.rotation.x = Math.sin(t * 0.15) * 0.08 + targetRot.current.x;
      groupRef.current.rotation.z = Math.cos(t * 0.1) * 0.04;
    }

    // 2. Camera shake when shattering
    if (explosionAnim.current.shake > 0.001) {
      camera.position.x = (Math.random() - 0.5) * explosionAnim.current.shake * 0.5;
      camera.position.y = (Math.random() - 0.5) * explosionAnim.current.shake * 0.5;
      explosionAnim.current.shake = THREE.MathUtils.lerp(explosionAnim.current.shake, 0, dt * 5);
    } else {
      camera.position.x = 0;
      camera.position.y = 0;
    }

    // 3. Explosion factor interpolation
    const targetFactor = isShattered ? 1.0 : 0.0;
    // Fast explosion outward, smooth deliberate reconstruction inward
    const animSpeed = isShattered ? 4.5 : 1.8;
    explosionAnim.current.factor = THREE.MathUtils.lerp(
      explosionAnim.current.factor,
      targetFactor,
      dt * animSpeed
    );

    // Charge jitter (when user presses and holds before exploding)
    const chargeJitter = chargeProgress > 0 && !isShattered ? Math.pow(chargeProgress, 2) * 0.15 : 0;

    // 4. Update Outer Shards
    if (meshRef.current) {
      const exp = explosionAnim.current.factor;

      for (let i = 0; i < COUNT; i++) {
        const item = shardData[i];

        // Position: original + explosion translation + charge vibration
        dummyPos.copy(item.origPos);
        if (exp > 0.001) {
          dummyPos.addScaledVector(item.explodeDir, item.explodeDist * exp);
        }

        if (chargeJitter > 0) {
          dummyPos.x += (Math.random() - 0.5) * chargeJitter;
          dummyPos.y += (Math.random() - 0.5) * chargeJitter;
          dummyPos.z += (Math.random() - 0.5) * chargeJitter;
        }

        // Rotation: Look along normal at rest, spin chaotically when exploded
        dummyQuat.setFromAxisAngle(item.normal, 0);
        if (exp > 0.001) {
          const spinQuat = new THREE.Quaternion().setFromAxisAngle(
            item.rotationAxis,
            item.rotationSpeed * exp * 3.5 + t * item.rotationSpeed * 0.2
          );
          dummyQuat.multiply(spinQuat);
        }

        // Scale: slight pulsation with charge
        const scaleVal = item.scaleVariation * (1 + chargeProgress * 0.12 - exp * 0.15);
        dummyScale.set(scaleVal, scaleVal, scaleVal);

        dummyMatrix.compose(dummyPos, dummyQuat, dummyScale);
        meshRef.current.setMatrixAt(i, dummyMatrix);
      }
      meshRef.current.instanceMatrix.needsUpdate = true;
    }

    // 5. Update Inner Shards
    if (innerMeshRef.current) {
      const exp = explosionAnim.current.factor;
      for (let i = 0; i < INNER_COUNT; i++) {
        const item = innerShardData[i];
        dummyPos.copy(item.origPos);
        if (exp > 0.001) {
          dummyPos.addScaledVector(item.explodeDir, item.explodeDist * exp * 1.3);
        }
        dummyQuat.setFromAxisAngle(item.rotationAxis, item.rotationSpeed * t * 0.5);
        const s = 0.8 * (1 - exp * 0.2);
        dummyScale.set(s, s, s);

        dummyMatrix.compose(dummyPos, dummyQuat, dummyScale);
        innerMeshRef.current.setMatrixAt(i, dummyMatrix);
      }
      innerMeshRef.current.instanceMatrix.needsUpdate = true;
    }

    // 6. Central Core & Lighting Pulse
    if (coreRef.current) {
      coreRef.current.rotation.x = t * 0.6;
      coreRef.current.rotation.y = t * 0.8;
      const coreScale = 0.8 + Math.sin(t * 3) * 0.06 + chargeProgress * 0.45;
      coreRef.current.scale.set(coreScale, coreScale, coreScale);
    }

    if (coreLightRef.current) {
      coreLightRef.current.intensity = 2.0 + chargeProgress * 6.0 + Math.sin(t * 4) * 0.5;
    }

    // Flash light trigger on shatter explosion
    if (flashLightRef.current) {
      if (isShattered && explosionAnim.current.factor < 0.25) {
        flashLightRef.current.intensity = 25.0 * (1 - explosionAnim.current.factor / 0.25);
      } else {
        flashLightRef.current.intensity = 0;
      }
    }
  });

  // Trigger camera shake on shatter state switch
  useEffect(() => {
    if (isShattered) {
      explosionAnim.current.shake = 0.55;
    }
  }, [isShattered]);

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Studio Lighting Environment */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[6, 8, 5]} intensity={2.2} color="#ffffff" />
      <directionalLight position={[-6, -4, -4]} intensity={1.5} color="#4f8fff" />
      {/* Dramatic Neon Lime Rim Light */}
      <spotLight
        position={[0, 5, -6]}
        intensity={5.0}
        color="#ccff00"
        angle={0.7}
        penumbra={0.8}
      />
      {/* Dynamic Flash Light for Shatter Explosion */}
      <pointLight ref={flashLightRef} position={[0, 0, 0]} color="#ffffff" distance={20} intensity={0} />

      {/* Internal Core Light */}
      <pointLight ref={coreLightRef} position={[0, 0, 0]} color="#ccff00" distance={10} intensity={2.5} />

      {/* Outer Faceted Glass Shards */}
      <instancedMesh
        ref={meshRef}
        args={[shardGeometry, undefined, COUNT]}
      >
        <meshPhysicalMaterial
          roughness={0.08}
          transmission={0.88}
          thickness={1.2}
          ior={1.52}
          reflectivity={0.9}
          clearcoat={1.0}
          clearcoatRoughness={0.05}
          color="#d2e9ff"
          attenuationColor="#a6d4ff"
          attenuationDistance={1.2}
          transparent={true}
          opacity={0.92}
          depthWrite={false}
        />
      </instancedMesh>

      {/* Inner Emerald/Lime Refraction Shards */}
      <instancedMesh
        ref={innerMeshRef}
        args={[innerShardGeometry, undefined, INNER_COUNT]}
      >
        <meshPhysicalMaterial
          roughness={0.2}
          transmission={0.65}
          thickness={0.5}
          ior={1.6}
          color="#ccff00"
          emissive="#203300"
          emissiveIntensity={0.6}
          transparent={true}
          opacity={0.85}
          depthWrite={false}
        />
      </instancedMesh>

      {/* Central Geometric Hologram Core */}
      <group>
        <mesh ref={coreRef}>
          <octahedronGeometry args={[0.55, 0]} />
          <meshStandardMaterial
            color="#ccff00"
            emissive="#ccff00"
            emissiveIntensity={2.5 + chargeProgress * 3.0}
            wireframe={true}
          />
        </mesh>
        {/* Core Inner Glow Sphere */}
        <mesh scale={[0.32, 0.32, 0.32]}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      </group>

      {/* Subtle Orbital Glass Ring */}
      <mesh rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[3.2, 0.02, 16, 100]} />
        <meshBasicMaterial color="#ccff00" transparent opacity={0.25} />
      </mesh>
      <mesh rotation={[-Math.PI / 4, Math.PI / 6, 0]}>
        <torusGeometry args={[3.6, 0.015, 16, 100]} />
        <meshBasicMaterial color="#4f8fff" transparent opacity={0.2} />
      </mesh>
    </group>
  );
};

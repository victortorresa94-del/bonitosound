"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform vec3 uColorBg;

  // 2D noise (Stefan Gustavson simplex)
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187,0.366025403784439,
                       -0.577350269189626,0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x>x0.y) ? vec2(1.0,0.0) : vec2(0.0,1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
                            + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
                            dot(x12.zw,x12.zw)), 0.0);
    m = m*m; m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vec2 uv = vUv;
    vec2 m = uMouse * 0.5;

    // Field con dos capas de noise lentas
    float n1 = snoise(uv * 1.8 + uTime * 0.06 + m);
    float n2 = snoise(uv * 3.2 - uTime * 0.04 - m * 0.5);
    float n = (n1 * 0.65 + n2 * 0.35) * 0.5 + 0.5;

    // Influencia radial del mouse para "calentar" la zona
    float dMouse = length(uv - 0.5 - uMouse * 0.4);
    float mouseGlow = smoothstep(0.55, 0.0, dMouse) * 0.35;

    // Mix entre bg cream y los dos azules
    vec3 col = mix(uColorBg, uColorA, smoothstep(0.35, 0.7, n));
    col = mix(col, uColorB, smoothstep(0.6, 0.95, n + mouseGlow));

    // Vignette suave
    float vig = smoothstep(1.1, 0.4, length(uv - 0.5));
    col = mix(uColorBg, col, vig * 0.95);

    gl_FragColor = vec4(col, 1.0);
  }
`;

type ShaderUniforms = {
  uTime: { value: number };
  uMouse: { value: THREE.Vector2 };
  uColorA: { value: THREE.Color };
  uColorB: { value: THREE.Color };
  uColorBg: { value: THREE.Color };
};

function FieldPlane() {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const mouseRef = useRef(new THREE.Vector2(0, 0));
  const targetMouse = useRef(new THREE.Vector2(0, 0));

  const uniforms: ShaderUniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uColorA: { value: new THREE.Color("#dbe6ff") },
      uColorB: { value: new THREE.Color("#1b6ee6") },
      uColorBg: { value: new THREE.Color("#f6f5f1") },
    }),
    []
  );

  useFrame(({ clock, pointer }, delta) => {
    if (!matRef.current) return;
    targetMouse.current.set(pointer.x, pointer.y);
    mouseRef.current.lerp(targetMouse.current, Math.min(1, delta * 3));
    matRef.current.uniforms.uTime.value = clock.elapsedTime;
    matRef.current.uniforms.uMouse.value.copy(mouseRef.current);
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

type Props = {
  className?: string;
};

export function HeroCanvas({ className = "" }: Props) {
  return (
    <div className={`relative ${className}`} aria-hidden="true">
      <Canvas
        gl={{
          antialias: false,
          alpha: false,
          powerPreference: "high-performance",
        }}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 1], fov: 50 }}
        orthographic={false}
        style={{ width: "100%", height: "100%" }}
      >
        <FieldPlane />
      </Canvas>
    </div>
  );
}

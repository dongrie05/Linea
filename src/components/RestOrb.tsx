"use client";

import { Mesh, Program, Renderer, Triangle } from "ogl";
import { useEffect, useRef } from "react";

const VERT = `
attribute vec2 uv;
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAG = `
precision highp float;
uniform vec2 uResolution;
uniform float uTime;
uniform float uBreathe;
varying vec2 vUv;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 3; i++) {
    v += a * noise(p);
    p = p * 2.02 + vec2(1.7, 9.2);
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * uResolution) / min(uResolution.x, uResolution.y);
  float breathe = 1.0 + uBreathe * 0.015 * sin(uTime * 1.047197);
  float n = fbm(uv * 2.2 + uTime * 0.07) * 0.06 * uBreathe;
  float d = length(uv) / breathe - n;

  vec3 deep = vec3(0.1020, 0.3333, 0.7098);
  vec3 brand = vec3(0.1843, 0.4902, 0.9216);
  vec3 mid = vec3(0.6392, 0.7765, 0.9608);
  vec3 core = vec3(0.9490, 0.9569, 0.9725);
  vec3 edge = vec3(0.3569, 0.6078, 0.9412);

  vec3 col = mix(core, mid, smoothstep(0.02, 0.18, d));
  col = mix(col, brand, smoothstep(0.14, 0.32, d));
  col = mix(col, deep, smoothstep(0.28, 0.42, d));
  float fres = pow(smoothstep(0.22, 0.46, d), 1.35);
  col = mix(col, edge, fres * 0.85);

  float body = smoothstep(0.46, 0.30, d);
  float halo = smoothstep(0.62, 0.40, d) * 0.28;
  gl_FragColor = vec4(col, max(body, halo));
}
`;

export default function RestOrb({
  onReady,
  onFail,
}: {
  onReady: () => void;
  onFail: () => void;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    let stopped = false;
    let raf = 0;
    let retries = 0;
    let release = () => {};

    const mobile = window.matchMedia("(max-width: 767px)").matches;
    const dpr = mobile ? 1 : Math.min(window.devicePixelRatio || 1, 1.5);
    const frameMs = mobile ? 1000 / 30 : 1000 / 60;

    const fail = () => {
      if (!stopped) onFail();
    };

    const mount = () => {
      if (stopped) return;
      release();
      let renderer: Renderer;
      try {
        renderer = new Renderer({
          canvas,
          alpha: true,
          antialias: false,
          depth: false,
          dpr,
          powerPreference: mobile ? "low-power" : "default",
        });
      } catch {
        fail();
        return;
      }

      const gl = renderer.gl;
      if (!gl) {
        fail();
        return;
      }

      gl.clearColor(0, 0, 0, 0);
      const program = new Program(gl, {
        vertex: VERT,
        fragment: FRAG,
        transparent: true,
        depthTest: false,
        depthWrite: false,
        cullFace: null,
        uniforms: {
          uTime: { value: 0 },
          uResolution: { value: [1, 1] },
          uBreathe: { value: 1 },
        },
      });

      if (!gl.getProgramParameter(program.program, gl.LINK_STATUS)) {
        fail();
        return;
      }

      const mesh = new Mesh(gl, {
        geometry: new Triangle(gl),
        program,
      });
      mesh.frustumCulled = false;
      let visible = true;
      let last = 0;
      let ready = false;

      const resize = () => {
        const parent = canvas.parentElement;
        const width = parent?.clientWidth || canvas.clientWidth;
        const height = parent?.clientHeight || canvas.clientHeight;
        if (width < 2 || height < 2) return;
        renderer.setSize(width, height);
        program.uniforms.uResolution.value = [
          gl.canvas.width,
          gl.canvas.height,
        ];
      };
      resize();

      const ro = new ResizeObserver(resize);
      if (canvas.parentElement) ro.observe(canvas.parentElement);

      const io = new IntersectionObserver(
        ([entry]) => {
          visible = entry.isIntersecting;
        },
        { threshold: 0.05 }
      );
      io.observe(canvas);

      const loop = (now: number) => {
        if (stopped) return;
        raf = requestAnimationFrame(loop);
        if (!visible || document.hidden) return;
        if (now - last < frameMs) return;
        last = now;
        program.uniforms.uTime.value = now * 0.001;
        renderer.render({ scene: mesh, frustumCull: false });
        if (!ready) {
          ready = true;
          onReady();
        }
      };
      raf = requestAnimationFrame(loop);

      const onLost = (event: Event) => {
        event.preventDefault();
        release();
        fail();
        if (retries >= 1 || stopped) return;
        retries += 1;
        canvas.addEventListener(
          "webglcontextrestored",
          () => {
            if (!stopped) mount();
          },
          { once: true }
        );
      };
      canvas.addEventListener("webglcontextlost", onLost);

      release = () => {
        cancelAnimationFrame(raf);
        ro.disconnect();
        io.disconnect();
        canvas.removeEventListener("webglcontextlost", onLost);
      };
    };

    mount();
    return () => {
      stopped = true;
      release();
    };
  }, [onFail, onReady]);

  return <canvas ref={ref} className="orb-canvas" aria-hidden="true" />;
}

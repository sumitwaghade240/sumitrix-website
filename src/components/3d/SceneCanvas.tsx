import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { ShatteredSphere } from './ShatteredSphere';
import { Sparkles } from '@react-three/drei';
import { AlertCircle, RotateCcw, Zap } from 'lucide-react';

interface SceneCanvasProps {
  onShatterChange?: (shattered: boolean) => void;
  className?: string;
}

// Simple Web Audio Synthesizer for cinematic sound effects without external files
class SoundFX {
  private ctx: AudioContext | null = null;
  private chargeOsc: OscillatorNode | null = null;
  private chargeGain: GainNode | null = null;

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  startCharge() {
    try {
      this.initCtx();
      if (!this.ctx) return;
      this.stopCharge();

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(140, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, this.ctx.currentTime + 0.85);

      gain.gain.setValueAtTime(0.01, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.12, this.ctx.currentTime + 0.8);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      this.chargeOsc = osc;
      this.chargeGain = gain;
    } catch {
      // Audio might be blocked by browser policy until interaction
    }
  }

  stopCharge() {
    try {
      if (this.chargeGain && this.ctx) {
        this.chargeGain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);
      }
      if (this.chargeOsc) {
        this.chargeOsc.stop(this.ctx ? this.ctx.currentTime + 0.06 : 0);
        this.chargeOsc.disconnect();
        this.chargeOsc = null;
      }
    } catch {
      // Ignore
    }
  }

  playShatter() {
    try {
      this.initCtx();
      if (!this.ctx) return;

      // Burst of high frequencies (glass fracture)
      const now = this.ctx.currentTime;
      const bufferSize = this.ctx.sampleRate * 0.4;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);

      // Metallic noise
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (this.ctx.sampleRate * 0.08));
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'highpass';
      filter.frequency.setValueAtTime(1200, now);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start();
    } catch {
      // Ignore
    }
  }

  playReconstruct() {
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(320, now + 0.4);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(now + 0.42);
    } catch {
      // Ignore
    }
  }
}

const sfx = new SoundFX();

export const SceneCanvas: React.FC<SceneCanvasProps> = ({
  onShatterChange,
  className = ''
}) => {
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const [isPressing, setIsPressing] = useState(false);
  const [chargeProgress, setChargeProgress] = useState(0); // 0 to 1
  const [isShattered, setIsShattered] = useState(false);
  const [hasWebGlError, setHasWebGlError] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const chargeStartRef = useRef<number | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // Notify parent of state changes
  useEffect(() => {
    onShatterChange?.(isShattered);
  }, [isShattered, onShatterChange]);

  // Pointer tracking relative to center [-1, 1]
  const handlePointerMove = (e: React.PointerEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    setPointer({ x, y });
  };

  const handlePointerLeave = () => {
    setPointer({ x: 0, y: 0 });
    handleRelease();
  };

  // Click-and-hold charge loop (~800ms)
  const CHARGE_DURATION = 800; // ms

  const handlePressStart = useCallback(() => {
    if (isShattered) {
      // If already shattered, a tap will reconstruct it
      setIsShattered(false);
      sfx.playReconstruct();
      return;
    }
    setIsPressing(true);
    chargeStartRef.current = performance.now();
    sfx.startCharge();

    const updateCharge = (time: number) => {
      if (!chargeStartRef.current) return;
      const elapsed = time - chargeStartRef.current;
      const progress = Math.min(elapsed / CHARGE_DURATION, 1.0);
      setChargeProgress(progress);

      if (progress >= 1.0) {
        // DETONATE!
        setIsPressing(false);
        setIsShattered(true);
        setChargeProgress(0);
        chargeStartRef.current = null;
        sfx.stopCharge();
        sfx.playShatter();
        if ('vibrate' in navigator) {
          navigator.vibrate([40, 30, 80]);
        }
        return;
      }

      animFrameRef.current = requestAnimationFrame(updateCharge);
    };

    animFrameRef.current = requestAnimationFrame(updateCharge);
  }, [isShattered]);

  const handleRelease = useCallback(() => {
    if (!isPressing) return;
    setIsPressing(false);
    chargeStartRef.current = null;
    sfx.stopCharge();
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    // Smoothly discharge if released before exploding
    setChargeProgress(0);
  }, [isPressing]);

  // Keyboard accessibility
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === ' ' || e.key === 'Enter') {
      if (isShattered) {
        setIsShattered(false);
        sfx.playReconstruct();
      } else {
        handlePressStart();
      }
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent) => {
    if (e.key === ' ' || e.key === 'Enter') {
      handleRelease();
    }
  };

  // Auto-reconstruction timer after 6 seconds of shattered state
  useEffect(() => {
    if (isShattered) {
      const timer = setTimeout(() => {
        setIsShattered(false);
        sfx.playReconstruct();
      }, 7000);
      return () => clearTimeout(timer);
    }
  }, [isShattered]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full select-none outline-none ${className}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerDown={handlePressStart}
      onPointerUp={handleRelease}
      onPointerCancel={handleRelease}
      tabIndex={0}
      role="region"
      aria-label="Interactive 3D Glass Sphere. Press and hold to shatter, or click to reconstruct."
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
    >
      {/* 3D WebGL Canvas */}
      {!hasWebGlError ? (
        <Canvas
          camera={{ position: [0, 0, 7.2], fov: 42 }}
          gl={{
            antialias: true,
            powerPreference: 'high-performance',
            alpha: true,
          }}
          dpr={[1, 2]}
          onError={() => setHasWebGlError(true)}
        >
          <ShatteredSphere
            chargeProgress={chargeProgress}
            isShattered={isShattered}
            pointerPos={pointer}
          />
          <Sparkles
            count={70}
            scale={8}
            size={1.8}
            speed={0.4}
            color="#ccff00"
            opacity={0.4}
          />
        </Canvas>
      ) : (
        /* Graceful WebGL Fallback */
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-dark-900/80 backdrop-blur-md border border-white/10 rounded-2xl">
          <AlertCircle className="w-12 h-12 text-neon-lime mb-3 animate-pulse" />
          <h3 className="text-xl font-display font-bold">Hardware WebGL Offline</h3>
          <p className="text-sm text-gray-400 max-w-sm mt-1">
            Running in high-performance reduced-power mode. All portfolio showcases, typography, and interactive features remain fully operational.
          </p>
        </div>
      )}

      {/* Floating 3D Interaction HUD Control */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 pointer-events-auto">
        <div className="flex items-center gap-3 px-4 py-2.5 rounded-full glass-panel-glow border border-neon-lime/30 shadow-2xl backdrop-blur-xl">
          <div className="relative flex items-center justify-center w-7 h-7">
            {/* Circular charge SVG progress ring */}
            <svg className="w-7 h-7 -rotate-90">
              <circle
                cx="14"
                cy="14"
                r="11"
                stroke="currentColor"
                strokeWidth="2.5"
                fill="transparent"
                className="text-white/20"
              />
              <circle
                cx="14"
                cy="14"
                r="11"
                stroke="#ccff00"
                strokeWidth="2.5"
                fill="transparent"
                strokeDasharray={69.1}
                strokeDashoffset={69.1 - chargeProgress * 69.1}
                strokeLinecap="round"
                className="transition-all duration-75"
              />
            </svg>
            {isShattered ? (
              <RotateCcw className="w-3.5 h-3.5 text-neon-lime absolute animate-spin-slow" />
            ) : (
              <Zap className={`w-3.5 h-3.5 absolute transition-colors ${isPressing ? 'text-neon-lime fill-neon-lime' : 'text-gray-400'}`} />
            )}
          </div>

          <div className="text-left font-mono">
            <span className="block text-[11px] font-semibold tracking-wider uppercase text-white">
              {isShattered ? 'SHATTERED — TAP TO REBUILD' : isPressing ? `DETONATING ${Math.round(chargeProgress * 100)}%` : 'HOLD TO SHATTER'}
            </span>
            <span className="block text-[9px] text-gray-400 tracking-wider">
              {isShattered ? '[CLICK ANYWHERE TO RECONSTRUCT]' : '[CLICK & HOLD OR SPACEBAR]'}
            </span>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (isShattered) {
                setIsShattered(false);
                sfx.playReconstruct();
              } else {
                // Immediate toggle shatter
                setIsShattered(true);
                sfx.playShatter();
              }
            }}
            className="ml-1 px-2.5 py-1 text-[10px] font-mono tracking-widest uppercase bg-neon-lime/10 hover:bg-neon-lime text-neon-lime hover:text-black rounded border border-neon-lime/40 transition-colors"
          >
            {isShattered ? 'REBUILD' : 'TRIGGER'}
          </button>
        </div>
      </div>

      {/* Technical HUD telemetry badges */}
      <div className="hidden md:flex absolute top-6 right-6 flex-col items-end gap-1 font-mono text-[10px] text-gray-500 pointer-events-none select-none">
        <div className="flex items-center gap-1.5 text-neon-lime">
          <span className="w-1.5 h-1.5 rounded-full bg-neon-lime animate-ping" />
          <span>R3F_PHYSICS :: ACTIVE</span>
        </div>
        <div>MESH_FACETS :: 320 TRIANGULAR SHARDS</div>
        <div>ROTATION_LERP :: {(pointer.x * 45).toFixed(1)}° X | {(pointer.y * 45).toFixed(1)}° Y</div>
      </div>
    </div>
  );
};

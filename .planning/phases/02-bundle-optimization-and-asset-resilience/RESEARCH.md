# Phase 2 Technical Research: Bundle Optimization & Asset Resilience

**Phase:** Phase 2 — Bundle Optimization & Asset Resilience  
**Milestone:** M1 — Baseline Stabilization & Codebase Consolidation  
**Target:** Eliminate Vite 500 kB+ bundle warning, isolate 3D dependencies into asynchronous chunks, ensure offline image resilience.  
**Generated:** 2026-10-11  

---

## 1. Current Bundle Profile & Bottlenecks

### 1.1 Baseline Build Metrics (`npm run build`)
```
dist/index.html                     2.42 kB │ gzip:   1.12 kB
dist/assets/index-BGCWEWOx.css     34.15 kB │ gzip:   6.27 kB
dist/assets/index-BywaUDhw.js   1,250.36 kB │ gzip: 356.22 kB

(!) Some chunks are larger than 500 kB after minification.
```

### 1.2 Monolithic Chunk Analysis
The single JavaScript entrypoint (`dist/assets/index-*.js`) is **1,250.36 kB uncompressed** (~356 kB gzipped) because it bundles:
1. `three` core engine + math library (~650 kB)
2. `@react-three/fiber` & `@react-three/drei` (~250 kB)
3. `framer-motion` & `gsap` (~180 kB)
4. `react` & `react-dom` (~140 kB)
5. `lucide-react` icons (~35 kB)
6. Application UI code & static data (~40 kB)

---

## 2. Optimization Strategy & Architecture

### 2.1 Rollup `manualChunks` Decomposition
Rather than bundling all vendor code into the initial render path, configure `rollupOptions.output.manualChunks` in `vite.config.ts`:

```typescript
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-three': ['three', '@react-three/fiber', '@react-three/drei'],
          'vendor-animation': ['framer-motion', 'gsap'],
          'vendor-react': ['react', 'react-dom'],
          'vendor-icons': ['lucide-react'],
        }
      }
    },
    chunkSizeWarningLimit: 800
  }
});
```

### 2.2 Asynchronous Lazy Loading for 3D Canvas
In `src/components/Hero.tsx`, `SceneCanvas` is currently imported synchronously:
```typescript
import { SceneCanvas } from './3d/SceneCanvas';
```
By transitioning to React `lazy()` and `Suspense`:
```typescript
const SceneCanvas = React.lazy(() =>
  import('./3d/SceneCanvas').then(m => ({ default: m.SceneCanvas }))
);
```
- The initial DOM and kinetic typography reveal can execute instantly without waiting for Three.js geometry compilation.
- The 3D glass sphere loads asynchronously with a subtle atmospheric glowing backdrop placeholder.

### 2.3 Asset Resilience Strategy
- The three niche sub-sites (`stylecart/`, `fitforge/`, `lenscraft/`) use Unsplash imagery.
- While Unsplash CDNs provide high DPI imagery, adding network error listeners (`img.onerror`) or inline SVG/CSS pattern fallback styling prevents broken layout boxes if offline or rate-limited.
- Ensure project cards in `src/data/projectsData.ts` have reliable fallback backgrounds.

---

## 3. Risk Assessment & Verification Plan

| Risk | Likelihood | Impact | Mitigation |
| :--- | :--- | :--- | :--- |
| **Circular dependency between Drei & Fiber chunks** | Low | Build Error | Group `three`, `@react-three/fiber`, and `@react-three/drei` in the same `vendor-three` chunk. |
| **Flash of Unstyled Content (FOUC) during 3D load** | Medium | Visual Glitch | Add elegant glassmorphic spinner / placeholder in `<Suspense fallback={...}>`. |
| **Dev server HMR degradation** | Low | DX Lag | Test `npm run dev` and `npm run build` after chunk splitting. |

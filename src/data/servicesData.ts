export interface ServiceItem {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  techPillars: string[];
}

export const SERVICES: ServiceItem[] = [
  {
    number: '01',
    title: 'Creative Web Design',
    subtitle: 'Art Direction & Digital Worlds',
    description: 'Transforming brand narratives into visually arresting digital spaces. Every layout is intentionally composed with editorial rhythm, bespoke typography, and purposeful negative space.',
    deliverables: ['Custom Design Systems', 'Editorial Layouts', 'Interactive Prototypes', 'Responsive Typography'],
    techPillars: ['Figma Mastery', 'Design Tokens', 'Grid Systems']
  },
  {
    number: '02',
    title: '3D Web Experiences',
    subtitle: 'Interactive WebGL & Realtime Shaders',
    description: 'Pushing browser capabilities with Three.js, React Three Fiber, custom GLSL shaders, and physics-driven particle environments that achieve maximum engagement.',
    deliverables: ['Realistic PBR Materials', 'Interactive 3D Meshes', 'Procedural Particle Systems', 'Fluid Dynamics'],
    techPillars: ['Three.js', 'React Three Fiber', 'GLSL', 'Drei']
  },
  {
    number: '03',
    title: 'Frontend Engineering',
    subtitle: 'Scalable Architecture & Clean Code',
    description: 'Crafting bulletproof, type-safe web applications in React and TypeScript. Architected for effortless scalability, zero bloat, and sub-second load times.',
    deliverables: ['TypeScript SPAs & SSR', 'Modular Component Trees', 'State Machines', 'Accessibility (a11y)'],
    techPillars: ['React 19', 'TypeScript', 'Vite', 'Tailwind CSS']
  },
  {
    number: '04',
    title: 'Motion & Kinetic Typography',
    subtitle: 'Cinematic Choreography & Micro-Interactions',
    description: 'Choreographing fluid GSAP ScrollTrigger timelines, staggered typography reveals, and cursor-reactive lighting that guide the user with tactile satisfaction.',
    deliverables: ['Scroll-Driven Narratives', 'Kinetic Text Displays', 'Interactive Cursor Parallax', 'Physics Transitions'],
    techPillars: ['GSAP 3', 'ScrollTrigger', 'Framer Motion']
  },
  {
    number: '05',
    title: 'E-Commerce Architecture',
    subtitle: 'High-Impact Digital Flagships',
    description: 'Engineering seamless luxury digital storefronts with rapid cart state synchronization, dynamic currency switches, and high-converting checkout flows.',
    deliverables: ['Real-time Shopping Bag', 'Faceted Filtering Engine', 'High-DPI Zoom Inspection', 'Direct Lead Dispatch'],
    techPillars: ['Storefront APIs', 'Dynamic DOM', 'LocalStorage Synch']
  },
  {
    number: '06',
    title: 'Performance & Creative Systems',
    subtitle: 'Sub-second Speeds & Core Web Vitals',
    description: 'Striking the perfect equilibrium between cinematic 3D fidelity and 95+ Core Web Vitals scores across desktop and mobile devices.',
    deliverables: ['Asset Compression Pipelines', 'GPU Instancing', 'Memory Leak Prevention', 'SEO & OpenGraph Tags'],
    techPillars: ['Lighthouse 98+', 'GPU Profiling', 'Web Vitals']
  }
];

export interface ProcessStep {
  step: string;
  title: string;
  tagline: string;
  description: string;
  focus: string[];
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: '01',
    title: 'Discover',
    tagline: 'Deconstructing intent & artistic direction',
    description: 'We dive deep into your brand thesis, audience psychology, and competitive landscape. We define the emotional resonance and technical boundaries of the experience.',
    focus: ['Creative Direction', 'Moodboards & Lighting', 'Architecture Mapping']
  },
  {
    step: '02',
    title: 'Design',
    tagline: 'Sculpting typography, 3D assets & kinetic flow',
    description: 'Translating concepts into high-fidelity Figma artboards and 3D geometry tests. We iterate rapidly on type scale, material translucency, and spatial layout.',
    focus: ['Design Systems', '3D Asset Sculpting', 'Kinetic Motion Boards']
  },
  {
    step: '03',
    title: 'Develop',
    tagline: 'Coding in React, Three.js & GSAP',
    description: 'Bringing the art to life with rock-solid TypeScript, React Three Fiber shaders, and ScrollTrigger physics. Every component is built for speed and responsiveness.',
    focus: ['Three.js Scene Graph', 'GSAP Scroll Choreography', 'Component Composition']
  },
  {
    step: '04',
    title: 'Refine',
    tagline: 'Tuning physics, frame rates & micro-interactions',
    description: 'Auditing 60fps rendering across GPUs, refining spring dampening, polishing mobile touch behavior, and ensuring accessibility and audio-visual cohesion.',
    focus: ['GPU Profiling', 'Mobile Touch Physics', 'Haptic & Audio Tuning']
  },
  {
    step: '05',
    title: 'Launch',
    tagline: 'Deploying high-velocity digital experiences',
    description: 'Global CDN deployment, Lighthouse verification, production caching, and delivering clean, well-documented source code ready for global visibility.',
    focus: ['CDN Edge Distribution', 'Core Web Vitals Audit', 'Production Hand-off']
  }
];

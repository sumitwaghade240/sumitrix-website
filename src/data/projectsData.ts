export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  year: string;
  description: string;
  tags: string[];
  demoUrl: string;
  isExternal?: boolean;
  featuredImage: string;
  accentColor: string;
  statLabel: string;
  statValue: string;
}

export const PROJECTS: Project[] = [
  {
    id: 'stylecart',
    title: 'StyleCart',
    subtitle: 'Luxury Apparel & Editorial Fashion Store',
    category: 'E-Commerce Platform',
    year: '2026',
    description: 'An ultra-refined digital storefront engineered for luxury apparel. Features real-time multi-item cart management, responsive image zoom, instant checkout validation, and high-performance layout rendering.',
    tags: ['E-Commerce UX', 'State Architecture', 'Responsive CSS', 'Interactive Cart'],
    demoUrl: '/stylecart/index.html',
    featuredImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80',
    accentColor: '#d4ff00',
    statLabel: 'Cart Load Velocity',
    statValue: '< 0.3s'
  },
  {
    id: 'fitforge',
    title: 'FitForge',
    subtitle: 'High-Performance Athletic Coaching Suite',
    category: 'Health & Athletic Platform',
    year: '2026',
    description: 'A dark-mode powerhouse built for premium training facilities. Includes interactive client BMI calculators, workout split visualizers, membership selection drawers, and instant WhatsApp booking integration.',
    tags: ['Interactive Tools', 'Health Tech', 'Dynamic Modals', 'WhatsApp Bridge'],
    demoUrl: '/fitforge/index.html',
    featuredImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80',
    accentColor: '#ff4d4d',
    statLabel: 'Conversion Flow',
    statValue: '2.8x'
  },
  {
    id: 'lenscraft',
    title: 'LensCraft',
    subtitle: 'Cinematic Editorial Photography Studio',
    category: 'Commercial Visual Studio',
    year: '2026',
    description: 'A high-contrast visual portfolio crafted for commercial & editorial photographers. Features fluid masonry grids, category filtering, full-screen lightbox presentation, and integrated shoot inquiry dispatching.',
    tags: ['Masonry Grid', 'Editorial Art', 'Lightbox Engine', 'Booking Workflow'],
    demoUrl: '/lenscraft/index.html',
    featuredImage: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?auto=format&fit=crop&w=1200&q=80',
    accentColor: '#38bdf8',
    statLabel: 'Visual DPI Fidelity',
    statValue: '4K Native'
  },
  {
    id: 'synthetix',
    title: 'Synthetix Aether',
    subtitle: 'Generative Audio & Spatial Neural Web Interface',
    category: 'Creative Tech & 3D Experiential',
    year: '2026',
    description: 'An avant-garde audio workstation running directly in the browser. Employs the Web Audio API, dynamic Three.js shaders, and interactive node graphing to visualize complex harmonic resonance in real-time.',
    tags: ['Three.js', 'Web Audio API', 'Shader Art', 'Kinetic UI'],
    demoUrl: '#interactive-preview',
    featuredImage: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1200&q=80',
    accentColor: '#a855f7',
    statLabel: 'Synthesized Latency',
    statValue: '12ms'
  }
];

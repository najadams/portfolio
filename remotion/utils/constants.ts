export const VIDEO_CONFIG = {
  fps: 30,
  width: 1920,
  height: 1080,
  durationInFrames: 180, // 6 seconds at 30fps
} as const

export const INTRO_DURATION = {
  backgroundFadeIn: 15, // 0.5s
  nameReveal: 30, // 1s
  subtitleSlide: 30, // 1s
  techOrbit: 45, // 1.5s
  particleConverge: 30, // 1s
  fadeOut: 30, // 1s
} as const

export const COLORS = {
  primary: '#3b82f6',
  secondary: '#8b5cf6',
  background: '#0f172a',
  foreground: '#f8fafc',
  muted: '#64748b',
} as const

export const TECH_STACK = [
  { name: 'React', color: '#61dafb' },
  { name: 'Next.js', color: '#ffffff' },
  { name: 'Node.js', color: '#68a063' },
  { name: 'TypeScript', color: '#3178c6' },
] as const

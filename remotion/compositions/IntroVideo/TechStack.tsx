import { interpolate, useCurrentFrame } from 'remotion'
import { TECH_STACK } from '../../utils/constants'

interface TechStackProps {
  startFrame: number
}

export const TechStack: React.FC<TechStackProps> = ({ startFrame }) => {
  const frame = useCurrentFrame()
  const radius = 200

  return (
    <div
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {TECH_STACK.map((tech, index) => {
        const itemStartFrame = startFrame + index * 8
        const baseAngle = (index / TECH_STACK.length) * Math.PI * 2
        const rotation = interpolate(
          frame,
          [itemStartFrame, itemStartFrame + 120],
          [0, Math.PI * 2],
          { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
        )
        const angle = baseAngle + rotation
        const scale = interpolate(
          frame,
          [itemStartFrame, itemStartFrame + 15],
          [0, 1],
          { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
        )
        const opacity = interpolate(
          frame,
          [itemStartFrame, itemStartFrame + 15],
          [0, 1],
          { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
        )

        const x = Math.cos(angle) * radius
        const y = Math.sin(angle) * radius

        return (
          <div
            key={tech.name}
            style={{
              position: 'absolute',
              transform: `translate(${x}px, ${y}px) scale(${scale})`,
              opacity,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <div
              style={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                backgroundColor: `${tech.color}20`,
                border: `2px solid ${tech.color}`,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: 14,
                fontWeight: 600,
                color: tech.color,
                fontFamily: 'system-ui, -apple-system, sans-serif',
              }}
            >
              {tech.name.slice(0, 2).toUpperCase()}
            </div>
            <span
              style={{
                fontSize: 16,
                color: tech.color,
                fontWeight: 500,
                fontFamily: 'system-ui, -apple-system, sans-serif',
              }}
            >
              {tech.name}
            </span>
          </div>
        )
      })}
    </div>
  )
}

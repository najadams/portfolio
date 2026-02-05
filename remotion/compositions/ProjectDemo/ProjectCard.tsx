import { interpolate, useCurrentFrame } from 'remotion'
import { COLORS } from '../../utils/constants'

interface ProjectCardProps {
  title: string
  description: string
  tech: string[]
  startFrame: number
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  tech,
  startFrame,
}) => {
  const frame = useCurrentFrame()

  const cardOpacity = interpolate(
    frame,
    [startFrame, startFrame + 20],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  )

  const cardScale = interpolate(
    frame,
    [startFrame, startFrame + 20],
    [0.9, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  )

  const slideX = interpolate(
    frame,
    [startFrame + 30, startFrame + 50],
    [100, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  )

  return (
    <div
      style={{
        opacity: cardOpacity,
        transform: `scale(${cardScale})`,
        backgroundColor: '#1e293b',
        borderRadius: 24,
        padding: 60,
        maxWidth: 800,
        border: `1px solid ${COLORS.primary}30`,
        boxShadow: `0 0 60px ${COLORS.primary}20`,
      }}
    >
      <h2
        style={{
          fontSize: 56,
          fontWeight: 700,
          color: COLORS.foreground,
          marginBottom: 20,
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        {title}
      </h2>

      <div
        style={{
          transform: `translateX(${slideX}px)`,
          opacity: interpolate(
            frame,
            [startFrame + 30, startFrame + 50],
            [0, 1],
            { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
          ),
        }}
      >
        <p
          style={{
            fontSize: 28,
            color: COLORS.muted,
            marginBottom: 40,
            lineHeight: 1.6,
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
        >
          {description}
        </p>

        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          {tech.map((item, index) => {
            const badgeDelay = startFrame + 60 + index * 5
            const badgeOpacity = interpolate(
              frame,
              [badgeDelay, badgeDelay + 10],
              [0, 1],
              { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
            )
            const badgeScale = interpolate(
              frame,
              [badgeDelay, badgeDelay + 10],
              [0.5, 1],
              { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
            )

            return (
              <span
                key={item}
                style={{
                  opacity: badgeOpacity,
                  transform: `scale(${badgeScale})`,
                  padding: '12px 24px',
                  backgroundColor: `${COLORS.primary}20`,
                  color: COLORS.primary,
                  borderRadius: 50,
                  fontSize: 20,
                  fontWeight: 500,
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                }}
              >
                {item}
              </span>
            )
          })}
        </div>
      </div>
    </div>
  )
}

import { interpolate, useCurrentFrame } from 'remotion'
import { COLORS } from '../utils/constants'

interface AnimatedTextProps {
  text: string
  startFrame: number
  fontSize?: number
  color?: string
  letterDelay?: number
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  startFrame,
  fontSize = 120,
  color = COLORS.foreground,
  letterDelay = 2,
}) => {
  const frame = useCurrentFrame()

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      {text.split('').map((letter, index) => {
        const letterStartFrame = startFrame + index * letterDelay
        const opacity = interpolate(
          frame,
          [letterStartFrame, letterStartFrame + 10],
          [0, 1],
          { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
        )
        const translateY = interpolate(
          frame,
          [letterStartFrame, letterStartFrame + 10],
          [30, 0],
          { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
        )

        return (
          <span
            key={index}
            style={{
              display: 'inline-block',
              opacity,
              transform: `translateY(${translateY}px)`,
              fontSize,
              fontWeight: 700,
              color,
              fontFamily: 'system-ui, -apple-system, sans-serif',
            }}
          >
            {letter === ' ' ? '\u00A0' : letter}
          </span>
        )
      })}
    </div>
  )
}

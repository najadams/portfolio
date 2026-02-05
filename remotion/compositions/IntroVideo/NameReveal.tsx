import { interpolate, useCurrentFrame } from 'remotion'
import { AnimatedText } from '../../components/AnimatedText'
import { COLORS } from '../../utils/constants'

interface NameRevealProps {
  startFrame: number
}

export const NameReveal: React.FC<NameRevealProps> = ({ startFrame }) => {
  const frame = useCurrentFrame()

  const subtitleOpacity = interpolate(
    frame,
    [startFrame + 45, startFrame + 60],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  )

  const subtitleY = interpolate(
    frame,
    [startFrame + 45, startFrame + 60],
    [20, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  )

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 20,
      }}
    >
      <AnimatedText
        text="Najm Adams"
        startFrame={startFrame}
        fontSize={140}
        color={COLORS.foreground}
        letterDelay={3}
      />
      <div
        style={{
          opacity: subtitleOpacity,
          transform: `translateY(${subtitleY}px)`,
          fontSize: 48,
          fontWeight: 300,
          color: COLORS.primary,
          fontFamily: 'system-ui, -apple-system, sans-serif',
          letterSpacing: '0.2em',
        }}
      >
        SOFTWARE DEVELOPER
      </div>
    </div>
  )
}

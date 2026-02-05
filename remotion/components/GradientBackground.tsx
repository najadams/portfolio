import { interpolate, useCurrentFrame } from 'remotion'
import { COLORS } from '../utils/constants'

interface GradientBackgroundProps {
  fadeInDuration?: number
}

export const GradientBackground: React.FC<GradientBackgroundProps> = ({
  fadeInDuration = 15,
}) => {
  const frame = useCurrentFrame()
  const opacity = interpolate(frame, [0, fadeInDuration], [0, 1], {
    extrapolateRight: 'clamp',
  })

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        opacity,
        background: `radial-gradient(ellipse at 30% 20%, ${COLORS.primary}40 0%, transparent 50%),
                     radial-gradient(ellipse at 70% 80%, ${COLORS.secondary}30 0%, transparent 50%),
                     linear-gradient(180deg, ${COLORS.background} 0%, #1e293b 100%)`,
      }}
    />
  )
}

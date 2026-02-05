import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion'
import { GradientBackground } from '../../components/GradientBackground'
import { NameReveal } from './NameReveal'
import { TechStack } from './TechStack'
import { COLORS, VIDEO_CONFIG } from '../../utils/constants'

export const IntroVideo: React.FC = () => {
  const frame = useCurrentFrame()

  // Scroll prompt animation (frames 150-180)
  const scrollOpacity = interpolate(frame, [150, 160, 170, 180], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

  const scrollY = interpolate(frame, [150, 180], [0, 10], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

  // Overall fade out
  const fadeOut = interpolate(
    frame,
    [VIDEO_CONFIG.durationInFrames - 30, VIDEO_CONFIG.durationInFrames],
    [1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  )

  return (
    <AbsoluteFill style={{ opacity: fadeOut }}>
      <GradientBackground fadeInDuration={15} />

      {/* Floating particles */}
      {Array.from({ length: 30 }).map((_, i) => {
        const particleX = (i * 67) % 100
        const particleY = (i * 43) % 100
        const delay = i * 3
        const particleOpacity = interpolate(
          frame,
          [delay, delay + 30, 120, 150],
          [0, 0.3, 0.3, 0],
          { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
        )
        const convergeX = interpolate(frame, [120, 150], [0, 50 - particleX], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        })
        const convergeY = interpolate(frame, [120, 150], [0, 50 - particleY], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        })

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${particleX + convergeX}%`,
              top: `${particleY + convergeY}%`,
              width: 6,
              height: 6,
              borderRadius: '50%',
              backgroundColor: COLORS.primary,
              opacity: particleOpacity,
            }}
          />
        )
      })}

      {/* Main content */}
      <AbsoluteFill
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <NameReveal startFrame={15} />
        <TechStack startFrame={75} />
      </AbsoluteFill>

      {/* Scroll prompt */}
      <div
        style={{
          position: 'absolute',
          bottom: 80,
          left: '50%',
          transform: `translateX(-50%) translateY(${scrollY}px)`,
          opacity: scrollOpacity,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <span
          style={{
            fontSize: 18,
            color: COLORS.muted,
            fontFamily: 'system-ui, -apple-system, sans-serif',
            letterSpacing: '0.1em',
          }}
        >
          SCROLL TO EXPLORE
        </span>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke={COLORS.muted}
          strokeWidth="2"
        >
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>
    </AbsoluteFill>
  )
}

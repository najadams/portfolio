import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion'
import { GradientBackground } from '../../components/GradientBackground'
import { ProjectCard } from './ProjectCard'

interface ProjectDemoProps {
  title: string
  description: string
  tech: string[]
}

export const ProjectDemo: React.FC<ProjectDemoProps> = ({
  title,
  description,
  tech,
}) => {
  const frame = useCurrentFrame()

  // 10 seconds at 30fps = 300 frames
  const fadeOut = interpolate(frame, [270, 300], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

  return (
    <AbsoluteFill style={{ opacity: fadeOut }}>
      <GradientBackground fadeInDuration={15} />

      <AbsoluteFill
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          padding: 80,
        }}
      >
        <ProjectCard
          title={title}
          description={description}
          tech={tech}
          startFrame={15}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  )
}

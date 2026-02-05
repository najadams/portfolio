import { Composition } from 'remotion'
import { IntroVideo } from './compositions/IntroVideo'
import { ProjectDemo } from './compositions/ProjectDemo'
import { VIDEO_CONFIG } from './utils/constants'

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="IntroVideo"
        component={IntroVideo}
        durationInFrames={VIDEO_CONFIG.durationInFrames}
        fps={VIDEO_CONFIG.fps}
        width={VIDEO_CONFIG.width}
        height={VIDEO_CONFIG.height}
      />
      <Composition
        id="ProjectDemo"
        component={ProjectDemo}
        durationInFrames={300} // 10 seconds
        fps={VIDEO_CONFIG.fps}
        width={VIDEO_CONFIG.width}
        height={VIDEO_CONFIG.height}
        defaultProps={{
          title: 'Sample Project',
          description: 'A comprehensive project description goes here.',
          tech: ['React', 'Node.js', 'TypeScript'],
        }}
      />
    </>
  )
}

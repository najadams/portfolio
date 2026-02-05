"use client"

import { useState, useEffect, useCallback, useRef } from 'react'
import { Player, PlayerRef } from '@remotion/player'
import { IntroVideo } from '@/remotion/compositions/IntroVideo'
import { VIDEO_CONFIG } from '@/remotion/utils/constants'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'

const STORAGE_KEY = 'portfolio-intro-seen'

export function IntroModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const playerRef = useRef<PlayerRef>(null)

  const handleClose = useCallback(() => {
    setIsOpen(false)
    localStorage.setItem(STORAGE_KEY, 'true')
  }, [])

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    // Check if first visit
    const hasSeenIntro = localStorage.getItem(STORAGE_KEY)
    if (!hasSeenIntro && !mediaQuery.matches) {
      setIsOpen(true)
    }

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  useEffect(() => {
    const player = playerRef.current
    if (!player || !isOpen) return

    const handleEnded = () => {
      // Auto-close after video completes
      setTimeout(handleClose, 500)
    }

    player.addEventListener('ended', handleEnded)
    return () => player.removeEventListener('ended', handleEnded)
  }, [isOpen, handleClose])

  if (!isOpen || prefersReducedMotion) {
    return null
  }

  return (
    <div
      className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label="Introduction video"
    >
      {/* Skip button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={handleClose}
        className="absolute top-6 right-6 z-10 text-white/70 hover:text-white hover:bg-white/10"
        aria-label="Skip intro"
      >
        <X className="h-6 w-6" />
      </Button>

      {/* Skip text */}
      <button
        onClick={handleClose}
        className="absolute bottom-8 right-8 z-10 text-white/50 hover:text-white/80 text-sm font-medium tracking-wide transition-colors"
      >
        Skip Intro
      </button>

      {/* Video player */}
      <div className="w-full h-full max-w-[1920px] max-h-[1080px] aspect-video">
        <Player
          ref={playerRef}
          component={IntroVideo}
          durationInFrames={VIDEO_CONFIG.durationInFrames}
          fps={VIDEO_CONFIG.fps}
          compositionWidth={VIDEO_CONFIG.width}
          compositionHeight={VIDEO_CONFIG.height}
          style={{
            width: '100%',
            height: '100%',
          }}
          autoPlay
          controls={false}
          loop={false}
        />
      </div>
    </div>
  )
}

"use client"

import { useState, useEffect, useCallback, useRef, RefObject } from "react"

interface MousePosition {
  x: number
  y: number
}

interface UseMousePositionOptions {
  includeTouch?: boolean
}

/**
 * Hook to track global mouse position
 */
export function useMousePosition(options: UseMousePositionOptions = {}): MousePosition {
  const { includeTouch = false } = options
  const [position, setPosition] = useState<MousePosition>({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        setPosition({ x: e.touches[0].clientX, y: e.touches[0].clientY })
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    if (includeTouch) {
      window.addEventListener("touchmove", handleTouchMove)
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      if (includeTouch) {
        window.removeEventListener("touchmove", handleTouchMove)
      }
    }
  }, [includeTouch])

  return position
}

interface RelativePosition {
  x: number // -0.5 to 0.5, center is 0
  y: number // -0.5 to 0.5, center is 0
  isHovering: boolean
}

/**
 * Hook to track mouse position relative to an element's center
 * Returns values from -0.5 to 0.5 for use with tilt effects
 */
export function useRelativeMousePosition<T extends HTMLElement>(
  ref: RefObject<T | null>
): RelativePosition {
  const [position, setPosition] = useState<RelativePosition>({
    x: 0,
    y: 0,
    isHovering: false,
  })

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!ref.current) return

    const rect = ref.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5

    setPosition({ x, y, isHovering: true })
  }, [ref])

  const handleMouseLeave = useCallback(() => {
    setPosition({ x: 0, y: 0, isHovering: false })
  }, [])

  useEffect(() => {
    const element = ref.current
    if (!element) return

    element.addEventListener("mousemove", handleMouseMove)
    element.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      element.removeEventListener("mousemove", handleMouseMove)
      element.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [ref, handleMouseMove, handleMouseLeave])

  return position
}

interface TiltStyle {
  transform: string
  transition: string
}

interface UseTiltOptions {
  maxTilt?: number
  perspective?: number
  scale?: number
  speed?: number
}

/**
 * Hook that provides tilt transform styles based on mouse position
 * for 3D card tilt effects
 */
export function useTilt<T extends HTMLElement>(
  ref: RefObject<T | null>,
  options: UseTiltOptions = {}
): TiltStyle {
  const {
    maxTilt = 10,
    perspective = 1000,
    scale = 1.02,
    speed = 300,
  } = options

  const { x, y, isHovering } = useRelativeMousePosition(ref)

  const transform = isHovering
    ? `perspective(${perspective}px) rotateX(${-y * maxTilt}deg) rotateY(${x * maxTilt}deg) scale(${scale})`
    : `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale(1)`

  return {
    transform,
    transition: `transform ${speed}ms cubic-bezier(0.03, 0.98, 0.52, 0.99)`,
  }
}

/**
 * Hook to track if reduced motion is preferred
 */
export function usePrefersReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  return prefersReducedMotion
}

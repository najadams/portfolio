"use client"

import { motion, HTMLMotionProps, Variants } from "framer-motion"
import { ReactNode, forwardRef } from "react"

// Spring configurations for different animation feels
export const springConfigs = {
  bouncy: { type: "spring", stiffness: 400, damping: 10 },
  gentle: { type: "spring", stiffness: 300, damping: 20 },
  snappy: { type: "spring", stiffness: 500, damping: 25 },
  wobbly: { type: "spring", stiffness: 200, damping: 8 },
} as const

// Hover animation variants
export const hoverVariants = {
  spinBounce: {
    rotate: 360,
    scale: [1, 1.1, 1],
    transition: { duration: 0.6, ease: [0.68, -0.55, 0.265, 1.55] },
  },
  heartbeat: {
    scale: [1, 1.15, 1, 1.15, 1],
    transition: { duration: 1.3, ease: "easeInOut" },
  },
  wiggle: {
    rotate: [0, -10, 10, -5, 5, 0],
    transition: { duration: 0.5, ease: "easeInOut" },
  },
  jelly: {
    scale: [1, 0.9, 1.1, 0.95, 1.05, 1],
    transition: { duration: 0.5, ease: "easeInOut" },
  },
  rubberBand: {
    scaleX: [1, 1.25, 0.75, 1.15, 0.95, 1.05, 1],
    scaleY: [1, 0.75, 1.25, 0.85, 1.05, 0.95, 1],
    transition: { duration: 0.8, ease: "easeInOut" },
  },
}

// Tap animation - tactile feedback
export const tapAnimation = {
  scale: 0.9,
  transition: { type: "spring", stiffness: 400, damping: 17 },
}

// Stagger container variants
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
}

// Pop-in variant for children
export const popInVariant: Variants = {
  hidden: { opacity: 0, scale: 0, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 15,
    },
  },
}

// Flip-in variant
export const flipInVariant: Variants = {
  hidden: { opacity: 0, rotateY: -90 },
  visible: {
    opacity: 1,
    rotateY: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 20,
    },
  },
}

// Slide variants
export const slideInLeftVariant: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  },
}

export const slideInRightVariant: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  },
}

// Cascade diagonal variant
export const cascadeDiagonalVariant: Variants = {
  hidden: { opacity: 0, x: -30, y: 30 },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  },
}

// Animated social icon component
interface SocialIconProps extends HTMLMotionProps<"a"> {
  children: ReactNode
  hoverEffect?: keyof typeof hoverVariants
  href: string
}

export const AnimatedSocialIcon = forwardRef<HTMLAnchorElement, SocialIconProps>(
  ({ children, hoverEffect = "spinBounce", href, className, ...props }, ref) => {
    return (
      <motion.a
        ref={ref}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        whileHover={hoverVariants[hoverEffect]}
        whileTap={tapAnimation}
        {...props}
      >
        {children}
      </motion.a>
    )
  }
)
AnimatedSocialIcon.displayName = "AnimatedSocialIcon"

// Animated tech tag component
interface TechTagProps extends HTMLMotionProps<"span"> {
  children: ReactNode
  index?: number
}

export const AnimatedTechTag = forwardRef<HTMLSpanElement, TechTagProps>(
  ({ children, index = 0, className, ...props }, ref) => {
    return (
      <motion.span
        ref={ref}
        className={className}
        initial={{ opacity: 0, scale: 0, y: 20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 15,
          delay: index * 0.05,
        }}
        whileHover={{
          scale: 1.1,
          boxShadow: "0 0 15px hsl(var(--primary) / 0.5)",
        }}
        whileTap={{ scale: 0.95 }}
        {...props}
      >
        {children}
      </motion.span>
    )
  }
)
AnimatedTechTag.displayName = "AnimatedTechTag"

// Animated button with spring physics
interface AnimatedButtonProps extends HTMLMotionProps<"button"> {
  children: ReactNode
}

export const AnimatedButton = forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        className={className}
        whileHover={{ scale: 1.05 }}
        whileTap={tapAnimation}
        transition={springConfigs.bouncy}
        {...props}
      >
        {children}
      </motion.button>
    )
  }
)
AnimatedButton.displayName = "AnimatedButton"

// Nav item with elastic underline
interface NavItemProps extends HTMLMotionProps<"button"> {
  children: ReactNode
  isActive?: boolean
}

export const AnimatedNavItem = forwardRef<HTMLButtonElement, NavItemProps>(
  ({ children, isActive, className, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        className={className}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        transition={springConfigs.snappy}
        {...props}
      >
        {children}
        <motion.div
          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isActive ? 1 : 0 }}
          whileHover={{ scaleX: 1 }}
          transition={springConfigs.bouncy}
          style={{ originX: 0.5 }}
        />
      </motion.button>
    )
  }
)
AnimatedNavItem.displayName = "AnimatedNavItem"

// 3D tilt card wrapper
interface TiltCardProps extends HTMLMotionProps<"div"> {
  children: ReactNode
  tiltAmount?: number
}

export const TiltCard = forwardRef<HTMLDivElement, TiltCardProps>(
  ({ children, tiltAmount = 10, className, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={className}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={springConfigs.gentle}
        style={{ transformStyle: "preserve-3d" }}
        {...props}
      >
        {children}
      </motion.div>
    )
  }
)
TiltCard.displayName = "TiltCard"

// Progress bar with shimmer
interface AnimatedProgressProps {
  value: number
  delay?: number
  className?: string
}

export const AnimatedProgress = ({ value, delay = 0, className }: AnimatedProgressProps) => {
  return (
    <div className={`w-full bg-muted rounded-full h-2 mb-2 overflow-hidden ${className || ""}`}>
      <motion.div
        className="bg-primary h-2 rounded-full relative overflow-hidden"
        initial={{ width: 0 }}
        whileInView={{ width: `${value}%` }}
        viewport={{ once: true }}
        transition={{
          duration: 1,
          delay,
          ease: [0.33, 1, 0.68, 1],
        }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
          animate={{ x: ["-100%", "100%"] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 1,
            ease: "linear",
          }}
        />
      </motion.div>
    </div>
  )
}

// Animated counter for percentage
interface AnimatedCounterProps {
  value: number
  delay?: number
  className?: string
}

export const AnimatedCounter = ({ value, delay = 0, className }: AnimatedCounterProps) => {
  return (
    <motion.span
      className={className}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay }}
      >
        {value}%
      </motion.span>
    </motion.span>
  )
}

// Floating animation wrapper
interface FloatingProps extends HTMLMotionProps<"div"> {
  children: ReactNode
  duration?: number
  y?: number
}

export const Floating = forwardRef<HTMLDivElement, FloatingProps>(
  ({ children, duration = 3, y = 10, className, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={className}
        animate={{
          y: [0, -y, 0],
        }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        {...props}
      >
        {children}
      </motion.div>
    )
  }
)
Floating.displayName = "Floating"

// Staggered children container
interface StaggerContainerProps extends HTMLMotionProps<"div"> {
  children: ReactNode
  staggerDelay?: number
}

export const StaggerContainer = forwardRef<HTMLDivElement, StaggerContainerProps>(
  ({ children, staggerDelay = 0.1, className, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={className}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: staggerDelay,
              delayChildren: 0.1,
            },
          },
        }}
        {...props}
      >
        {children}
      </motion.div>
    )
  }
)
StaggerContainer.displayName = "StaggerContainer"

// Generic motion item for use in stagger containers
interface MotionItemProps extends HTMLMotionProps<"div"> {
  children: ReactNode
  variant?: "popIn" | "flipIn" | "slideLeft" | "slideRight" | "cascade"
}

const variantMap = {
  popIn: popInVariant,
  flipIn: flipInVariant,
  slideLeft: slideInLeftVariant,
  slideRight: slideInRightVariant,
  cascade: cascadeDiagonalVariant,
}

export const MotionItem = forwardRef<HTMLDivElement, MotionItemProps>(
  ({ children, variant = "popIn", className, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={className}
        variants={variantMap[variant]}
        {...props}
      >
        {children}
      </motion.div>
    )
  }
)
MotionItem.displayName = "MotionItem"

// Export motion for direct use
export { motion }

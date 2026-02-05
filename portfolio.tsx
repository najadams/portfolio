"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Github, Linkedin, Mail, ExternalLink, Code, Database, Globe, Smartphone, Send, Menu, X, Heart } from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { IntroModal } from "@/components/IntroModal"
import { projects } from "@/data/projects"
import {
  AnimatedSocialIcon,
  AnimatedTechTag,
  AnimatedProgress,
  AnimatedCounter,
  Floating,
  StaggerContainer,
  MotionItem,
  springConfigs,
  hoverVariants,
  tapAnimation,
} from "@/components/animations/MotionWrapper"
import { useTilt, usePrefersReducedMotion } from "@/hooks/useMousePosition"

export default function Portfolio() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [scrollY, setScrollY] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set())
  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSendAnimating, setIsSendAnimating] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const lightTrailRef = useRef<HTMLDivElement>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    setIsVisible(true)

    const handleScroll = () => {
      const sections = ["home", "about", "skills", "projects", "contact"]
      const scrollPosition = window.scrollY + 100
      setScrollY(window.scrollY)

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }

      // Update light trail position
      if (lightTrailRef.current) {
        const progress = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)
        const amplitude = 100
        const x = Math.sin(progress * Math.PI * 8) * amplitude + window.innerWidth / 2
        const y = progress * (document.documentElement.scrollHeight - 100)

        lightTrailRef.current.style.transform = `translate(${x}px, ${y}px)`
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    // Intersection Observer for lazy loading animations
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleElements(prev => new Set([...prev, entry.target.id]))
          }
        })
      },
      { threshold: 0.1, rootMargin: '50px' }
    )

    // Observe all sections
    const sections = document.querySelectorAll('[data-animate]')
    sections.forEach(section => {
      if (observerRef.current) {
        observerRef.current.observe(section)
      }
    })

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("mousemove", handleMouseMove)
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setMobileMenuOpen(false)
  }

  const handleContactFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setContactForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setIsSendAnimating(true)

    try {
      // Create mailto link with form data
      const subject = encodeURIComponent(contactForm.subject || 'Contact from Portfolio')
      const body = encodeURIComponent(
        `Name: ${contactForm.name}\n` +
        `Email: ${contactForm.email}\n\n` +
        `Message:\n${contactForm.message}`
      )
      const mailtoLink = `mailto:najmadams1706@gmail.com?subject=${subject}&body=${body}`

      // Open email client
      window.open(mailtoLink, '_blank')

      // Reset form
      setContactForm({ name: '', email: '', subject: '', message: '' })

      // Show success message
      alert('Email client opened! Please send the email from your email application.')
    } catch (error) {
      console.error('Error opening email client:', error)
      alert('There was an error opening your email client. Please try again.')
    } finally {
      setIsSubmitting(false)
      setTimeout(() => setIsSendAnimating(false), 500)
    }
  }

  const skills = [
    { name: "Frontend Development", icon: Globe, level: 95 },
    { name: "Backend Development", icon: Database, level: 90 },
    { name: "Mobile Development", icon: Smartphone, level: 85 },
    { name: "DevOps & Cloud", icon: Code, level: 80 },
  ]

  const navItems = ["home", "about", "skills", "projects", "contact"]

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Intro Modal */}
      <IntroModal />

      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary rounded-full opacity-20"
            style={{
              left: `${(i * 5) % 100}%`,
              top: `${(i * 7) % 100}%`,
            }}
            animate={
              prefersReducedMotion
                ? {}
                : {
                    y: [0, -20, 0],
                    opacity: [0.2, 0.5, 0.2],
                  }
            }
            transition={{
              duration: 3 + (i % 3),
              repeat: Infinity,
              delay: (i * 0.15) % 3,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Wavy Light Trail */}
        <div
          ref={lightTrailRef}
          className="absolute w-4 h-4 pointer-events-none transition-transform duration-100 ease-out"
          style={{
            background:
              "radial-gradient(circle, hsl(var(--primary) / 0.8) 0%, hsl(var(--primary) / 0.4) 30%, transparent 70%)",
            filter: "blur(2px)",
            boxShadow:
              "0 0 20px hsl(var(--primary) / 0.6), 0 0 40px hsl(var(--primary) / 0.4)",
          }}
        />

        {/* Mouse Follower */}
        <motion.div
          className="absolute w-6 h-6 pointer-events-none"
          animate={{
            left: mousePosition.x - 12,
            top: mousePosition.y - 12,
          }}
          transition={{ type: "spring", stiffness: 500, damping: 28 }}
          style={{
            background:
              "radial-gradient(circle, rgba(147, 51, 234, 0.3) 0%, transparent 70%)",
            filter: "blur(1px)",
          }}
        />

        {/* Gradient Orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
          animate={prefersReducedMotion ? {} : { scale: [1, 1.1, 1], opacity: [0.1, 0.15, 0.1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
          animate={prefersReducedMotion ? {} : { scale: [1.1, 1, 1.1], opacity: [0.1, 0.15, 0.1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>

      {/* Navigation */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={springConfigs.bouncy}
      >
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <motion.div
              className="text-xl font-bold text-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Najm Adams
            </motion.div>
            <div className="flex items-center">
              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-8">
                {navItems.map((section) => (
                  <motion.button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className={`capitalize relative ${
                      activeSection === section
                        ? "text-primary font-medium"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    transition={springConfigs.snappy}
                  >
                    {section}
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: activeSection === section ? 1 : 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={springConfigs.bouncy}
                      style={{ originX: 0.5 }}
                    />
                  </motion.button>
                ))}
              </div>

              {/* Mobile Menu Button */}
              <motion.button
                className="md:hidden p-2 mr-2"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                whileTap={{ scale: 0.9 }}
              >
                <AnimatePresence mode="wait">
                  {mobileMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="w-6 h-6" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="w-6 h-6" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>

              <ThemeToggle />
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md border-b border-border"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={springConfigs.snappy}
            >
              <div className="px-6 py-4 space-y-2">
                {navItems.map((section, index) => (
                  <motion.button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className={`block w-full text-left capitalize py-2 ${
                      activeSection === section
                        ? "text-primary font-medium"
                        : "text-muted-foreground"
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05, ...springConfigs.snappy }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {section}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section */}
      <section
        id="home"
        className="min-h-screen flex items-center justify-center px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
          >
            <h1 className="text-5xl md:text-7xl font-light mb-6 leading-tight">
              {"Software".split("").map((char, i) => (
                <motion.span
                  key={i}
                  className="inline-block"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.1 + i * 0.05,
                    type: "spring",
                    stiffness: 300,
                    damping: 10,
                  }}
                  whileHover={prefersReducedMotion ? {} : { y: -5, scale: 1.1 }}
                >
                  {char}
                </motion.span>
              ))}
              <motion.span
                className="block text-primary font-medium"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
              >
                Developer
              </motion.span>
            </h1>
            <motion.p
              className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              Crafting digital experiences with clean code and innovative
              solutions
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={tapAnimation}>
                <Button
                  onClick={() => scrollToSection("projects")}
                  className="px-8 py-3 text-lg bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 hover:shadow-lg hover:shadow-primary/25">
                  View My Work
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={tapAnimation}>
                <Button
                  variant="outline"
                  onClick={() => scrollToSection("contact")}
                  className="px-8 py-3 text-lg border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:shadow-lg">
                  Get In Touch
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="py-24 px-6 bg-muted relative z-10"
        data-animate>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2
              className="text-4xl md:text-5xl font-light mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={springConfigs.gentle}
            >
              About Me
            </motion.h2>
            <motion.div
              className="w-20 h-1 bg-primary mx-auto"
              initial={{ width: 0 }}
              whileInView={{ width: 80 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
            />
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={springConfigs.gentle}
            >
              <p className="text-lg text-muted-foreground leading-relaxed">
                I'm a passionate full-stack developer with expertise in building
                modern web applications and scalable solutions. I specialize in
                React, Next.js, Node.js, and cloud technologies, with a focus on
                creating exceptional user experiences.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                When I'm not coding, you'll find me exploring new technologies,
                contributing to open source projects, and continuously learning
                to stay at the forefront of web development trends and best
                practices.
              </p>
              <div className="flex space-x-4 pt-4">
                <AnimatedSocialIcon
                  href="https://github.com/najadams"
                  hoverEffect="spinBounce"
                  className="p-3 bg-background rounded-full shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <Github className="w-6 h-6 text-muted-foreground" />
                </AnimatedSocialIcon>
                <AnimatedSocialIcon
                  href="https://www.linkedin.com/in/najm-lambon-a11480234/"
                  hoverEffect="heartbeat"
                  className="p-3 bg-background rounded-full shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <Linkedin className="w-6 h-6 text-muted-foreground" />
                </AnimatedSocialIcon>
                <AnimatedSocialIcon
                  href="mailto:najmadams1706@gmail.com"
                  hoverEffect="wiggle"
                  className="p-3 bg-background rounded-full shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <Mail className="w-6 h-6 text-muted-foreground" />
                </AnimatedSocialIcon>
              </div>
            </motion.div>
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={springConfigs.gentle}
            >
              <motion.div
                className="w-80 h-80 mx-auto bg-gradient-to-br from-primary to-purple-600 rounded-full opacity-20 absolute -top-4 -left-4"
                animate={
                  prefersReducedMotion
                    ? {}
                    : { rotate: 360 }
                }
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              <Floating duration={4} y={15}>
                <div className="w-80 h-80 mx-auto relative">
                  {/* Rotating gradient border */}
                  <motion.div
                    className="absolute -inset-1 rounded-full animate-gradient-rotate"
                    style={{ padding: "3px" }}
                  >
                    <div className="w-full h-full bg-muted rounded-full" />
                  </motion.div>
                  <div className="w-80 h-80 mx-auto bg-muted rounded-full relative overflow-hidden">
                    <img
                      src="/pic.JPG"
                      alt="Najm Adams"
                      className="w-full h-full object-cover rounded-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-primary to-purple-600 opacity-10 rounded-full"></div>
                  </div>
                </div>
              </Floating>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 px-6 relative z-10" data-animate>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2
              className="text-4xl md:text-5xl font-light mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={springConfigs.gentle}
            >
              Skills & Expertise
            </motion.h2>
            <motion.div
              className="w-20 h-1 bg-primary mx-auto"
              initial={{ width: 0 }}
              whileInView={{ width: 80 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
            />
          </div>
          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-8" staggerDelay={0.1}>
            {skills.map((skill, index) => (
              <MotionItem key={skill.name} variant="cascade">
                <motion.div
                  whileHover={{ y: -8, rotate: 1 }}
                  transition={springConfigs.bouncy}
                >
                  <Card className="group hover:shadow-xl transition-shadow duration-500">
                    <CardContent className="p-8 text-center">
                      <div className="mb-6 relative">
                        <motion.div
                          className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary transition-all duration-300"
                          whileHover={{ scale: 1.1, rotate: 12 }}
                          transition={springConfigs.bouncy}
                        >
                          <skill.icon className="w-8 h-8 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                        </motion.div>
                      </div>
                      <h3 className="text-xl font-medium mb-4">{skill.name}</h3>
                      <AnimatedProgress value={skill.level} delay={index * 0.2} />
                      <AnimatedCounter
                        value={skill.level}
                        delay={index * 0.2 + 0.5}
                        className="text-sm text-muted-foreground"
                      />
                    </CardContent>
                  </Card>
                </motion.div>
              </MotionItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        className="py-24 px-6 bg-muted relative z-10"
        data-animate>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2
              className="text-4xl md:text-5xl font-light mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={springConfigs.gentle}
            >
              Featured Projects
            </motion.h2>
            <motion.div
              className="w-20 h-1 bg-primary mx-auto"
              initial={{ width: 0 }}
              whileInView={{ width: 80 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
            />
          </div>
          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" staggerDelay={0.15}>
            {projects.map((project, index) => (
              <MotionItem key={project.title} variant="flipIn">
                <ProjectCard project={project} index={index} prefersReducedMotion={prefersReducedMotion} />
              </MotionItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 relative z-10" data-animate>
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            className="text-4xl md:text-5xl font-light mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={springConfigs.gentle}
          >
            Let's Work Together
          </motion.h2>
          <motion.div
            className="w-20 h-1 bg-primary mx-auto mb-12"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          />
          <motion.p
            className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            I'm always interested in new opportunities and exciting projects.
            Let's discuss how we can bring your ideas to life.
          </motion.p>

          {/* Contact Form */}
          <motion.form
            onSubmit={handleContactSubmit}
            className="max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
              >
                <Input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={contactForm.name}
                  onChange={handleContactFormChange}
                  required
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 }}
              >
                <Input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={contactForm.email}
                  onChange={handleContactFormChange}
                  required
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                />
              </motion.div>
            </div>
            <motion.div
              className="mb-6"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
            >
              <Input
                type="text"
                name="subject"
                placeholder="Subject"
                value={contactForm.subject}
                onChange={handleContactFormChange}
                required
                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
              />
            </motion.div>
            <motion.div
              className="mb-6"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.9 }}
            >
              <Textarea
                name="message"
                placeholder="Your Message"
                value={contactForm.message}
                onChange={handleContactFormChange}
                required
                rows={6}
                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 resize-none"
              />
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={tapAnimation}
            >
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full md:w-auto px-8 py-4 text-lg bg-primary hover:bg-primary/90 disabled:bg-primary/60 text-primary-foreground transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 ripple-effect">
                {isSubmitting ? (
                  <>
                    <motion.div
                      className="w-5 h-5 mr-2 border-2 border-white border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    Sending...
                  </>
                ) : (
                  <>
                    <motion.div
                      animate={isSendAnimating ? { x: 50, y: -50, opacity: 0, rotate: 45 } : {}}
                      transition={{ duration: 0.5 }}
                    >
                      <Send className="w-5 h-5 mr-2" />
                    </motion.div>
                    Send Message
                  </>
                )}
              </Button>
            </motion.div>
          </motion.form>

          {/* Alternative Contact Options */}
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={tapAnimation}>
              <Button
                variant="outline"
                className="px-8 py-4 text-lg border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:shadow-lg bg-transparent ripple-effect"
                onClick={() =>
                  window.open("mailto:najmadams1706@gmail.com", "_blank")
                }>
                <Mail className="w-5 h-5 mr-2" />
                Direct Email
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={tapAnimation}>
              <Button
                variant="outline"
                className="px-8 py-4 text-lg border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:shadow-lg bg-transparent ripple-effect"
                onClick={() => {
                  const link = document.createElement("a");
                  link.href = "/NajmAdamsResume.pdf";
                  link.download = "NajmAdamsResume.pdf";
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}>
                Download Resume
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <motion.footer
        className="py-12 px-6 bg-card border-t border-border"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-muted-foreground flex items-center justify-center gap-1">
            © {new Date().getFullYear()} Najm Adams. Crafted with
            <motion.span
              animate={prefersReducedMotion ? {} : {
                scale: [1, 1.2, 1, 1.2, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatDelay: 2,
              }}
            >
              <Heart className="w-4 h-4 text-red-500 fill-red-500 inline" />
            </motion.span>
            and precision.
          </p>
        </div>
      </motion.footer>
    </div>
  );
}

// Separate ProjectCard component for better organization and tilt effect
interface ProjectCardProps {
  project: {
    title: string
    description: string
    image?: string
    github: string
    live?: string
    tech: string[]
  }
  index: number
  prefersReducedMotion: boolean
}

function ProjectCard({ project, index, prefersReducedMotion }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const tiltStyle = useTilt(cardRef, { maxTilt: 8, scale: 1.02 })
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      ref={cardRef}
      style={prefersReducedMotion ? {} : tiltStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card className="group overflow-hidden h-full">
        <div className="h-48 relative overflow-hidden">
          <motion.img
            src={project.image || `https://picsum.photos/400/300?random=${index + 1}`}
            alt={project.title}
            className="w-full h-full object-cover"
            loading="lazy"
            animate={isHovered && !prefersReducedMotion ? { scale: 1.1 } : { scale: 1 }}
            transition={{ duration: 0.4 }}
          />
          <motion.div
            className="absolute inset-0 bg-black/20"
            animate={isHovered ? { opacity: 0.1 } : { opacity: 0.2 }}
            transition={{ duration: 0.3 }}
          />
          <motion.div
            className="absolute bottom-4 left-4 right-4 flex space-x-2"
            initial={{ y: 20, opacity: 0 }}
            animate={isHovered ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={springConfigs.bouncy}
          >
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Github className="w-4 h-4 text-white" />
            </motion.a>
            {project.live && (
              <motion.a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ExternalLink className="w-4 h-4 text-white" />
              </motion.a>
            )}
          </motion.div>
        </div>
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-3">
            {project.title}
          </h3>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech, techIndex) => (
              <AnimatedTechTag
                key={tech}
                index={techIndex}
                className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full cursor-default"
              >
                {tech}
              </AnimatedTechTag>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

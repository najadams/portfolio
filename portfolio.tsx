"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Github, Linkedin, Mail, ExternalLink, Code, Database, Globe, Smartphone, Send } from "lucide-react"
import Link from "next/link"

export default function Portfolio() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [scrollY, setScrollY] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set())
  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const lightTrailRef = useRef<HTMLDivElement>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

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
        const frequency = 0.01
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
      
      // Show success message (you could add a toast notification here)
      alert('Email client opened! Please send the email from your email application.')
    } catch (error) {
      console.error('Error opening email client:', error)
      alert('There was an error opening your email client. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const skills = [
    { name: "Frontend Development", icon: Globe, level: 95 },
    { name: "Backend Development", icon: Database, level: 90 },
    { name: "Mobile Development", icon: Smartphone, level: 85 },
    { name: "DevOps & Cloud", icon: Code, level: 80 },
  ]

  const projects = [
    {
      title:
        "A simple donations platform flavoured with the arts of young talents",
      description: "Modern UI used for donation hub.",
      tech: ["React", "stripe", "formik", "chakra ui", "Cloudinary"],
      github: "https://github.com/najadams/chat-app",
      live: "https://najsdonation.netlify.app",
    },
    {
      title: "Full-Stack POS Platform",
      description:
        "Comprehensive e-commerce solution with user authentication, payment processing, and admin dashboard",
      tech: ["React", "Node.js", "MongoDB", "JWT"],
      github: "https://github.com/najadams/sophon.git",
      live: "https://mannos.netlify.app",
    },
    {
      title: "Portfolio Website",
      description:
        "Responsive portfolio website showcasing projects and skills with modern design and animations",
      tech: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
      github: "https://github.com/najadams/portfolio",
      live: "https://najs.netlify.app",
    },
    {
      title: "AI enhanced Audio Steganography",
      description:
        "A collaborative work on reinforcement learning. Functional audio ai audio steganography and steganalysis tool.",
      tech: ["React.js", "TypeScript", " Python", "Gymnasium PPO Agent"],
      github: "https://github.com/najadams/blog-platform",
    },
    {
      title: "Offline first POS applicaiton",
      description:
        "A comprehensive pos application, effortlessly seamless with the working environment of wholesalers and distributers. Precise inventory tracking. Apt use of sms for CRM",
      tech: ["React", "Chart.js", "Electron", "Material-UI"],
      github: "https://github.com/najadams/pos",
    },
    {
      title: "AI Integrated mobile health assistant",
      description:
        "Ai integrated mental health assistant with up to date resources. Impeccable at keeping track of patient health",
      tech: ["React Native", "Javascript", "mongoDB", "Tailwind CSS"],
      github: "https://github.com/najadams/MentalHealthM_App",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-20 animate-pulse"
            style={{
              left: `${(i * 5) % 100}%`,
              top: `${(i * 7) % 100}%`,
              animationDelay: `${(i * 0.15) % 3}s`,
              animationDuration: `${3 + (i % 3)}s`,
            }}
          />
        ))}

        {/* Wavy Light Trail */}
        <div
          ref={lightTrailRef}
          className="absolute w-4 h-4 pointer-events-none transition-transform duration-100 ease-out"
          style={{
            background:
              "radial-gradient(circle, rgba(59, 130, 246, 0.8) 0%, rgba(59, 130, 246, 0.4) 30%, transparent 70%)",
            filter: "blur(2px)",
            boxShadow:
              "0 0 20px rgba(59, 130, 246, 0.6), 0 0 40px rgba(59, 130, 246, 0.4)",
          }}
        />

        {/* Mouse Follower */}
        <div
          className="absolute w-6 h-6 pointer-events-none transition-transform duration-300 ease-out"
          style={{
            left: mousePosition.x - 12,
            top: mousePosition.y - 12,
            background:
              "radial-gradient(circle, rgba(147, 51, 234, 0.3) 0%, transparent 70%)",
            filter: "blur(1px)",
          }}
        />

        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 transition-all duration-300 hover:bg-white/90">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-xl font-bold text-blue-600">Najm Adams</div>
            <div className="hidden md:flex space-x-8">
              {["home", "about", "skills", "projects", "contact"].map(
                (section) => (
                  <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className={`capitalize transition-all duration-300 hover:scale-110 ${
                      activeSection === section
                        ? "text-blue-600 font-medium transform scale-110"
                        : "text-gray-600 hover:text-gray-900"
                    }`}>
                    {section}
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="min-h-screen flex items-center justify-center px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div
            className={`transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}>
            <h1 className="text-5xl md:text-7xl font-light mb-6 leading-tight">
              <span
                className="inline-block animate-bounce"
                style={{ animationDelay: "0.1s" }}>
                S
              </span>
              <span
                className="inline-block animate-bounce"
                style={{ animationDelay: "0.2s" }}>
                o
              </span>
              <span
                className="inline-block animate-bounce"
                style={{ animationDelay: "0.3s" }}>
                f
              </span>
              <span
                className="inline-block animate-bounce"
                style={{ animationDelay: "0.4s" }}>
                t
              </span>
              <span
                className="inline-block animate-bounce"
                style={{ animationDelay: "0.5s" }}>
                w
              </span>
              <span
                className="inline-block animate-bounce"
                style={{ animationDelay: "0.6s" }}>
                a
              </span>
              <span
                className="inline-block animate-bounce"
                style={{ animationDelay: "0.7s" }}>
                r
              </span>
              <span
                className="inline-block animate-bounce"
                style={{ animationDelay: "0.8s" }}>
                e
              </span>
              <span className="block text-blue-600 font-medium">Developer</span>
            </h1>
            <p
              className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in-up"
              style={{ animationDelay: "0.5s" }}>
              Crafting digital experiences with clean code and innovative
              solutions
            </p>
            <div
              className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up"
              style={{ animationDelay: "0.8s" }}>
              <Button
                onClick={() => scrollToSection("projects")}
                className="px-8 py-3 text-lg bg-blue-600 hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25">
                View My Work
              </Button>
              <Button
                variant="outline"
                onClick={() => scrollToSection("contact")}
                className="px-8 py-3 text-lg border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                Get In Touch
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="py-24 px-6 bg-gray-50 relative z-10"
        data-animate>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2
              className={`text-4xl md:text-5xl font-light mb-6 transition-all duration-1000 ${
                visibleElements.has("about")
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}>
              About Me
            </h2>
            <div
              className={`w-20 h-1 bg-blue-600 mx-auto transition-all duration-1000 delay-300 ${
                visibleElements.has("about") ? "w-20" : "w-0"
              }`}></div>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in-left">
              <p className="text-lg text-gray-700 leading-relaxed">
                I'm a passionate full-stack developer with expertise in building
                modern web applications and scalable solutions. I specialize in
                React, Next.js, Node.js, and cloud technologies, with a focus on
                creating exceptional user experiences.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                When I'm not coding, you'll find me exploring new technologies,
                contributing to open source projects, and continuously learning
                to stay at the forefront of web development trends and best
                practices.
              </p>
              <div className="flex space-x-4 pt-4">
                <Link
                  href="https://github.com/najadams"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-110">
                  <Github className="w-6 h-6 text-gray-700" />
                </Link>
                <Link
                  href="https://www.linkedin.com/in/najm-lambon-a11480234/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-110">
                  <Linkedin className="w-6 h-6 text-gray-700" />
                </Link>
                <Link
                  href="mailto:najmadams1706@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-110">
                  <Mail className="w-6 h-6 text-gray-700" />
                </Link>
              </div>
            </div>
            <div className="relative animate-fade-in-right">
              <div className="w-80 h-80 mx-auto bg-gradient-to-br from-blue-400 to-purple-600 rounded-full opacity-20 absolute -top-4 -left-4"></div>
              <div className="w-80 h-80 mx-auto bg-gray-200 rounded-full relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 opacity-10"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 px-6 relative z-10" data-animate>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2
              className={`text-4xl md:text-5xl font-light mb-6 transition-all duration-1000 ${
                visibleElements.has("skills")
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}>
              Skills & Expertise
            </h2>
            <div
              className={`w-20 h-1 bg-blue-600 mx-auto transition-all duration-1000 delay-300 ${
                visibleElements.has("skills") ? "w-20" : "w-0"
              }`}></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skills.map((skill, index) => (
              <Card
                key={skill.name}
                className={`group hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 hover:rotate-1 ${
                  visibleElements.has("skills")
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}>
                <CardContent className="p-8 text-center">
                  <div className="mb-6 relative">
                    <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-600 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
                      <skill.icon className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors duration-300" />
                    </div>
                  </div>
                  <h3 className="text-xl font-medium mb-4">{skill.name}</h3>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-1000 ease-out animate-progress"
                      style={{
                        width: `${skill.level}%`,
                        animationDelay: `${index * 200}ms`,
                      }}></div>
                  </div>
                  <span className="text-sm text-gray-600">{skill.level}%</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        className="py-24 px-6 bg-gray-50 relative z-10"
        data-animate>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2
              className={`text-4xl md:text-5xl font-light mb-6 transition-all duration-1000 ${
                visibleElements.has("projects")
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}>
              Featured Projects
            </h2>
            <div
              className={`w-20 h-1 bg-blue-600 mx-auto transition-all duration-1000 delay-300 ${
                visibleElements.has("projects") ? "w-20" : "w-0"
              }`}></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card
                key={project.title}
                className={`group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 hover:rotate-1 overflow-hidden ${
                  visibleElements.has("projects")
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}>
                <div className="h-48 relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
                  <img
                    src={
                      project.title === "Full-Stack POS Platform"
                        ? "/POS.png"
                        : project.title === "Offline first POS applicaiton"
                        ? "/offlinePOS.png"
                        : project.title ==
                          "A simple donations platform flavoured with the arts of young talents"
                        ? "/orphans.png"
                        : project.title === "AI enhanced Audio Steganography"
                        ? "/steganography.png"
                        : project.title === "Portfolio Website"
                        ? "/portfolio.png"
                        : `https://picsum.photos/400/300?random=${index + 1}`
                    }
                    alt={project.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex space-x-2">
                      <Link
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors duration-300">
                        <Github className="w-4 h-4 text-white" />
                      </Link>
                      {project.live && (
                        <Link
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors duration-300">
                          <ExternalLink className="w-4 h-4 text-white" />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 relative z-10" data-animate>
        <div className="max-w-4xl mx-auto text-center">
          <h2
            className={`text-4xl md:text-5xl font-light mb-6 transition-all duration-1000 ${
              visibleElements.has("contact")
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}>
            Let's Work Together
          </h2>
          <div
            className={`w-20 h-1 bg-blue-600 mx-auto mb-12 transition-all duration-1000 delay-300 ${
              visibleElements.has("contact") ? "w-20" : "w-0"
            }`}></div>
          <p
            className={`text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed transition-all duration-1000 delay-500 ${
              visibleElements.has("contact")
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}>
            I'm always interested in new opportunities and exciting projects.
            Let's discuss how we can bring your ideas to life.
          </p>

          {/* Contact Form */}
          <form
            onSubmit={handleContactSubmit}
            className={`max-w-2xl mx-auto mb-12 transition-all duration-1000 delay-700 ${
              visibleElements.has("contact")
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <Input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={contactForm.name}
                  onChange={handleContactFormChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                />
              </div>
              <div>
                <Input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={contactForm.email}
                  onChange={handleContactFormChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                />
              </div>
            </div>
            <div className="mb-6">
              <Input
                type="text"
                name="subject"
                placeholder="Subject"
                value={contactForm.subject}
                onChange={handleContactFormChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              />
            </div>
            <div className="mb-6">
              <Textarea
                name="message"
                placeholder="Your Message"
                value={contactForm.message}
                onChange={handleContactFormChange}
                required
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
              />
            </div>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full md:w-auto px-8 py-4 text-lg bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25">
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 mr-2" />
                  Send Message
                </>
              )}
            </Button>
          </form>

          {/* Alternative Contact Options */}
          <div
            className={`flex flex-col sm:flex-row gap-6 justify-center transition-all duration-1000 delay-900 ${
              visibleElements.has("contact")
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}>
            <Button
              variant="outline"
              className="px-8 py-4 text-lg border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg bg-transparent"
              onClick={() =>
                window.open("mailto:najmadams1706@gmail.com", "_blank")
              }>
              <Mail className="w-5 h-5 mr-2" />
              Direct Email
            </Button>
            <Button
              variant="outline"
              className="px-8 py-4 text-lg border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg bg-transparent"
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
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Najm Adams. Crafted with passion and
            precision.
          </p>
        </div>
      </footer>
    </div>
  );
}

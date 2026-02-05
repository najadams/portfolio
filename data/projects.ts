export interface Project {
  title: string
  description: string
  tech: string[]
  github: string
  live?: string
  image?: string
}

export const projects: Project[] = [
  {
    title: "A simple donations platform flavoured with the arts of young talents",
    description: "Modern UI used for donation hub.",
    tech: ["React", "stripe", "formik", "chakra ui", "Cloudinary"],
    github: "https://github.com/najadams/chat-app",
    live: "https://najsdonation.netlify.app",
    image: "/orphans.png",
  },
  {
    title: "Full-Stack POS Platform",
    description:
      "Comprehensive e-commerce solution with user authentication, payment processing, and admin dashboard",
    tech: ["React", "Node.js", "MongoDB", "JWT"],
    github: "https://github.com/najadams/sophon.git",
    live: "https://mannos.netlify.app",
    image: "/POS.png",
  },
  {
    title: "Portfolio Website",
    description:
      "Responsive portfolio website showcasing projects and skills with modern design and animations",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    github: "https://github.com/najadams/portfolio",
    live: "https://najs.netlify.app",
    image: "/portfolio.png",
  },
  {
    title: "AI enhanced Audio Steganography",
    description:
      "A collaborative work on reinforcement learning. Functional audio ai audio steganography and steganalysis tool.",
    tech: ["React.js", "TypeScript", " Python", "Gymnasium PPO Agent"],
    github: "https://github.com/najadams/blog-platform",
    image: "/steganography.png",
  },
  {
    title: "Offline first POS applicaiton",
    description:
      "A comprehensive pos application, effortlessly seamless with the working environment of wholesalers and distributers. Precise inventory tracking. Apt use of sms for CRM",
    tech: ["React", "Chart.js", "Electron", "Material-UI"],
    github: "https://github.com/najadams/pos",
    image: "/offlinePOS.png",
  },
  {
    title: "AI Integrated mobile health assistant",
    description:
      "Ai integrated mental health assistant with up to date resources. Impeccable at keeping track of patient health",
    tech: ["React Native", "Javascript", "mongoDB", "Tailwind CSS"],
    github: "https://github.com/najadams/MentalHealthM_App",
  },
]

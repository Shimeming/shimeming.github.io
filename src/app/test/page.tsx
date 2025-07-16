'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { fadeInUp, staggerContainer, cardHoverSmall } from '@/lib/animations';

export default function Page() {
  const placeHolderCoverPath = '/projects/placeholder/cover.avif';
  return (
    <section>
      <div className="container max-w-7xl mx-auto px-4">
        <motion.h2
          className="text-3xl font-bold mb-12 text-center"
          {...fadeInUp}
        >
          Projects
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {projects.map((project) => (
            <motion.article
              key={project.title}
              className="bg-surface dark:bg-dark/50 rounded-lg shadow-md p-6"
              variants={fadeInUp}
              {...cardHoverSmall}
            >
              <div className="relative aspect-video mb-4 rounded-lg overflow-hidden">
                <Image
                  src={project.image || placeHolderCoverPath}
                  alt={project.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <motion.h3
                className="text-xl font-semibold mb-2"
                whileHover={{ x: 5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {project.title}
              </motion.h3>
              <motion.p
                className="text-gray-600 dark:text-gray-300 mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {project.description}
              </motion.p>
              <motion.div
                className="flex flex-wrap gap-2 mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {project.technologies.map((tech) => (
                  <motion.span
                    key={tech}
                    className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </motion.div>
              <motion.div
                className="flex gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <motion.a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-secondary hover:text-primary transition-colors"
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaGithub className="h-5 w-5" />
                  <span>Code</span>
                </motion.a>
                <motion.a
                  href={project.demoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-secondary hover:text-primary transition-colors"
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaExternalLinkAlt className="h-5 w-5" />
                  <span>Live Demo</span>
                </motion.a>
              </motion.div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export const projects: Project[] = [
  {
    title: 'E-commerce Platform',
    description: 'A full-stack e-commerce platform built with Next.js, TypeScript, and Tailwind CSS.',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Stripe'],
    githubLink: 'https://github.com',
    demoLink: 'https://demo.com',
  },
  {
    title: 'Task Management App',
    description: 'A collaborative task management application with real-time updates.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Socket.io'],
    githubLink: 'https://github.com',
    demoLink: 'https://demo.com',
    image: '/projects/task-manager.webp',
  },
  {
    title: 'Portfolio Website',
    description: 'My personal portfolio website showcasing my projects and skills.',
    technologies: ['Next.js', 'Tailwind CSS', 'Framer Motion'],
    githubLink: 'https://github.com',
    demoLink: 'https://demo.com',
    image: '/projects/portfolio-website.jpg',
  },
  {
    title: 'Blog Platform',
    description: 'A blogging platform with user authentication and markdown support.',
    technologies: ['Gatsby', 'GraphQL', 'Contentful'],
    githubLink: 'https://github.com',
    demoLink: 'https://demo.com',
    image: '/projects/blog-website.jpeg',
  },
  {
    title: 'Weather App',
    description: 'A weather application that provides real-time weather updates.',
    technologies: ['React', 'OpenWeatherMap API'],
    githubLink: 'https://github.com',
    demoLink: 'https://demo.com',
    image: '/projects/weather-app.png',
  },
  {
    title: 'Chat Application',
    description: 'A real-time chat application using WebSocket technology.',
    technologies: ['React', 'Node.js', 'Socket.io'],
    githubLink: 'https://github.com',
    demoLink: 'https://demo.com',
    image: '/projects/chat-app.png',
  },
  {
    title: 'Recipe Finder',
    description: 'A recipe search application using the Edamam API.',
    technologies: ['React', 'Edamam API'],
    githubLink: 'https://github.com',
    demoLink: 'https://demo.com',
    image: '/projects/recipe-finder.png',
  },
  {
    title: 'Expense Tracker',
    description: 'A personal finance tracker to manage expenses and income.',
    technologies: ['React', 'Firebase'],
    githubLink: 'https://github.com',
    demoLink: 'https://demo.com',
    image: '/projects/expense-tracker.webp',
  },
];

export interface Project {
  title: string;
  description: string;
  technologies: string[];
  githubLink: string;
  demoLink: string;
  image?: string;
}

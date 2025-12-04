export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  tags: string[];
  category: 'web' | 'mobile' | 'ai' | 'other';
  github?: string;
  live?: string;
  featured?: boolean;
  year: string;
  role: string;
  status: 'live' | 'in-progress' | 'archived';
  metrics?: {
    label: string;
    value: string;
  };
}

export const projects: Project[] = [
  {
    id: 'dhaniverse',
    title: 'Dhaniverse',
    description: 'A gamified open-world for Gen Z to learn and manage finance, powered by Web3 identity and on-chain rewards.',
    longDescription: 'Dhaniverse is an innovative financial management platform that gamifies personal finance education. It creates an interactive, open-world environment specifically designed for Gen Z, integrating Web3 identity verification and blockchain-based rewards. The platform makes learning about finance engaging and rewarding.',
    image: '/logos/Dhaniverse.jpg',
    tags: ['React Native', 'Web3', 'Finance', 'TypeScript', 'Blockchain'],
    category: 'mobile',
    live: 'https://dhaniverse.in',
    github: 'https://github.com/dhaniverse/dhaniverse',
    featured: true,
    year: '2024',
    role: 'Founder & Lead Developer',
    status: 'live',
    metrics: {
      label: 'Award',
      value: 'WCHL\'25 Winner'
    }
  },
  {
    id: 'navirate',
    title: 'Navirate',
    description: 'The accurate indoor navigator that seamlessly guides you through complex spaces with precision, real-time tracking, and an intuitive interface.',
    longDescription: 'Navirate is an advanced indoor navigation system that leverages cutting-edge technology to provide precise real-time tracking through complex environments. It combines an intuitive user interface with powerful navigation algorithms to get users where they need to be, effortlessly.',
    image: '/logos/Navirate.png',
    tags: ['IoT', 'React Native', 'Real-time', 'Navigation', 'TypeScript'],
    category: 'mobile',
    github: 'https://github.com/gursimrxn/Navirate',
    featured: true,
    year: '2024',
    role: 'Full-Stack Developer',
    status: 'in-progress'
  },
  {
    id: 'agamify',
    title: 'Agamify',
    description: 'An intelligent agent designed to migrate web application code across multiple frontend frameworks, streamlining cross-framework development.',
    longDescription: 'Agamify is an AI-powered code migration tool that intelligently transforms web applications between different frontend frameworks. It streamlines the cross-framework development and modernization workflow, making it easier to switch or upgrade technology stacks.',
    image: '/projects/agamify.jpg',
    tags: ['TypeScript', 'AI', 'Code Migration', 'Framework'],
    category: 'web',
    github: 'https://github.com/ekas-7/Agamify',
    year: '2024',
    role: 'Full-Stack Engineer',
    status: 'live'
  },
  {
    id: 'texforge',
    title: 'TexForge',
    description: 'Convert PNG/JPG to KTX2 with blazing fast compression. 90% smaller files, hardware-accelerated loading for Phaser, Three.js, and Babylon.js.',
    longDescription: 'TexForge is a high-performance GPU texture compression tool that transforms standard image formats into optimized KTX2 files. Achieves 90% reduction in file size while maintaining quality, with hardware-accelerated loading support for popular game engines.',
    image: '/projects/texforge.jpg',
    tags: ['TypeScript', 'GPU', 'Compression', 'Game Dev'],
    category: 'web',
    github: 'https://github.com/dhaniverse/texforge',
    year: '2024',
    role: 'Tool Developer',
    status: 'live'
  },
  {
    id: 'skill-sensai',
    title: 'Skill Sensai',
    description: 'A skill swap application built in 6 hours for a hackathon, enabling users to exchange skills and learn from each other.',
    longDescription: 'Skill Sensai is a skill-sharing platform developed during a hackathon sprint. It allows users to post skills they want to learn and teach, creating a community-driven learning marketplace. Built with Next.js for rapid development and deployment.',
    image: '/projects/skill-sensai.jpg',
    tags: ['Next.js', 'TypeScript', 'Community', 'Marketplace'],
    category: 'web',
    github: 'https://github.com/gursimrxn/Skill-Sensai',
    year: '2024',
    role: 'Full-Stack Developer',
    status: 'in-progress'
  }
];

export const categories = [
  { id: 'all', label: 'All Projects' },
  { id: 'web', label: 'Web' },
  { id: 'mobile', label: 'Mobile' },
  { id: 'ai', label: 'AI/ML' },
];

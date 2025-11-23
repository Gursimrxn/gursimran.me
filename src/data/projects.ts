export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  category: 'web' | 'mobile' | 'ai' | 'other';
  github?: string;
  live?: string;
  featured?: boolean;
  size?: 'large' | 'medium' | 'small';
}

export const projects: Project[] = [
  {
    id: 'dhaniverse',
    title: 'Dhaniverse',
    description: 'A Gamified financial management app designed as an Open World 2D RPG for Gen Z and Millennials. Won $5k Bounty at WCHL Global Finale.',
    image: '/logos/Dhaniverse.jpg',
    tags: ['React Native', 'Game Design', 'Firebase', 'Financial Tech'],
    category: 'mobile',
    live: 'https://dhaniverse.in',
    featured: true,
    size: 'large'
  },
  {
    id: 'navirate',
    title: 'Navirate',
    description: 'The Accurate Indoor Navigator. Seamlessly guides you through complex spaces with precision, real-time tracking, and an intuitive interface.',
    image: '/logos/Navirate.png',
    tags: ['Indoor Navigation', 'Real-time Tracking', 'Mobile App', 'IoT'],
    category: 'mobile',
    featured: true,
    size: 'medium'
  },
  {
    id: 'portfolio',
    title: 'Portfolio V2',
    description: 'Modern portfolio featuring smooth GSAP animations, interactive components, and a sophisticated design system.',
    image: '/projects/portfolio.jpg',
    tags: ['Next.js', 'TypeScript', 'GSAP', 'Tailwind CSS'],
    category: 'web',
    github: 'https://github.com/gursimrxn/gursimran.me',
    live: 'https://gursimran.me',
    size: 'medium'
  },
  {
    id: 'ai-agent',
    title: 'Nexus AI Agent',
    description: 'Autonomous AI agent capable of planning and executing complex multi-step tasks with web browsing capabilities.',
    image: '/projects/ai-agent.jpg', // Placeholder
    tags: ['Python', 'LangChain', 'OpenAI', 'FastAPI'],
    category: 'ai',
    github: 'https://github.com/gursimrxn',
    size: 'small'
  },
  {
    id: 'defi-exchange',
    title: 'DeFi Swap',
    description: 'Decentralized exchange interface with real-time pricing and liquidity pool visualization.',
    image: '/projects/defi.jpg', // Placeholder
    tags: ['Solidity', 'React', 'Web3.js', 'Ethereum'],
    category: 'web',
    github: 'https://github.com/gursimrxn',
    size: 'small'
  }
];

export const categories = [
  { id: 'all', label: 'All' },
  { id: 'web', label: 'Web' },
  { id: 'mobile', label: 'Mobile' },
  { id: 'ai', label: 'AI/ML' },
];

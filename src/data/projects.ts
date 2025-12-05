export interface ContentBlock {
  type: 'text' | 'heading' | 'bullet' | 'image' | 'link' | 'code' | 'quote' | 'diagram' | 'gallery';
  content?: string;
  items?: string[];
  url?: string;
  title?: string;
  alt?: string;
  images?: Array<{ src: string; alt: string; caption?: string }>;
  language?: string;
}

export interface Section {
  title: string;
  content: ContentBlock[];
}

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
  details?: {
    timeline?: string;
    teamSize?: string;
    challenge?: string;
    solution?: string;
    results?: string[];
    highlights?: string[];
  };
  sections?: Section[];
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
    },
    details: {
      timeline: '6 months',
      teamSize: '3 core members',
      challenge: 'Gen Z shows low financial literacy with 67% lacking basic money management skills. Traditional finance apps feel boring and outdated.',
      solution: 'Created an immersive, gamified financial learning platform with blockchain rewards, making personal finance education engaging and incentivized.',
      highlights: [
        'Web3 identity verification for secure user management',
        'Blockchain-based reward system for learning milestones',
        'Interactive open-world environment with financial quests',
        'Real-time portfolio tracking with predictive analytics'
      ],
      results: [
        '5000+ active users in beta phase',
        'Selected as WCHL\'25 finalist and winner',
        '95% user retention rate',
        'Featured in fintech innovation showcase'
      ]
    },
    sections: [
      {
        title: 'Tech Architecture',
        content: [
          {
            type: 'text',
            content: 'Dhaniverse uses a modern, scalable architecture combining blockchain technology with mobile-first development practices.'
          },
          {
            type: 'bullet',
            items: [
              'Frontend: React Native with TypeScript for cross-platform mobile development',
              'Backend: Node.js with Express and GraphQL API',
              'Blockchain: Solana and Ethereum smart contracts for tokenomics',
              'Database: MongoDB with Redis caching layer',
              'Authentication: Web3 wallet integration (MetaMask, Phantom)'
            ]
          },
          {
            type: 'diagram',
            content: `
Mobile App         API Server         Blockchain
┌────────────┐     ┌────────────┐    ┌────────────┐
│React Native│────▶│Node.js +   │───▶│Smart       │
│TypeScript  │     │GraphQL     │    │Contracts   │
└────────────┘     └────────────┘    └────────────┘
     │                   │                  │
     └───────────────────┴──────────────────┘
              MongoDB + Redis`
          }
        ]
      },
      {
        title: 'Key Features',
        content: [
          {
            type: 'heading',
            content: 'Gamification System'
          },
          {
            type: 'text',
            content: 'Users complete financial quests to earn XP and tokens, learning real-world money management skills through interactive challenges.'
          },
          {
            type: 'bullet',
            items: [
              'Progressive difficulty levels from Novice to Expert',
              'Daily quests for consistent engagement',
              'Achievement badges and leaderboards',
              'Social features for community learning'
            ]
          },
          {
            type: 'heading',
            content: 'Blockchain Rewards'
          },
          {
            type: 'text',
            content: 'All achievements and rewards are stored on-chain, creating a verifiable, transferable learning record.'
          },
          {
            type: 'quote',
            content: 'By leveraging blockchain, we ensure users truly own their achievements and can build verifiable financial credentials.'
          }
        ]
      },
      {
        title: 'Learning Resources',
        content: [
          {
            type: 'link',
            title: 'Whitepaper',
            content: 'Complete technical documentation and vision',
            url: 'https://dhaniverse.in/whitepaper'
          },
          {
            type: 'link',
            title: 'Blog: Finance for Gen Z',
            content: 'Articles on investing, budgeting, and wealth building',
            url: 'https://dhaniverse.in/blog'
          },
          {
            type: 'link',
            title: 'Documentation',
            content: 'Developer guides and API reference',
            url: 'https://docs.dhaniverse.in'
          }
        ]
      }
    ]
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
    status: 'in-progress',
    sections: [
      {
        title: 'How It Works',
        content: [
          {
            type: 'heading',
            content: 'Indoor Positioning System'
          },
          {
            type: 'text',
            content: 'Navirate combines multiple positioning technologies to achieve meter-level accuracy indoors where GPS fails.'
          },
          {
            type: 'bullet',
            items: [
              'WiFi RSSI triangulation for initial positioning',
              'BLE beacon networks for precise location refinement',
              'IMU sensors for movement tracking between updates',
              'Machine learning algorithm for sensor fusion and accuracy'
            ]
          },
          {
            type: 'heading',
            content: 'Real-time Navigation'
          },
          {
            type: 'text',
            content: 'Users receive turn-by-turn directions with dynamic route optimization based on obstacles and real-time footfall data.'
          },
          {
            type: 'diagram',
            content: `
Sensor Input          Processing            Output
┌──────────────┐     ┌──────────────┐      ┌──────────────┐
│ WiFi RSSI    │     │ Sensor Fusion│      │ Route        │
│ BLE Beacons  │────▶│ ML Algorithm │─────▶│ Optimization │
│ IMU Data     │     │ Real-time    │      │ UI Rendering │
└──────────────┘     └──────────────┘      └──────────────┘
                            │
                      ┌─────▼─────┐
                      │ Database   │
                      │ (Maps/     │
                      │  WiFi Map) │
                      └───────────┘`
          }
        ]
      },
      {
        title: 'Resources',
        content: [
          {
            type: 'link',
            title: 'GitHub Repository',
            content: 'Complete source code and contribution guidelines',
            url: 'https://github.com/gursimrxn/Navirate'
          },
          {
            type: 'link',
            title: 'Research Paper',
            content: 'Detailed algorithm and performance benchmarks',
            url: 'https://navirate.dev/research'
          }
        ]
      }
    ]
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

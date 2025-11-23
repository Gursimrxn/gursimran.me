"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { gsap } from "gsap";
import BentoBadge from "./ui/BentoBadge";
import { Code } from "./icons";
import Image from "next/image";

interface Tech {
  name: string;
  icon: string; // URL to icon
  category: string;
}

const technologies: Tech[] = [
  // Languages
  { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", category: "Languages" },
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", category: "Languages" },
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", category: "Languages" },
  { name: "C++", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg", category: "Languages" },
  { name: "Rust", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-original.svg", category: "Languages" },
  { name: "Solidity", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/solidity/solidity-original.svg", category: "Languages" },
  
  // Frontend
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", category: "Frontend" },
  { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", category: "Frontend" },
  { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg", category: "Frontend" },
  { name: "Web3.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/web3js/web3js-original.svg", category: "Frontend" },
  
  // Backend
  { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", category: "Backend" },
  { name: "Express", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg", category: "Backend" },
  { name: "Deno", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/denojs/denojs-original.svg", category: "Backend" },
  { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", category: "Backend" },
  { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", category: "Backend" },
  { name: "Redis", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg", category: "Backend" },
  
  // DevOps & Tools
  { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", category: "DevOps" },
  { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", category: "DevOps" },
  { name: "Linux", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg", category: "DevOps" },
  { name: "Azure", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg", category: "DevOps" },
];

const TechStack = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isInView, setIsInView] = useState(false);
    const [hoveredTech, setHoveredTech] = useState<string | null>(null);
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Brand colors - cycling through your portfolio colors
    // const brandColors = ['#FF7A01', '#0475F7', '#10B981', '#8B5CF6'];
    
    // const getIconColor = (index: number) => {
    //     return brandColors[index % brandColors.length];
    // };

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !isInView) {
                    setIsInView(true);
                    animateIn();
                }
            },
            { threshold: 0.2 }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, [isInView]);

    const animateIn = () => {
        const icons = containerRef.current?.querySelectorAll('.tech-icon');
        
        if (icons) {
            gsap.fromTo(
                icons,
                { 
                    opacity: 0,
                    scale: 0,
                    rotation: -180,
                },
                {
                    opacity: 1,
                    scale: 1,
                    rotation: 0,
                    duration: 0.6,
                    stagger: {
                        amount: 1.2,
                        grid: "auto",
                        from: "center",
                        ease: "power2.out"
                    },
                    ease: "back.out(1.7)",
                }
            );
        }
    };

    const handleIconHover = (e: React.MouseEvent<HTMLDivElement>, techName: string) => {
        const target = e.currentTarget;
        const rect = target.getBoundingClientRect();
        
        setHoveredTech(techName);
        setTooltipPosition({
            x: rect.left + rect.width / 2,
            y: rect.top - 10
        });
        
        // Random rotation direction
        const randomRotation = Math.random() > 0.5 ? 8 : -8;
        
        gsap.to(target, {
            scale: 1.15,
            rotation: randomRotation,
            duration: 0.3,
            ease: "back.out(2)",
        });

        // Animate the image inside to full color
        const img = target.querySelector('img');
        if (img) {
            gsap.to(img, {
                filter: "grayscale(0%) brightness(1.1)",
                duration: 0.3,
                ease: "power2.out"
            });
        }
    };

    const handleIconLeave = (e: React.MouseEvent<HTMLDivElement>) => {
        const target = e.currentTarget;
        
        setHoveredTech(null);
        
        gsap.to(target, {
            scale: 1,
            rotation: 0,
            duration: 0.3,
            ease: "power2.out"
        });

        // Back to grayscale
        const img = target.querySelector('img');
        if (img) {
            gsap.to(img, {
                filter: "grayscale(100%)",
                duration: 0.3,
                ease: "power2.out"
            });
        }
    };

    return (
        <div 
            ref={containerRef}
            className="relative h-full w-full rounded-[40px] border-1 border-black/10 bg-gradient-to-t from-[#ffffff] to-[#fcfcfc] p-4 sm:p-6 overflow-hidden flex flex-col"
        >
            <BentoBadge icon={Code} text={"TECH STACK"} className="mx-auto mb-6"/>
            
            {/* Icons Grid */}
            <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-4 sm:gap-6 justify-items-center items-center flex-1">
                {technologies.map((tech) => (
                    <div
                        key={tech.name}
                        className="tech-icon relative opacity-0 cursor-pointer"
                        onMouseEnter={(e) => handleIconHover(e, tech.name)}
                        onMouseLeave={handleIconLeave}
                        style={{
                            perspective: "1000px"
                        }}
                    >
                        <div className="relative w-10 h-10 sm:w-12 sm:h-12 transition-all duration-300">
                            <Image
                                src={tech.icon}
                                alt={tech.name}
                                width={48}
                                height={48}
                                className="w-full h-full object-contain"
                                style={{
                                    filter: "grayscale(100%)",
                                }}
                            />
                        </div>
                    </div>
                ))}
            </div>

            {/* Tooltip - Portal to body to escape overflow-hidden */}
            {mounted && hoveredTech && createPortal(
                <div
                    className="fixed pointer-events-none bg-black text-white text-xs font-semibold rounded-lg shadow-2xl px-3 py-2 whitespace-nowrap animate-in fade-in zoom-in-95 duration-150"
                    style={{
                        left: `${tooltipPosition.x}px`,
                        top: `${tooltipPosition.y}px`,
                        transform: 'translate(-50%, -100%)',
                        zIndex: 9999,
                    }}
                >
                    {hoveredTech}
                    <div 
                        className="absolute left-1/2 bottom-0 w-2 h-2 bg-black transform -translate-x-1/2 translate-y-1/2 rotate-45"
                    />
                </div>,
                document.body
            )}

            {/* Animated gradient orbs in background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10 -z-10">
                <div
                    className="absolute w-40 h-40 rounded-full blur-3xl bg-gradient-to-r from-orange-300/30 to-transparent"
                    style={{
                        top: '10%',
                        left: '20%',
                    }}
                />
                <div
                    className="absolute w-40 h-40 rounded-full blur-3xl bg-gradient-to-r from-blue-400/30 to-transparent"
                    style={{
                        top: '60%',
                        right: '20%',
                    }}
                />
            </div>

        </div>
    );
};

export default TechStack;
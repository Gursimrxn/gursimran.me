'use client';

import { useEffect, useRef, ReactNode } from 'react';
import gsap from 'gsap';

interface BentoRevealProps {
    children: ReactNode;
    delay?: number;
    index?: number;
}

export default function BentoReveal({ children, delay = 0, index = 0 }: BentoRevealProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const container = containerRef.current;
            if (!container) return;

            // Mathematical stagger based on fibonacci-like sequence
            const fibDelay = delay + (index * 0.08) + Math.log(index + 1) * 0.05;

            // Liquid morph effect using clip-path with mathematical easing
            gsap.fromTo(container,
                {
                    opacity: 0,
                    clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
                    y: 40,
                    rotateX: 8,
                    scale: 0.96,
                },
                {
                    opacity: 1,
                    clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
                    y: 0,
                    rotateX: 0,
                    scale: 1,
                    duration: 1.4,
                    delay: fibDelay,
                    ease: 'expo.out',
                }
            );
        }, containerRef);

        return () => ctx.revert();
    }, [delay, index]);

    return (
        <div 
            ref={containerRef}
            style={{ 
                transformStyle: 'preserve-3d',
                perspective: '1000px',
            }}
        >
            {children}
        </div>
    );
}

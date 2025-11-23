'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function LoaderAnimation() {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const [isComplete, setIsComplete] = useState(false);
    const [loadingText, setLoadingText] = useState('initializing workspace...');

    useEffect(() => {
        // Cycle through loading messages
        const messages = [
            'initializing workspace...',
            'loading components...',
            'parsing dependencies...',
            'compiling typescript...',
            'bundling modules...',
            'optimizing assets...',
            'hydrating react...',
            'rendering UI...',
            'almost there...'
        ];
        
        let index = 0;
        const interval = setInterval(() => {
            index = (index + 1) % messages.length;
            setLoadingText(messages[index]);
        }, 300);

        const ctx = gsap.context(() => {
            const container = containerRef.current;
            const text = textRef.current;
            const contentWrapper = document.getElementById('content-wrapper');
            if (!container || !text) return;

            const tl = gsap.timeline({
                onComplete: () => {
                    clearInterval(interval);
                    setIsComplete(true);
                }
            });

            // Simple slide up
            tl.to(container, {
                yPercent: -100,
                duration: 1,
                delay: 0.8,
                ease: 'expo.inOut'
            })
            // Reveal content
            .to(contentWrapper, {
                opacity: 1,
                duration: 0.1
            }, '-=0.6');
        });

        return () => {
            clearInterval(interval);
            ctx.revert();
        };
    }, []);

    if (isComplete) return null;

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[9999] bg-white flex items-center justify-center"
        >
            <div ref={textRef} className="relative flex flex-col items-center gap-6">
                <div 
                    className="text-sm tracking-wide font-mono relative"
                    style={{
                        background: 'linear-gradient(90deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.9) 50%, rgba(0,0,0,0.4) 100%)',
                        backgroundSize: '200% 100%',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        animation: 'shimmer 2s infinite linear'
                    }}
                >
                    {loadingText}
                    <span className="animate-pulse">_</span>
                </div>
                
                {/* Liquid morphing loader bar */}
                <div className="relative w-48 h-1 bg-black/10 rounded-full overflow-hidden">
                    <div 
                        className="absolute inset-0 bg-black rounded-full"
                        style={{
                            animation: 'liquidFlow 1.5s ease-in-out infinite'
                        }}
                    />
                </div>
            </div>
            <style jsx>{`
                @keyframes shimmer {
                    0% { background-position: -200% 0; }
                    100% { background-position: 200% 0; }
                }
                @keyframes liquidFlow {
                    0%, 100% { 
                        transform: translateX(-100%) scaleX(0.3);
                        border-radius: 50%;
                    }
                    50% { 
                        transform: translateX(100%) scaleX(1.2);
                        border-radius: 20%;
                    }
                }
            `}</style>
        </div>
    );
}

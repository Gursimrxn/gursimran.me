"use client";

import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { lenisManager } from "@/lib/lenisManager";

interface PageTransitionProps {
  children: ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [loadingText, setLoadingText] = useState('loading page...');
  
  const prevPathname = useRef(pathname);
  const svgRef = useRef<SVGPathElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const clickPosition = useRef({ x: 0 });
  const loaderTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const textIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Loading text animation
  useEffect(() => {
    if (showLoader) {
      const messages = [
        'loading page...',
        'fetching data...',
        'rendering components...',
        'almost there...'
      ];
      let index = 0;
      textIntervalRef.current = setInterval(() => {
        index = (index + 1) % messages.length;
        setLoadingText(messages[index]);
      }, 400);
    } else {
      if (textIntervalRef.current) {
        clearInterval(textIntervalRef.current);
        textIntervalRef.current = null;
      }
      setLoadingText('loading page...');
    }
    
    return () => {
      if (textIntervalRef.current) {
        clearInterval(textIntervalRef.current);
      }
    };
  }, [showLoader]);

  // Handle Route Change (Exit Animation / Reveal New Page)
  useEffect(() => {
    if (prevPathname.current === pathname) return;
    prevPathname.current = pathname;
    
    // Clear loader timeout and hide loader
    if (loaderTimeoutRef.current) {
      clearTimeout(loaderTimeoutRef.current);
      loaderTimeoutRef.current = null;
    }
    setShowLoader(false);
    
    document.body.style.overflow = 'hidden';
    
    // Scroll to top immediately
    lenisManager.scrollTo(0, { duration: 0.1, immediate: true });
    
    const tl = gsap.timeline({
      onComplete: () => {
        setIsAnimating(false);
        document.body.style.overflow = '';
        if (svgRef.current) {
            const height = window.innerHeight;
            const width = window.innerWidth;
            svgRef.current.setAttribute("d", `M0,${height} Q${width/2},${height} ${width},${height} V${height} H0`);
        }
      }
    });

    // 1. Ensure screen is covered
    if (!isAnimating && svgRef.current) {
      const width = window.innerWidth;
      const height = window.innerHeight;
      tl.set(svgRef.current, { 
        attr: { d: `M0,0 Q${width/2},0 ${width},0 V${height} H0` } 
      });
    }

    // 2. Swap Content
    tl.call(() => {
      setDisplayChildren(children);
    })
    
    // 3. Reveal New Content (Slide Up Curtain)
    .to(svgRef.current, {
      yPercent: -100,
      duration: 0.8,
      ease: "power2.inOut",
    })
    .fromTo(contentRef.current, 
      { y: 100, opacity: 0, scale: 1 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "power3.out",
        clearProps: "all"
      }, 
      "-=0.6"
    )
    .set(svgRef.current, { yPercent: 0 });

  }, [pathname, children, isAnimating]);
  
  // Intercept Link Clicks (Enter Animation / Cover Screen)
  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a[href^="/"]');
      
      if (!link) return;
      
      // If already animating, prevent interaction
      if (isAnimating) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }
      
      const href = link.getAttribute('href');
      if (!href || href.startsWith('#')) return;
      
      // If navigating to same route, just prevent default and return (menu will close via its own handler)
      if (href === pathname) {
        e.preventDefault();
        return;
      }
      
      // Prevent default navigation to allow animation to play first
      e.preventDefault();
      
      setIsAnimating(true);
      clickPosition.current.x = e.clientX;
      
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      // Animate Curve
      const progress = { value: 0 };
      
      const tl = gsap.timeline({
        onComplete: () => {
            // Start loader timeout - show loader if page doesn't load within 300ms
            loaderTimeoutRef.current = setTimeout(() => {
              setShowLoader(true);
            }, 300);
            // Always navigate, even if same route
            router.push(href);
        }
      });

      tl.to(progress, {
        value: 1,
        duration: 0.6, // Slightly faster for snappiness
        ease: "power3.inOut",
        onUpdate: () => {
            if (!svgRef.current) return;
            
            const p = progress.value;
            // Move y from height to 0
            const y = height * (1 - p);
            // Curve bulges up slightly
            const curve = Math.min(height * 0.15, 80) * Math.sin(p * Math.PI);
            
            const d = `M0,${y} Q${clickPosition.current.x},${y - curve} ${width},${y} V${height} H0`;
            svgRef.current.setAttribute("d", d);
        }
      })
      
      // Scale down current content slightly (Removed blur for performance/cleanliness)
      .to(contentRef.current, {
        scale: 0.98,
        opacity: 0.9,
        duration: 0.6,
        ease: "power3.inOut"
      }, "<");
    };
    
    document.addEventListener('click', handleLinkClick, true);
    return () => document.removeEventListener('click', handleLinkClick, true);
  }, [pathname, isAnimating, router, setIsAnimating]);

  return (
    <>
      {/* SVG Overlay with Gradient Mesh */}
      <svg 
        className="fixed inset-0 z-[9999] pointer-events-none w-full h-full"
        style={{ filter: 'drop-shadow(0px -10px 20px rgba(0,0,0,0.05))' }}
      >
        <defs>
          <linearGradient id="transitionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="50%" stopColor="#f8f8f8" />
            <stop offset="100%" stopColor="#f0f0f0" />
          </linearGradient>
          <filter id="transitionBlur">
            <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="4" result="noise" seed="2" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="15" />
          </filter>
        </defs>
        <path 
          ref={svgRef} 
          className="fill-[url(#transitionGradient)]"
          style={{ filter: 'url(#transitionBlur)' }}
          // Start hidden at bottom
          d="M0,10000 Q0,10000 0,10000 V10000 H0" 
        />
      </svg>

      {/* Loader - shown if page takes too long to load */}
      {showLoader && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center pointer-events-none">
          <div className="flex flex-col items-center gap-6">
            <div 
              className="text-sm tracking-wide font-mono"
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
          <style>{`
            @keyframes shimmer {
              0% { background-position: -200% 0; }
              100% { background-position: 200% 0; }
            }
            @keyframes liquidFlow {
              0% { transform: translateX(-100%); }
              50% { transform: translateX(0%); }
              100% { transform: translateX(100%); }
            }
          `}</style>
        </div>
      )}

      {/* Page Content */}
      <div ref={contentRef} className="min-h-[100dvh] overflow-hidden">
        {displayChildren}
      </div>
    </>
  );
}

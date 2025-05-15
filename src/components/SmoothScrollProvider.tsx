"use client";

import { ReactNode, useEffect, useState } from "react";
import { useLenis } from "@/hooks/useLenis";
import { lenisManager } from "@/lib/lenisManager";

interface SmoothScrollProviderProps {
  children: ReactNode;
}

export default function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  // Use state with a default value from initial check
  const [isMobile, setIsMobile] = useState(() => {
    // Only runs on client-side
    if (typeof window !== 'undefined') {
      const width = window.innerWidth;
      const userAgent = navigator.userAgent.toLowerCase();
      const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|windows phone/.test(userAgent);
      const isMobileWidth = width < 768;
      return isMobileDevice || isMobileWidth;
    }
    return false;
  });
  
  useEffect(() => {
    // Simple mobile detection based on screen width and user agent
    const checkMobile = () => {
      const width = window.innerWidth;
      const userAgent = navigator.userAgent.toLowerCase();
      const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|windows phone/.test(userAgent);
      const isMobileWidth = width < 768;
      setIsMobile(isMobileDevice || isMobileWidth);
    };
    
    // Check on resize
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Use Lenis only if not on mobile with optimized settings
  useLenis({
    duration: 1,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Original easing function
    wheelMultiplier: 1.0,
    smoothWheel: true,
    syncTouch: true,     // Sync touch and mouse wheel events
    smoothTouch: true,   // Enable smooth touch scrolling
    touchMultiplier: 2,  // Better touch response
    gestureOrientation: 'vertical', // Force vertical scrolling
    enabled: !isMobile, // Disable on mobile
  });
  
  // Set up anchor link handling
  useEffect(() => {
    function handleAnchorLinks() {
      // Get Lenis instance (will be null on mobile)
      const lenis = lenisManager.getLenis();

      // Handle all anchor links on the page
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
          e.preventDefault();
          const targetId = anchor.getAttribute('href');
          if (!targetId || targetId === '#') return;
          
          const target = document.querySelector(targetId);
          if (!target) return;
          
          if (lenis) {
            // Use Lenis smooth scrolling on desktop
            lenis.scrollTo(target as HTMLElement, { 
              offset: -100, // Offset to account for fixed header
              duration: 1
            });
          } else {
            // Fall back to native smooth scrolling on mobile
            const targetPosition = (target as HTMLElement).getBoundingClientRect().top + window.scrollY - 100;
            window.scrollTo({
              top: targetPosition,
              behavior: 'smooth'
            });
          }
        });
      });
    }    // Wait for DOM to be ready
    if (document.readyState === 'complete') {
      handleAnchorLinks();
    } else {
      window.addEventListener('load', handleAnchorLinks);
      return () => window.removeEventListener('load', handleAnchorLinks);
    }
  }, []);

  return <>{children}</>;
}

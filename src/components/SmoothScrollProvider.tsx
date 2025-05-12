"use client";

import { ReactNode, useEffect, useState } from "react";
import { useLenis } from "@/hooks/useLenis";
import { lenisManager } from "@/lib/lenisManager";

interface SmoothScrollProviderProps {
  children: ReactNode;
}

export default function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {  
  useLenis({
    duration: 1,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Original easing function
    wheelMultiplier: 1.0,
    smoothWheel: true,
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

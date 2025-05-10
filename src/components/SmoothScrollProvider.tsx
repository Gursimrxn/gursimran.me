"use client";

import { ReactNode, useEffect } from "react";
import { useLenis } from "@/hooks/useLenis";
import { lenisManager } from "@/lib/lenisManager";

interface SmoothScrollProviderProps {
  children: ReactNode;
}

/**
 * SmoothScrollProvider component that wraps the application with Lenis smooth scrolling
 * This is a client component to handle the smooth scrolling functionality
 */
export default function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {  // Initialize Lenis with optimal settings for performance and smooth user experience
  useLenis({
    duration: 0.8, // Faster scrolling (reduced from 1.8)
    wheelMultiplier: 1.2, // Increased multiplier for faster scrolling
    touchMultiplier: 2.5, // Increased for better mobile experience
  });

  // Set up anchor link handling
  useEffect(() => {
    function handleAnchorLinks() {
      const lenis = lenisManager.getLenis();
      if (!lenis) return;
      
      // Handle all anchor links on the page
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
          e.preventDefault();
          const targetId = anchor.getAttribute('href');
          if (!targetId || targetId === '#') return;
            // Smooth scroll to target
          const target = document.querySelector(targetId);
          if (target) {
            lenis.scrollTo(target as HTMLElement, { 
              offset: -100, // Offset to account for fixed header
              duration: 1.2 
            });
          }
        });
      });
    }

    // Wait for DOM to be ready
    if (document.readyState === 'complete') {
      handleAnchorLinks();
    } else {
      window.addEventListener('load', handleAnchorLinks);
      return () => window.removeEventListener('load', handleAnchorLinks);
    }
  }, []);

  return <>{children}</>;
}

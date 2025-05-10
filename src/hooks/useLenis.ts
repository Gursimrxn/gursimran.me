"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { lenisManager } from "@/lib/lenisManager";

// Define the custom easing function
const customEasing = (t: number): number => Math.min(1, 1.001 - Math.pow(2, -10 * t));

/**
 * A custom hook to initialize and manage Lenis smooth scrolling
 * @param options - Configuration options for Lenis
 * @returns Reference to the Lenis instance
 */
export function useLenis(options = {}) {
  const lenisRef = useRef<Lenis | null>(null);
  useEffect(() => {
    // Initialize Lenis with optimal settings for best performance
    const lenis = new Lenis({
      duration: 0.8,           // Faster scrolling (reduced from 1.2)
      easing: customEasing,    // Improved easing function for smooth stops
      wheelMultiplier: 1.2,    // Increased mouse speed multiplier
      touchMultiplier: 2.5,    // Increased touch speed multiplier for mobile
      ...options,              // Override with user options
    });

    // Store the instance in the ref and global manager
    lenisRef.current = lenis;
    lenisManager.setLenisInstance(lenis);

    // Animation frame update function
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    // Start the animation loop
    requestAnimationFrame(raf);

    // Clean up on unmount
    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [options]);

  return lenisRef;
}

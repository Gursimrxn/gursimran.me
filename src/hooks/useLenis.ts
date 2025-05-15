"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { lenisManager } from "@/lib/lenisManager";

/**
 * A custom hook to initialize and manage Lenis smooth scrolling
 * @param options - Configuration options for Lenis
 * @returns Reference to the Lenis instance
 */
export function useLenis(options: {
  duration?: number;
  easing?: (t: number) => number;
  wheelMultiplier?: number;
  smoothWheel?: boolean;
  enabled?: boolean;
  [key: string]: any;
} = {}) {
  const lenisRef = useRef<Lenis | null>(null);
  const { enabled = true, ...lenisOptions } = options;
    useEffect(() => {
    // Only initialize Lenis if enabled
    if (!enabled) {
      // Clean up any existing instance
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisManager.setLenisInstance(null);
        lenisRef.current = null;
      }
      return;
    }
    
    // Initialize Lenis with original smooth settings - set immediateScroll to true
    const lenis = new Lenis({
      duration: 1.2,           // Original duration
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Original easing function
      wheelMultiplier: 1.0,    // Original wheel multiplier
      smoothWheel: true,       // Enable smooth wheel scrolling
      syncTouch: true,
      ...lenisOptions,         // Override with user options
    });

    // Store the instance in the ref and global manager immediately
    lenisRef.current = lenis;
    lenisManager.setLenisInstance(lenis);

    // Animation frame update function with high priority
    function raf(time: number) {
      if (lenisRef.current) {
        lenisRef.current.raf(time);
      }
      requestAnimationFrame(raf);
    }

    // Start the animation loop immediately
    raf(performance.now());

    // Clean up on unmount
    return () => {
      lenis.destroy();
      lenisManager.setLenisInstance(null);
      lenisRef.current = null;
    };
  }, [enabled, lenisOptions]);

  return lenisRef;
}

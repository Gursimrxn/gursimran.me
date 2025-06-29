"use client";

import { useEffect, useState } from "react";
import { scrollToTop } from "@/lib/scroll";
import { cn } from "@/lib/utils";
import { lenisManager } from "@/lib/lenisManager";

interface ScrollToTopProps {
  className?: string;
  showAfter?: number;
  bottom?: number;
  right?: number;
  size?: number;
  duration?: number;
}

/**
 * A button that appears after scrolling down and allows users to scroll back to top
 * Always visible when scrolled and at the bottom of the page
 */
export default function ScrollToTopButton({
  className,
  showAfter = 3000, // Lower value to show the button earlier
  bottom = 30, // Position a bit higher from the bottom
  right = 30,
  size = 45, // Slightly larger button
}: ScrollToTopProps) {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Function to check scroll position and update button visibility
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Check if user has scrolled down enough to show button
      const hasScrolledEnough = scrollY > showAfter;
      
      // Always show the button when near the end of the page
      const isNearBottom = scrollY + windowHeight >= documentHeight - 50;
      
      setIsVisible(hasScrolledEnough || isNearBottom);
    };

    // Get Lenis instance
    const lenis = lenisManager.getLenis();

    // Initial check in case page is already scrolled
    handleScroll();
    
    // Set up scroll listeners - use both Lenis and native scroll events for reliability
    if (lenis) {
      lenis.on('scroll', handleScroll);
    }
    
    // Also add native scroll listener as fallback
    window.addEventListener('scroll', handleScroll);

    // Add resize listener to recalculate on window resize
    window.addEventListener('resize', handleScroll);

    // Cleanup function
    return () => {
      if (lenis) {
        lenis.off('scroll', handleScroll);
      }
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [showAfter]);
  
  const handleClick = () => {
    // Use the improved scrollToTop function with a faster duration
    scrollToTop({ 
      duration: 1.0 // Faster scrolling (reduced from 2.0)
    });
  };
  
  return (
    <button
      aria-label="Scroll to top"
      title="Scroll to top"
      className={cn(
        "fixed transition-all duration-300 rounded-full border border-black/20 bg-white/90 backdrop-blur-sm shadow-md z-50",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none",
        "hover:bg-white hover:shadow-lg hover:scale-110 active:scale-95",
        "focus:outline-none cursor-pointer",
        className
      )}
      style={{
        bottom: `${bottom}px`,
        right: `${right}px`,
        width: `${size}px`,
        height: `${size}px`,
      }}
      onClick={handleClick}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="m-auto"
      >
        <path
          d="M12 4L12 20M12 4L18 10M12 4L6 10"
          stroke="black"
          strokeOpacity="0.6"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

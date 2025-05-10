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
  hideWhenAtBottom?: boolean;
}

/**
 * A button that appears after scrolling down and allows users to scroll back to top
 * Automatically detects when user has reached the end of the page
 */
export default function ScrollToTopButton({
  className,
  showAfter = 150, // Lower value to show the button earlier
  bottom = 40, // Position a bit higher from the bottom
  right = 30,
  size = 45, // Slightly larger button
  duration = 1.2,
  hideWhenAtBottom = true, // Hide button when at the bottom of the page
}: ScrollToTopProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);
  
  useEffect(() => {
    // Function to check scroll position and update button visibility
    const handleScroll = () => {
      // Only update visibility state when not actively scrolling
      if (!lenisManager.isScrolling()) {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        
        // Check if user has scrolled down enough to show button
        const hasScrolledEnough = scrollY > showAfter;
        
        // Check if user is at the bottom of the page (with a small threshold)
        const isBottom = scrollY + windowHeight >= documentHeight - 10;
        
        setIsVisible(hasScrolledEnough);
        setIsAtBottom(isBottom);
      }
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
  }, [showAfter, hideWhenAtBottom]);const handleClick = () => {
    // Use the improved scrollToTop function with a faster duration
    scrollToTop({ 
      duration: duration || 1.0 // Faster scrolling (reduced from 2.0)
    });
  };
  
  // Button should be visible when scrolled down, but optionally hidden when at the bottom
  const shouldBeVisible = isVisible && (!hideWhenAtBottom || !isAtBottom);
  
  return (
    <button
      aria-label="Scroll to top"
      title="Scroll to top"
      className={cn(
        "fixed transition-all duration-300 rounded-full border border-black/20 bg-white/90 backdrop-blur-sm shadow-md z-50",
        shouldBeVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none",
        "hover:bg-white hover:shadow-lg hover:scale-110 active:scale-95",
        "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
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

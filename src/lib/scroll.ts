"use client";

import { lenisManager } from "@/lib/lenisManager";

/**
 * Scroll to a specific element or position
 * Falls back to native scrolling if Lenis is not available
 * 
 * @param target - The target to scroll to (element, selector, or position)
 * @param options - Scroll options like offset and duration
 */
export function scrollTo(
  target: string | HTMLElement | number,
  options: { 
    offset?: number; 
    duration?: number;
    immediate?: boolean;
  } = {}
) {
  const lenis = lenisManager.getLenis();
  
  if (lenis) {
    // Use Lenis scrolling if available
    lenisManager.scrollTo(target, options);
  } else {
    // Fall back to native scrolling
    let targetElement: HTMLElement | null = null;
    let targetPosition = 0;
    
    if (typeof target === 'string') {
      targetElement = document.querySelector(target);
      if (targetElement) {
        targetPosition = targetElement.getBoundingClientRect().top + window.scrollY + (options.offset || 0);
      }
    } else if (target instanceof HTMLElement) {
      targetPosition = target.getBoundingClientRect().top + window.scrollY + (options.offset || 0);
    } else if (typeof target === 'number') {
      targetPosition = target;
    }
    
    window.scrollTo({
      top: targetPosition,
      behavior: options.immediate ? 'auto' : 'smooth'
    });
  }
}

/**
 * Scroll to the top of the page
 * 
 * @param options - Scroll options like duration
 */
export function scrollToTop(options: { duration?: number } = {}) {
  const defaultOptions = { 
    duration: 1.2, // Original duration
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) // Original easing function
  };
  
  const lenis = lenisManager.getLenis();
  if (lenis) {
    // Use Lenis scrolling if available
    lenisManager.scrollTo(0, { ...defaultOptions, ...options });
  } else {
    // Fall back to native scrolling
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}

/**
 * Create a scroll handler function that scrolls to an element id
 * Works with both Lenis and native scrolling
 */
export function createScrollToHandler(elementId: string, options: { 
  offset?: number; 
  duration?: number;
} = {}) {
  return (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
    }
    scrollTo(`#${elementId}`, options);
  };
}

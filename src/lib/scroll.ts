"use client";

import { lenisManager } from "@/lib/lenisManager";

/**
 * Scroll to a specific element or position
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
  lenisManager.scrollTo(target, options);
}

/**
 * Scroll to the top of the page
 * 
 * @param options - Scroll options like duration
 */
export function scrollToTop(options: { duration?: number } = {}) {
  const defaultOptions = { 
    duration: 1.0, // Faster scrolling (reduced from 2.0)
    easing: (t: number) => 1 - Math.pow(1 - t, 5) // Stronger easing curve for smooth deceleration at the end
  };
  lenisManager.scrollTo(0, { ...defaultOptions, ...options });
}

/**
 * Create a scroll handler function that scrolls to an element id
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

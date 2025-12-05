"use client";

import { createContext, useContext, useState, ReactNode, useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "motion/react";
import { RightArrow } from "@/components/icons";

interface CursorPosition {
  x: number;
  y: number;
}

interface CursorContextType {
  setShowViewMore: (show: boolean) => void;
  showViewMore: boolean;
  cursorPosition: CursorPosition;
  setCursorPosition: (pos: CursorPosition) => void;
}

const CursorContext = createContext<CursorContextType | undefined>(undefined);

export const useCursor = () => {
  const context = useContext(CursorContext);
  if (!context) {
    throw new Error("useCursor must be used within a CursorProvider");
  }
  return context;
};

// View More cursor component
const ViewMoreCursor = ({ currentPosition }: { currentPosition: CursorPosition }) => {
  const rotation = useMotionValue(0);
  const smoothRotation = useSpring(rotation, { stiffness: 400, damping: 15 });
  const lastMousePos = useRef(currentPosition);
  const velocity = useRef({ x: 0, y: 0 });
  const lastUpdateTime = useRef(Date.now());

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      const currentTime = Date.now();
      const deltaTime = currentTime - lastUpdateTime.current;
      
      if (deltaTime > 0) {
        const currentPos = { x: e.clientX, y: e.clientY };
        velocity.current = {
          x: (currentPos.x - lastMousePos.current.x) / deltaTime * 1000,
          y: (currentPos.y - lastMousePos.current.y) / deltaTime * 1000,
        };
        
        // Calculate rotation based on horizontal velocity
        const velocityFactor = Math.min(Math.abs(velocity.current.x) / 1000, 1);
        const targetRotation = (velocity.current.x / 1000) * 20;
        const clampedRotation = Math.max(-20, Math.min(20, targetRotation));
        
        rotation.set(clampedRotation * velocityFactor);
        
        lastMousePos.current = currentPos;
        lastUpdateTime.current = currentTime;
      }
    };

    document.body.addEventListener('pointermove', handlePointerMove, { passive: true });
    
    return () => {
      document.body.removeEventListener('pointermove', handlePointerMove);
    };
  }, [rotation]);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center"
      style={{
        x: currentPosition.x - 60, // Offset to center the cursor
        y: currentPosition.y - 20,
      }}
    >
      <motion.div
        className="flex items-center justify-center bg-gradient-to-r from-[#fcfcfc] to-[#ffe5db] text-[#FF6B35] border-1 border-[#FF6B35] rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap shadow-lg shadow-[#FF6B35]/25"
        initial={{ scale: 0, opacity: 0, rotate: 0 }}
        animate={{ 
          scale: 1, 
          opacity: 1,
          x: [0, -0.6, 0.6, -0.6, 0],
          y: [0, 0.6, -0.6, 0.6, 0]
        }}
        exit={{ 
          scale: 0, 
          opacity: 0,
          rotate: 0,
          transition: {
            duration: 0.2,
            ease: "easeInOut"
          }
        }}
        style={{
          rotate: smoothRotation
        }}
        transition={{
          scale: {
            type: "spring",
            stiffness: 700,
            damping: 25,
          },
          opacity: {
            type: "spring",
            stiffness: 700,
            damping: 25,
          },
          x: {
            duration: 0.8,
            repeat: Infinity,
            ease: "easeInOut",
          },
          y: {
            duration: 0.6,
            repeat: Infinity,
            ease: "easeInOut",
          }
        }}
      >
        <span className="mr-2">View More</span>
        <RightArrow className="w-4 h-4" />
      </motion.div>
    </motion.div>
  );
};

interface CursorProviderProps {
  children: ReactNode;
}

export const CursorProvider = ({ children }: CursorProviderProps) => {
  const [showViewMore, setShowViewMore] = useState(false);
  const [cursorPosition, setCursorPosition] = useState<CursorPosition>({ x: 0, y: 0 });
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastMousePosRef = useRef<CursorPosition>({ x: 0, y: 0 });

  // Global mouse position tracking - always updated
  useEffect(() => {
    const handleGlobalPointerMove = (e: PointerEvent) => {
      const pos = { x: e.clientX, y: e.clientY };
      setCursorPosition(pos);
      lastMousePosRef.current = pos;
    };

    document.body.addEventListener('pointermove', handleGlobalPointerMove, { passive: true });
    
    return () => {
      document.body.removeEventListener('pointermove', handleGlobalPointerMove);
    };
  }, []);

  // Detect when mouse is over viewMore elements
  useEffect(() => {
    const checkCursorOverViewMore = (clientX: number, clientY: number) => {
      const elementAtPoint = document.elementFromPoint(clientX, clientY);
      if (!elementAtPoint) return false;
      
      return !!(elementAtPoint.classList.contains('cursor-view-more') || 
                elementAtPoint.closest('.cursor-view-more'));
    };

    const updateCursorState = (clientX: number, clientY: number) => {
      const shouldShowViewMore = checkCursorOverViewMore(clientX, clientY);
      
      // Clear any existing debounce
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
      
      // Small debounce to prevent rapid flickering
      debounceTimeoutRef.current = setTimeout(() => {
        setShowViewMore(shouldShowViewMore);
      }, 10);
    };

    const handlePointerMove = (e: PointerEvent) => {
      updateCursorState(e.clientX, e.clientY);
    };

    // Check cursor state during scroll since elements move under the cursor
    const handleScroll = () => {
      // Use requestAnimationFrame to check after scroll has been processed
      requestAnimationFrame(() => {
        const { x, y } = lastMousePosRef.current;
        if (x > 0 || y > 0) { // Only check if we have a valid mouse position
          updateCursorState(x, y);
        }
      });
    };

    document.body.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      document.body.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('scroll', handleScroll);
      
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, []);

  // Add/remove cursor hiding styles when viewMore is active
  useEffect(() => {
    if (showViewMore) {
      // Hide all cursors when viewMore is active
      document.body.style.cursor = 'none';
      document.documentElement.style.cursor = 'none';
      
      // Add style to override all cursor styles with maximum specificity
      const style = document.createElement('style');
      style.id = 'viewmore-cursor-override';
      style.textContent = `
        /* Global cursor override with maximum specificity and broader targeting */
        html, html *, html *::before, html *::after,
        body, body *, body *::before, body *::after,
        div, div *, div *::before, div *::after,
        span, span *, span *::before, span *::after {
          cursor: none !important;
        }
        
        /* Target specific interactive elements that might have their own cursor */
        button, button *, button::before, button::after,
        a, a *, a::before, a::after,
        input, input *, input::before, input::after,
        textarea, textarea *, textarea::before, textarea::after,
        select, select *, select::before, select::after,
        [role="button"], [role="button"] *, [role="button"]::before, [role="button"]::after,
        [role="link"], [role="link"] *, [role="link"]::before, [role="link"]::after,
        .clickable, .clickable *, .clickable::before, .clickable::after,
        .cursor-pointer, .cursor-pointer *, .cursor-pointer::before, .cursor-pointer::after,
        .cursor-text, .cursor-text *, .cursor-text::before, .cursor-text::after,
        svg, svg *, svg::before, svg::after,
        rect, rect *, rect::before, rect::after,
        path, path *, path::before, path::after,
        g, g *, g::before, g::after,
        [data-testid], [data-testid] *, [data-testid]::before, [data-testid]::after,
        .heat-map, .heat-map *, .heat-map::before, .heat-map::after,
        .custom-scrollbar, .custom-scrollbar *, .custom-scrollbar::before, .custom-scrollbar::after {
          cursor: none !important;
        }
        
        /* Override any CSS custom cursors with URL values */
        [style*="cursor"], [style*="cursor"] *, [style*="cursor"]::before, [style*="cursor"]::after {
          cursor: none !important;
        }
        
        /* Hide system cursors on scrollable elements WITHOUT affecting their visibility */
        ::-webkit-scrollbar {
          cursor: none !important;
        }
        ::-webkit-scrollbar-thumb {
          cursor: none !important;
        }
        ::-webkit-scrollbar-track {
          cursor: none !important;
        }
        ::-webkit-scrollbar-button {
          cursor: none !important;
        }
        ::-webkit-scrollbar-corner {
          cursor: none !important;
        }
        
        /* Force cursor none on all possible pseudo-elements */
        *::selection {
          cursor: none !important;
        }
        
        /* Override any remaining cursor styles */
        [class*="cursor"], [class*="cursor"] *, [class*="cursor"]::before, [class*="cursor"]::after {
          cursor: none !important;
        }
      `;
      document.head.appendChild(style);
    } else {
      // Restore normal cursor behavior
      document.body.style.cursor = '';
      document.documentElement.style.cursor = '';
      
      // Remove override style
      const existingStyle = document.getElementById('viewmore-cursor-override');
      if (existingStyle) {
        existingStyle.remove();
      }
    }

    // Cleanup on unmount
    return () => {
      document.body.style.cursor = '';
      document.documentElement.style.cursor = '';
      const existingStyle = document.getElementById('viewmore-cursor-override');
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, [showViewMore]);

  return (
    <CursorContext.Provider value={{ setShowViewMore, showViewMore, cursorPosition, setCursorPosition }}>
      {children}
      <AnimatePresence>
        {showViewMore && <ViewMoreCursor key="viewMore" currentPosition={cursorPosition} />}
      </AnimatePresence>
    </CursorContext.Provider>
  );
};

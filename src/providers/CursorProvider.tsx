"use client";

import { createContext, useContext, useState, ReactNode, useRef, useEffect } from "react";
import { SmoothCursor } from "@/components/ui/SmoothCursor";
import { motion, useMotionValue, useSpring, AnimatePresence } from "motion/react";
import { RightArrow } from "@/components/icons/RightArrow";

interface CursorContextType {
  setCursorVariant: (variant: CursorVariant) => void;
  cursorVariant: CursorVariant;
}

type CursorVariant = "default" | "viewMore" | "text" | "pointer";

const CursorContext = createContext<CursorContextType | undefined>(undefined);

export const useCursor = () => {
  const context = useContext(CursorContext);
  if (!context) {
    throw new Error("useCursor must be used within a CursorProvider");
  }
  return context;
};

// Default cursor component
const DefaultCursor = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={50}
    height={54}
    viewBox="0 0 50 54"
    fill="none"
    style={{ scale: 0.5, transform: 'rotate(-15deg)' }}
  >
    <g filter="url(#filter0_d_91_7928)">
      <path
        d="M42.6817 41.1495L27.5103 6.79925C26.7269 5.02557 24.2082 5.02558 23.3927 6.79925L7.59814 41.1495C6.75833 42.9759 8.52712 44.8902 10.4125 44.1954L24.3757 39.0496C24.8829 38.8627 25.4385 38.8627 25.9422 39.0496L39.8121 44.1954C41.6849 44.8902 43.4884 42.9759 42.6817 41.1495Z"
        fill="black"
      />
      <path
        d="M43.7146 40.6933L28.5431 6.34306C27.3556 3.65428 23.5772 3.69516 22.3668 6.32755L6.57226 40.6778C5.3134 43.4156 7.97238 46.298 10.803 45.2549L24.7662 40.109C25.0221 40.0147 25.2999 40.0156 25.5494 40.1082L39.4193 45.254C42.2261 46.2953 44.9254 43.4347 43.7146 40.6933Z"
        stroke="white"
        strokeWidth={2.25825}
      />
    </g>
    <defs>
      <filter
        id="filter0_d_91_7928"
        x={0.602397}
        y={0.952444}
        width={49.0584}
        height={52.428}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy={2.25825} />
        <feGaussianBlur stdDeviation={2.25825} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_91_7928"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_91_7928"
          result="shape"
        />      </filter>
    </defs>
  </svg>
);

// Text cursor component
const TextCursor = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={13}
    height={25}
    fill="none"
    viewBox="0 0 13 25"
  >
    <path
      fill="#000"
      stroke="#fff"
      strokeWidth={1.75}
      d="M8 18.48v-4.23h1.27v-3H8V5.8c.2-.44.5-.82.87-1.14.23-.16.52-.32.83-.44a5.4 5.4 0 0 1 1.17-.05l.87.05.05-.87.08-1.27.06-.87-.88-.06c-.7-.04-1.4 0-2.1.14l-.05.01-.06.02c-.7.25-1.29.56-1.82.95L7 2.28l-.03.02c-.16.13-.31.28-.46.42a6.93 6.93 0 0 0-.39-.38l-.03-.03-.03-.02a5.86 5.86 0 0 0-1.85-.97l-.04-.01-.04-.01a8.1 8.1 0 0 0-2.19-.16l-.87.06.06.87.08 1.27.06.88.87-.06c.43-.03.85 0 1.27.08.23.08.5.21.74.4.33.3.63.72.84 1.19v5.42H3.72v3h1.27v4.2c-.21.47-.51.89-.88 1.24-.2.14-.46.28-.75.37-.36.07-.8.1-1.22.06l-.87-.05-.06.87-.08 1.27-.06.88.87.05c.71.05 1.42 0 2.12-.14h.04l.04-.02a5.83 5.83 0 0 0 1.88-.95l.03-.02.03-.03.44-.43c.14.14.28.27.44.4l.02.02.02.01c.55.42 1.14.73 1.76.95l.05.02.06.01c.77.17 1.47.22 2.17.18l.88-.05-.05-.87-.07-1.27-.05-.87-.87.04c-.42.03-.83 0-1.24-.08-.24-.1-.52-.25-.8-.45A3.4 3.4 0 0 1 8 18.48Z"
    />
  </svg>
);

// Pointer cursor component
const PointerCursor = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={28}
    height={29}
    fill="none"
    viewBox="0 0 28 29"
  >
    <path
      fill="#fff"
      d="M6.84 21.83c-.47-.6-1.05-1.82-2.07-3.34-.58-.83-2.01-2.41-2.45-3.23a2.1 2.1 0 0 1-.25-1.67 2.2 2.2 0 0 1 2.39-1.67c.85.18 1.63.6 2.25 1.2.43.41.82.85 1.18 1.32.27.34.33.47.63.85.3.39.5.77.35.2-.11-.83-.31-2.23-.6-3.48-.21-.95-.26-1.1-.46-1.82s-.32-1.32-.54-2.13c-.2-.8-.35-1.62-.46-2.44a4.7 4.7 0 0 1 .43-3.08c.58-.55 1.44-.7 2.17-.37a4.4 4.4 0 0 1 1.57 2.17c.43 1.07.72 2.19.86 3.33.27 1.67.79 4.1.8 4.6 0-.61-.11-1.91 0-2.5.12-.6.54-1.1 1.12-1.33.5-.15 1.02-.19 1.53-.1.52.1.98.4 1.29.83.38.98.6 2 .63 3.05.04-.91.2-1.82.47-2.7.28-.39.68-.67 1.15-.8.55-.1 1.11-.1 1.66 0 .46.15.85.44 1.14.82.35.88.56 1.82.63 2.77 0 .23.12-.65.48-1.24a1.67 1.67 0 1 1 3.17 1.07v3.77c-.06.97-.2 1.94-.4 2.9-.29.85-.7 1.65-1.2 2.38-.8.9-1.48 1.92-1.98 3.02a6.67 6.67 0 0 0 .03 3.2c-.68.07-1.37.07-2.05 0-.65-.1-1.45-1.4-1.67-1.8a.63.63 0 0 0-1.13 0c-.37.64-1.18 1.79-1.75 1.85-1.12.14-3.42 0-5.23 0 0 0 .3-1.66-.39-2.27-.68-.6-1.38-1.3-1.9-1.76l-1.4-1.6Z"
    />
    <path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2.25}
      d="M6.84 21.83c-.47-.6-1.05-1.82-2.07-3.34-.58-.83-2.01-2.41-2.45-3.23a2.1 2.1 0 0 1-.25-1.67 2.2 2.2 0 0 1 2.39-1.67c.85.18 1.63.6 2.25 1.2.43.41.82.85 1.18 1.32.27.34.33.47.63.85.3.39.5.77.35.2-.11-.83-.31-2.23-.6-3.48-.21-.95-.26-1.1-.46-1.82s-.32-1.32-.54-2.13c-.2-.8-.35-1.62-.46-2.44a4.7 4.7 0 0 1 .43-3.08c.58-.55 1.44-.7 2.17-.37a4.4 4.4 0 0 1 1.57 2.17c.43 1.07.72 2.19.86 3.33.27 1.67.79 4.1.8 4.6 0-.61-.11-1.91 0-2.5.12-.6.54-1.1 1.12-1.33.5-.15 1.02-.19 1.53-.1.52.1.98.4 1.29.83.38.98.6 2 .63 3.05.04-.91.2-1.82.47-2.7.28-.39.68-.67 1.15-.8.55-.1 1.11-.1 1.66 0 .46.15.85.44 1.14.82.35.88.56 1.82.63 2.77 0 .23.12-.65.48-1.24a1.67 1.67 0 1 1 3.17 1.07v3.77c-.06.97-.2 1.94-.4 2.9-.29.85-.7 1.65-1.2 2.38-.8.9-1.48 1.92-1.98 3.02a6.67 6.67 0 0 0 .03 3.2c-.68.07-1.37.07-2.05 0-.65-.1-1.45-1.4-1.67-1.8a.63.63 0 0 0-1.13 0c-.37.64-1.18 1.79-1.75 1.85-1.12.14-3.42 0-5.23 0 0 0 .3-1.66-.39-2.27-.68-.6-1.38-1.3-1.9-1.76l-1.4-1.6Z"
      clipRule="evenodd"
    />
    <path
      fill="#000"
      d="M20.65 22.3v-6.24c0-.38-.31-.68-.7-.68-.37 0-.68.3-.68.68v6.23c0 .38.3.68.69.68.38 0 .69-.3.69-.68ZM17.2 22.3l-.04-6.25a.67.67 0 1 0-1.34.01l.04 6.24a.67.67 0 1 0 1.34 0ZM12.37 16.07l.04 6.22c0 .38.3.68.67.68.37 0 .67-.3.67-.68l-.04-6.23c0-.38-.3-.68-.67-.68-.37 0-.67.31-.67.69Z"
    />
  </svg>
);

// View More cursor component
const ViewMoreCursor = () => {
  const rotation = useMotionValue(0);
  const smoothRotation = useSpring(rotation, { stiffness: 400, damping: 15 });
  const lastMousePos = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });
  const lastUpdateTime = useRef(Date.now());

  useEffect(() => {
    const updateRotation = (e: MouseEvent) => {
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
        const targetRotation = (velocity.current.x / 1000) * 20; // Reduced from 30 to 20 degrees
        const clampedRotation = Math.max(-20, Math.min(20, targetRotation));
        
        rotation.set(clampedRotation * velocityFactor);
        
        lastMousePos.current = currentPos;
        lastUpdateTime.current = currentTime;
      }
    };

    document.addEventListener('mousemove', updateRotation);
    
    return () => {
      document.removeEventListener('mousemove', updateRotation);
    };
  }, [rotation]);

  return (
    <motion.div
      className="flex items-center justify-center bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap shadow-lg shadow-orange-500/25"
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
  );
};

interface CursorProviderProps {
  children: ReactNode;
}

export const CursorProvider = ({ children }: CursorProviderProps) => {
  const [cursorVariant, setCursorVariant] = useState<CursorVariant>("default");  // Automatic cursor variant detection based on hovered elements
  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Check for viewMore cursor elements first (highest priority)
      // This ensures entire cards show viewMore cursor
      if (target.classList.contains('cursor-view-more') || target.closest('.cursor-view-more')) {
        setCursorVariant("viewMore");
        return;
      }
      
      // Check for text cursor elements (only for actual input elements, not text content)
      if (
        (target.tagName === 'INPUT' && (target as HTMLInputElement).type === 'text') ||
        target.tagName === 'TEXTAREA' ||
        target.contentEditable === 'true'
      ) {
        setCursorVariant("text");
        return;
      }
      
      // Check for pointer cursor elements (buttons, etc.)
      if (
        target.tagName === 'BUTTON' ||
        target.getAttribute('role') === 'button' ||
        target.classList.contains('cursor-pointer') ||
        target.classList.contains('clickable') ||
        target.closest('button, [role="button"], .cursor-pointer, .clickable') ||
        // Check for any element with click handlers
        target.onclick !== null
      ) {
        setCursorVariant("pointer");
        return;
      }
      
      // Check for links (general pointer cursor)
      if (
        (target.tagName === 'A' && target.getAttribute('href')) ||
        target.closest('a[href]') ||
        getComputedStyle(target).cursor === 'pointer'
      ) {
        setCursorVariant("pointer");
        return;
      }
      
      // Default cursor for everything else
      setCursorVariant("default");
    };

    // Use both mouseover and mouseenter for better detection
    document.addEventListener('mouseover', handleMouseOver, true); // Use capture phase
    
    return () => {
      document.removeEventListener('mouseover', handleMouseOver, true);
    };
  }, []);  const getCursorComponent = () => {
    return (
      <AnimatePresence mode="wait" initial={false}>
        {cursorVariant === "viewMore" ? (
          <ViewMoreCursor key="viewMore" />
        ) : cursorVariant === "text" ? (
          <TextCursor key="text" />
        ) : cursorVariant === "pointer" ? (
          <PointerCursor key="pointer" />
        ) : (
          <DefaultCursor key="default" />
        )}
      </AnimatePresence>
    );
  };  // Different spring configs for different cursor variants
  const getSpringConfig = () => {
    if (cursorVariant === "viewMore") {
      // Optimized viewMore cursor with smoother spring
      return {
        damping: 40,
        stiffness: 500,
        mass: 0.8,
        restDelta: 0.001,
      };
    }
    
    // Make all other cursors (default, text, pointer) as responsive as possible
    return {
      damping: 50, // High damping to eliminate bounce
      stiffness: 1200, // High stiffness for quick response
      mass: 0.01, // Very low mass for instant movement
      restDelta: 0.001,
    };
  };

  return (
    <CursorContext.Provider value={{ setCursorVariant, cursorVariant }}>
      {children}
      <SmoothCursor
        cursor={getCursorComponent()}
        springConfig={getSpringConfig()}
      />
    </CursorContext.Provider>
  );
};

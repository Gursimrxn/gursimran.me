"use client";

import { createContext, useContext, useState, ReactNode, useRef, useEffect } from "react";
import { SmoothCursor } from "@/components/ui/SmoothCursor";
import { motion, useMotionValue, useSpring, AnimatePresence } from "motion/react";
import { RightArrow } from "@/components/icons/RightArrow";

interface CursorContextType {
  setCursorVariant: (variant: CursorVariant) => void;
  cursorVariant: CursorVariant;
}

type CursorVariant = "default" | "viewMore";

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
        />
      </filter>
    </defs>
  </svg>
);

// View More cursor component
const ViewMoreCursor = () => {  const rotation = useMotionValue(0);
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
          x: (currentPos.x - lastMousePos.current.x) / deltaTime * 1000, // Convert to pixels per second
          y: (currentPos.y - lastMousePos.current.y) / deltaTime * 1000,
        };
        
        // Calculate rotation based on horizontal velocity
        const velocityFactor = Math.min(Math.abs(velocity.current.x) / 1000, 1); // Normalize velocity
        const targetRotation = (velocity.current.x / 1000) * 30; // Max 30 degrees
        const clampedRotation = Math.max(-30, Math.min(30, targetRotation));
        
        rotation.set(clampedRotation * velocityFactor);
        
        lastMousePos.current = currentPos;
        lastUpdateTime.current = currentTime;
      }
    };

    document.addEventListener('mousemove', updateRotation);
    
    return () => {
      document.removeEventListener('mousemove', updateRotation);
    };
  }, [rotation]);  return (
    <motion.div
      className="flex items-center justify-center bg-orange-500 text-white rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap shadow-lg"
      initial={{ scale: 0, opacity: 0, rotate: 0 }}
      animate={{ 
        scale: 1, 
        opacity: 1,
        x: [0, -0.8, 0.8, -0.8, 0],
        y: [0, 0.8, -0.8, 0.8, 0]
      }}
      exit={{ 
        scale: 0, 
        opacity: 0,
        rotate: 0,
        transition: {
          duration: 0.15,
          ease: "easeInOut"
        }
      }}
      style={{
        rotate: smoothRotation
      }}
      transition={{
        scale: {
          type: "spring",
          stiffness: 600,
          damping: 20,
        },
        opacity: {
          type: "spring",
          stiffness: 600,
          damping: 20,
        },
        x: {
          duration: 0.6,
          repeat: Infinity,
          ease: "easeInOut",
        },
        y: {
          duration: 0.45,
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
  const [cursorVariant, setCursorVariant] = useState<CursorVariant>("default");
  const getCursorComponent = () => {
    return (
      <AnimatePresence mode="wait">
        {cursorVariant === "viewMore" ? (
          <ViewMoreCursor key="viewMore" />
        ) : (
          <DefaultCursor key="default" />
        )}
      </AnimatePresence>
    );
  };

  return (
    <CursorContext.Provider value={{ setCursorVariant, cursorVariant }}>
      {children}
      <SmoothCursor
        cursor={getCursorComponent()}
        springConfig={{
          damping: 45,
          stiffness: 400,
          mass: 1,
          restDelta: 0.001,
        }}
      />
    </CursorContext.Provider>
  );
};

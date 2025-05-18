/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { cn } from '@/lib/utils';
import * as motion from 'motion';
import { useEffect, useRef } from 'react';
import { RightArrow } from '../icons/RightArrow';
import { Magnetic } from './MagneticButton';

interface ViewButtonProps {  
  className?: string;
  textColor?: string;
  label?: string;
  isHovered?: boolean;
  magneticEffect?: boolean;
  magneticIntensity?: number;
  magneticRange?: number;
  magneticActionArea?: 'self' | 'parent' | 'global';
  magneticSpringOptions?: {
    stiffness?: number;
    damping?: number;
    mass?: number;
  };
}

const ViewButton = ({
  className,
  textColor = 'text-black',
  label = 'View',
  isHovered = false,
  magneticEffect = true,
  magneticIntensity = 0.4,
  magneticRange = 60,
  magneticActionArea = 'parent',
  magneticSpringOptions = { stiffness: 150, damping: 15, mass: 0.1 }
}: ViewButtonProps) => {
  const buttonRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const animationRef = useRef<any[]>([]);
  const timeoutRef = useRef<number | null>(null);
  const isMountedRef = useRef<boolean>(true);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isMountedRef.current = false;
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Use motion library for animations with improved handling
  useEffect(() => {
    if (!buttonRef.current || !textRef.current) return;

    // Cancel any existing animations to prevent conflicts
    if (animationRef.current.length) {
      animationRef.current.forEach(anim => anim.cancel());
      animationRef.current = [];
    }

    // Clear any pending timeouts
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    if (isHovered) {
      // Ensure text is displayed before animation starts
      textRef.current.style.display = 'inline-block'; 
      
      // First animation: expand width with transform
      const sizeAnim = motion.animate(
        textRef.current,
        { 
          maxWidth: ['0px', '100px'],
          marginRight: ['0px', '8px'],
          transform: ['translateX(-10px) scale(0.9)', 'translateX(0) scale(1)']
        } as any,
        { 
          duration: 0.25,
          easing: [0.25, 0.1, 0.25, 1.0],
          fill: 'forwards',
        } as any
      );
      
      // Second animation: fade in with slight delay
      timeoutRef.current = window.setTimeout(() => {
        if (!isMountedRef.current || !textRef.current) return;
        
        const opacityAnim = motion.animate(
          textRef.current,
          { opacity: [0, 1] } as any,
          { 
            duration: 0.25,
            easing: 'ease-out',
            fill: 'forwards',
          } as any
        );
        animationRef.current.push(opacityAnim);
      }, 50);
      
      animationRef.current.push(sizeAnim);
    } else {
      // First animation: fade out
      const opacityAnim = motion.animate(
        textRef.current,
        { opacity: [1, 0] } as any,
        { 
          duration: 0.2,
          easing: 'ease-in',
          fill: 'forwards',
        } as any
      );
      
      // Second animation: collapse width with transform
      const sizeAnim = motion.animate(
        textRef.current,
        { 
          maxWidth: ['100px', '0px'],
          marginRight: ['8px', '0px'],
          transform: ['translateX(0) scale(1)', 'translateX(-10px) scale(0.9)']
        } as any,
        { 
          duration: 0.20,
          easing: [0.25, 0.1, 0.10, 1.0],
          fill: 'forwards',
        } as any
      );
      
      // Set display to none after animation completes
      timeoutRef.current = window.setTimeout(() => {
        if (!isMountedRef.current || !textRef.current) return;
        textRef.current.style.display = 'none';
      }, 300);
      
      animationRef.current.push(opacityAnim, sizeAnim);
    }

    // Cleanup function to cancel animations when hover state changes
    return () => {
      if (animationRef.current.length) {
        animationRef.current.forEach(anim => anim.cancel());
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [isHovered]);  return (
    magneticEffect ? (
      <Magnetic 
        intensity={magneticIntensity} 
        range={magneticRange} 
        actionArea={magneticActionArea}
        springOptions={magneticSpringOptions}
      >
        <div
          ref={buttonRef}
          className={cn(
            "flex items-center justify-between overflow-hidden",
            "rounded-full",
            "py-1.5 px-3 min-h-[2rem] min-w-[2rem]",
            "bg-orange-500 transition-colors",
            textColor,
            className
          )}
        >
          <div className="flex-grow-0 flex items-center justify-center flex-shrink-0 relative">
            <span 
              ref={textRef}
              className="text-sm font-product whitespace-nowrap opacity-0 max-w-0 mr-0 origin-left block" 
              style={{display: 'none'}}
            >
              {label}
            </span>
          </div>
          
          <RightArrow className="ml-1 w-4 h-4" />
        </div>
      </Magnetic>
    ) : (
      <div
        ref={buttonRef}
        className={cn(
          "flex items-center justify-between overflow-hidden",
          "rounded-full",
          "py-1.5 px-3 min-h-[2rem] min-w-[2rem]",
          "bg-orange-500 transition-colors",
          textColor,
          className
        )}
      >
        <div className="flex-grow-0 flex items-center justify-center flex-shrink-0 relative">
          <span 
            ref={textRef}
            className="text-sm font-product whitespace-nowrap opacity-0 max-w-0 mr-0 origin-left block" 
            style={{display: 'none'}}
          >
            {label}
          </span>
        </div>
        
        <RightArrow className="ml-1 w-4 h-4" />
      </div>
    )
  );
};

export default ViewButton;
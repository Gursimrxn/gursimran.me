"use client"

import { useEffect } from 'react';
import { cn } from '@/lib/utils';

type ToastProps = {
  message: string;
  onClose: () => void;
  type?: 'success' | 'error' | 'info';
  duration?: number;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
};

export const Toast = ({ 
  message, 
  onClose, 
  type = 'success', 
  duration = 3000,
  position = 'bottom-right'
}: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const positions = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4'
  };
  
  const types = {
    success: 'bg-green-600',
    error: 'bg-red-600',
    info: 'bg-blue-600'
  };
  
  return (
    <div 
      className={cn(
        "fixed text-white px-4 py-2 rounded-lg shadow-lg z-50",
        "animate-fade-in-slide",
        positions[position],
        types[type]
      )}
      role="alert"
      aria-live="polite"
    >
      {message}
    </div>
  );
};

export default Toast;

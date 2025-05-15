"use client"

import Link from 'next/link';
import { useState } from 'react';
import { Medal } from "@/components/icons/Medal";
import BentoBadge from "@/components/ui/BentoBadge";
import { GlowingEffect } from '@/components/ui/GlowingEffect';
import { cn } from '@/lib/utils';
import ViewButton from './ui/ViewButton';

type HighlightItem = {
  title: string;
  href: string;
};

// Component to render each highlight card with minimal UI and animations
const HighlightCard = ({ item, index }: { item: HighlightItem; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <Link 
      href={item.href}
      className={cn(
        "group flex items-center justify-between rounded-[20px] sm:rounded-[30px] border-1 border-black/10",
        "bg-[#0475F71A] hover:bg-[#0475f720]",
        "py-3 px-4 sm:py-4 sm:px-5 md:py-5 md:px-6", // Responsive padding
        "transition-all duration-300",
        "opacity-0 translate-y-4",
        "animate-fade-in-up"
      )}
      style={{ animationDelay: `${index * 100}ms` }}
      aria-label={item.title}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)} // Add touch support
      onTouchEnd={() => setTimeout(() => setIsHovered(false), 1000)} // Delay to see button
    >
      <span className="text-sm sm:text-base font-medium text-gray-800 group-hover:text-gray-900 truncate mr-2 trqnsition-all duration-300">
        {item.title}
      </span>
      
      <ViewButton
        href={    item.href}
        className='bg-black/20 flex-shrink-0'
        isHovered={isHovered}
        label="View"
      />
    </Link>
  );
};

interface RecentHighlightsProps {
  title?: string;
  highlights?: HighlightItem[];
}

const RecentHighlights = ({ 
  title = 'RECENT HIGHLIGHTS',
  highlights = [
    { title: '1st Place Hackmol 6.0', href: '#' },
    { title: 'AI Events Lead @ Dialogh', href: '#' },
    { title: 'Finalist at Hacktu 6.0', href: '#' }
  ]
}: RecentHighlightsProps) => {
  return (
    <div className='group relative select-none flex h-full w-full flex-col justify-between overflow-hidden p-3 sm:p-4 md:p-6 rounded-[20px] sm:rounded-[30px] md:rounded-[40px] bg-gradient-to-b from-[#ffffff] to-[#fcfcfc]'>
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.5s ease-out forwards;
        }
      `}</style>
      
      <GlowingEffect
        spread={40}
        glow={true}
        disabled={false}
        proximity={64}
        inactiveZone={0.01}
      />

      <BentoBadge 
        icon={Medal} 
        text={title} 
        className='mx-auto text-xs sm:text-sm md:text-base'
      />
      
      <div className="py-2 sm:py-3 flex flex-col gap-2 sm:gap-3">
        {highlights.map((item, index) => (
          <HighlightCard key={index} item={item} index={index} />
        ))}
      </div>
    </div>
  );
};

export default RecentHighlights;
"use client"

import Link from 'next/link';
import { useState } from 'react';
import { Medal } from "@/components/icons/Medal";
import BentoBadge from "@/components/ui/BentoBadge";
import { GlowingEffect } from '@/components/ui/GlowingEffect';
import { cn } from '@/lib/utils';

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
        "group flex items-center justify-between rounded-[30px] border-1 border-black/10",
        "bg-[#0475F71A] hover:bg-[#0475f720] py-5 px-6",
        "transition-all duration-300",
        "opacity-0 translate-y-4",
        "animate-fade-in-up"
      )}
      style={{ animationDelay: `${index * 100}ms` }}
      aria-label={item.title}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="text-base font-medium text-gray-800 group-hover:text-gray-900">{item.title}</span>
      
      <div
        className="flex items-center justify-center rounded-[30px] bg-gray-300/50 w-8 h-8 text-gray-700"
        aria-hidden="true"
      >
        <svg
          width="16"
          height="10"
          viewBox="0 0 16 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={cn(
            "transition-transform duration-300",
            isHovered && "translate-x-0.5"
          )}
        >
          <path d="M0.500105 5.75008L0.5 4.25015H12.6289L9.66665 1.28783L10.7273 0.227173L15.5003 5.00015L10.7273 9.77315L9.66665 8.71243L12.629 5.75015L0.500105 5.75008Z" fill="#0C0000"/>
        </svg>
      </div>
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
    <div className='group relative select-none flex h-full w-full flex-col justify-between overflow-hidden p-6 rounded-[40px] bg-gradient-to-b from-[#ffffff] to-[#fcfcfc]'>
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

      <BentoBadge icon={Medal} text="RECENT HIGHLIGHTS" className='mx-auto'/>
      <div className="py-3 flex flex-col gap-3">
        {highlights.map((item, index) => (
          <HighlightCard key={index} item={item} index={index} />
        ))}
      </div>
    </div>
  );
};

export default RecentHighlights;
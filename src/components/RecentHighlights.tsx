"use client"

import Link from 'next/link';
import { Medal } from "./icons/Medal";
import BentoBadge from "./ui/BentoBadge";
import { GlowingEffect } from './ui/GlowingEffect';

type HighlightItem = {
  title: string;
  href: string;
};

const highlights: HighlightItem[] = [
  {
    title: '1st Place Hackmol 6.0',
    href: '#hackmol',
  },
  {
    title: 'Ai Events Lead @ Dialogh',
    href: '#dialogh',
  },
  {
    title: 'Finalist at Hacktu 6.0',
    href: '#hacktu',
  },
];

const RecentHighlights = () => {
  return (
    <div className='group relative select-none flex h-full w-full flex-col justify-between overflow-hidden p-6 rounded-[40px] bg-gradient-to-t from-[#FCFCFC] to-[#FFFCFA]'>
      <GlowingEffect
        spread={40}
        glow={true}
        disabled={false}
        proximity={64}
        inactiveZone={0.01}
      />
      
      <BentoBadge
        icon={Medal}
        text='RECENT HIGHLIGHTS'
        className='mx-auto'
      />
      
      <div className="mt-8 flex flex-col gap-3">
        {highlights.map((item, index) => (
          <Link 
            key={index}
            href={item.href}
            className="group flex items-center justify-between rounded-[25px] bg-blue-100 hover:bg-blue-200/75 border-blue-100/50 p-4 transition-all duration-300 hover:shadow-sm"
          >
            <span className="text-base font-medium text-gray-800">{item.title}</span>
            <div className="flex px-4 py-2 items-center justify-center rounded-[10px] bg-gray-800/30 text-gray-600 transition-all hover:bg-gray-200 hover:text-gray-800">              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="transition-transform group-hover:translate-x-0.5"
              >
                <path d="M5 12h14M12 5l7 7-7 7" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
 
export default RecentHighlights;
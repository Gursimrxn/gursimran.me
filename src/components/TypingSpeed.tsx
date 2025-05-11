"use client";

import { Monkeytype } from '@/components/icons/Monkeytype';
import { Target } from '@/components/icons/Target';
import { Timer } from '@/components/icons/Timer';
import type { MonkeyTypeData } from '@/types';
import BentoBadge from './ui/BentoBadge';
import { Translate } from './icons/Translate';
import { useRef, useEffect } from 'react';

const mapTypingDetailData = (data: MonkeyTypeData) => {
  return [
    { icon: Timer, category: 'time', value: `${data.time}s` },
    { icon: Target, category: 'accuracy', value: `${data.acc}%` },
    { icon: Translate, category: 'language', value: data.language || 'English' }
  ];
};

interface TypingDetailProps {
  value: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  category: string;
}

export const TypingDetail = ({
  icon: Icon,
  value
}: TypingDetailProps) => {
  return (
    <div className='flex items-center gap-1 tracking-wider text-black/50'>
      <Icon className='size-2.5 sm:size-3.5 text-black/50' />
      <p className="text-[10px] sm:text-sm whitespace-nowrap">{value}</p>
    </div>
  );
};

const TypingSpeed = (props: MonkeyTypeData) => {
  const gradientRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const element = gradientRef.current;
    if (!element) return;
    
    const handleMouseEnter = () => {
      element.style.backgroundSize = '200% 200%';
      element.style.animationPlayState = 'running';
    };
    
    const handleMouseLeave = () => {
      element.style.animationPlayState = 'paused';
    };
    
    const parentElement = element.closest('a');
    parentElement?.addEventListener('mouseenter', handleMouseEnter);
    parentElement?.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      parentElement?.removeEventListener('mouseenter', handleMouseEnter);
      parentElement?.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);
  
  return (
    <a
      href='https://monkeytype.com/profile/gursimrxn'
      target='_blank'
      rel="noopener noreferrer"
      className='group relative select-none flex h-full w-full flex-col justify-between overflow-hidden rounded-[15px] sm:rounded-[30px] md:rounded-[40px] p-2 sm:p-4 md:p-6'
    >
      <BentoBadge
        icon={Monkeytype}
        text='TYPING SPEED'
        className='mx-auto'
      />
      
      <div className="flex flex-col my-auto text-center">
        <div className='flex items-center justify-center'>
          <p 
            ref={gradientRef}
            className='text-8xl lg:text-9xl xl:text-[144px] font-medium leading-none sm:leading-tight bg-gradient-to-r from-[#000000] via-[#FF7A01] to-[#727889] text-transparent bg-clip-text animate-gradient bg-[length:100%_100%] transition-all duration-300'
            style={{
              animation: 'gradient 8s infinite',
              animationPlayState: 'paused',
            }}
          >
            {props.wpm}
          </p>
        </div>
        
        <div className='flex flex-col justify-center items-center mt-1 sm:mt-2'>
          <span className="font-black/50 text-sm md:text-base leading-tight mb-4">words per minute</span>
          
          <div className="flex flex-wrap justify-center gap-3 sm:gap-5">
            {mapTypingDetailData(props).map((item) => (
              <TypingDetail key={item.category} {...item} />
            ))}
          </div>
        </div>
      </div>
    </a>
  );
};

export default TypingSpeed;

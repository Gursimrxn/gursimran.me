"use client";

import { Monkeytype } from '@/components/icons';
import { Target } from '@/components/icons';
import { Timer } from '@/components/icons';
import type { MonkeyTypeData } from '@/types';
import BentoBadge from './ui/BentoBadge';
import { Translate } from './icons';
import Link from 'next/link';

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
      <p className="text-[10px] sm:text-sm whitespace-nowrap cursor-text">{value}</p>
    </div>
  );
};

const TypingSpeed = (props: MonkeyTypeData) => {
  
  return (    <Link
      href='https://monkeytype.com/profile/gursimrxn'
      target='_blank'
      rel="noopener noreferrer"
      className='group relative select-none flex h-full w-full flex-col justify-between overflow-hidden rounded-[40px] bg-gradient-to-b from-white to-[#fcfcfc] p-4 cursor-pointer'
    >
      <BentoBadge
        icon={Monkeytype}
        text='TYPING SPEED'
        className='mx-auto'
      />
      
      <div className="flex flex-col my-auto text-center">
        <div className='flex items-center justify-center'>
          <p className='text-7xl sm:text-8xl xl:text-[144px] font-medium leading-tight bg-gradient-to-r from-[#0767FB] to-[#000000] text-transparent bg-clip-text' >
            {props.wpm}
          </p>
        </div>
        
        <div className='flex flex-col justify-center items-center mt-2'>
          <span className="font-black/50 text-sm md:text-base leading-tight mb-4 cursor-text">words per minute</span>
          
          <div className="flex justify-center gap-3 sm:gap-5">
            {mapTypingDetailData(props).map((item) => (
              <TypingDetail key={item.category} {...item} />
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TypingSpeed;

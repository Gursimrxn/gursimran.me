"use client";

import { GlowingEffect } from "@/components/ui/GlowingEffect";

export function GlowingCardGrid() {
  return (
    <ul className="grid grid-cols-1 gap-4 md:grid-cols-12 md:grid-rows-2 xl:grid-cols-12 xl:grid-rows-none xl:auto-cols-fr xl:items-center">
      <GridItem
        area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]"
      />
      <GridItem
        area="md:[grid-area:2/1/3/7] xl:[grid-area:1/5/2/8]"
      />
      <GridItem
        area="md:[grid-area:1/7/3/13] xl:[grid-area:1/8/2/13]"
      />
    </ul>
  );
}

interface GridItemProps {
  area: string;
  children?: React.ReactNode;
}

const GridItem = ({ area, children }: GridItemProps) => {
  const isTallCard = area.includes("1/7/3/13");
  
  return (
    <li className={`
      ${isTallCard ? 'md:min-h-[30rem] xl:min-h-0' : 'min-h-[18rem]'}
      list-none ${area} xl:h-full rounded-[28px] cursor-pointer 
      transition-all duration-200 ease-in-out
      hover:scale-[1.005] 
      sm:shadow-sm
    `}>
      <div className="relative h-full w-full rounded-[28px] border-1 border-black/10 
        bg-gradient-to-t from-[#FCFCFC] to-[#FFFEFA]
        hover:shadow-[0_6px_8px_rgba(0,0,0,0.15)] transition-shadow
      ">
        <GlowingEffect
          spread={25}
          borderWidth={1}
          glow={true}
          disabled={false}
          proximity={40}
          inactiveZone={0.01}
        />
        <div className="absolute inset-0 rounded-[28px] opacity-0 transition-opacity hover:opacity-30 bg-gradient-to-t from-gray-50/5 to-transparent"></div>
        {children}
      </div>
    </li>
  );
};

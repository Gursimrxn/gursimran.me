"use client";

import TypingSpeed from "./TypingSpeed";
import RecentHighlights from "./RecentHighlights";
import TechStack from "./TechStack";

export function GlowingCardGrid() {
  return (
    <ul className="grid gap-4 grid-cols-7 grid-rows-2 md:grid-cols-12 md:grid-rows-2 xl:grid-cols-12 xl:grid-rows-none xl:auto-cols-fr xl:items-center">
      <GridItem
        area="[grid-area:1/1/2/5] md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]"
      >
        <RecentHighlights />
      </GridItem>
      <GridItem
        area="[grid-area:1/5/2/8] md:[grid-area:2/1/3/7] xl:[grid-area:1/5/2/8]"
      >
        <TypingSpeed wpm={144} acc={100} time={10} />
      </GridItem>
      <GridItem
        area="[grid-area:2/1/3/8] md:[grid-area:1/7/3/13] xl:[grid-area:1/8/2/13]"
      >
        <TechStack />
      </GridItem>
    </ul>
  );
}

interface GridItemProps {
  area: string;
  children?: React.ReactNode;
}

const GridItem = ({ area, children }: GridItemProps) => {
  const isSmThirdItem = area.includes("sm:[grid-area:2/1/3/8]");
  
  return (    <li className={`
      ${isSmThirdItem ? 'sm:min-h-[15rem]' : ''}
      list-none ${area} xl:h-full rounded-[40px] cursor-pointer 
      transition-all duration-500 ease-out
    `}>
      <div className="relative h-full w-full rounded-[40px] border-1 border-black/25 
        bg-gradient-to-t from-[#FCFCFC] to-[#FFFEFA]
        transition-all duration-500
      ">
        {/* <GlowingEffect
          spread={25}
          borderWidth={1}
          glow={true}
          disabled={false}
          proximity={40}
          inactiveZone={0.01}
        /> */}
        <div className="absolute inset-0 rounded-[28px] opacity-0 transition-opacity hover:opacity-100 bg-gradient-to-t from-gray-100/30 to-transparent"></div>
        {children}
      </div>
    </li>
  );
};

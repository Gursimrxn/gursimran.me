/* eslint-disable react/display-name */
'use client';

import HeatMap, { type SVGProps } from '@uiw/react-heat-map';
import React, { useEffect, useState, useRef, useCallback, memo } from 'react';
import { LeetCode } from '@/components/icons';
import { formatNumber, getDateSuffix } from '@/lib/utils';
import type { GithubContributionData } from '@/types';
import BentoBadge from './ui/BentoBadge';
import { LeetCodeDetailedStats } from '@/lib/leetcode';
import { GlowingEffect } from './ui/GlowingEffect';
import { lenisManager } from '@/lib/lenisManager';
import { TextMorph } from './ui/TextMorph';

const getDateProps = () => {
  const today = new Date();
  const oneYearAgo = new Date();
  oneYearAgo.setMonth(today.getMonth() - 7);
  return { startDate: oneYearAgo, endDate: today };
};

interface Props {
  data: GithubContributionData & { leetCodeStats?: LeetCodeDetailedStats };
}

const BentoLeetCodeActivity = ({ data }: Props) => {
  const [defaultValue, setDefaultValue] = useState<string>();
  const [mounted, setMounted] = useState(false);
  const [hoveredTile, setHoveredTile] = useState<string>();
  const [isScrolling, setIsScrolling] = useState(false);  const scrollContainerRef = useRef<HTMLDivElement>(null);  const [startX, setStartX] = useState(0);
  const [startScrollLeft, setStartScrollLeft] = useState(0);

  // Throttle hover updates to prevent scroll interruption
  const hoverTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  
  const handleTileHover = useCallback((date: string) => {
    // Clear any pending hover update
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    
    // Only update if neither local nor global scrolling is happening
    if (!isScrolling && !lenisManager.isScrolling()) {
      hoverTimeoutRef.current = setTimeout(() => {
        setHoveredTile(date);
      }, 100); // Increased timeout to prevent scroll interruption
    }
  }, [isScrolling]);

  const handleTileLeave = useCallback(() => {
    // Clear any pending hover update
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    
    // Only update if neither local nor global scrolling is happening
    if (!isScrolling && !lenisManager.isScrolling()) {
      hoverTimeoutRef.current = setTimeout(() => {
        setHoveredTile(defaultValue);
      }, 100);
    }
  }, [isScrolling, defaultValue]);  // Optimized renderRect with throttled hover
  const renderRect = useCallback(
    (handleMouseEnter: (date: string) => void): SVGProps['rectRender'] =>
    (props, data) => {
      const date = new Date(data.date);
      const formattedDate =
        date.toLocaleDateString('en-US', { day: 'numeric', month: 'long' }) +
        getDateSuffix(date.getDate());
      const tileInfo = `${data.count ? formatNumber(data.count) : 'No'} submissions on ${formattedDate}`;

      return (
        <rect
          className="transition-all hover:brightness-125"
          onMouseEnter={() => {
            // Only update state if neither local nor global scrolling is happening
            if (!lenisManager.isScrolling()) {
              handleMouseEnter(tileInfo);
            }
          }}
          {...props}
        />
      );
    }, []);

  // Default stats if not provided
  const stats = data.leetCodeStats || {
    totalSolved: data.totalContributions,
    totalSubmissions: 0,
    easySolved: 0,
    mediumSolved: 0,
    hardSolved: 0,
    percentile: 0,
    acSubmissionsByDifficulty: []
  };

  useEffect(() => {
    const value = `${formatNumber(data.totalContributions)} submissions in the last year`;
    setDefaultValue(value);
    setHoveredTile(value);
    setMounted(true);
  }, [data.totalContributions]);

  // Auto-scroll to newest commits on mount
  useEffect(() => {
    if (scrollContainerRef.current) {
      setTimeout(() => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTo({
            left: scrollContainerRef.current.scrollWidth,
            behavior: 'smooth',
            });
        }
      }, 100);
    }
  }, [mounted]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsScrolling(true);
    setStartX(e.pageX);
    setStartScrollLeft(scrollContainerRef.current?.scrollLeft || 0);
  };

  const handleMouseUp = () => {
    setIsScrolling(false);
  };

  // Stable mouse move handler for dragging
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isScrolling || !scrollContainerRef.current) return;
    const x = e.pageX;
    const walk = (x - startX) * 2;
    scrollContainerRef.current.scrollLeft = startScrollLeft - walk;
  }, [isScrolling, startX, startScrollLeft]);

  useEffect(() => {
    if (isScrolling) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isScrolling, handleMouseMove]);

  if (!mounted) {
    return (
      <div className="relative flex h-[270px] flex-col justify-between rounded-[40px] border-1 border-black/25 bg-gradient-to-t from-[#FCFCFC] to-[#FFFCFA] p-4">
        {/* Loading state */}
      </div>
    );
  }

  return (
    <div className="relative h-[270px] flex w-full flex-col justify-between rounded-[40px] border-1 border-black/25 bg-gradient-to-t from-[#FCFCFC] to-[#FFFCFA] p-4 pointer-events-auto">
      <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
        <div className="flex items-center justify-between p-2">
        <BentoBadge icon={LeetCode} text="LEETCODE ACTIVITY" href="https://leetcode.com/gursimrxn" />
        <TextMorph className="line-clamp-1 text-sm font-product cursor-text">
          {hoveredTile || ''}
        </TextMorph>
      </div>
      
      <div 
        ref={scrollContainerRef}
        className={`w-full overflow-x-auto overflow-y-hidden rounded-[20px] custom-scrollbar cursor-pointer ${isScrolling ? 'active-scroll' : ''}`}
        style={{ 
          touchAction: 'pan-x',
          WebkitOverflowScrolling: 'touch',
        }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <style jsx>{`
          .custom-scrollbar::-webkit-scrollbar {
            height: 3px;
            background: transparent;
          }
          
          .custom-scrollbar::-webkit-scrollbar-track {
            background: rgba(241, 241, 241, 0.1);
            border-radius: 8px;
            margin: 0 20px;
          }
          
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: rgba(255, 161, 22, 0.5);
            border-radius: 8px;
            border: 1px solid rgba(255, 255, 255, 0.2);
            transition: all 0.2s ease;
          }
          
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #FFA116;
            transform: scaleY(1.2);
          }
          
          .active-scroll::-webkit-scrollbar-thumb {
            background: #FFA116;
          }
          
          .custom-scrollbar {
            scrollbar-width: thin;
            scrollbar-color: #FFA116 transparent;
          }
        `}</style>
        <div className="min-w-[640px] bg-amber-50/20 rounded-[20px] pt-2 pr-6">
          <HeatMap
            {...getDateProps()}
            className="w-full mx-auto"
            onMouseLeave={handleTileLeave}
            value={data.contributions ?? []}
            weekLabels={false}
            monthLabels={false}
            legendCellSize={0}
            space={3}
            style={{ color: '#fff' }}
            rectProps={{ rx: 5 }}
            rectSize={16}
            rectRender={renderRect(handleTileHover)}
            panelColors={{
              1: '#FFECD1', // Very light peach for 1 problem
              2: '#FFD599', // Light orange-peach for 2 problems
              3: '#FFBF66', // Medium peach for 3 problems
              4: '#FFA833', // Medium-dark peach for 4 problems
              5: '#FF9100', // Dark orange for 5 problems
              8: '#E07C00', // LeetCode dark orange for 8 problems
              10: '#C46B00', // Brown-orange for 10 problems
              15: '#A85A00', // Medium brown for 15 problems
              20: '#8C4900', // Dark brown for 20 problems
              30: '#6B3900' // Very dark brown for 30+ problems
            }}
          />
        </div>
      </div>
      
      <div className="flex justify-between items-center p-2">
        <div className="flex items-center gap-2">
          <div className="flex gap-1 items-center">
            <span className="h-3 w-3 rounded-full bg-[#FFECD1]"></span>
            <span className="h-3 w-3 rounded-full bg-[#FFBF66]"></span>
            <span className="h-3 w-3 rounded-full bg-[#FF9100]"></span>
            <span className="h-3 w-3 rounded-full bg-[#8C4900]"></span>
          </div>
          <span className="text-sm text-gray-600">Less to more</span>
        </div>
        <div className="text-sm text-gray-600 font-product">
          {formatNumber(stats.easySolved + stats.mediumSolved + stats.hardSolved)} problems solved
        </div>
      </div>
    </div>
  );
};

export default memo(BentoLeetCodeActivity);
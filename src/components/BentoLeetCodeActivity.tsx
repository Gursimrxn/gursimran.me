/* eslint-disable react/display-name */
'use client';

import HeatMap, { type SVGProps } from '@uiw/react-heat-map';
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { LeetCode } from '@/components/icons/LeetCode';
import { formatNumber, getDateSuffix } from '@/lib/utils';
import type { GithubContributionData } from '@/types';
import BentoBadge from './BentoBadge';

const getDateProps = () => {
  const today = new Date();
  const oneYearAgo = new Date();
  oneYearAgo.setMonth(today.getMonth() - 11);
  return { startDate: oneYearAgo, endDate: today };
};

const renderRect =
  (handleMouseEnter: (date: string) => void): SVGProps['rectRender'] =>
  (props, data) => {
    const date = new Date(data.date);
    const formattedDate =
      date.toLocaleDateString('en-US', { day: 'numeric', month: 'long' }) +
      getDateSuffix(date.getDate());
    const tileInfo = `${data.count ? formatNumber(data.count) : 'No'} problems solved on ${formattedDate}`;

    return (
      <rect
        className="transition-all hover:brightness-125"
        onMouseEnter={() => handleMouseEnter(tileInfo)}
        {...props}
      />
    );
  };

interface Props {
  data: GithubContributionData;
}

// eslint-disable-next-line react/display-name
const BentoLeetCodeActivity = ({ data }: Props) => {
  const [defaultValue, setDefaultValue] = useState<string>();
  const [mounted, setMounted] = useState(false);
  const [hoveredTile, setHoveredTile] = useState<string>();
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [startX, setStartX] = useState(0);
  const [startScrollLeft, setStartScrollLeft] = useState(0);

  useEffect(() => {
    const value = `${formatNumber(data.totalContributions)} problems solved in the last year`;
    setDefaultValue(value);
    setHoveredTile(value);
    setMounted(true);
  }, [data.totalContributions]);

  // Auto-scroll to newest commits on mount
  useEffect(() => {
    if (scrollContainerRef.current) {
      setTimeout(() => {
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollLeft = scrollContainerRef.current.scrollWidth;
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
      <div className="relative flex h-[270px] flex-col justify-between rounded-[40px] border-1 border-black/25 bg-gradient-to-t from-[#FCFCFC] to-[#FFFCFA] p-6">
        {/* Loading state */}
      </div>
    );
  }

  return (
    <div className="relative h-[270px] flex w-full flex-col justify-between rounded-[40px] border-1 border-black/25 bg-gradient-to-t from-[#FCFCFC] to-[#FFFCFA] p-6">
      <div className="flex items-center justify-between">
        <BentoBadge icon={LeetCode} text="LEETCODE ACTIVITY" />
        <p className="line-clamp-1 text-sm font-product">{hoveredTile}</p>
      </div>
      
      <div 
        ref={scrollContainerRef}
        className={`w-full overflow-x-auto overflow-y-hidden rounded-[20px] custom-scrollbar ${isScrolling ? 'cursor-grabbing active-scroll' : 'cursor-grab'}`}
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
        <div className="min-w-[960px] bg-amber-50/20 rounded-[20px] pt-2 pr-6">
          <HeatMap
            {...getDateProps()}
            className="w-full mx-auto"
            onMouseLeave={() => !isScrolling && setHoveredTile(defaultValue)}
            value={data.contributions ?? []}
            weekLabels={false}
            monthLabels={false}
            legendCellSize={0}
            space={3}
            style={{ color: '#fff' }}
            rectProps={{ rx: 5 }}
            rectSize={16}
            rectRender={renderRect((date) => !isScrolling && setHoveredTile(date))}
            panelColors={{
              1: 'rgba(255, 251, 240, 0.4)', // Much lighter/transparent for zero contributions
              2: '#FFE0B0',
              3: '#FFD8A0',
              5: '#FFD090',
              8: '#FFA116',
              10: '#FF9100',
              15: '#E07C00',
              20: '#B86000',
              30: '#964B00'
            }}
          />
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="flex gap-1 items-center">
            <span className="h-3 w-3 rounded-full bg-[#FFE8C8]"></span>
            <span className="h-3 w-3 rounded-full bg-[#FFD090]"></span>
            <span className="h-3 w-3 rounded-full bg-[#FFA116]"></span>
            <span className="h-3 w-3 rounded-full bg-[#B86000]"></span>
          </div>
          <span className="text-sm text-gray-600">Less to more</span>
        </div>
        <div className="text-sm text-gray-600 font-product">
          {formatNumber(data.totalContributions)} problems solved
        </div>
      </div>
    </div>
  );
};

export default BentoLeetCodeActivity;
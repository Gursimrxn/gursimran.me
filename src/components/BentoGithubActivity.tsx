/* eslint-disable react/display-name */
'use client';

import HeatMap, { type SVGProps } from '@uiw/react-heat-map';
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Github } from '@/components/icons/Github';
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
    const tileInfo = `${data.count ? formatNumber(data.count) : 'No'} contributions on ${formattedDate}`;

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

const BentoGithubActivity = ({ data }: Props) => {
  const [defaultValue, setDefaultValue] = useState<string>();
  const [mounted, setMounted] = useState(false);
  const [hoveredTile, setHoveredTile] = useState<string>();
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [startX, setStartX] = useState(0);
  const [startScrollLeft, setStartScrollLeft] = useState(0);

  useEffect(() => {
    const value = `${formatNumber(data.totalContributions)} contributions in the last year`;
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
      <div className="relative flex h-[270px] flex-col justify-between rounded-[40px] border-1 border-black/25 bg-gradient-to-t from-[#FCFCFC] to-[#FFFCFA] p-6">
        {/* ... (keep loading state same) ... */}
      </div>
    );
  }

  return (
    <div className="relative h-[270px] flex w-full flex-col justify-between rounded-[40px] border-1 border-black/25 bg-gradient-to-t from-[#FCFCFC] to-[#FFFCFA] p-6">
      <div className="flex items-center justify-between">
        <BentoBadge icon={Github} text="GITHUB ACTIVITY" />
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
            background: rgba(7, 103, 251, 0.5);
            border-radius: 8px;
            border: 1px solid rgba(255, 255, 255, 0.2);
            transition: all 0.2s ease;
          }
          
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #0767FB;
            transform: scaleY(1.2);
          }
          
          .active-scroll::-webkit-scrollbar-thumb {
            background: #0767FB;
          }
          
          .custom-scrollbar {
            scrollbar-width: thin;
            scrollbar-color: #0767FB transparent;
          }
        `}</style>
        <div className="min-w-[960px] bg-sky-100/20 rounded-[20px] pt-2 pr-6">
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
              0: '#F2F6FF',
              1: '#E8EEFF',
              4: '#3588FF',
              8: '#0767FB',
              12: '#0033A0'
            }}
          />
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="flex gap-1 items-center">
            <span className="h-3 w-3 rounded-full bg-[#E8EEFF]"></span>
            <span className="h-3 w-3 rounded-full bg-[#3588FF]"></span>
            <span className="h-3 w-3 rounded-full bg-[#0767FB]"></span>
          </div>
          <span className="text-sm text-gray-600">Less to more</span>
        </div>
        <div className="text-sm text-gray-600 font-product">
          {formatNumber(data.totalContributions)} contributions
        </div>
      </div>
    </div>
  );
};

export default BentoGithubActivity;
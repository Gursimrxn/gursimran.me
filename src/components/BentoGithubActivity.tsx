'use client';

import HeatMap, { type SVGProps } from '@uiw/react-heat-map';
import React, { useEffect, useState } from 'react';

import BentoBadge from '@/components/BentoBadge';
import { Github } from '@/components/icons/Github';
import { formatDate, formatNumber, getDateSuffix } from '@/lib/utils';
import type { GithubContributionData } from '@/types';

const getDateProps = () => {
  const today = new Date();
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(today.getMonth() - 6);

  return { startDate: sixMonthsAgo, endDate: today };
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
  // Use useState with no initial value to prevent hydration mismatch
  const [defaultValue, setDefaultValue] = useState<string>();
  const [hoveredTile, setHoveredTile] = useState<string>();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const value = `${formatNumber(data.totalContributions)} contributions in the last year`;
    setDefaultValue(value);
    setHoveredTile(value);
    setMounted(true);
  }, [data.totalContributions]);

  useEffect(() => {
    const handleTouchMove = (e: TouchEvent) => {
      // Allow default browser behavior for touch events
      if (e.touches.length > 1) {
        // This is likely a pinch-zoom gesture
        e.stopPropagation();
      }
    };

    document.addEventListener('touchmove', handleTouchMove, { passive: true });
    return () => {
      document.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  if (!mounted) {
    return (
      <div className="relative flex h-full flex-col justify-between rounded-[30px] border-1 border-black/25 bg-gradient-to-t from-[#FCFCFC] to-[#FFFCFA] px-4 pb-5 pt-4 max-md:gap-4 touch-auto">
        <div className="flex items-baseline justify-between gap-4 max-xs:flex-col">
          <BentoBadge icon={Github} text="GITHUB ACTIVITY" />
          <p className="line-clamp-1 text-sm font-product"></p>
        </div>
        <div className="w-full overflow-x-scroll">
          {/* Empty placeholder for heatmap */}
          <div className="w-[550px] h-[160px]"></div>
        </div>
        <p className="text-sm text-slate-500 max-sm:text-xs sm:max-lg:mt-4 font-product">
          Loading...
        </p>
      </div>
    );
  }

  return (
    <div className="relative flex h-full flex-col justify-between rounded-[30px] border-1 border-black/25 bg-gradient-to-t from-[#FCFCFC] to-[#FFFCFA] px-4 pb-5 pt-4 max-md:gap-4">
      <div className="flex items-baseline justify-between gap-4 max-xs:flex-col">
        <BentoBadge icon={Github} text="GITHUB ACTIVITY" />
        <p className="line-clamp-1 text-sm font-product">{hoveredTile}</p>
      </div>
      <div className="w-full overflow-x-scroll" style={{ touchAction: 'pan-x pan-y pinch-zoom' }}>
        <HeatMap
          {...getDateProps()}
          onMouseLeave={() => setHoveredTile(defaultValue)}
          className="w-[550px]"
          value={data.contributions ?? []}
          weekLabels={false}
          monthLabels={false}
          legendCellSize={0}
          space={4}
          style={{ color: '#fff', touchAction: 'pan-x pan-y pinch-zoom' }}
          rectProps={{ rx: 4 }}
          rectSize={16}
          rectRender={renderRect((date) => setHoveredTile(date))}
          panelColors={{
            0: '#FCFCFC',    // Very light cream/gray matching your portfolio's background
            1: '#E8EEFF',    // Very light blue for few contributions - kept light
            4: '#3588FF',    // Medium blue - darker
            8: '#0767FB',    // Deep blue matching Hero gradient - darker
            12: '#0033A0'    // Very deep blue - darkest
          }}
        />
      </div>
      {
        <p className="text-sm text-slate-500 max-sm:text-xs sm:max-lg:mt-4 font-product">
          Last pushed on {formatDate(new Date(data.lastPushedAt))}
        </p>
      }
    </div>
  );
};

export default BentoGithubActivity;
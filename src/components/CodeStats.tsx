'use client';

import { memo } from 'react';
import { Code } from '@/components/icons';
import type { GithubCodeStats } from '@/lib/github';

interface Props {
  stats: GithubCodeStats;
}

const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(0) + 'K';
  }
  return num.toLocaleString('en-US');
};

const formatBytes = (bytes: number): string => {
  if (bytes >= 1000000000) {
    return (bytes / 1000000000).toFixed(1) + ' GB';
  }
  if (bytes >= 1000000) {
    return (bytes / 1000000).toFixed(1) + ' MB';
  }
  return (bytes / 1000).toFixed(0) + ' KB';
};

const CodeStats = ({ stats }: Props) => {
  return (
    <div className="relative w-full rounded-[32px] border border-black/[0.08] bg-gradient-to-br from-white via-white to-black/[0.01] p-6 md:p-8 select-none">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-black/[0.03]">
            <Code className="w-5 h-5 text-black/60" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-black">Codebase Overview</h3>
            <p className="text-xs text-black/40">Across all my repositories</p>
          </div>
        </div>
        <div className="px-3 py-1.5 rounded-full bg-black/[0.03]">
          <span className="text-xs font-medium text-black/50">~estimated</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        {/* Lines of Code */}
        <div className="flex flex-col">
          <span className="text-3xl md:text-4xl font-bold tracking-tight text-black">
            {formatNumber(stats.estimatedLines)}
          </span>
          <span className="text-xs text-black/40 mt-1">lines of code</span>
        </div>

        {/* Repositories */}
        <div className="flex flex-col">
          <span className="text-3xl md:text-4xl font-bold tracking-tight text-black">
            {stats.repositoryCount}
          </span>
          <span className="text-xs text-black/40 mt-1">repositories</span>
        </div>
      </div>

      {/* Language Breakdown */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-black/50 uppercase tracking-wider">Languages</span>
          <span className="text-xs text-black/30">Top {Math.min(stats.languages.length, 5)}</span>
        </div>

        {/* Language Bar */}
        <div className="flex h-2.5 rounded-full overflow-hidden bg-black/[0.03]">
          {stats.languages.slice(0, 6).map((lang) => (
            <div
              key={lang.name}
              className="h-full transition-all duration-500 first:rounded-l-full last:rounded-r-full"
              style={{
                width: `${lang.percentage}%`,
                backgroundColor: lang.color,
              }}
              title={`${lang.name}: ${lang.percentage}%`}
            />
          ))}
        </div>

        {/* Language Legend */}
        <div className="flex flex-wrap gap-x-4 gap-y-2">
          {stats.languages.slice(0, 5).map((lang) => (
            <div key={lang.name} className="flex items-center gap-2">
              <div
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: lang.color }}
              />
              <span className="text-xs text-black/60">{lang.name}</span>
              <span className="text-xs text-black/30">{lang.percentage}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Note */}
      <div className="mt-6 pt-4 border-t border-black/[0.05]">
        <p className="text-[11px] text-black/30 text-center">
          Total codebase size across repositories I&apos;ve worked on • Calculated from GitHub API
        </p>
      </div>
    </div>
  );
};

export default memo(CodeStats);

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface RepoStats {
  stars: number;
  forks: number;
  watchers: number;
  language: string;
  license?: string;
}

interface GitHubStatsProps {
  repoUrl: string;
}

export default function GitHubStats({ repoUrl }: GitHubStatsProps) {
  const [stats, setStats] = useState<RepoStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const match = repoUrl.match(/github\.com\/([^/]+)\/([^/]+)/);
        if (!match) return;

        const [, owner, repo] = match;
        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`);
        const data = await response.json();

        setStats({
          stars: data.stargazers_count || 0,
          forks: data.forks_count || 0,
          watchers: data.watchers_count || 0,
          language: data.language || 'Unknown',
          license: data.license?.name
        });
      } catch (error) {
        console.error('Failed to fetch GitHub stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [repoUrl]);

  if (loading) {
    return (
      <div className="rounded-2xl bg-white border border-black/[0.08] p-6 animate-pulse">
        <div className="h-3 bg-black/10 rounded w-20 mb-4"></div>
        <div className="space-y-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-6 bg-black/10 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  if (!stats) return null;

  const formatNumber = (num: number) => {
    if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
    return num.toString();
  };

  return (
    <Link href={repoUrl} target="_blank" rel="noopener noreferrer">
      <div className="rounded-2xl bg-white border border-black/[0.08] p-6 hover:border-black/[0.16] hover:bg-black/[0.01] transition-all cursor-pointer group">
        <h3 className="text-xs font-medium text-black/50 uppercase tracking-widest mb-4 select-none group-hover:text-black/70 transition-colors\">Repository Stats</h3>
        
        <div className="space-y-3">
          {/* Stars */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm">⭐</span>
              <span className="text-xs text-black/60 select-none\">Stars</span>
            </div>
            <span className="font-semibold text-black text-sm group-hover:text-emerald-600 transition-colors\">
              {formatNumber(stats.stars)}
            </span>
          </div>

          {/* Forks */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm\">🔀</span>
              <span className="text-xs text-black/60 select-none\">Forks</span>
            </div>
            <span className="font-semibold text-black text-sm group-hover:text-blue-600 transition-colors\">
              {formatNumber(stats.forks)}
            </span>
          </div>

          {/* Language */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm\">💾</span>
              <span className="text-xs text-black/60 select-none\">Language</span>
            </div>
            <span className="font-semibold text-black text-sm group-hover:text-purple-600 transition-colors\">
              {stats.language}
            </span>
          </div>

          {/* License */}
          {stats.license && (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm\">📜</span>
                <span className="text-xs text-black/60 select-none\">License</span>
              </div>
              <span className="font-semibold text-black text-sm group-hover:text-amber-600 transition-colors\">
                {stats.license}
              </span>
            </div>
          )}
        </div>

        <div className="mt-4 pt-4 border-t border-black/10 flex items-center gap-1 text-xs text-black/50 group-hover:text-black/70 transition-colors\">
          <span>View on GitHub</span>
          <span>→</span>
        </div>
      </div>
    </Link>
  );
}

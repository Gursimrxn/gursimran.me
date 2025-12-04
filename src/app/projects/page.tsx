import { Suspense } from 'react';
import ProjectsClient from './ProjectsClient';
import CodeStats from '@/components/CodeStats';
import { getGithubCodeStats } from '@/lib/github';

export const metadata = {
  title: 'Projects | Gursimran Singh',
  description: 'Explore my latest projects and work',
};

export const revalidate = 86400; // Revalidate once per day

async function CodeStatsSection() {
  try {
    const stats = await getGithubCodeStats('gursimrxn');
    return <CodeStats stats={stats} />;
  } catch (error) {
    console.error('Error fetching code stats:', error);
    return null;
  }
}

export default function ProjectsPage() {
  return (
    <>
      <ProjectsClient />
      <div className="px-4 pb-16">
        <div className="max-w-7xl mx-auto">
          <Suspense fallback={
            <div className="w-full h-[220px] rounded-[32px] border border-black/[0.08] bg-gradient-to-br from-white via-white to-black/[0.01] animate-pulse" />
          }>
            <CodeStatsSection />
          </Suspense>
        </div>
      </div>
    </>
  );
}

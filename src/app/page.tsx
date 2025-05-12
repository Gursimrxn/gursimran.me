import { Suspense } from "react";

import BentoGithubActivity from "@/components/GithubActivity";
import BentoLeetCodeActivity from "@/components/LeetCodeActivity";
import Hero from "@/components/Hero";
import { GlowingEffect } from "@/components/ui/GlowingEffect";
import getGithubContributions from "@/lib/github";
import getLeetCodeContributions from "@/lib/leetcode";
import { GlowingCardGrid } from "@/components/GlowGrid";
export const revalidate = 3600;

// This server component fetches the data and passes it to the client component
async function GitHubActivitySection() {
  // You can change the GitHub username to your own
  try {
    const data = await getGithubContributions("gursimrxn");
    return (
      <BentoGithubActivity data={data} />
    );
  } catch (error) {
    console.error("Error fetching GitHub data:", error);
    return (
      <div className="relative h-80 rounded-[30px] border-1 border-black/25 bg-gradient-to-t from-[#FCFCFC] to-[#FFFCFA] p-4 flex items-center justify-center overflow-hidden">
        Failed to load GitHub activity
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
      </div>
    );
  }
}

// LeetCode activity section with custom LeetCode component
async function LeetCodeActivitySection() {
  try {
    // Using null for year to make it use the current year by default
    const data = await getLeetCodeContributions("gursimrxn");
    return (
      <BentoLeetCodeActivity data={data} />
    );
  } catch (error) {
    console.error("Error fetching LeetCode data:", error);
    return (
      <div className="relative h-[270px] rounded-[40px] border-1 border-black/25 bg-gradient-to-t from-[#FCFCFC] to-[#FFFCFA] p-4 flex items-center justify-center">
        Failed to load LeetCode activity
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
      </div>
    );
  }
}

export default function LandingPage() {
  return (
    <main className="px-4">
      <Hero />
      <div className="my-4 max-w-7xl mx-auto grid grid-cols-1 gap-4">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          <Suspense fallback={
            <div className="relative overflow-hidden z-0 h-[270px] rounded-[40px] border-1 border-black/25 bg-gradient-to-t from-[#FCFCFC] to-[#FFFCFA] animate-pulse">
              <GlowingEffect spread={40} glow={true} proximity={64} inactiveZone={0.01} />
            </div>
          }>
            <GitHubActivitySection />
          </Suspense>
          <Suspense fallback={
            <div className="relative overflow-hidden z-0 h-[270px] rounded-[40px] border-1 border-black/25 bg-gradient-to-t from-[#FCFCFC] to-[#FFFCFA] animate-pulse">
              <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} />
            </div>
          }>
            <LeetCodeActivitySection />
          </Suspense>
        </div>
        <GlowingCardGrid/>
      </div>
    </main>
  );
}
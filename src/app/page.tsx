import { Suspense } from "react";

import BentoGithubActivity from "@/components/BentoGithubActivity";
import Hero from "@/components/Hero";
import getGithubContributions from "@/lib/github";

// This server component fetches the data and passes it to the client component
async function GitHubActivitySection() {
  // You can change the GitHub username to your own
  try {
    const data = await getGithubContributions("gursimrxn");
    return <BentoGithubActivity data={data} />;
  } catch (error) {
    console.error("Error fetching GitHub data:", error);
    return <div className="h-80 rounded-[30px] border-1 border-black/25 bg-gradient-to-t from-[#FCFCFC] to-[#FFFCFA] p-4 flex items-center justify-center">Failed to load GitHub activity</div>;
  }
}

export default function LandingPage() {
  return (
    <main className="px-4">
      <Hero />
      
      <div className="my-4 max-w-7xl mx-auto grid md:grid-cols-2 grid-cols-1 gap-2">
        <Suspense fallback={<div className="h-[270px] rounded-[40px] border-1 border-black/25 bg-gradient-to-t from-[#FCFCFC] to-[#FFFCFA] animate-pulse" />}>
          <GitHubActivitySection />
        </Suspense>
        <Suspense fallback={<div className="h-[270px] rounded-[40px] border-1 border-black/25 bg-gradient-to-t from-[#FCFCFC] to-[#FFFCFA] animate-pulse" />}>
          <GitHubActivitySection />
        </Suspense>
      </div>
    </main>
  );
}
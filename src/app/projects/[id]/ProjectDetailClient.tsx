'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import { Project } from '@/data/projects';
import { Github, RightArrow } from '@/components/icons';

interface Props {
  project: Project;
}

const statusColors = {
  'live': 'bg-emerald-500',
  'in-progress': 'bg-amber-500',
  'archived': 'bg-zinc-400'
};

const statusLabels = {
  'live': 'Live',
  'in-progress': 'In Progress',
  'archived': 'Archived'
};

export default function ProjectDetailClient({ project }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
      
      tl.fromTo('.project-hero', 
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 }
      )
      .fromTo('.project-content',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        '-=0.5'
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main className="px-4 pt-24 pb-16" ref={containerRef}>
      <div className="max-w-5xl mx-auto">
        
        {/* Back Button */}
        <Link 
          href="/projects" 
          className="inline-flex items-center gap-2 text-sm text-black/50 hover:text-black transition-colors mb-8 select-none"
        >
          <RightArrow className="w-4 h-4 rotate-180" />
          <span>Back to Projects</span>
        </Link>

        {/* Hero Section */}
        <div className="project-hero mb-10">
          {/* Project Image */}
          <div className="relative w-full aspect-[16/9] rounded-[32px] overflow-hidden bg-zinc-100 mb-8">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
            
            {/* Status Badge */}
            <div className="absolute top-6 left-6">
              <div className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm">
                <div className={`w-2 h-2 rounded-full ${statusColors[project.status]}`} />
                <span className="text-sm font-medium text-black/70">{statusLabels[project.status]}</span>
              </div>
            </div>

            {/* Year Badge */}
            <div className="absolute top-6 right-6">
              <div className="px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm">
                <span className="text-sm font-medium text-black/70">{project.year}</span>
              </div>
            </div>
          </div>

          {/* Title & Role */}
          <div className="mb-6">
            <span className="text-sm font-medium text-black/40 uppercase tracking-wider select-none">{project.role}</span>
            <h1 className="text-4xl md:text-5xl font-bold text-black tracking-tight mt-2 select-none">
              {project.title}
            </h1>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1.5 bg-black/[0.03] rounded-lg text-sm font-medium text-black/50 select-none"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            {project.github && (
              <Link
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-black/[0.03] hover:bg-black/[0.06] transition-colors cursor-pointer"
              >
                <Github className="w-5 h-5 text-black" />
                <span className="text-sm font-medium text-black">View Source</span>
              </Link>
            )}
            {project.live && (
              <Link
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-black text-white hover:bg-black/80 transition-colors cursor-pointer"
              >
                <span className="text-sm font-medium">Visit Live</span>
                <RightArrow className="w-4 h-4 -rotate-45" />
              </Link>
            )}
          </div>
        </div>

        {/* Content Section */}
        <div className="project-content">
          {/* Description */}
          <div className="rounded-[32px] border border-black/[0.08] bg-gradient-to-br from-white via-white to-black/[0.01] p-8 md:p-10">
            <h2 className="text-xl font-semibold text-black mb-4 select-none">About this project</h2>
            <p className="text-base text-black/60 leading-relaxed font-product cursor-text select-text">
              {project.longDescription || project.description}
            </p>
            
            {/* Metrics */}
            {project.metrics && (
              <div className="mt-8 pt-8 border-t border-black/[0.05]">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/[0.03]">
                  <span className="text-sm text-black/50">
                    {project.metrics.label === 'Award' ? '🏆 ' : ''}{project.metrics.label}:
                  </span>
                  <span className="text-sm font-medium text-black">{project.metrics.value}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

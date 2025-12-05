'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import { Project } from '@/data/projects';
import { Github, RightArrow } from '@/components/icons';
import RichContentSection from '@/components/RichContentSection';
import TableOfContents from '@/components/TableOfContents';
import GitHubStats from '@/components/GitHubStats';

interface Props {
  project: Project;
}

const statusColors = {
  'live': 'from-emerald-500/20 to-emerald-600/20 border-emerald-200',
  'in-progress': 'from-amber-500/20 to-amber-600/20 border-amber-200',
  'archived': 'from-zinc-500/20 to-zinc-600/20 border-zinc-200'
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
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 }
      )
      .fromTo('.project-section',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.08 },
        '-=0.3'
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main className="px-4 pt-20 pb-20" ref={containerRef}>
      <div className="max-w-7xl mx-auto">
        
        {/* Back Button */}
        <Link 
          href="/projects" 
          className="inline-flex items-center gap-2 text-sm text-black/50 hover:text-black transition-colors mb-12 select-none"
        >
          <RightArrow className="w-4 h-4 rotate-180" />
          <span>Back to Projects</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Main Content (2/3 width) */}
          <div className="lg:col-span-2 space-y-12">
            {/* Hero Section */}
            <div className="project-hero">
              {/* Status + Year */}
              <div className="flex items-center gap-4 mb-8">
                <div className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${statusColors[project.status]} border`}>
                  {statusLabels[project.status]}
                </div>
                <span className="text-sm text-black/50 font-medium tracking-wide">{project.year}</span>
              </div>

              {/* Title */}
              <h1 className="text-6xl md:text-7xl font-bold text-black mb-6 leading-tight select-none tracking-tight">
                {project.title}
              </h1>

              {/* Description */}
              <p className="text-lg text-black/60 leading-relaxed mb-10 font-product cursor-text select-text max-w-2xl">
                {project.description}
              </p>

              {/* Action Buttons */}
              <div className="flex gap-4 flex-wrap">
                {project.github && (
                  <Link
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-black text-white hover:bg-black/90 active:bg-black/95 transition-all font-medium text-sm cursor-pointer border border-black"
                  >
                    <Github className="w-4 h-4" />
                    <span>Source Code</span>
                  </Link>
                )}
                {project.live && (
                  <Link
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-white hover:bg-black/[0.02] active:bg-black/[0.04] transition-all font-medium text-sm cursor-pointer border border-black/20 text-black"
                  >
                    <span>Live Demo</span>
                    <RightArrow className="w-4 h-4 -rotate-45" />
                  </Link>
                )}
              </div>
            </div>

            {/* Project Image */}
            <div className="project-section relative w-full rounded-2xl overflow-hidden bg-gradient-to-br from-zinc-100 to-zinc-50 border border-black/[0.08] h-[600px]">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Main Content Section */}
            <div className="project-content space-y-8">
              {/* About */}
              <div id="about" className="rounded-2xl border border-black/[0.08] bg-white p-10 md:p-12">
                <h2 className="text-2xl font-semibold text-black mb-5 select-none tracking-tight">Overview</h2>
                <p className="text-base text-black/65 leading-relaxed font-product cursor-text select-text">
                  {project.longDescription || project.description}
                </p>
              </div>

              {/* Project Details Grid */}
              {project.details && (
                <>
                  {/* Challenge & Solution */}
                  <div className="grid md:grid-cols-2 gap-8">
                    {project.details?.challenge && (
                      <div className="rounded-2xl border border-black/[0.08] bg-white p-10">
                        <h3 className="text-lg font-semibold text-black mb-4 select-none tracking-tight">Challenge</h3>
                        <p className="text-sm text-black/65 leading-relaxed font-product cursor-text select-text">
                          {project.details.challenge}
                        </p>
                      </div>
                    )}
                    {project.details?.solution && (
                      <div className="rounded-2xl border border-black/[0.08] bg-white p-10">
                        <h3 className="text-lg font-semibold text-black mb-4 select-none tracking-tight">Solution</h3>
                        <p className="text-sm text-black/65 leading-relaxed font-product cursor-text select-text">
                          {project.details.solution}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Key Highlights */}
                  {project.details?.highlights && project.details.highlights.length > 0 && (
                    <div className="rounded-2xl border border-black/[0.08] bg-white p-10 md:p-12">
                      <h3 className="text-lg font-semibold text-black mb-6 select-none tracking-tight">Key Features</h3>
                      <ul className="space-y-4">
                        {project.details.highlights.map((highlight, idx) => (
                          <li key={idx} className="flex gap-4 items-start">
                            <span className="text-black/30 font-light mt-1 select-none text-lg">•</span>
                            <span className="text-sm text-black/65 font-product cursor-text select-text leading-relaxed">{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Results */}
                  {project.details?.results && project.details.results.length > 0 && (
                    <div className="rounded-2xl border border-black/[0.08] bg-white p-10 md:p-12">
                      <h3 className="text-lg font-semibold text-black mb-6 select-none tracking-tight">Results & Impact</h3>
                      <ul className="space-y-4">
                        {project.details.results.map((result, idx) => (
                          <li key={idx} className="flex gap-4 items-start">
                            <span className="text-emerald-600 font-light text-lg select-none">→</span>
                            <span className="text-sm text-black/65 font-product cursor-text select-text leading-relaxed">{result}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Project Meta */}
                  <div className="grid md:grid-cols-2 gap-8">
                    {project.details?.timeline && (
                      <div className="rounded-2xl border border-black/[0.08] bg-white p-8">
                        <span className="text-xs font-medium text-black/50 uppercase tracking-widest select-none">Timeline</span>
                        <p className="text-base font-semibold text-black mt-3 select-none">{project.details.timeline}</p>
                      </div>
                    )}
                    {project.details?.teamSize && (
                      <div className="rounded-2xl border border-black/[0.08] bg-white p-8">
                        <span className="text-xs font-medium text-black/50 uppercase tracking-widest select-none">Team Size</span>
                        <p className="text-base font-semibold text-black mt-3 select-none">{project.details.teamSize}</p>
                      </div>
                    )}
                  </div>
                </>
              )}

              {/* Metrics */}
              {project.metrics && (
                <div className="rounded-2xl border border-black/[0.08] bg-white p-10">
                  <div className="flex items-center gap-4">
                    <span className="text-4xl select-none">
                      {project.metrics.label === 'Award' ? '🏆' : '⭐'}
                    </span>
                    <div className="flex flex-col">
                      <span className="text-xs font-medium text-black/50 uppercase tracking-widest">{project.metrics.label}</span>
                      <span className="text-lg font-semibold text-black mt-1">{project.metrics.value}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Sidebar (1/3 width) */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Table of Contents */}
              {project.sections && project.sections.length > 0 && (
                <TableOfContents 
                  sections={['about', ...project.sections.map((s, i) => `section-${i}`)]} 
                />
              )}

              {/* Role Card */}
              <div className="project-section rounded-2xl bg-white border border-black/[0.08] p-6">
                <span className="text-xs font-medium text-black/50 uppercase tracking-widest block mb-2 select-none">Role</span>
                <p className="text-base font-semibold text-black">{project.role}</p>
              </div>

              {/* Tech Stack Card */}
              <div className="project-section rounded-2xl bg-white border border-black/[0.08] p-6">
                <span className="text-xs font-medium text-black/50 uppercase tracking-widest block mb-3 select-none">Tech Stack</span>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 bg-black/[0.04] rounded-lg text-xs font-medium text-black/60 select-none hover:bg-black/10 transition-colors cursor-default"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* GitHub Stats */}
              {project.github && (
                <GitHubStats repoUrl={project.github} />
              )}

              {/* Rich Content Sections */}
              {project.sections && project.sections.length > 0 && (
                <div className="project-section space-y-6">
                  {project.sections.map((section, idx) => (
                    <div key={idx} id={`section-${idx}`} className="rounded-2xl bg-white border border-black/[0.08] p-6">
                      <h3 className="text-base font-semibold text-black mb-4 select-none tracking-tight">{section.title}</h3>
                      <RichContentSection blocks={section.content} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

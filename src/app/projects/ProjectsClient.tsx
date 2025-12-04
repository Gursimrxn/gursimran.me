'use client';

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { projects } from '@/data/projects';
import ProjectCard from '@/components/ProjectCard';
import { Suitcase } from '@/components/icons';

export default function ProjectsClient() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  const featuredProjects = projects.filter(p => p.featured);
  const otherProjects = projects.filter(p => !p.featured);

  // Initial Animation
  useEffect(() => {
    if (!isFirstRender.current) return;
    
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
      
      tl.fromTo('.page-header', 
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 }
      )
      .fromTo('.project-card-wrapper',
        { y: 40, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8, 
          stagger: 0.08,
          ease: 'power3.out',
          onComplete: () => { isFirstRender.current = false; }
        },
        '-=0.4'
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main className="px-4 pt-24 pb-8" ref={containerRef}>
      <div className="max-w-7xl mx-auto">
        
        {/* Page Header */}
        <div className="page-header mb-12">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 rounded-xl bg-black/[0.03] select-none">
              <Suitcase className="w-5 h-5 text-black/60" />
            </div>
            <span className="text-sm font-medium text-black/40 uppercase tracking-wider select-none">Portfolio</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-black tracking-tight mb-4 select-none">
            Selected Work
          </h1>
          
          <p className="text-base text-black/50 max-w-2xl font-product leading-relaxed select-text cursor-text">
            A curated collection of projects I&apos;ve shipped. From mobile apps to AI systems, Web3 platforms, and more.
          </p>
        </div>

        {/* Featured Projects */}
        {featuredProjects.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 select-none" />
              <span className="text-xs font-medium text-black/40 uppercase tracking-wider select-none">Featured</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {featuredProjects.map((project, index) => (
                <div key={project.id} className="project-card-wrapper">
                  <ProjectCard project={project} index={index} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Other Projects */}
        {otherProjects.length > 0 && (
          <div>
            {featuredProjects.length > 0 && (
              <div className="flex items-center gap-2 mb-6">
                <div className="w-1.5 h-1.5 rounded-full bg-black/20 select-none" />
                <span className="text-xs font-medium text-black/40 uppercase tracking-wider select-none">More Projects</span>
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {otherProjects.map((project, index) => (
                <div key={project.id} className="project-card-wrapper">
                  <ProjectCard project={project} index={index + featuredProjects.length} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}


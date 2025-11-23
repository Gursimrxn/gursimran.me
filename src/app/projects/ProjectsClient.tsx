'use client';

import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { Flip } from 'gsap/Flip';
import { projects, categories } from '@/data/projects';
import ProjectCard from '@/components/ProjectCard';
import { Code, Medal } from '@/components/icons';

gsap.registerPlugin(Flip);

export default function ProjectsClient() {
  const [activeCategory, setActiveCategory] = useState('all');
  const containerRef = useRef<HTMLDivElement>(null);
  const flipState = useRef<Flip.FlipState | null>(null);
  const isFirstRender = useRef(true);

  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  // Initial Animation
  useEffect(() => {
    if (!isFirstRender.current) return;
    
    const ctx = gsap.context(() => {
      // Header Animation
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
      
      tl.fromTo('.header-badge', 
        { y: 20, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 1 }
      )
      .fromTo('.header-title',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.1 },
        '-=0.8'
      )
      .fromTo('.filter-btn',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.05 },
        '-=0.8'
      );

      // Grid Animation (Initial Load)
      gsap.fromTo('.project-card-wrapper',
        { y: 60, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1, 
          stagger: 0.1,
          ease: 'power3.out',
          delay: 0.2,
          onComplete: () => { isFirstRender.current = false; }
        }
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleCategoryChange = (category: string) => {
    if (category === activeCategory || isFirstRender.current) return;
    
    // Capture state before change
    const state = Flip.getState('.project-card-wrapper, .projects-grid');
    flipState.current = state;
    
    setActiveCategory(category);
  };

  // Flip Animation after render
  useLayoutEffect(() => {
    if (!flipState.current || isFirstRender.current) return;

    const state = flipState.current;
    flipState.current = null;

    Flip.from(state, {
      targets: '.project-card-wrapper, .projects-grid',
      duration: 0.6,
      ease: 'power3.inOut',
      absolute: '.project-card-wrapper',
      scale: true,
      simple: true,
      nested: true,
      onEnter: elements => {
        gsap.fromTo(elements, 
          { opacity: 0, scale: 0.9 }, 
          { opacity: 1, scale: 1, duration: 0.6, ease: 'power3.out', delay: 0.1 }
        );
      },
      onLeave: elements => {
        gsap.to(elements, { opacity: 0, scale: 0.9, duration: 0.3 });
      },
      onComplete: () => {
        // Clean up any inline styles left by GSAP
        const cards = document.querySelectorAll('.project-card-wrapper');
        cards.forEach(card => {
          gsap.set(card, { clearProps: 'position,top,left,width,height' });
        });
      }
    });
  }, [activeCategory]);

  return (
    <main className="min-h-[100dvh] bg-[#f8f8f8] px-4 pb-20" ref={containerRef}>
      <div className="max-w-7xl mx-auto pt-32">
        
        {/* Hero Section */}
        <div className="relative mb-16 flex flex-col items-center text-center">
          <div className="header-badge mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border-1 border-black/5 shadow-sm">
            <Code className="w-4 h-4 text-orange-500" />
            <span className="text-sm font-medium text-black/80">My Digital Garden</span>
          </div>
          
          <h1 className="header-title text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            <span className="block text-black/20 mb-2 text-3xl md:text-4xl font-medium">Curated Work</span>
            <span className="bg-gradient-to-r from-black via-black/80 to-black/50 bg-clip-text text-transparent">
              Selected Projects
            </span>
          </h1>
          
          <p className="header-title max-w-2xl text-lg text-black/60 leading-relaxed font-product">
            A collection of experiments, products, and tools I've built. 
            From <span className="text-black font-medium">AI Agents</span> to <span className="text-black font-medium">FinTech Apps</span>.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12 min-h-[42px]">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={`filter-btn relative px-6 py-2.5 rounded-full text-sm font-medium will-change-transform ${
                activeCategory === cat.id
                  ? 'bg-black text-white shadow-lg scale-105'
                  : 'bg-white text-black/60 hover:bg-black/5 hover:text-black'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Bento Grid */}
        <div className="projects-grid relative grid grid-flow-dense grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[minmax(300px,auto)]">
          {filteredProjects.map((project) => (
            <div 
              key={project.id} 
              className={`project-card-wrapper ${
                project.size === 'large' ? 'md:col-span-2 md:row-span-2 min-h-[500px]' : 
                project.size === 'medium' ? 'md:col-span-1 md:row-span-1' : 
                'md:col-span-1'
              }`}
              // Remove opacity-0 here, handled by GSAP
            >
              <div className="h-full w-full relative group">
                {project.featured && (
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500/20 to-blue-500/20 rounded-[42px] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                )}
                <ProjectCard project={project} />
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-32 project-card-wrapper">
            <div className="inline-block p-4 rounded-full bg-black/5 mb-4">
              <Medal className="w-8 h-8 text-black/40" />
            </div>
            <p className="text-xl text-black/40 font-medium">No projects found in this category.</p>
          </div>
        )}
      </div>
    </main>
  );
}


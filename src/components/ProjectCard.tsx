'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Project } from '@/data/projects';
import { Github, RightArrow } from './icons';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [hovered, setHovered] = useState(false);

  const CardWrapper = project.live || project.github ? Link : 'div';
  const wrapperProps = project.live || project.github 
    ? { 
        href: project.live || project.github!, 
        target: "_blank", 
        rel: "noopener noreferrer" 
      } 
    : {};

  return (
    <CardWrapper
      {...(wrapperProps as any)}
      className={`relative h-full w-full rounded-[40px] border-1 border-black/10 bg-gradient-to-t 
        ${hovered ? "from-[#ebfbe1] to-[#d5fbd6]" : "from-[#ffffff] to-[#fcfcfc]"} 
        select-none p-3 flex flex-col transition-colors duration-300 ease-in-out cursor-pointer group`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative flex-grow w-full overflow-hidden rounded-[30px] mb-4 min-h-[200px]">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className={`object-cover transition-transform duration-500 ease-out ${
            hovered ? "scale-105" : "scale-100"
          }`}
        />
      </div>
      
      <div className="px-2 mb-2">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-medium tracking-tight">{project.title}</h3>
          <div className={`p-2 rounded-full bg-black/5 transition-all duration-300 ${hovered ? 'bg-black text-white' : ''}`}>
            <RightArrow className={`w-4 h-4 transition-transform duration-300 ${hovered ? '-rotate-45' : ''}`} />
          </div>
        </div>
        
        <p className="text-base text-black/60 mb-4 line-clamp-2 font-product leading-relaxed">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-white border-1 border-black/5 rounded-full text-xs font-medium text-black/60"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </CardWrapper>
  );
}

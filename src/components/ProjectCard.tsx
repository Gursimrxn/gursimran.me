'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Project } from '@/data/projects';
import { Github, RightArrow } from './icons';

interface ProjectCardProps {
  project: Project;
  index: number;
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

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="group relative cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Main Card */}
      <div className={`relative w-full rounded-[32px] border border-black/[0.08] bg-gradient-to-br from-white via-white to-black/[0.01] overflow-hidden transition-all duration-500 select-none ${hovered ? 'border-black/15' : ''}`}>
        
        {/* Image Section */}
        <div className="relative w-full aspect-[16/10] overflow-hidden bg-zinc-100">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className={`object-cover transition-all duration-700 ease-out ${
              hovered ? 'scale-105' : 'scale-100'
            }`}
          />
          
          {/* Overlay on hover */}
          <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent transition-opacity duration-500 ${hovered ? 'opacity-100' : 'opacity-0'}`} />
          
          {/* Status Badge */}
          <div className="absolute top-4 left-4">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm">
              <div className={`w-2 h-2 rounded-full ${statusColors[project.status]}`} />
              <span className="text-xs font-medium text-black/70">{statusLabels[project.status]}</span>
            </div>
          </div>

          {/* Year Badge */}
          <div className="absolute top-4 right-4">
            <div className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm">
              <span className="text-xs font-medium text-black/70">{project.year}</span>
            </div>
          </div>

          {/* Metrics Badge (if exists) */}
          {project.metrics && (
            <div className={`absolute bottom-4 left-4 transition-all duration-500 ${hovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
              <div className="px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-sm">
                <span className="text-xs font-medium">
                  <span className="text-black/50">{project.metrics.label === 'Award' ? '🏆 Award: ' : project.metrics.label + ': '}</span>
                  <span className="text-black">{project.metrics.value}</span>
                </span>
              </div>
            </div>
          )}

          {/* Action Buttons on Hover */}
          <div className={`absolute bottom-4 right-4 flex gap-2 transition-all duration-500 ${hovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
            {project.github && (
              <Link
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-white/95 backdrop-blur-sm hover:bg-white transition-colors cursor-pointer"
                onClick={(e) => e.stopPropagation()}
              >
                <Github className="w-4 h-4 text-black" />
              </Link>
            )}
            {project.live && (
              <Link
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-black text-white hover:bg-black/80 transition-colors cursor-pointer"
                onClick={(e) => e.stopPropagation()}
              >
                <RightArrow className="w-4 h-4 -rotate-45" />
              </Link>
            )}
          </div>
        </div>

        {/* Content Section */}
        <div className="p-5">
          {/* Role */}
          <div className="mb-2">
            <span className="text-xs font-medium text-black/40 uppercase tracking-wider">{project.role}</span>
          </div>

          {/* Title */}
          <div className="flex items-start justify-between gap-4 mb-3">
            <h3 className="text-xl font-semibold text-black tracking-tight leading-tight">
              {project.title}
            </h3>
          </div>

          {/* Description */}
          <p className="text-sm text-black/50 leading-relaxed mb-4 line-clamp-2 font-product flex-1 select-text cursor-text">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {project.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 bg-black/[0.03] rounded-lg text-xs font-medium text-black/50"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Featured indicator line */}
      {project.featured && (
        <div className="absolute -left-px top-8 bottom-8 w-[3px] rounded-full bg-gradient-to-b from-emerald-500 via-emerald-400 to-emerald-500" />
      )}
    </div>
  );
}

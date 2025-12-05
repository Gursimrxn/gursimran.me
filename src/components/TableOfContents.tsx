'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface TableOfContentsProps {
  sections: string[];
}

export default function TableOfContents({ sections }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      const headings = sections.map(id => document.getElementById(id)).filter(Boolean);
      
      for (const heading of headings) {
        if (heading) {
          const rect = heading.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveId(heading.id);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  return (
    <div className="rounded-2xl bg-white border border-black/[0.08] p-6">
      <h3 className="text-xs font-medium text-black/50 uppercase tracking-widest mb-4 select-none">On This Page</h3>
      <nav className="space-y-2">
        {sections.map((sectionId) => (
          <Link
            key={sectionId}
            href={`#${sectionId}`}
            className={`block text-xs py-1.5 px-3 rounded-lg transition-all cursor-pointer select-none ${
              activeId === sectionId
                ? 'bg-black/5 text-black font-medium'
                : 'text-black/60 hover:text-black hover:bg-black/[0.02]'
            }`}
          >
            {sectionId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
          </Link>
        ))}
      </nav>
    </div>
  );
}

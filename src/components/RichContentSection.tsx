'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ContentBlock } from '@/data/projects';

interface Props {
  blocks: ContentBlock[];
}

export default function RichContentSection({ blocks }: Props) {
  return (
    <div className="space-y-5">
      {blocks.map((block, idx) => {
        switch (block.type) {
          case 'heading':
            return (
              <h3 key={idx} className="text-xl font-semibold text-black pt-3 pb-2 border-b border-black/10">
                {block.content}
              </h3>
            );

          case 'text':
            return (
              <p key={idx} className="text-sm text-black/65 leading-relaxed font-product cursor-text select-text">
                {block.content}
              </p>
            );

          case 'bullet':
            return (
              <ul key={idx} className="space-y-3 ml-2">
                {block.items?.map((item, i) => (
                  <li key={i} className="flex gap-3 items-start">
                    <span className="text-black/30 font-light mt-1 flex-shrink-0">•</span>
                    <span className="text-sm text-black/65 font-product cursor-text select-text">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            );

          case 'quote':
            return (
              <blockquote
                key={idx}
                className="pl-4 py-3 border-l-2 border-black/20 bg-black/[0.02] rounded-r-lg italic text-black/60 text-sm"
              >
                {block.content}
              </blockquote>
            );

          case 'code':
            return (
              <pre key={idx} className="bg-black/[0.04] p-4 rounded-lg overflow-x-auto text-xs font-mono text-black/70">
                <code>{block.content}</code>
              </pre>
            );

          case 'image':
            return (
              <figure key={idx} className="rounded-lg overflow-hidden border border-black/10">
                <div className="relative w-full h-48 bg-gradient-to-br from-zinc-100 to-zinc-50">
                  <Image
                    src={block.url || '/'}
                    alt={block.alt || 'Image'}
                    fill
                    className="object-cover"
                  />
                </div>
                {block.alt && (
                  <figcaption className="px-4 py-2 bg-black/[0.02] text-xs text-black/50 text-center">
                    {block.alt}
                  </figcaption>
                )}
              </figure>
            );

          case 'gallery':
            return (
              <div key={idx} className="grid grid-cols-2 gap-3">
                {block.images?.map((img, i) => (
                  <figure key={i} className="rounded-lg overflow-hidden border border-black/10">
                    <div className="relative w-full h-32 bg-gradient-to-br from-zinc-100 to-zinc-50">
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        className="object-cover"
                      />
                    </div>
                    {img.caption && (
                      <figcaption className="px-3 py-1.5 bg-black/[0.02] text-xs text-black/50 text-center">
                        {img.caption}
                      </figcaption>
                    )}
                  </figure>
                ))}
              </div>
            );

          case 'link':
            return (
              <div key={idx} className="p-3 rounded-lg border border-black/10 bg-black/[0.01] hover:bg-black/[0.02] transition-colors">
                <Link
                  href={block.url || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 group cursor-pointer"
                >
                  <div className="flex-1">
                    <p className="font-semibold text-black text-sm group-hover:text-black/70 transition-colors line-clamp-1">
                      {block.title}
                    </p>
                    <p className="text-xs text-black/50 mt-1 line-clamp-2 font-product">
                      {block.content}
                    </p>
                  </div>
                  <span className="text-black/20 group-hover:text-black/40 transition-colors flex-shrink-0 mt-0.5">
                    →
                  </span>
                </Link>
              </div>
            );

          case 'diagram':
            return (
              <div key={idx} className="rounded-lg border border-black/10 bg-black/[0.01] p-4 overflow-x-auto">
                <pre className="text-xs font-mono text-black/60 whitespace-pre-wrap break-words">
                  {block.content}
                </pre>
              </div>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}

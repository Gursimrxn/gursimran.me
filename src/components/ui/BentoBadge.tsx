'use client';

import React from 'react';

interface BentoBadgeProps {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  text: string;
  className?: string;
}

const BentoBadge: React.FC<BentoBadgeProps> = ({ icon: Icon, text, className }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Icon className="h-4 w-4 text-white" />
      <span className="font-product font-bold tracking-widest text-sm">{text}</span>
    </div>
  );
};

export default BentoBadge;
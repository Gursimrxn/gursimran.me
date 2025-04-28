'use client';

import React from 'react';

interface BentoBadgeProps {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  text: string;
}

const BentoBadge: React.FC<BentoBadgeProps> = ({ icon: Icon, text }) => {
  return (
    <div className="flex items-center gap-2">
    <Icon className="h-4 w-4 text-white" />
      <span className="font-bold text-sm">{text}</span>
    </div>
  );
};

export default BentoBadge;
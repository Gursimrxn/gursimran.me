"use client";

import React from 'react';
import Menu, { MenuItem, MenuSocialItem } from '@/components/ui/Menu';

type Props = {
  open: boolean;
  onClose: () => void;
};

const menuItems: MenuItem[] = [
  { label: 'Home', ariaLabel: 'Go to home page', link: '/' },
  { label: 'About', ariaLabel: 'Learn about me', link: '/about' },
  { label: 'Work', ariaLabel: 'View work', link: '/work' },
  { label: 'Contact', ariaLabel: 'Get in touch', link: '/contact' },
];

const socialItems: MenuSocialItem[] = [
  { label: 'GitHub', link: 'https://github.com/gursimrxn' },
  { label: 'Twitter', link: 'https://x.com/gursimrxnsingh' },
  { label: 'LinkedIn', link: 'https://linkedin.com/in/gursimrxnsingh' },
  { label: 'LeetCode', link: 'https://leetcode.com/gursimrxn' },
  { label: 'Instagram', link: 'https://instagram.com/mysticaltrack.wav' },
  { label: 'Email', link: 'mailto:sgursimranmatharu@gmail.com' }
];

const MenuPortal: React.FC<Props> = ({ open, onClose }) => {
  return (
      <div className="fixed inset-0 z-[2000] w-full h-full">
        <Menu
          position="right"
          items={menuItems}
          socialItems={[...socialItems, { label: 'Resume', link: '/resume.pdf' }]}
          displaySocials={true}
          displayItemNumbering={true}
          menuButtonColor="#000"
          openMenuButtonColor="#000"
          changeMenuColorOnOpen={true}
          colors={["#0f172a", "#0b1220", "#061226"]}
          accentColor="#F98500"
          onMenuOpen={() => {}}
          onMenuClose={onClose}
        />
      <style>{`
        body { overflow: ${open ? 'hidden' : 'auto'}; }
      `}</style>
    </div>
  );
};

export default MenuPortal;

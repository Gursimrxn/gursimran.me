'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function LiquidMorph() {
    const overlayRef = useRef<HTMLDivElement>(null);
    const svgRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        // Overlay removed - just a placeholder component now
    }, []);

    return null;
}

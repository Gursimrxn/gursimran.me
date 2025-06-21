"use client";

import Image from "next/image";
import { GlowingEffect } from "./ui/GlowingEffect";

const Hero = () => {
    return (
        <main className="relative bg-gradient-to-t from-[#FCFCFC] to-[#FFFCFA] my-2 max-w-7xl mx-auto flex flex-col items-center px-4 border-1 border-black/25 rounded-[40px] py-12">
            <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01}/>            
            <div className="relative my-6">
                <div className="bg-gradient-to-t from-[#F9850010] to-[#FEFDFD] border-1 border-black/10 rounded-full px-2 py-2 flex gap-3 items-center">
                    <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="16" height="16" rx="8" fill="url(#paint0_linear_97_176)"/>
                        <path d="M8.00065 14.6667C4.31875 14.6667 1.33398 11.6819 1.33398 8.00001C1.33398 4.31811 4.31875 1.33334 8.00065 1.33334C11.6825 1.33334 14.6673 4.31811 14.6673 8.00001C14.6673 11.6819 11.6825 14.6667 8.00065 14.6667ZM8.00065 13.3333C10.9462 13.3333 13.334 10.9455 13.334 8.00001C13.334 5.05449 10.9462 2.66668 8.00065 2.66668C5.05513 2.66668 2.66732 5.05449 2.66732 8.00001C2.66732 10.9455 5.05513 13.3333 8.00065 13.3333ZM4.66732 8.00001H6.00065C6.00065 9.10461 6.89605 10 8.00065 10C9.10525 10 10.0007 9.10461 10.0007 8.00001H11.334C11.334 9.84094 9.84158 11.3333 8.00065 11.3333C6.1597 11.3333 4.66732 9.84094 4.66732 8.00001Z" fill="white" fillOpacity="0.7"/>
                        <defs>
                        <linearGradient id="paint0_linear_97_176" x1="8" y1="16" x2="8" y2="0" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#F98500"/>
                        <stop offset="1" stopColor="#FFBC6E"/>
                        </linearGradient>
                        </defs>
                    </svg>
                    <p className="text-sm font-product cursor-pointer">Hey, I am Developer focused on not screwing up!</p>
                </div>
            </div>
            <div>

            <h1 className="text-5xl sm:text-6xl my-6 md:text-7xl font-medium text-center flex gap-2 flex-wrap justify-center items-center">
                <span className="bg-gradient-to-r py-4 from-[#000000] via-[#FF7A01] to-[#727889] text-transparent bg-clip-text">Gursimran</span>
                <Image 
                    src="/me.jpg" 
                    alt="Gursimran Singh's Image" 
                    width={82} 
                    height={82} 
                    className="rounded-[30px] mx-2 aspect-square object-cover"
                    />
                <span className="bg-gradient-to-r py-4 from-[#0767FB] to-[#000000] text-transparent bg-clip-text">Singh.</span>
            </h1>

            <p className="text-center mb-12 max-w-3xl m-auto text-gray-600 font-product cursor-text">
                I am a developer who loves to create modern web experiences. I enjoy working with Next.js, Tailwind CSS, and other modern technologies to build beautiful and functional applications.
            </p>
                </div>
        </main>
    );
};

export default Hero;
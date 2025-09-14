"use client";

import BentoBadge from "@/components/ui/BentoBadge";
import Link from "next/link";
import Image from "next/image";
import { RightArrow } from "@/components/icons";
import { useState } from "react";
import { GlowingEffect } from "@/components/ui/GlowingEffect";
import { Suitcase } from "./icons";

interface FeatureItemProps {
    title: string;
    description: string;
    imageURL: string;
    link: string;
    badge?: string;
}


const FeatureItem = ({
    title,
    description,
    imageURL,
    link,
    badge,
}: FeatureItemProps) => {
    const [hovered, setHovered] = useState(false);
    
    const handleMouseEnter = () => {
        setHovered(true);
        // Cursor is now handled automatically via CSS class cursor-view-more
    };
    
    const handleMouseLeave = () => {
        setHovered(false);
        // Cursor will revert automatically when leaving the element
    };
    
    return (        <Link
            href={link}
            className={`relative h-full w-full rounded-[40px] border-1 border-black/10 bg-gradient-to-t 
                ${
                    hovered
                        ? "from-[#ebfbe1] to-[#d5fbd6]"
                        : "from-[#ffffff] to-[#fcfcfc]"
                } 
                select-none p-3 flex flex-col transition-colors duration-300 ease-in-out`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* <GlowingEffect
                spread={25}
                borderWidth={1}
                glow={true}
                disabled={false}
                proximity={40}
                inactiveZone={0.01}
            /> */}
            <div className="relative flex justify-center mb-4 h-[300px] overflow-hidden rounded-[30px]">
                {badge && (
                    <div className="absolute top-3 right-3 z-10 bg-black text-white text-sm font-product px-3 py-2 rounded-full">
                        {badge}
                    </div>
                )}
                <Image
                    src={imageURL}
                    alt={title}
                    width={600}
                    height={300}
                    className={`w-full h-full rounded-[30px] object-cover transition-transform duration-300 ease-in-out ${
                        hovered ? "scale-105" : ""
                    }`}
                    priority
                />
        </div>
        <div className="px-4 mb-4">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold mb-2">{title}</h3>
            </div>
            <p className="text-sm text-gray-600 truncate whitespace-normal overflow-hidden line-clamp-1">
                {description}
            </p>
            </div>
        </Link>
    );
};

interface FeaturedSectionProps {
    items?: FeatureItemProps[];
}

const defaultItems: FeatureItemProps[] = [
    {
        title: "Dhaniverse - Personal Finance RPG",
        description: "A Gamified financial management app designed as an Open World 2D RPG for Gen Z and Millenials.",
        imageURL: "/logos/Dhaniverse.jpg",
        link: "https://dhaniverse.in",
        badge: "1st Place at HackMol 6.0",
    },
    {
        title: "Navirate - Indoor Navigation",
        description: "The Accurate Indoor Navigator. Seamlessly guides you through complex spaces with precision, real-time tracking, and an intuitive interface getting you where you need to be, effortlessly.",
        imageURL: "/logos/Navirate.png",
        link: "/projects/navirate",
        badge: "Finalist at HackTU 6.0",
    },
];

const FeaturedSection = ({ items = defaultItems }: FeaturedSectionProps) => {
    return (
        <div className="relative w-full rounded-[40px] border-1 border-black/25 bg-gradient-to-t from-[#ffffff] to-[#fcfcfc] p-4">
            {/* <GlowingEffect
                spread={25}
                borderWidth={1}
                glow={true}
                disabled={false}
                proximity={40}
                inactiveZone={0.01}
            /> */}
            <div className="flex justify-between items-center pb-6 p-2">
                <BentoBadge icon={Suitcase} text="FEATURED PROJECTS" />
                <Link
                    href="/projects"
                    className="text-orange-500 text-base font-product flex items-center hover:underline"
                >
                    View All Projects
                    <RightArrow className="ml-1 w-4 h-4" />
                </Link>
            </div>

            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-4 cursor-view-more cursor-none">
                {items.map((item) => (
                    <FeatureItem key={item.title} {...item} />
                ))}
            </div>
        </div>
    );
};

export default FeaturedSection;

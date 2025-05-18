"use client";

import BentoBadge from "@/components/ui/BentoBadge";
import { Medal } from "@/components/icons/Medal";
import ViewButton from "@/components/ui/ViewButton";
import Link from "next/link";
import { RightArrow } from "@/components/icons/RightArrow";
import { useState } from "react";

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
    return (
        <Link
            href={link}
            className={`relative h-full w-full rounded-[40px] border-1 border-black/10 bg-gradient-to-t
                ${
                    hovered
                        ? "from-[#FBEEE1] to-[#FBE5D5]"
                        : "from-[#FCFCFC] to-[#FFFEFA]"
                } 
                 cursor-pointer select-none p-3 overflow-hidden flex flex-col transition-colors duration-300 ease-in-out`}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <div className="relative flex justify-center mb-4 h-[300px]">
                {badge && (
                    <div className="absolute top-3 right-3 z-10 bg-black text-white text-sm font-product px-3 py-2 rounded-full">
                        {badge}
                    </div>
                )}
                <img
                    src={imageURL}
                    alt={title}
                    className="w-full h-full rounded-[30px] object-cover"
                />
            </div>
            <div className="px-4 mb-4">
                <div className="flex items-center justify-between">                    <h3 className="text-lg font-semibold mb-2">{title}</h3>                    <ViewButton
                        label="View"
                        isHovered={hovered}
                        textColor="text-white"
                        magneticEffect={true}
                        magneticRange={80}
                        magneticActionArea="global"
                        
                    />
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
        imageURL: "/logos/Dhaniverse.png",
        link: "/projects/dhaniverse",
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
        <div className="relative w-full rounded-[40px] border-1 border-black/25 bg-gradient-to-t from-[#FCFCFC] to-[#FFFEFA] p-6 overflow-hidden">
            <div className="flex justify-between items-center pb-6">
                <BentoBadge icon={Medal} text="FEATURED PROJECTS" />
                <Link
                    href="/projects"
                    className="text-orange-500 text-base font-product flex items-center hover:underline"
                >
                    View All Projects
                    <RightArrow className="ml-1 w-4 h-4" />
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {items.map((item) => (
                    <FeatureItem key={item.title} {...item} />
                ))}
            </div>
        </div>
    );
};

export default FeaturedSection;

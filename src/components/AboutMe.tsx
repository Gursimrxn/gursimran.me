"use client"
import Image from "next/image"
import BentoBadge from "./ui/BentoBadge"
import { Resume, User } from "@/components/icons"
import Link from "next/link"
import { Links } from "./Navbar"
import { useEffect, useState } from "react"

const AboutMe = () => {
    const [time, setTime] = useState<string>("");

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const options: Intl.DateTimeFormatOptions = {
                timeZone: 'Asia/Kolkata',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true
            };
            setTime(now.toLocaleTimeString('en-US', options));
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative w-full rounded-[40px] border-1 border-black/25 bg-gradient-to-t from-[#ffffff] to-[#fcfcfc] p-4">
            <div className="flex justify-between items-center pb-6 p-2">
                <BentoBadge icon={User} text="ABOUT ME" />
            </div>
            <section className="flex flex-col md:flex-row gap-6">
                {/* Left side - Image */}
                <div className="flex flex-col w-full md:w-1/2 gap-2">
                    <Image 
                        src="/me.jpg" 
                        alt="Portrait of Gursimran Singh" 
                        width={800} 
                        height={300} 
                        className="rounded-[30px] h-96 object-cover" 
                    />
                    <div className="flex items-center gap-2">
                        <Links scrolled={false} vairent="blue" />
                        <Link 
                            href="/resume.pdf" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="flex items-center gap-2 bg-[#0475F7] px-3 py-1.5 rounded-full hover:bg-[#0565d8] transition-colors ml-auto"
                        >
                            <Resume className="w-4 h-4" /> 
                            <span className="text-sm text-white">Resume</span>
                        </Link>
                    </div>
                </div>

                {/* Right side - Info */}
                <div className="flex flex-col md:w-1/2 gap-6 px-4 w-full">
                    <p className="text-lg leading-relaxed text-gray-700">
                        I&apos;m <span className="font-bold text-black">Gursimran Singh</span>, a developer based in <span className="font-bold">Punjab, India</span> who loves going low-level, exploring systems, memory, and how things work under the hood, while still building clean, modern products on top.
                    </p>

                    {/* Minimal Stats */}
                    <div className="flex flex-col gap-3">
                        {/* Location */}
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <div className="w-2.5 h-2.5 bg-red-500 rounded-full animate-ping absolute"></div>
                                <div className="w-2.5 h-2.5 bg-red-500 rounded-full relative"></div>
                            </div>
                            <div className="flex items-baseline gap-2">
                                <span className="text-sm font-medium text-gray-900">Punjab, India</span>
                                <span className="text-xs text-gray-500">•</span>
                                <span className="text-xs text-gray-500 font-mono">{time || "..."}</span>
                            </div>
                        </div>

                        {/* Typing Speed */}
                        <div className="flex items-center gap-3">
                            <span className="text-sm text-gray-600">Typing Speed:</span>
                            <span className="text-sm font-semibold text-gray-900">144 WPM</span>
                            <a 
                                href="https://monkeytype.com/profile/gursimrxn" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-xs text-blue-500 hover:underline ml-auto"
                            >
                                View →
                            </a>
                        </div>
                    </div>

                    {/* Current Focus */}
                    <div className="flex flex-col gap-2 pt-4 border-t border-gray-200">
                        <span className="text-xs uppercase tracking-wider text-gray-500 font-semibold">Currently Working On</span>
                        <p className="text-sm text-gray-700">
                            Building scalable Web3 applications and exploring Rust for systems programming
                        </p>
                    </div>

                    {/* Interests - Tags */}
                    <div className="flex flex-col gap-2">
                        <span className="text-xs uppercase tracking-wider text-gray-500 font-semibold">Interests</span>
                        <div className="flex flex-wrap gap-2">
                            <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">Web3 & Blockchain</span>
                            <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">Systems Programming</span>
                            <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">AI/ML</span>
                            <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">Low-Level Optimization</span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default AboutMe;
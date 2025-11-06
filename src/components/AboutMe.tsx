"use client"
import Image from "next/image"
import BentoBadge from "./ui/BentoBadge"
import { Resume, User } from "@/components/icons"
import Link from "next/link"
import { Links } from "./Navbar"

const AboutMe = () => {
    return (
        <div className="relative w-full rounded-[40px] border-1 border-black/25 bg-gradient-to-t from-[#ffffff] to-[#fcfcfc] p-4">
            <div className="flex justify-between items-center pb-6 p-2">
                <BentoBadge icon={User} text="ABOUT ME" />
            </div>
            <section className="flex flex-col md:flex-row gap-4">
                <div className="flex flex-col w-full md:w-1/2">
                    <Image src="/me.jpg" alt="Picture of Me" width={800} height={300} className="rounded-[30px] h-96 object-cover" />
                    <div className="mt-4">
                        <div className="rounded-full w-full flex justify-between items-center">
                            <Links scrolled={false} vairent="blue" />
                            <Link href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center bg-[#0475F7] gap-3 px-4 py-2 rounded-full">
                                <Resume /> <span className="sm:text-lg text-sm font-light text-white font-product">Resume</span>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col md:w-1/2 gap-4 md:gap-6 lg:gap-8 px-8 w-full">
                    <h2
                        className="text-4xl pb-4 w-full font-light cursor-text bg-gradient-to-r from-black via-[#FF7A01] via-25% to-[#0475F7] to-75% bg-clip-text text-transparent"
                    >
                        "The harder you work, the luckier you get."
                    </h2>
                    <p>I&apos;m Gursimran Singh, a developer based in <span className="font-bold">Punjab, India</span> who loves going low-level, exploring systems, memory, and how things work under the hood, while still building clean, modern products on top.</p>
                    
                    {/* Fun Stats */}
                    <div className="grid grid-cols-2 gap-4 mt-4">
                        <div className="flex flex-col gap-1">
                            <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold cursor-text">Typing Speed</span>
                            <div className="flex items-baseline gap-1">
                                <span className="text-3xl font-semibold bg-gradient-to-r from-[#0767FB] to-[#000000] text-transparent bg-clip-text cursor-text">144</span>
                                <span className="text-sm text-gray-600 cursor-text">WPM</span>
                            </div>
                            <a 
                                href="https://monkeytype.com/profile/gursimrxn" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-xs text-blue-500 hover:underline"
                            >
                                View on Monkeytype →
                            </a>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold cursor-text">Location</span>
                            <span className="text-sm text-gray-800 cursor-text">Punjab, India</span>
                            <span className="text-xs text-gray-500 cursor-text">Open to remote work</span>
                        </div>
                    </div>
                    
                    <span className="font-extralight text-xs italic text-gray-400 mt-auto">* I am still working on this section, idk what to write.</span>
                </div>
            </section>
        </div>
    )
}

export default AboutMe;
"use client"
import Image from "next/image"
import BentoBadge from "./ui/BentoBadge"
import { Resume, User } from "@/components/icons"
import { Links } from "@/components/Navbar"
import Link from "next/link"

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
                                <Resume /> <span className="text-lg font-light text-white font-product">Resume</span>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col md:w-1/2 gap-4 md:gap-10 lg:gap-20 px-8 w-full">
                    <h2
                        className="text-4xl pb-4 w-full font-light cursor-text bg-gradient-to-r from-black via-[#FF7A01] via-25% to-[#0475F7] to-75% bg-clip-text text-transparent"
                    >
                        “The harder you work, the luckier you get.”
                    </h2>
                    <p>I'm Gursimran Singh from <span className="bg-gradient-to-r from-[#FF7A01] via-75% to-[#0475F7] to-75% bg-clip-text text-transparent">Punjab, India</span> - A full-stack web developer who builds fast, responsive and modern web applications using Next.js and Tailwind CSS. I thrive on challenges, whether that's competing in hackathons, exploring Web3 with Rust and Solana, or creating practical digital tools.<br />
                    My journey has taught me that consistent effort and dedication bring real results, so I stay committed, trust the process, and let the work speak for itself.</p>
                </div>
            </section>
        </div>
    )
}

export default AboutMe;
"use client"
import Image from "next/image"
import BentoBadge from "./ui/BentoBadge"
import { Resume, User } from "@/components/icons"
import Link from "next/link"
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
                <div className="flex flex-col w-full md:w-1/2 gap-3">
                    <Image 
                        src="/me.jpg" 
                        alt="Portrait of Gursimran Singh" 
                        width={800} 
                        height={300} 
                        className="rounded-[26px] h-96 object-cover" 
                    />
                    <div className="flex items-center justify-between px-1">
                        {/* Minimal Social Links */}
                        <div className="flex items-center gap-2">
                            <Link href="https://github.com/gursimrxn" className="text-gray-500 hover:text-black transition-colors p-1.5" aria-label="GitHub">
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9.00002 0.709686C4.30375 0.709686 0.5 4.51344 0.5 9.20969C0.5 12.9709 2.93313 16.1478 6.31187 17.2741C6.73687 17.3484 6.89625 17.0934 6.89625 16.8703C6.89625 16.6684 6.88562 15.9991 6.88562 15.2872C4.75 15.6803 4.1975 14.7666 4.0275 14.2884C3.93187 14.0441 3.5175 13.2897 3.15625 13.0878C2.85875 12.9284 2.43375 12.5353 3.14563 12.5247C3.815 12.5141 4.29312 13.1409 4.4525 13.3959C5.2175 14.6816 6.43938 14.3203 6.92812 14.0972C7.0025 13.5447 7.22562 13.1728 7.47002 12.9603C5.57875 12.7478 3.6025 12.0147 3.6025 8.76344C3.6025 7.83906 3.93187 7.07406 4.47375 6.47906C4.38875 6.26656 4.09125 5.39531 4.55875 4.22656C4.55875 4.22656 5.27062 4.00344 6.89625 5.09781C7.57627 4.90656 8.29877 4.81094 9.02127 4.81094C9.74377 4.81094 10.4663 4.90656 11.1463 5.09781C12.7719 3.99281 13.4838 4.22656 13.4838 4.22656C13.9513 5.39531 13.6538 6.26656 13.5688 6.47906C14.1106 7.07406 14.44 7.82844 14.44 8.76344C14.44 12.0253 12.4531 12.7478 10.5619 12.9603C10.87 13.2259 11.1356 13.7359 11.1356 14.5328C11.1356 15.6697 11.125 16.5834 11.125 16.8703C11.125 17.0934 11.2844 17.3591 11.7094 17.2741C15.1693 16.106 17.4991 12.8615 17.5 9.20969C17.5 4.51344 13.6963 0.709686 9.00002 0.709686Z" />
                                </svg>
                            </Link>
                            <Link href="https://linkedin.com/in/gursimrxnsingh" className="text-gray-500 hover:text-black transition-colors p-1.5" aria-label="LinkedIn">
                                <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13.1345 13.3882H10.8689V9.83788C10.8689 8.99128 10.8517 7.90183 9.68822 7.90183C8.50698 7.90183 8.32652 8.82306 8.32652 9.7754V13.3882H6.06085V6.08751H8.23727V7.0826H8.2666C8.57073 6.50885 9.31023 5.90327 10.415 5.90327C12.7107 5.90327 13.1352 7.41419 13.1352 9.38083L13.1345 13.3882ZM3.50195 5.08854C2.77265 5.08854 2.18678 4.49822 2.18678 3.77211C2.18678 3.04663 2.77328 2.45694 3.50195 2.45694C4.2287 2.45694 4.81775 3.04663 4.81775 3.77211C4.81775 4.49822 4.22806 5.08854 3.50195 5.08854ZM4.63797 13.3882H2.36592V6.08751H4.63797V13.3882ZM14.268 0.350006H1.22862C0.604509 0.350006 0.0996094 0.843431 0.0996094 1.45224V14.5478C0.0996094 15.1572 0.604509 15.65 1.22862 15.65H14.2662C14.8896 15.65 15.3996 15.1572 15.3996 14.5478V1.45224C15.3996 0.843431 14.8896 0.350006 14.2662 0.350006H14.268Z" />
                                </svg>
                            </Link>
                            <Link href="https://leetcode.com/gursimrxn" className="text-gray-500 hover:text-black transition-colors p-1.5" aria-label="LeetCode">
                                <svg fill="currentColor" width="18px" height="18px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M16.102 17.93l-2.697 2.607c-.466.467-1.111.662-1.823.662s-1.357-.195-1.824-.662l-4.332-4.363c-.467-.467-.702-1.15-.702-1.863s.235-1.357.702-1.824l4.319-4.38c.467-.467 1.125-.645 1.837-.645s1.357.195 1.823.662l2.697 2.606c.514.515 1.365.497 1.9-.038.535-.536.553-1.387.039-1.901l-2.609-2.636a5.055 5.055 0 0 0-2.445-1.337l2.467-2.503c.516-.514.498-1.366-.037-1.901-.535-.535-1.387-.552-1.902-.038l-10.1 10.101c-.981.982-1.494 2.337-1.494 3.835 0 1.498.513 2.895 1.494 3.875l4.347 4.361c.981.979 2.337 1.452 3.834 1.452s2.853-.512 3.835-1.494l2.609-2.637c.514-.514.496-1.365-.039-1.9s-1.386-.553-1.899-.039zM20.811 13.01H10.666c-.702 0-1.27.604-1.27 1.346s.568 1.346 1.27 1.346h10.145c.701 0 1.27-.604 1.27-1.346s-.569-1.346-1.27-1.346z"/>
                                </svg>
                            </Link>
                            <Link href="https://x.com/gursimrxnsingh" className="text-gray-500 hover:text-black transition-colors p-1.5" aria-label="X (Twitter)">
                                <svg width="18" height="18" viewBox="0 0 17 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13.238 0.403137L8.99081 5.25812L5.31859 0.403137H0L6.35488 8.71291L0.331925 15.5969H2.91097L7.55949 10.2853L11.6221 15.5969H16.8089L10.1845 6.83908L15.8155 0.403137H13.238ZM12.3334 14.0541L3.00992 1.86486H4.54254L13.7616 14.0541H12.3334Z"/>
                                </svg>
                            </Link>
                            <Link href="https://instagram.com/mysticaltrack.wav" className="text-gray-500 hover:text-black transition-colors p-1.5" aria-label="Instagram">
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9.78125 0.500305C10.7378 0.501886 11.2226 0.506952 11.6415 0.519422L11.8065 0.524811C11.997 0.531585 12.1851 0.540085 12.4117 0.55071C13.3162 0.592505 13.9332 0.735585 14.4751 0.94596C15.0354 1.162 15.5086 1.45384 15.981 1.9263C16.4527 2.39875 16.7446 2.87333 16.9614 3.43221C17.171 3.97338 17.3141 4.59105 17.3566 5.49558C17.3667 5.72225 17.3749 5.91027 17.3816 6.10088L17.387 6.26585C17.3994 6.68468 17.4051 7.16951 17.4069 8.12614L17.4075 8.7599C17.4076 8.83733 17.4076 8.91723 17.4076 8.99968L17.4075 9.23947L17.407 9.87331C17.4054 10.8299 17.4004 11.3147 17.3879 11.7335L17.3825 11.8985C17.3757 12.0892 17.3672 12.2772 17.3566 12.5038C17.3148 13.4084 17.171 14.0253 16.9614 14.5672C16.7453 15.1275 16.4527 15.6007 15.981 16.0731C15.5086 16.5449 15.0332 16.8367 14.4751 17.0534C13.9332 17.2631 13.3162 17.4062 12.4117 17.4487C12.1851 17.4588 11.997 17.467 11.8065 17.4737L11.6415 17.479C11.2226 17.4915 10.7378 17.4971 9.78125 17.499L9.14741 17.4997C9.06997 17.4997 8.99008 17.4997 8.90763 17.4997H8.66784L8.03399 17.4991C7.0774 17.4976 6.59258 17.4925 6.17374 17.48L6.00878 17.4746C5.81816 17.4678 5.63014 17.4593 5.40348 17.4487C4.49894 17.4069 3.88269 17.2631 3.34011 17.0534C2.78052 16.8374 2.30664 16.5449 1.83419 16.0731C1.36173 15.6007 1.07061 15.1254 0.853858 14.5672C0.643483 14.0253 0.501108 13.4084 0.458608 12.5038C0.44851 12.2772 0.440274 12.0892 0.433601 11.8985L0.428255 11.7335C0.415819 11.3147 0.41015 10.8299 0.408314 9.87331L0.408203 8.12614C0.409784 7.16951 0.414842 6.68468 0.427311 6.26585L0.432709 6.10088C0.439483 5.91027 0.447983 5.72225 0.458608 5.49558C0.500394 4.59033 0.643483 3.97408 0.853858 3.43221C1.06989 2.87263 1.36173 2.39875 1.83419 1.9263C2.30664 1.45384 2.78123 1.16271 3.34011 0.94596C3.88198 0.735585 4.49823 0.59321 5.40348 0.55071C5.63014 0.540621 5.81816 0.532384 6.00878 0.525712L6.17374 0.520365C6.59258 0.507921 7.0774 0.502252 8.03399 0.500416L9.78125 0.500305ZM8.90763 4.74971C6.55914 4.74971 4.65761 6.65331 4.65761 8.99968C4.65761 11.3481 6.56121 13.2497 8.90763 13.2497C11.2561 13.2497 13.1576 11.3461 13.1576 8.99968C13.1576 6.65124 11.254 4.74971 8.90763 4.74971ZM8.90763 6.44971C10.316 6.44971 11.4576 7.59098 11.4576 8.99968C11.4576 10.408 10.3163 11.5497 8.90763 11.5497C7.49926 11.5497 6.35761 10.4085 6.35761 8.99968C6.35761 7.59132 7.49884 6.44971 8.90763 6.44971ZM13.3701 3.47471C12.7842 3.47471 12.3076 3.95063 12.3076 4.53649C12.3076 5.12235 12.7835 5.599 13.3701 5.599C13.9559 5.599 14.4326 5.12309 14.4326 4.53649C14.4326 3.95063 13.9552 3.47398 13.3701 3.47471Z"/>
                                </svg>
                            </Link>
                            <Link href="mailto:sgursimranmatharu@gmail.com" className="text-gray-500 hover:text-black transition-colors p-1.5" aria-label="Email">
                                <svg width="18" height="18" viewBox="0 0 18 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1.30898 0.350006H16.609C17.0784 0.350006 17.459 0.730568 17.459 1.20001V14.8C17.459 15.2695 17.0784 15.65 16.609 15.65H1.30898C0.839546 15.65 0.458984 15.2695 0.458984 14.8V1.20001C0.458984 0.730568 0.839546 0.350006 1.30898 0.350006ZM11.2143 5.82331C9.94616 6.92075 8.06724 6.92961 6.78882 5.84418L4.20708 3.65219C3.84922 3.34836 3.31282 3.39215 3.00898 3.75001C2.70515 4.10786 2.74895 4.64427 3.1068 4.9481L6.79943 8.08326C8.07786 9.16868 9.95678 9.15981 11.2249 8.06237L14.8225 4.94898C15.1775 4.64178 15.2162 4.10498 14.909 3.75C14.6018 3.39503 14.065 3.3563 13.71 3.6635L11.2143 5.82331Z"/>
                                </svg>
                            </Link>
                        </div>
                        
                        <Link 
                            href="/resume.pdf" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="flex items-center gap-1.5 text-gray-700 hover:text-black transition-colors group"
                        >
                            <Resume className="w-[18px] h-[18px] group-hover:scale-110 transition-transform" /> 
                            <span className="text-sm font-medium">Resume</span>
                            <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </div>
                </div>

                {/* Right side - Info */}
                <div className="flex flex-col md:w-1/2 gap-6 px-4 w-full">
                    <p className="text-lg leading-relaxed text-gray-700 cursor-text">
                        I&apos;m <span className="font-bold text-black cursor-pointer">Gursimran Singh</span>, a developer based in <span className="font-bold">Punjab, India</span> who loves going low-level, exploring systems, memory, and how things work under the hood, while still building clean, modern products on top.
                    </p>

                    {/* Minimal Stats */}
                    <div className="flex flex-col gap-3">
                        {/* Location */}
                        <div className="flex items-center gap-3">
                            <div className="relative cursor-pointer">
                                <div className="w-2.5 h-2.5 bg-red-500 rounded-full animate-ping absolute"></div>
                                <div className="w-2.5 h-2.5 bg-red-500 rounded-full relative"></div>
                            </div>
                            <div className="flex items-baseline gap-2 cursor-pointer">
                                <span className="text-sm font-medium text-gray-900">Punjab, India</span>
                                <span className="text-xs text-gray-500">•</span>
                                <span className="text-xs text-gray-500 font-mono">{time || "..."}</span>
                            </div>
                        </div>

                        {/* Typing Speed */}
                        <div className="flex items-center gap-3">
                            <span className="text-sm text-gray-600 cursor-pointer">Typing Speed:</span>
                            <span className="text-sm font-semibold text-gray-900 cursor-pointer">144 WPM</span>
                            <a 
                                href="https://monkeytype.com/profile/gursimrxn" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-xs text-blue-500 hover:underline ml-auto cursor-pointer"
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
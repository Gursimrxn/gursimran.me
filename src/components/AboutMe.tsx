"use client"
import BentoBadge from "./ui/BentoBadge"
import { User } from "@/components/icons"

const AboutMe = () => {
    return (
        <div className="relative w-full rounded-[40px] border-1 border-black/25 bg-gradient-to-t from-[#ffffff] to-[#fcfcfc] p-4">
            <div className="flex justify-between items-center pb-6 p-2">
                <BentoBadge icon={User} text="ABOUT ME" />
            </div>
        </div>
    )
}

export default AboutMe;
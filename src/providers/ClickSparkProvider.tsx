"use client";

import { ReactNode } from "react";
import ClickSpark from "@/components/ui/ClickSpark";

export const ClickSparkProvider = ({ children }: { children: ReactNode }) => {
    return (
        <ClickSpark
            sparkColor={"var(--foreground)"}
            sparkSize={10}
            sparkRadius={15}
            sparkCount={8}
            duration={400}
        >
            {children}
        </ClickSpark>
    );
};
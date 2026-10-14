"use client"
import { useInView } from 'motion/react';
import { useRef } from 'react'

export default function HeaderUILibraryPage() {
    const textRef = useRef<HTMLHeadingElement>(null);
    const isInView = useInView(textRef, {
        once: false,
        amount: 0.5,
    });
    return (
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-2 items-start">
            <h1 ref={textRef} className={`leading-[1.1] font-heading text-6xl font-semibold lg:text-8xl chroma-text ${isInView ? "chroma-text-animate-once" : ""
                }`}>
                UI Library
            </h1>
            <p className="text-muted-foreground max-w-sm">
                Browse and test available registry components with interactive previews.
            </p>
        </header>
    )
}

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TerminalWidget } from "@/components/terminal-widget";

export function HeroSection() {
    return (
        <section className="relative w-full pt-16 pb-20 lg:pt-24 lg:pb-32 overflow-hidden flex flex-col items-center justify-center text-center px-4">
            {/* Background elements */}
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/10 via-background to-background"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-violet-600/10 blur-[120px] rounded-full pointer-events-none"></div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="max-w-4xl mx-auto flex flex-col items-center"
            >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/80 border border-border/50 text-sm font-medium text-muted-foreground mb-8 backdrop-blur-sm">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                    </span>
                    Available for new projects
                </div>

                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-br from-foreground to-muted-foreground">
                    Thoughts, Code, and <br className="hidden sm:block" />
                    <span className="text-cyan-400">Architecture.</span>
                </h1>

                <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl leading-relaxed">
                    Exploring the intersection of seamless user experiences, scalable systems, and modern web development.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                    <Link href="/blog">
                        <Button size="lg" className="w-full sm:w-auto h-12 sm:h-14 px-8 text-base bg-foreground text-background hover:bg-muted-foreground font-semibold rounded-full gap-2 transition-all group">
                            Read Latest Post
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </Link>
                    <Link href="/series">
                        <Button size="lg" variant="outline" className="w-full sm:w-auto h-12 sm:h-14 px-8 text-base rounded-full gap-2 border-border/50 hover:bg-secondary/50 backdrop-blur-sm transition-all group">
                            Explore My Series
                            <BookOpen className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        </Button>
                    </Link>
                </div>

                <TerminalWidget />
            </motion.div>
        </section>
    );
}

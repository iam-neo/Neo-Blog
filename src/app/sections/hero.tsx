"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, FileText, FolderGit2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const roles = ["Web Developer", "SEO Enthusiast", "Lifelong Learner"];

export function HeroSection() {
    return (
        <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
            {/* Background gradient blobs */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-3xl" />
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                {/* Greeting */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-muted-foreground text-lg mb-4 font-mono"
                >
                    {"// Hello, World!"}
                </motion.p>

                {/* Name */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.15 }}
                    className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6"
                >
                    {"Hi, I'm "}
                    <span className="gradient-text">Nirmal</span>
                </motion.h1>

                {/* Roles */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex flex-wrap justify-center gap-3 mb-6"
                >
                    {roles.map((role) => (
                        <span
                            key={role}
                            className="px-4 py-1.5 text-sm rounded-full bg-muted/80 text-muted-foreground border border-border/50"
                        >
                            {role}
                        </span>
                    ))}
                </motion.div>

                {/* Tagline */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.45 }}
                    className="text-lg text-muted-foreground max-w-xl mx-auto mb-8 leading-relaxed"
                >
                    Messing around the internet and web — building things, breaking things,
                    and writing about it all along the way.
                </motion.p>

                {/* CTAs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="flex flex-wrap justify-center gap-4"
                >
                    <Link href="/blog">
                        <Button
                            size="lg"
                            className="rounded-xl bg-gradient-to-r from-cyan-500 to-violet-500 hover:from-cyan-400 hover:to-violet-400 text-white border-0 gap-2 shadow-lg shadow-cyan-500/20"
                        >
                            <FileText className="w-4 h-4" />
                            Read the Blog
                            <ArrowRight className="w-4 h-4" />
                        </Button>
                    </Link>
                    <Link href="/projects">
                        <Button
                            size="lg"
                            variant="outline"
                            className="rounded-xl gap-2 border-border/50 hover:bg-muted/50"
                        >
                            <FolderGit2 className="w-4 h-4" />
                            View Projects
                        </Button>
                    </Link>
                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2"
                >
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2"
                    >
                        <div className="w-1 h-2 rounded-full bg-muted-foreground/50" />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}

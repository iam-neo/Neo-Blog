"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    Rocket,
    BookOpen,
    Code2,
    Mail,
    Github,
    Twitter,
    ArrowRight,
    Pen
} from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Separator } from "@/components/ui/separator";
import { InteractivePathSelector } from "@/components/interactive-path-selector";
import { TechStackExplodedView } from "@/components/tech-stack-exploded-view";

const blogTopics = [
    {
        icon: Code2,
        title: "Web Development",
        description: "Deep dives into React, Next.js, and modern frontend architecture.",
    },
    {
        icon: Pen,
        title: "Backend & APIs",
        description: "Building scalable services with Node.js, databases, and clean architecture.",
    },
    {
        icon: Rocket,
        title: "Performance & SEO",
        description: "Optimizing web apps for speed, accessibility, and search engine visibility.",
    },
    {
        icon: BookOpen,
        title: "Developer Tutorials",
        description: "Step-by-step guides and practical solutions to common programming challenges.",
    }
];

export default function AboutPage() {
    return (
        <section className="py-12 md:py-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionHeading title="About This Space" />

                {/* Mission Statement (Hero) */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-16 text-center sm:text-left"
                >
                    <h2 className="text-3xl sm:text-4xl font-bold mb-6 font-serif leading-tight">
                        Decoding the web, <br className="hidden sm:block" />
                        <span className="italic accent-text">
                            one concept at a time.
                        </span>
                    </h2>
                    <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed space-y-4">
                        <p>
                            Welcome! I created this blog as a digital garden to document my journey through software development, share practical solutions to complex problems, and explore the ever-evolving landscape of web technologies.
                        </p>
                        <p>
                            Whether you&apos;re a beginner trying to understand the fundamentals or an experienced developer looking for advanced architectural patterns, the goal here is simple: <strong className="text-foreground">to make web development more accessible, practical, and enjoyable.</strong>
                        </p>
                    </div>
                </motion.div>

                <Separator className="mb-16 bg-border/50" />

                {/* What You'll Find Here (Topics Grid) */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5 }}
                    className="mb-16"
                >
                    <div className="text-center sm:text-left mb-10">
                        <span className="text-xs font-medium tracking-wider uppercase mb-3 block" style={{ color: 'var(--editorial-accent)' }}>What to Expect</span>
                        <h3 className="text-2xl font-bold font-serif">Topics Covered</h3>
                        <p className="text-muted-foreground mt-2">The main themes and technologies explored on this blog.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {blogTopics.map((topic, index) => (
                            <motion.div
                                key={topic.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.4 }}
                                className="p-6 rounded-2xl border border-border/50 bg-card hover:bg-muted/50 transition-colors group"
                            >
                                <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <topic.icon className="w-5 h-5 text-foreground" />
                                </div>
                                <h4 className="text-lg font-semibold mb-2 font-serif">{topic.title}</h4>
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                    {topic.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                <Separator className="mb-16 bg-border/50" />

                {/* Choose Your Adventure (Start Here) */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5 }}
                    className="mb-16"
                >
                    <div className="text-center sm:text-left mb-10">
                        <span className="text-xs font-medium tracking-wider uppercase mb-3 block" style={{ color: 'var(--editorial-accent)' }}>Start Here</span>
                        <h3 className="text-2xl font-bold font-serif">Choose Your Adventure</h3>
                        <p className="text-muted-foreground mt-2">Not sure where to begin? Select a path below for curated reading.</p>
                    </div>

                    <InteractivePathSelector />
                </motion.div>

                <Separator className="mb-16 bg-border/50" />

                {/* Anatomy of this Blog (Tech Stack) */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5 }}
                    className="mb-16"
                >
                    <div className="text-center sm:text-left mb-10">
                        <span className="text-xs font-medium tracking-wider uppercase mb-3 block text-muted-foreground">Behind the Scenes</span>
                        <h3 className="text-2xl font-bold font-serif">How It&apos;s Built</h3>
                        <p className="text-muted-foreground mt-2">The architecture powering this digital garden.</p>
                    </div>

                    <TechStackExplodedView />
                </motion.div>

                <Separator className="mb-16 bg-border/50" />

                {/* Condensed Author Bio */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5 }}
                >
                    <h3 className="text-2xl font-bold mb-8 text-center sm:text-left font-serif">The Author behind the Screen</h3>
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8 bg-card border border-border/50 p-6 sm:p-8 rounded-2xl">
                        <div className="relative shrink-0 w-28 h-28 sm:w-36 sm:h-36">
                            <Image
                                src="https://avatars.githubusercontent.com/u/45136482?v=4"
                                alt="Nirmal Magar"
                                fill
                                className="object-cover rounded-xl"
                            />
                        </div>
                        <div className="text-center sm:text-left flex-1">
                            <h4 className="text-xl font-bold mb-1 font-serif">Nirmal Magar</h4>
                            <p className="font-medium text-sm mb-4" style={{ color: 'var(--editorial-accent)' }}>Web Developer & Writer</p>
                            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                                I&apos;m a developer from Nepal with a passion for building clean, user-centric interfaces and robust backend systems. When I&apos;m not writing code, I&apos;m usually writing about it here, trying to distill complex technical concepts into approachable guides.
                            </p>

                            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
                                <a
                                    href="https://github.com/iam-neo"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2.5 bg-background border border-border/50 hover:border-foreground/30 rounded-full hover:bg-muted transition-colors group"
                                    aria-label="GitHub Profile"
                                >
                                    <Github className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                                </a>
                                <a
                                    href="https://twitter.com/iam_neo"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2.5 bg-background border border-border/50 hover:border-foreground/30 rounded-full hover:bg-muted transition-colors group"
                                    aria-label="Twitter Profile"
                                >
                                    <Twitter className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                                </a>
                                <a
                                    href="mailto:nirmalrokamagar54@gmail.com"
                                    className="p-2.5 bg-background border border-border/50 hover:border-foreground/30 rounded-full hover:bg-muted transition-colors group"
                                    aria-label="Email Me"
                                >
                                    <Mail className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                                </a>
                            </div>
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    Terminal,
    Rocket,
    BookOpen,
    Code2,
    Mail,
    Github,
    Twitter,
    ArrowRight
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/section-heading";
import { Separator } from "@/components/ui/separator";

const blogTopics = [
    {
        icon: Code2,
        title: "Web Development",
        description: "Deep dives into React, Next.js, and modern frontend architecture.",
        color: "text-blue-400",
        bg: "bg-blue-400/10",
        border: "border-blue-400/20"
    },
    {
        icon: Terminal,
        title: "Backend & APIs",
        description: "Building scalable services with Node.js, databases, and clean architecture.",
        color: "text-emerald-400",
        bg: "bg-emerald-400/10",
        border: "border-emerald-400/20"
    },
    {
        icon: Rocket,
        title: "Performance & SEO",
        description: "Optimizing web apps for speed, accessibility, and search engine visibility.",
        color: "text-violet-400",
        bg: "bg-violet-400/10",
        border: "border-violet-400/20"
    },
    {
        icon: BookOpen,
        title: "Developer Tutorials",
        description: "Step-by-step guides and practical solutions to common programming challenges.",
        color: "text-amber-400",
        bg: "bg-amber-400/10",
        border: "border-amber-400/20"
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
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500">
                            one concept at a time.
                        </span>
                    </h2>
                    <div className="prose prose-invert prose-lg max-w-none text-muted-foreground leading-relaxed">
                        <p>
                            Welcome! I created this blog as a digital garden to document my journey through software development, share practical solutions to complex problems, and explore the ever-evolving landscape of web technologies.
                        </p>
                        <p>
                            Whether you're a beginner trying to understand the fundamentals or an experienced developer looking for advanced architectural patterns, the goal here is simple: <strong>to make web development more accessible, practical, and enjoyable.</strong>
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
                        <Badge variant="outline" className="mb-4 border-cyan-500/30 text-cyan-400 bg-cyan-500/10">What to Expect</Badge>
                        <h3 className="text-2xl font-bold">Topics Covered</h3>
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
                                className={`p-6 rounded-2xl border ${topic.border} bg-card hover:bg-muted/50 transition-colors group`}
                            >
                                <div className={`w-12 h-12 rounded-xl ${topic.bg} ${topic.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                    <topic.icon className="w-6 h-6" />
                                </div>
                                <h4 className="text-xl font-semibold mb-2">{topic.title}</h4>
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                    {topic.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                <Separator className="mb-16 bg-border/50" />

                {/* Start Reading / Recommended (CTA) */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5 }}
                    className="mb-16 bg-gradient-to-br from-cyan-500/10 via-background to-violet-500/10 border border-border/50 rounded-3xl p-8 sm:p-12 text-center"
                >
                    <h3 className="text-2xl sm:text-3xl font-bold mb-4">Ready to dive in?</h3>
                    <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                        Explore the latest articles, tutorials, and insights. I try to publish new, high-quality content regularly.
                    </p>
                    <Link href="/blog">
                        <button className="inline-flex items-center gap-2 bg-foreground text-background px-8 py-4 rounded-full font-medium hover:bg-muted-foreground transition-all hover:scale-105 active:scale-95 group">
                            Read the Latest Posts
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </Link>
                </motion.div>

                <Separator className="mb-16 bg-border/50" />

                {/* Condensed Author Bio */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5 }}
                >
                    <h3 className="text-2xl font-bold mb-8 text-center sm:text-left">The Author behind the Screen</h3>
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8 bg-card border border-border/50 p-6 sm:p-8 rounded-3xl">
                        <div className="relative shrink-0 w-32 h-32 sm:w-40 sm:h-40">
                            <Image
                                src="https://avatars.githubusercontent.com/u/45136482?v=4"
                                alt="Nirmal Magar"
                                fill
                                className="object-cover rounded-2xl shadow-xl"
                            />
                            {/* Decorative element */}
                            <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" />
                        </div>
                        <div className="text-center sm:text-left flex-1">
                            <h4 className="text-xl font-bold mb-1">Nirmal Magar</h4>
                            <p className="text-cyan-400 font-medium text-sm mb-4">Web Developer & Writer</p>
                            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                                I'm a developer from Nepal with a passion for building clean, user-centric interfaces and robust backend systems. When I'm not writing code, I'm usually writing about it here, trying to distill complex technical concepts into approachable guides.
                            </p>

                            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
                                <a
                                    href="https://github.com/iam-neo"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2.5 bg-background border border-border/50 hover:border-cyan-500/50 rounded-xl hover:bg-muted transition-colors group"
                                    aria-label="GitHub Profile"
                                >
                                    <Github className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                                </a>
                                <a
                                    href="https://twitter.com/iam_neo"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2.5 bg-background border border-border/50 hover:border-cyan-500/50 rounded-xl hover:bg-muted transition-colors group"
                                    aria-label="Twitter Profile"
                                >
                                    <Twitter className="w-4 h-4 text-muted-foreground group-hover:text-cyan-400 transition-colors" />
                                </a>
                                <a
                                    href="mailto:nirmalrokamagar54@gmail.com"
                                    className="p-2.5 bg-background border border-border/50 hover:border-cyan-500/50 rounded-xl hover:bg-muted transition-colors group"
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

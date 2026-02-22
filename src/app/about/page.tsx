"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
    Code2,
    Music,
    Swords,
    Pen,
    Mail,
    Github,
    Globe,
    MapPin,
    Calendar,
    Quote,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/section-heading";
import { Separator } from "@/components/ui/separator";

const techStack = {
    Languages: ["JavaScript", "TypeScript", "Python", "PHP", "C/C++"],
    Frontend: ["React", "Next.js", "Tailwind CSS", "Bootstrap", "HTML5", "CSS3"],
    Backend: ["Node.js", "Express", "Laravel", "Django"],
    Database: ["MongoDB", "MySQL"],
    Tools: ["Git", "VS Code", "Postman", "NPM", "Composer", "Vercel"],
};

const hobbies = [
    { icon: Code2, label: "Coding" },
    { icon: Pen, label: "Writing" },
    { icon: Music, label: "Music" },
    { icon: Swords, label: "Martial Arts" },
];

const timeline = [
    { year: "2018", event: "Joined GitHub & started learning web development" },
    { year: "2019", event: "Built first portfolio website" },
    { year: "2022", event: "First live coding competition project" },
    { year: "2023", event: "Started building full-stack applications with MERN" },
    { year: "2024", event: "Explored Python, Flask, and API integrations" },
    { year: "2025", event: "Built professional client websites & SEO optimization" },
    { year: "2026", event: "Diving into TypeScript, Next.js & modern tooling" },
];

export default function AboutPage() {
    return (
        <section className="py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionHeading title="About Me" />

                {/* Profile Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-12"
                >
                    <div className="relative shrink-0">
                        <div className="w-28 h-28 rounded-2xl overflow-hidden gradient-border">
                            <Image
                                src="https://avatars.githubusercontent.com/u/45136482?v=4"
                                alt="Nirmal Magar"
                                width={112}
                                height={112}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                    <div className="text-center sm:text-left">
                        <h2 className="text-2xl font-bold mb-1">Nirmal Magar</h2>
                        <p className="text-muted-foreground mb-3">
                            Web Developer & Lifelong Learner
                        </p>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                            I&apos;m a web developer who loves exploring the internet, building
                            creative projects, and constantly learning new things.
                            &quot;Code is like humor. When you have to explain it, it&apos;s bad.&quot;
                        </p>
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground justify-center sm:justify-start">
                            <span className="flex items-center gap-1.5">
                                <MapPin className="w-4 h-4" /> Nepal
                            </span>
                            <span className="flex items-center gap-1.5">
                                <Calendar className="w-4 h-4" /> Since 2018
                            </span>
                            <a
                                href="https://github.com/iam-neo"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1.5 hover:text-foreground transition-colors"
                            >
                                <Github className="w-4 h-4" /> iam-neo
                            </a>
                        </div>
                    </div>
                </motion.div>

                <Separator className="mb-12 bg-border/50" />

                {/* Tech Stack */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12"
                >
                    <h3 className="text-xl font-bold mb-6">🚀 Tech Stack</h3>
                    <div className="space-y-5">
                        {Object.entries(techStack).map(([category, skills]) => (
                            <div key={category}>
                                <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                                    {category}
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {skills.map((skill, i) => (
                                        <motion.div
                                            key={skill}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: i * 0.03 }}
                                        >
                                            <Badge
                                                variant="secondary"
                                                className="px-3 py-1.5 bg-muted/80 border border-border/50 hover:border-cyan-500/30 transition-colors"
                                            >
                                                {skill}
                                            </Badge>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                <Separator className="mb-12 bg-border/50" />

                {/* Journey Timeline */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12"
                >
                    <h3 className="text-xl font-bold mb-6">📅 My Journey</h3>
                    <div className="relative">
                        {/* Line */}
                        <div className="absolute left-[18px] top-3 bottom-3 w-px bg-gradient-to-b from-cyan-500 to-violet-500" />

                        <div className="space-y-6">
                            {timeline.map((item, i) => (
                                <motion.div
                                    key={item.year}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.08 }}
                                    className="flex gap-4 items-start"
                                >
                                    <div className="w-9 h-9 rounded-full bg-card border-2 border-cyan-500/50 flex items-center justify-center shrink-0 z-10">
                                        <div className="w-2 h-2 rounded-full bg-cyan-400" />
                                    </div>
                                    <div className="pt-1">
                                        <span className="text-sm font-bold gradient-text">
                                            {item.year}
                                        </span>
                                        <p className="text-muted-foreground text-sm mt-0.5">
                                            {item.event}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                <Separator className="mb-12 bg-border/50" />

                {/* Hobbies & Interests */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12"
                >
                    <h3 className="text-xl font-bold mb-6">🎨 Hobbies & Interests</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {hobbies.map((hobby, i) => (
                            <motion.div
                                key={hobby.label}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="flex flex-col items-center gap-2 p-5 rounded-xl bg-card border border-border/50 hover:border-violet-500/30 transition-colors"
                            >
                                <hobby.icon className="w-6 h-6 text-muted-foreground" />
                                <span className="text-sm font-medium">{hobby.label}</span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                <Separator className="mb-12 bg-border/50" />

                {/* Favorite Poem */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12"
                >
                    <h3 className="text-xl font-bold mb-4">📜 Favorite Poem</h3>
                    <blockquote className="relative rounded-xl p-6 bg-card border border-border/50">
                        <Quote className="w-8 h-8 text-cyan-500/20 absolute top-4 left-4" />
                        <p className="italic text-muted-foreground text-lg leading-relaxed pl-6">
                            &quot;Two roads diverged in a wood, and I— I took the one less
                            traveled by, And that has made all the difference.&quot;
                        </p>
                        <p className="text-sm text-muted-foreground mt-3 pl-6">
                            — Robert Frost, <em>The Road Not Taken</em>
                        </p>
                    </blockquote>
                </motion.div>

                <Separator className="mb-12 bg-border/50" />

                {/* Contact */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h3 className="text-xl font-bold mb-6">📫 Get in Touch</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <a
                            href="mailto:nirmalrokamagar54@gmail.com"
                            className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border/50 hover:border-cyan-500/30 transition-colors group"
                        >
                            <Mail className="w-5 h-5 text-muted-foreground group-hover:text-cyan-400 transition-colors" />
                            <span className="text-sm">Email</span>
                        </a>
                        <a
                            href="https://github.com/iam-neo"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border/50 hover:border-cyan-500/30 transition-colors group"
                        >
                            <Github className="w-5 h-5 text-muted-foreground group-hover:text-cyan-400 transition-colors" />
                            <span className="text-sm">GitHub</span>
                        </a>
                        <a
                            href="https://magarnirmal.com.np"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border/50 hover:border-cyan-500/30 transition-colors group"
                        >
                            <Globe className="w-5 h-5 text-muted-foreground group-hover:text-cyan-400 transition-colors" />
                            <span className="text-sm">Website</span>
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

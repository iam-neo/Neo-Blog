"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/section-heading";

const skills = [
    "JavaScript", "TypeScript", "React", "Next.js", "Node.js",
    "Python", "PHP", "Laravel", "MongoDB", "MySQL",
    "Tailwind CSS", "Git", "SEO",
];

export function AboutPreview() {
    return (
        <section className="py-20">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionHeading
                    title="About Me"
                    subtitle="A quick overview of who I am and what I do"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    {/* Avatar & Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col items-center md:items-start gap-6"
                    >
                        <div className="relative">
                            <div className="w-32 h-32 rounded-2xl overflow-hidden gradient-border">
                                <Image
                                    src="https://avatars.githubusercontent.com/u/45136482?v=4"
                                    alt="Nirmal Magar"
                                    width={128}
                                    height={128}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            {/* Online indicator */}
                            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-4 border-background" />
                        </div>

                        <div className="text-center md:text-left">
                            <h3 className="text-2xl font-bold mb-1">Nirmal Magar</h3>
                            <p className="text-muted-foreground text-sm mb-4">
                                @iam-neo · Web Developer
                            </p>
                            <p className="text-muted-foreground leading-relaxed">
                                I&apos;m a web developer who loves exploring the internet, building
                                creative projects, and constantly learning new things. When I&apos;m
                                not coding, you&apos;ll find me writing, listening to music, or
                                practicing martial arts.
                            </p>
                        </div>
                    </motion.div>

                    {/* Skills */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                            Tech Stack
                        </h4>
                        <div className="flex flex-wrap gap-2">
                            {skills.map((skill, i) => (
                                <motion.div
                                    key={skill}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.05 }}
                                >
                                    <Badge
                                        variant="secondary"
                                        className="px-3 py-1.5 text-sm bg-muted/80 hover:bg-muted border border-border/50 hover:border-cyan-500/30 transition-colors cursor-default"
                                    >
                                        {skill}
                                    </Badge>
                                </motion.div>
                            ))}
                        </div>

                        <div className="mt-6 grid grid-cols-3 gap-4">
                            <div className="text-center p-4 rounded-xl bg-card border border-border/50">
                                <div className="text-2xl font-bold gradient-text">36</div>
                                <div className="text-xs text-muted-foreground mt-1">Repos</div>
                            </div>
                            <div className="text-center p-4 rounded-xl bg-card border border-border/50">
                                <div className="text-2xl font-bold gradient-text">13</div>
                                <div className="text-xs text-muted-foreground mt-1">Followers</div>
                            </div>
                            <div className="text-center p-4 rounded-xl bg-card border border-border/50">
                                <div className="text-2xl font-bold gradient-text">7+</div>
                                <div className="text-xs text-muted-foreground mt-1">Years</div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

"use client";

import { motion } from "framer-motion";
import { Github, GitFork, Star, Code2 } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";

const stats = [
    { label: "Public Repos", value: "36", icon: Code2 },
    { label: "Total Stars", value: "18+", icon: Star },
    { label: "Followers", value: "13", icon: GitFork },
];

const languages = [
    { name: "JavaScript", percentage: 45, color: "#f1e05a" },
    { name: "TypeScript", percentage: 15, color: "#3178c6" },
    { name: "Python", percentage: 12, color: "#3572A5" },
    { name: "PHP", percentage: 10, color: "#4F5D95" },
    { name: "HTML/CSS", percentage: 18, color: "#e34c26" },
];

export function GitHubStats() {
    return (
        <section className="py-20">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionHeading
                    title="GitHub Activity"
                    subtitle="A snapshot of my open source contributions"
                />

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="relative rounded-xl p-6 bg-card border border-border/50 text-center group hover:border-cyan-500/30 transition-colors"
                        >
                            <stat.icon className="w-8 h-8 mx-auto mb-3 text-muted-foreground group-hover:text-cyan-400 transition-colors" />
                            <div className="text-3xl font-bold gradient-text mb-1">
                                {stat.value}
                            </div>
                            <div className="text-sm text-muted-foreground">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>

                {/* Language Distribution */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="rounded-xl p-6 bg-card border border-border/50"
                >
                    <h3 className="text-lg font-semibold mb-4">Top Languages</h3>

                    {/* Bar */}
                    <div className="w-full h-4 rounded-full overflow-hidden flex mb-4">
                        {languages.map((lang) => (
                            <motion.div
                                key={lang.name}
                                initial={{ width: 0 }}
                                whileInView={{ width: `${lang.percentage}%` }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className="h-full"
                                style={{ backgroundColor: lang.color }}
                                title={`${lang.name}: ${lang.percentage}%`}
                            />
                        ))}
                    </div>

                    {/* Legend */}
                    <div className="flex flex-wrap gap-4">
                        {languages.map((lang) => (
                            <div key={lang.name} className="flex items-center gap-2 text-sm text-muted-foreground">
                                <span
                                    className="w-3 h-3 rounded-full"
                                    style={{ backgroundColor: lang.color }}
                                />
                                {lang.name}
                                <span className="text-xs">({lang.percentage}%)</span>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* CTA */}
                <div className="text-center mt-8">
                    <a
                        href="https://github.com/iam-neo"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Button
                            variant="outline"
                            className="rounded-xl gap-2 border-border/50"
                        >
                            <Github className="w-4 h-4" />
                            View Full Profile
                        </Button>
                    </a>
                </div>
            </div>
        </section>
    );
}

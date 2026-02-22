"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, Star, GitFork } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ProjectCardProps {
    name: string;
    description: string;
    language: string;
    stars: number;
    forks: number;
    url: string;
    homepage?: string;
    topics: string[];
    index?: number;
}

const languageColors: Record<string, string> = {
    JavaScript: "#f1e05a",
    TypeScript: "#3178c6",
    Python: "#3572A5",
    HTML: "#e34c26",
    CSS: "#563d7c",
    Shell: "#89e051",
    PHP: "#4F5D95",
    EJS: "#a91e50",
};

export function ProjectCard({
    name,
    description,
    language,
    stars,
    forks,
    url,
    homepage,
    topics,
    index = 0,
}: ProjectCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
            className="group"
        >
            <div className="relative rounded-xl p-6 bg-card border border-border/50 hover:border-violet-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/5 h-full flex flex-col">
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-semibold group-hover:text-violet-400 transition-colors">
                        {name}
                    </h3>
                    <div className="flex gap-1">
                        <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`View ${name} on GitHub`}
                        >
                            <Button
                                variant="ghost"
                                size="icon"
                                className="w-8 h-8 rounded-lg"
                            >
                                <Github className="w-4 h-4" />
                            </Button>
                        </a>
                        {homepage && (
                            <a
                                href={homepage}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`Visit ${name} live site`}
                            >
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="w-8 h-8 rounded-lg"
                                >
                                    <ExternalLink className="w-4 h-4" />
                                </Button>
                            </a>
                        )}
                    </div>
                </div>

                {/* Description */}
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2 flex-grow">
                    {description || "No description available."}
                </p>

                {/* Topics */}
                {topics.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                        {topics.slice(0, 4).map((topic) => (
                            <Badge
                                key={topic}
                                variant="secondary"
                                className="text-xs bg-muted/80"
                            >
                                {topic}
                            </Badge>
                        ))}
                    </div>
                )}

                {/* Footer */}
                <div className="flex items-center gap-4 text-xs text-muted-foreground mt-auto pt-3 border-t border-border/50">
                    {language && (
                        <span className="flex items-center gap-1.5">
                            <span
                                className="w-3 h-3 rounded-full"
                                style={{
                                    backgroundColor: languageColors[language] || "#8b8b8b",
                                }}
                            />
                            {language}
                        </span>
                    )}
                    {stars > 0 && (
                        <span className="flex items-center gap-1">
                            <Star className="w-3 h-3" />
                            {stars}
                        </span>
                    )}
                    {forks > 0 && (
                        <span className="flex items-center gap-1">
                            <GitFork className="w-3 h-3" />
                            {forks}
                        </span>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

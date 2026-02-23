"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Code2, Server, Terminal, ChevronRight } from "lucide-react";

type PathType = "frontend" | "backend" | "fullstack";

interface PathConfig {
    id: PathType;
    label: string;
    icon: React.ElementType;
    color: string;
    bg: string;
    description: string;
    articles: {
        title: string;
        url: string;
        readTime: string;
    }[];
}

const paths: Record<PathType, PathConfig> = {
    frontend: {
        id: "frontend",
        label: "Frontend UI",
        icon: Code2,
        color: "text-blue-400",
        bg: "bg-blue-400/10",
        description: "Focus on building beautiful, responsive, and accessible user interfaces.",
        articles: [
            { title: "Building Modern UIs with React and Tailwind CSS", url: "/blog/building-modern-uis-with-react-and-tailwind", readTime: "4 min" }
        ]
    },
    backend: {
        id: "backend",
        label: "Backend Architecture",
        icon: Server,
        color: "text-emerald-400",
        bg: "bg-emerald-400/10",
        description: "Deep dives into APIs, databases, and microservices.",
        articles: [
            { title: "Building a Scalable Microservices Architecture", url: "/blog/building-scalable-microservices-architecture", readTime: "8 min" }
        ]
    },
    fullstack: {
        id: "fullstack",
        label: "Fundamentals",
        icon: Terminal,
        color: "text-violet-400",
        bg: "bg-violet-400/10",
        description: "The core tools and concepts every developer needs to master.",
        articles: [
            { title: "10 Essential Git Commands Every Developer Should Know", url: "/blog/essential-git-commands", readTime: "5 min" }
        ]
    }
};

export function InteractivePathSelector() {
    const [activePath, setActivePath] = useState<PathType>("frontend");

    return (
        <div className="bg-[#0A0A0A] border border-border/50 rounded-3xl overflow-hidden shadow-2xl">
            {/* Fake Terminal Header */}
            <div className="bg-[#111111] px-4 py-3 border-b border-border/50 flex items-center justify-between">
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="text-xs text-muted-foreground font-mono">
                    ~/explore-paths.sh
                </div>
                <div className="w-16" /> {/* Spacer */}
            </div>

            <div className="p-6 sm:p-8">
                <div className="mb-8">
                    <p className="text-muted-foreground font-mono text-sm mb-4">
                        <span className="text-cyan-400">$</span> What are you interested in building today?
                    </p>

                    <div className="flex flex-wrap gap-3">
                        {(Object.keys(paths) as PathType[]).map((pathId) => {
                            const path = paths[pathId];
                            const isActive = activePath === pathId;
                            return (
                                <button
                                    key={pathId}
                                    onClick={() => setActivePath(pathId)}
                                    className={`relative px-4 py-2 rounded-lg font-mono text-sm transition-colors z-10 overflow-hidden ${isActive ? "text-white" : "text-muted-foreground hover:text-foreground"
                                        }`}
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="activePathPill"
                                            className={`absolute inset-0 ${path.bg} border border-${path.color.split('-')[1]}-500/30 -z-10 rounded-lg`}
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                    <span className="relative z-10 flex items-center gap-2">
                                        [ {path.label} ]
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="min-h-[250px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activePath}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className={`w-10 h-10 rounded-xl ${paths[activePath].bg} ${paths[activePath].color} flex items-center justify-center`}>
                                    {(() => {
                                        const Icon = paths[activePath].icon;
                                        return <Icon className="w-5 h-5" />;
                                    })()}
                                </div>
                                <div>
                                    <h4 className="text-lg font-semibold text-foreground">{paths[activePath].label} Journey</h4>
                                    <p className="text-sm text-muted-foreground">{paths[activePath].description}</p>
                                </div>
                            </div>

                            <div className="pl-5 relative border-l-2 border-border/50 space-y-6">
                                {paths[activePath].articles.map((article, index) => (
                                    <div key={index} className="relative">
                                        <div className={`absolute -left-[27px] top-1.5 w-3 h-3 rounded-full ${paths[activePath].bg.replace('/10', '/50')} border-2 border-background ring-2 ring-${paths[activePath].color.split('-')[1]}-500/20`} />
                                        <Link href={article.url} className="block group">
                                            <div className="pr-4 hover:translate-x-2 transition-transform duration-300">
                                                <h5 className="text-base font-medium text-foreground group-hover:text-cyan-400 transition-colors mb-1 flex items-center gap-2">
                                                    {article.title}
                                                </h5>
                                                <div className="text-xs text-muted-foreground font-mono flex items-center gap-2">
                                                    <span>{article.readTime}</span>
                                                    <span>•</span>
                                                    <span className="flex items-center gap-1 group-hover:text-cyan-500 transition-colors">
                                                        Read <ChevronRight className="w-3 h-3" />
                                                    </span>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}

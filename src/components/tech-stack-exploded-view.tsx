"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layers, FileJson, Paintbrush, Zap } from "lucide-react";

type StackLayer = "core" | "content" | "styling" | "deployment";

interface LayerConfig {
    id: StackLayer;
    name: string;
    tech: string;
    icon: React.ElementType;
    color: string;
    bg: string;
    description: string;
}

const stackLayers: Record<StackLayer, LayerConfig> = {
    deployment: {
        id: "deployment",
        name: "The Engine",
        tech: "Vercel & Next.js App Router",
        icon: Zap,
        color: "text-zinc-100",
        bg: "bg-zinc-100/10",
        description: "Server React Components and blazing-fast edge caching power the entire experience, ensuring instant load times."
    },
    content: {
        id: "content",
        name: "The Content",
        tech: "MDX & Gray-Matter",
        icon: FileJson,
        color: "text-yellow-400",
        bg: "bg-yellow-400/10",
        description: "Articles are written in Markdown with embedded React components (MDX), allowing for rich, interactive tutorials without a heavy CMS."
    },
    styling: {
        id: "styling",
        name: "The Paint",
        tech: "Tailwind CSS & Framer Motion",
        icon: Paintbrush,
        color: "text-cyan-400",
        bg: "bg-cyan-400/10",
        description: "Utility-first styling for absolute design control, paired with Framer Motion for the butter-smooth interactions you see here."
    },
    core: {
        id: "core",
        name: "The UI Components",
        tech: "Radix & shadcn/ui",
        icon: Layers,
        color: "text-violet-400",
        bg: "bg-violet-400/10",
        description: "Accessible, unstyled primitives combined with beautiful default designs form the backbone of the interactive elements."
    }
};

export function TechStackExplodedView() {
    const [hoveredLayer, setHoveredLayer] = useState<StackLayer | null>(null);

    return (
        <div className="bg-gradient-to-br from-[#0A0A0A] to-[#1A1A1A] border border-border/50 rounded-3xl p-6 md:p-10 shadow-2xl overflow-hidden relative">

            {/* Background Decorative Grid */}
            <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.03] mix-blend-overlay" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

            <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 relative z-10">

                {/* Visual Stack (Left Side) */}
                <div className="flex-1 perspective-1000 flex flex-col justify-center items-center py-10 lg:py-0">
                    <div className="relative w-full max-w-[280px] h-[300px] transform-style-3d rotate-x-60 rotate-z--45 mx-auto">
                        {(Object.keys(stackLayers) as StackLayer[]).map((layerId, index) => {
                            const layer = stackLayers[layerId];
                            const isHovered = hoveredLayer === layerId;

                            // Calculate base translation based on array index to create the physical stack effect
                            // Deployment is index 0 (top), Core is index 3 (bottom)
                            const baseTranslateZ = (3 - index) * 40;
                            const hoverTranslateZ = isHovered ? baseTranslateZ + 20 : baseTranslateZ;

                            return (
                                <motion.div
                                    key={layerId}
                                    onMouseEnter={() => setHoveredLayer(layerId)}
                                    className={`absolute inset-0 w-full h-[200px] border border-white/20 rounded-2xl backdrop-blur-md cursor-pointer transition-colors duration-300 flex items-center justify-center
                                        ${isHovered ? 'bg-white/10 border-white/40 shadow-[0_0_30px_rgba(255,255,255,0.1)]' : 'bg-white/5'}
                                    `}
                                    animate={{
                                        translateZ: hoverTranslateZ,
                                        scale: isHovered ? 1.05 : 1
                                    }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                >
                                    <div className={`p-4 rounded-xl bg-black/40 backdrop-blur-xl border border-white/10 ${isHovered ? 'scale-110' : ''} transition-transform`}>
                                        {(() => {
                                            const Icon = layer.icon;
                                            return <Icon className={`w-8 h-8 ${layer.color}`} />;
                                        })()}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* Information Panel (Right Side) */}
                <div className="flex-1 flex flex-col justify-center">
                    <h3 className="text-2xl font-bold mb-8 font-serif">Anatomy of this Blog</h3>

                    <div className="min-h-[220px]">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={hoveredLayer || 'default'}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.2 }}
                                className="h-full"
                            >
                                {hoveredLayer ? (
                                    <div className="bg-card/50 border border-border/50 p-6 rounded-2xl backdrop-blur-sm h-full flex flex-col justify-center">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className={`w-10 h-10 rounded-xl ${stackLayers[hoveredLayer].bg} flex items-center justify-center`}>
                                                {(() => {
                                                    const Icon = stackLayers[hoveredLayer].icon;
                                                    return <Icon className={`w-5 h-5 ${stackLayers[hoveredLayer].color}`} />;
                                                })()}
                                            </div>
                                            <div>
                                                <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider">{stackLayers[hoveredLayer].name}</p>
                                                <h4 className="text-lg font-bold text-foreground">{stackLayers[hoveredLayer].tech}</h4>
                                            </div>
                                        </div>
                                        <p className="text-muted-foreground leading-relaxed text-sm">
                                            {stackLayers[hoveredLayer].description}
                                        </p>
                                    </div>
                                ) : (
                                    <div className="h-full flex flex-col items-center justify-center text-center p-6 border border-dashed border-border/50 rounded-2xl">
                                        <Layers className="w-8 h-8 text-muted-foreground mb-4 opacity-50" />
                                        <p className="text-muted-foreground text-sm max-w-[200px]">
                                            Hover over the interactive layers in the stack to explore the architecture.
                                        </p>
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <div className="mt-8">
                        <a
                            href="https://github.com/iam-neo/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm font-medium text-cyan-400 hover:text-cyan-300 transition-colors group"
                        >
                            <span className="border-b border-cyan-400/30 group-hover:border-cyan-300">View Source Code on GitHub</span>
                            <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </a>
                    </div>
                </div>

            </div>
        </div>
    );
}

"use client";

import { motion } from "framer-motion";
import { TechStackExplodedView } from "@/components/tech-stack-exploded-view";

export function TechStackSection() {
    return (
        <section className="py-20 lg:py-32 overflow-hidden relative">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col gap-12"
                >
                    <div className="text-center max-w-2xl mx-auto">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 font-serif tracking-tight">
                            The Arsenal
                        </h2>
                        <p className="text-lg text-muted-foreground">
                            Hover over the architecture layers below to discover the technologies powering this blog.
                        </p>
                    </div>

                    <div className="mx-auto w-full max-w-5xl">
                        <TechStackExplodedView />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

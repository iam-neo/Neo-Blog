"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
    title: string;
    subtitle?: string;
    className?: string;
}

export function SectionHeading({ title, subtitle, className = "" }: SectionHeadingProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className={`text-center mb-12 ${className}`}
        >
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">{title}</h2>
            <div className="w-12 h-0.5 mx-auto rounded-full mb-4" style={{ backgroundColor: 'var(--editorial-accent)' }} />
            {subtitle && (
                <p className="text-muted-foreground max-w-xl mx-auto">{subtitle}</p>
            )}
        </motion.div>
    );
}

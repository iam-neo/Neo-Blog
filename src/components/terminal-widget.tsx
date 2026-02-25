"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Terminal } from "lucide-react";

const statuses = [
    "[Status] Currently building E-commerce platform...",
    "[Latest Commit] fixed blog SEO issues",
    "[Activity] Exploring Next.js 15 features",
    "[Status] Refactoring UI components",
    "[System] All systems operational. 🟢"
];

export function TerminalWidget() {
    const [statusIndex, setStatusIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setStatusIndex((prev) => (prev + 1) % statuses.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="inline-flex items-center gap-3 px-4 py-2 mt-8 rounded-full bg-secondary/50 border border-border/50 backdrop-blur-md text-sm font-mono text-muted-foreground shadow-sm hover:shadow-cyan-500/10 hover:border-cyan-500/30 transition-all duration-300 w-fit max-w-[90vw] overflow-hidden"
        >
            <Terminal className="w-4 h-4 text-cyan-400 flex-shrink-0" />
            <motion.p
                key={statusIndex}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.3 }}
                className="truncate"
            >
                {statuses[statusIndex]}
            </motion.p>
        </motion.div>
    );
}

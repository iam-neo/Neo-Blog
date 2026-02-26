"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ReadingProgress() {
    const { scrollYProgress } = useScroll();

    // Use spring animation for smoother progress feeling
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <motion.div
            className="fixed top-0 left-0 right-0 h-0.5 z-[100] origin-left"
            style={{ scaleX, backgroundColor: 'var(--editorial-accent)' }}
        />
    );
}

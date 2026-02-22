"use client";

import { useEffect, useState, useCallback } from "react";
import { List } from "lucide-react";
import type { Heading } from "@/lib/posts";

interface TableOfContentsProps {
    headings: Heading[];
    isMobile?: boolean;
}

export function TableOfContents({ headings, isMobile = false }: TableOfContentsProps) {
    const [activeId, setActiveId] = useState<string>("");

    const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
        // Find the first heading that is intersecting
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length > 0) {
            setActiveId(visible[0].target.id);
        }
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(handleObserver, {
            rootMargin: "-80px 0px -70% 0px",
            threshold: 0,
        });

        headings.forEach(({ slug }) => {
            const element = document.getElementById(slug);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, [headings, handleObserver]);

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, slug: string) => {
        e.preventDefault();
        const element = document.getElementById(slug);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
            setActiveId(slug);
            // Update URL hash without scrolling
            window.history.pushState(null, "", `#${slug}`);
        }
    };

    if (headings.length === 0) return null;

    return (
        <nav className={`${isMobile ? "w-full" : "toc-sidebar sticky top-28 w-full"}`}>
            {!isMobile && (
                <div className="flex items-center gap-2 mb-4 text-sm font-semibold text-foreground">
                    <List className="w-4 h-4 text-cyan-400" />
                    <span>On this page</span>
                </div>
            )}
            <ul className={`space-y-1 ${isMobile ? "" : "border-l border-border/50"}`}>
                {headings.map(({ text, slug, level }) => (
                    <li key={slug}>
                        <a
                            href={`#${slug}`}
                            onClick={(e) => handleClick(e, slug)}
                            className={`
                                toc-link block text-[13px] leading-relaxed py-1 transition-all duration-200 border-l-2
                                ${level === 3 ? "pl-5" : "pl-3"}
                                ${activeId === slug
                                    ? "text-cyan-400 border-cyan-400 font-medium"
                                    : "text-muted-foreground hover:text-foreground border-transparent"
                                }
                            `}
                        >
                            {text}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

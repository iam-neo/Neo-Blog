"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface BlogCardProps {
    slug: string;
    title: string;
    excerpt: string;
    date: string;
    readingTime: string;
    tags: string[];
    index?: number;
}

export function BlogCard({ slug, title, excerpt, date, readingTime, tags, index = 0 }: BlogCardProps) {
    return (
        <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -8 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
        >
            <Link href={`/blog/${slug}`} className="group block">
                <div className="relative rounded-xl p-6 bg-card border border-border/50 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/20 h-full group-hover:bg-muted/10">
                    {/* Gradient accent line */}
                    <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-3">
                        {tags.slice(0, 3).map((tag) => (
                            <Badge
                                key={tag}
                                variant="secondary"
                                className="text-xs font-medium bg-muted/80 hover:bg-muted"
                            >
                                {tag}
                            </Badge>
                        ))}
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-cyan-400 transition-colors leading-tight">
                        {title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2 leading-relaxed">
                        {excerpt}
                    </p>

                    {/* Meta & CTA */}
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center gap-3">
                            <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {date}
                            </span>
                            <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {readingTime}
                            </span>
                        </div>
                        <span className="flex items-center gap-1 text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity">
                            Read <ArrowRight className="w-3 h-3" />
                        </span>
                    </div>
                </div>
            </Link>
        </motion.article>
    );
}

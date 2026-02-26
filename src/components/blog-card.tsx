"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight } from "lucide-react";

interface BlogCardProps {
    slug: string;
    title: string;
    excerpt: string;
    date: string;
    readingTime: string;
    tags: string[];
    coverImage?: string;
    index?: number;
}

export function BlogCard({ slug, title, excerpt, date, readingTime, tags, coverImage, index = 0 }: BlogCardProps) {
    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
        >
            <Link href={`/blog/${slug}`} className="group block h-full">
                <div className="h-full flex flex-col">
                    {/* Image */}
                    {coverImage && (
                        <div className="relative w-full aspect-[16/10] overflow-hidden rounded-xl mb-5">
                            <Image
                                src={coverImage}
                                alt={title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>
                    )}

                    {/* Category tag */}
                    {tags.length > 0 && (
                        <span
                            className="inline-block text-xs font-medium tracking-wider uppercase mb-3 w-fit"
                            style={{ color: 'var(--editorial-accent)' }}
                        >
                            {tags[0]}
                        </span>
                    )}

                    {/* Title */}
                    <h3 className="text-xl font-semibold font-serif mb-3 leading-snug group-hover:text-editorial-accent transition-colors duration-300">
                        {title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-muted-foreground text-sm mb-4 leading-relaxed line-clamp-2 flex-1">
                        {excerpt}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center gap-4 text-xs text-muted-foreground pt-3 border-t border-border/50">
                        <span className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5" />
                            {date}
                        </span>
                        <span className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" />
                            {readingTime}
                        </span>
                        <span className="ml-auto flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: 'var(--editorial-accent)' }}>
                            Read <ArrowRight className="w-3 h-3" />
                        </span>
                    </div>
                </div>
            </Link>
        </motion.article>
    );
}

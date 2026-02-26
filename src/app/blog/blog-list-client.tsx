"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { BlogCard } from "@/components/blog-card";
import type { PostMeta } from "@/lib/posts";

interface BlogListClientProps {
    posts: PostMeta[];
    allTags: string[];
}

export function BlogListClient({ posts, allTags }: BlogListClientProps) {
    const [search, setSearch] = useState("");
    const [selectedTag, setSelectedTag] = useState<string | null>(null);

    const filtered = posts.filter((post) => {
        const matchesSearch =
            post.title.toLowerCase().includes(search.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(search.toLowerCase());
        const matchesTag = !selectedTag || post.tags.includes(selectedTag);
        return matchesSearch && matchesTag;
    });

    return (
        <>
            {/* Search & Filters */}
            <div className="mb-12 space-y-6">
                <div className="relative max-w-md mx-auto">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search posts..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-card border border-border text-sm focus:outline-none focus:border-editorial-accent/50 transition-colors placeholder:text-muted-foreground"
                    />
                </div>

                <div className="flex flex-wrap justify-center gap-2">
                    <button
                        className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all border ${selectedTag === null
                            ? "bg-foreground text-background border-foreground"
                            : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"
                            }`}
                        onClick={() => setSelectedTag(null)}
                    >
                        All
                    </button>
                    {allTags.map((tag) => (
                        <button
                            key={tag}
                            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all border ${selectedTag === tag
                                ? "bg-foreground text-background border-foreground"
                                : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"
                                }`}
                            onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            </div>

            {/* Posts Grid */}
            {filtered.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                    {filtered.map((post, i) => (
                        <BlogCard
                            key={post.slug}
                            slug={post.slug}
                            title={post.title}
                            excerpt={post.excerpt}
                            date={post.date}
                            readingTime={post.readingTime}
                            tags={post.tags}
                            coverImage={post.coverImage}
                            index={i}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20">
                    <p className="text-muted-foreground text-lg mb-2">No posts found</p>
                    <p className="text-muted-foreground text-sm">
                        Try adjusting your search or filter
                    </p>
                </div>
            )}
        </>
    );
}

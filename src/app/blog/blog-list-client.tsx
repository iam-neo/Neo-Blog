"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { BlogCard } from "@/components/blog-card";
import { Badge } from "@/components/ui/badge";
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
            <div className="mb-10 space-y-4">
                <div className="relative max-w-md mx-auto">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search posts..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-card border border-border/50 text-sm focus:outline-none focus:border-cyan-500/50 transition-colors placeholder:text-muted-foreground"
                    />
                </div>

                <div className="flex flex-wrap justify-center gap-3">
                    <Badge
                        variant={selectedTag === null ? "default" : "outline"}
                        className={`cursor-pointer px-4 py-1.5 rounded-full text-sm font-medium transition-all ${selectedTag === null
                            ? "bg-gradient-to-r from-cyan-500 to-violet-500 text-white border-transparent shadow-md"
                            : "hover:border-cyan-500/50 hover:bg-cyan-500/10 text-muted-foreground border-border/50"
                            }`}
                        onClick={() => setSelectedTag(null)}
                    >
                        All
                    </Badge>
                    {allTags.map((tag) => (
                        <Badge
                            key={tag}
                            variant={selectedTag === tag ? "default" : "outline"}
                            className={`cursor-pointer px-4 py-1.5 rounded-full text-sm font-medium transition-all ${selectedTag === tag
                                ? "bg-gradient-to-r from-cyan-500 to-violet-500 text-white border-transparent shadow-md"
                                : "hover:border-cyan-500/50 hover:bg-cyan-500/10 text-muted-foreground border-border/50"
                                }`}
                            onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                        >
                            {tag}
                        </Badge>
                    ))}
                </div>
            </div>

            {/* Posts Grid */}
            {filtered.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                <div className="text-center py-16">
                    <p className="text-muted-foreground text-lg mb-2">No posts found</p>
                    <p className="text-muted-foreground text-sm">
                        Try adjusting your search or filter
                    </p>
                </div>
            )}
        </>
    );
}

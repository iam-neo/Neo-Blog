import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, Calendar } from "lucide-react";
import { BlogCard } from "@/components/blog-card";
import { getAllPosts } from "@/lib/posts";

export function FeaturedPosts() {
    // Get top 4 posts for the editorial grid
    const posts = getAllPosts().slice(0, 4);

    if (posts.length === 0) return null;

    const heroPost = posts[0];
    const secondaryPosts = posts.slice(1);

    return (
        <section className="py-16 lg:py-24 relative">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Section Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-14 gap-6">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold font-serif tracking-tight mb-3">
                            Featured Writings
                        </h2>
                        <p className="text-muted-foreground text-base max-w-lg">
                            Deep dives into system design, frontend architecture, and my journey building scalable web applications.
                        </p>
                    </div>
                    <Link
                        href="/blog"
                        className="hidden md:inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
                    >
                        View All Posts
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {/* Editorial Grid Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 mb-14">

                    {/* Main Hero Card */}
                    <Link href={`/blog/${heroPost.slug}`} className="group block">
                        <article>
                            {/* Image */}
                            {heroPost.coverImage && (
                                <div className="relative w-full aspect-[4/3] overflow-hidden rounded-2xl mb-6">
                                    <Image
                                        src={heroPost.coverImage}
                                        alt={heroPost.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        priority
                                    />
                                </div>
                            )}

                            {/* Category */}
                            {heroPost.tags.length > 0 && (
                                <span
                                    className="inline-block text-xs font-medium tracking-wider uppercase mb-3"
                                    style={{ color: 'var(--editorial-accent)' }}
                                >
                                    {heroPost.tags[0]}
                                </span>
                            )}

                            {/* Title */}
                            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif mb-4 leading-tight group-hover:text-editorial-accent transition-colors duration-300">
                                {heroPost.title}
                            </h3>

                            {/* Excerpt */}
                            <p className="text-muted-foreground mb-5 line-clamp-3 leading-relaxed">
                                {heroPost.excerpt}
                            </p>

                            {/* Meta */}
                            <div className="flex items-center gap-5 text-sm text-muted-foreground pt-4 border-t border-border/50">
                                <span className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    {new Date(heroPost.date).toLocaleDateString("en-US", {
                                        month: "short",
                                        day: "numeric",
                                        year: "numeric",
                                    })}
                                </span>
                                <span className="flex items-center gap-2">
                                    <Clock className="w-4 h-4" />
                                    {heroPost.readingTime}
                                </span>
                            </div>
                        </article>
                    </Link>

                    {/* Secondary Posts — Stacked on the right */}
                    <div className="flex flex-col gap-8 lg:gap-10">
                        {secondaryPosts.map((post, i) => (
                            <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
                                <article className="flex gap-5 items-start">
                                    {/* Thumbnail */}
                                    {post.coverImage && (
                                        <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex-shrink-0 overflow-hidden rounded-xl">
                                            <Image
                                                src={post.coverImage}
                                                alt={post.title}
                                                fill
                                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                        </div>
                                    )}

                                    <div className="flex-1 min-w-0">
                                        {/* Category */}
                                        {post.tags.length > 0 && (
                                            <span
                                                className="inline-block text-xs font-medium tracking-wider uppercase mb-2"
                                                style={{ color: 'var(--editorial-accent)' }}
                                            >
                                                {post.tags[0]}
                                            </span>
                                        )}

                                        {/* Title */}
                                        <h4 className="text-lg font-semibold font-serif mb-2 leading-snug group-hover:text-editorial-accent transition-colors line-clamp-2">
                                            {post.title}
                                        </h4>

                                        {/* Meta */}
                                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                            <span>
                                                {new Date(post.date).toLocaleDateString("en-US", {
                                                    month: "short",
                                                    day: "numeric",
                                                    year: "numeric",
                                                })}
                                            </span>
                                            <span>·</span>
                                            <span>{post.readingTime}</span>
                                        </div>
                                    </div>
                                </article>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Mobile View All CTA */}
                <div className="flex justify-center md:hidden">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-sm font-medium text-foreground border-b border-foreground pb-0.5 hover:border-editorial-accent hover:text-editorial-accent transition-colors group"
                    >
                        Explore All Posts
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

            </div>
        </section>
    );
}

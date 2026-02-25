import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BlogCard } from "@/components/blog-card";
import { getAllPosts } from "@/lib/posts";

export function FeaturedPosts() {
    // Get top 3 posts for the bento grid
    const posts = getAllPosts().slice(0, 3);

    if (posts.length === 0) return null;

    const heroPost = posts[0];
    const secondaryPosts = posts.slice(1);

    return (
        <section className="py-20 lg:py-32 relative">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold font-serif tracking-tight mb-4">
                            Featured Writings
                        </h2>
                        <p className="text-muted-foreground text-lg max-w-2xl">
                            Deep dives into system design, frontend architecture, and my journey building scalable web applications.
                        </p>
                    </div>
                    <Link href="/blog" className="hidden md:block">
                        <Button variant="ghost" className="gap-2 group">
                            View All Posts
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </Link>
                </div>

                {/* Bento Grid Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 mb-12">

                    {/* Main Hero Card (Spans 8 cols on LG) */}
                    <div className="lg:col-span-8 h-full">
                        <Link href={`/blog/${heroPost.slug}`} className="block group h-full">
                            <article className="relative overflow-hidden rounded-3xl border border-border/50 bg-card h-full flex flex-col transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/10 hover:border-cyan-500/50">

                                {/* Background Image */}
                                {heroPost.coverImage && (
                                    <div className="relative w-full aspect-[2/1] sm:aspect-[5/2] lg:aspect-[2/1] overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent z-10" />
                                        <Image
                                            src={heroPost.coverImage}
                                            alt={heroPost.title}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                            priority
                                        />
                                    </div>
                                )}

                                {/* Content overlaid on image bottom an expanding downwards */}
                                <div className="relative z-20 flex-1 flex flex-col justify-end p-6 sm:p-8 lg:p-10 -mt-20 sm:-mt-32">
                                    <div className="flex flex-wrap gap-3 mb-4">
                                        {heroPost.tags.slice(0, 2).map((tag) => (
                                            <Badge key={tag} variant="secondary" className="bg-cyan-500/10 text-cyan-400 border-cyan-500/20 backdrop-blur-md">
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>

                                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 leading-[1.2] font-serif group-hover:text-cyan-400 transition-colors duration-300">
                                        {heroPost.title}
                                    </h3>

                                    <p className="text-muted-foreground mb-6 line-clamp-2 md:line-clamp-3 leading-relaxed">
                                        {heroPost.excerpt}
                                    </p>

                                    <div className="flex items-center gap-6 text-sm text-muted-foreground mt-auto pt-4 border-t border-border/50">
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
                                </div>
                            </article>
                        </Link>
                    </div>

                    {/* Secondary Cards Stack (Spans 4 cols on LG) */}
                    <div className="lg:col-span-4 flex flex-col gap-6 lg:gap-8">
                        {secondaryPosts.map((post, i) => (
                            <div key={post.slug} className="flex-1">
                                <BlogCard
                                    slug={post.slug}
                                    title={post.title}
                                    excerpt={post.excerpt}
                                    date={new Date(post.date).toLocaleDateString("en-US", {
                                        month: "short",
                                        day: "numeric",
                                        year: "numeric",
                                    })}
                                    readingTime={post.readingTime}
                                    tags={post.tags}
                                    coverImage={post.coverImage}
                                    index={i + 1}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Mobile View All CTA */}
                <div className="flex justify-center md:hidden">
                    <Link href="/blog" className="w-full">
                        <Button size="lg" variant="outline" className="w-full gap-2 group">
                            Explore All Posts
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </Link>
                </div>

            </div>
        </section>
    );
}

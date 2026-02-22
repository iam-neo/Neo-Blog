import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BlogCard } from "@/components/blog-card";
import { getAllPosts } from "@/lib/posts";

export function FeaturedPosts() {
    const posts = getAllPosts().slice(0, 3);

    if (posts.length === 0) return null;

    const heroPost = posts[0];
    const secondaryPosts = posts.slice(1);

    return (
        <section className="py-12 md:py-20 lg:py-24">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Main Editorial Hero Post */}
                <Link href={`/blog/${heroPost.slug}`} className="block group mb-12 lg:mb-20">
                    <article className="relative overflow-hidden rounded-3xl border border-border/50 bg-card/30 backdrop-blur-sm transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/10 hover:border-cyan-500/30">
                        {/* Cover Image */}
                        {heroPost.coverImage && (
                            <div className="relative w-full aspect-[21/9] overflow-hidden">
                                <Image
                                    src={heroPost.coverImage}
                                    alt={heroPost.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent" />
                            </div>
                        )}

                        {/* Background subtle gradient for the hero card */}
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <div className="relative z-10 max-w-3xl p-8 md:p-12 lg:p-16">
                            {/* Tags */}
                            <div className="flex flex-wrap gap-3 mb-6">
                                {heroPost.tags.slice(0, 2).map((tag) => (
                                    <Badge key={tag} variant="secondary" className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border-cyan-500/20 hover:bg-cyan-500/20 transition-colors">
                                        {tag}
                                    </Badge>
                                ))}
                            </div>

                            {/* Title */}
                            <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-[1.1] font-serif tracking-tight text-foreground group-hover:text-cyan-400 transition-colors duration-300">
                                {heroPost.title}
                            </h2>

                            {/* Excerpt */}
                            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed line-clamp-3">
                                {heroPost.excerpt}
                            </p>

                            {/* Meta */}
                            <div className="flex items-center gap-6 text-sm text-muted-foreground">
                                <span className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    {new Date(heroPost.date).toLocaleDateString("en-US", {
                                        month: "long",
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

                {/* Secondary Posts Grid */}
                {secondaryPosts.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-16">
                        {secondaryPosts.map((post, i) => (
                            <div key={post.slug} className="h-full">
                                <BlogCard
                                    slug={post.slug}
                                    title={post.title}
                                    excerpt={post.excerpt}
                                    date={post.date}
                                    readingTime={post.readingTime}
                                    tags={post.tags}
                                    coverImage={post.coverImage}
                                    index={i + 1}
                                />
                            </div>
                        ))}
                    </div>
                )}

                {/* View All CTA */}
                <div className="flex justify-center">
                    <Link href="/blog">
                        <Button size="lg" className="rounded-full px-8 h-14 text-base font-medium bg-foreground text-background hover:bg-muted-foreground transition-all gap-2 group shadow-lg">
                            Explore All Posts
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </Link>
                </div>

            </div>
        </section>
    );
}

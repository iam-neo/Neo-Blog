import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Calendar, Clock, ArrowLeft, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { BlogCard } from "@/components/blog-card";
import { getPostBySlug, getAllPosts, getRelatedPosts } from "@/lib/posts";

interface BlogPostPageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
    const { slug } = await params;
    const post = getPostBySlug(slug);
    if (!post) return { title: "Post Not Found" };

    return {
        title: post.title,
        description: post.excerpt,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            type: "article",
            publishedTime: post.date,
            tags: post.tags,
        },
    };
}

export async function generateStaticParams() {
    const posts = getAllPosts();
    return posts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    const relatedPosts = getRelatedPosts(post.slug, post.tags, 3);

    return (
        <article className="py-12">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Back link */}
                <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Blog
                </Link>

                {/* Header */}
                <header className="mb-10">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                                <Tag className="w-3 h-3 mr-1" />
                                {tag}
                            </Badge>
                        ))}
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                        {post.title}
                    </h1>

                    {/* Meta */}
                    <div className="flex items-center gap-6 text-sm text-muted-foreground mb-6">
                        <span className="flex items-center gap-1.5">
                            <Calendar className="w-4 h-4" />
                            {new Date(post.date).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })}
                        </span>
                        <span className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4" />
                            {post.readingTime}
                        </span>
                    </div>

                    {/* Author */}
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border/50">
                        <Image
                            src="https://avatars.githubusercontent.com/u/45136482?v=4"
                            alt="Nirmal Magar"
                            width={40}
                            height={40}
                            className="rounded-full"
                        />
                        <div>
                            <div className="text-sm font-semibold">Nirmal Magar</div>
                            <div className="text-xs text-muted-foreground">
                                Web Developer · @iam-neo
                            </div>
                        </div>
                    </div>
                </header>

                <Separator className="mb-10 bg-border/50" />

                {/* Content */}
                <div className="prose-custom">
                    <MDXRemote source={post.content} />
                </div>

                <Separator className="my-12 bg-border/50" />

                {/* Related Posts */}
                {relatedPosts.length > 0 && (
                    <section>
                        <h2 className="text-2xl font-bold mb-6">Related Posts</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {relatedPosts.map((rp, i) => (
                                <BlogCard
                                    key={rp.slug}
                                    slug={rp.slug}
                                    title={rp.title}
                                    excerpt={rp.excerpt}
                                    date={rp.date}
                                    readingTime={rp.readingTime}
                                    tags={rp.tags}
                                    index={i}
                                />
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </article>
    );
}

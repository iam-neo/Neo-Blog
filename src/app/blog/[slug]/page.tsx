import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import type { Pluggable } from "unified";
import { Calendar, Clock, ArrowLeft, Tag, Github, Twitter } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { BlogCard } from "@/components/blog-card";
import { ReadingProgress } from "@/components/reading-progress";
import { getMDXComponents } from "@/components/mdx-components";
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

    const mdxOptions = {
        mdxOptions: {
            rehypePlugins: [
                [
                    rehypePrettyCode,
                    {
                        theme: "one-dark-pro",
                        keepBackground: false,
                    },
                ],
            ] as Pluggable[],
        },
    };

    return (
        <>
            <ReadingProgress />
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
                    </header>

                    <Separator className="mb-10 bg-border/50" />

                    {/* Content */}
                    <div className="prose-custom">
                        <MDXRemote
                            source={post.content}
                            options={mdxOptions}
                            components={getMDXComponents({})}
                        />
                    </div>

                    <Separator className="my-12 bg-border/50" />

                    {/* About the Author Snippet */}
                    <section className="bg-muted/30 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-center sm:items-start border border-border/50">
                        <Image
                            src="https://avatars.githubusercontent.com/u/45136482?v=4"
                            alt="Nirmal Magar"
                            width={100}
                            height={100}
                            className="rounded-full flex-shrink-0"
                        />
                        <div className="text-center sm:text-left">
                            <h3 className="text-xl font-bold mb-2 font-serif tracking-tight">Written by Nirmal Magar</h3>
                            <p className="text-muted-foreground mb-4 leading-relaxed text-sm">
                                I&apos;m a Web Developer and SEO Enthusiast who loves messing around with the internet.
                                I build things, break them, and write about what I learn along the way.
                            </p>
                            <div className="flex items-center justify-center sm:justify-start gap-3">
                                <a href="https://github.com/iam-neo" target="_blank" rel="noopener noreferrer" className="p-2 bg-background border border-border rounded-lg hover:bg-muted transition-colors">
                                    <Github className="w-4 h-4 text-foreground" />
                                </a>
                                <a href="https://twitter.com/iam_neo" target="_blank" rel="noopener noreferrer" className="p-2 bg-background border border-border rounded-lg hover:bg-muted transition-colors text-cyan-500 hover:text-cyan-400">
                                    <Twitter className="w-4 h-4" />
                                </a>
                            </div>
                        </div>
                    </section>

                    <Separator className="my-12 bg-border/50" />

                    {/* Related Posts */}
                    {
                        relatedPosts.length > 0 && (
                            <section>
                                <h2 className="text-3xl font-bold mb-8 font-serif">Related Posts</h2>
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
                                            coverImage={rp.coverImage}
                                            index={i}
                                        />
                                    ))}
                                </div>
                            </section>
                        )
                    }
                </div>
            </article>
        </>
    );
}

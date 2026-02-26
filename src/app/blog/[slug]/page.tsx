import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import type { Pluggable } from "unified";
import { Calendar, Clock, ArrowLeft, Tag, Github, Twitter, List } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { BlogCard } from "@/components/blog-card";
import { ReadingProgress } from "@/components/reading-progress";
import { getMDXComponents } from "@/components/mdx-components";
import { TableOfContents } from "@/components/table-of-contents";
import { SeriesNavigation } from "@/components/series-navigation";
import { getPostBySlug, getAllPosts, getRelatedPosts, getSeries } from "@/lib/posts";

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
    const seriesPosts = post.series ? getSeries(post.series) : [];

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
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="xl:grid xl:grid-cols-[220px_1fr] xl:gap-10">
                        {/* Table of Contents - Left Sidebar */}
                        <aside className="hidden xl:block">
                            <TableOfContents headings={post.headings} />
                        </aside>

                        {/* Main Content */}
                        <div className="max-w-3xl mx-auto xl:mx-0 w-full">
                            {/* Back link */}
                            <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
                                <ArrowLeft className="w-4 h-4" />
                                Back to Blog
                            </Link>

                            {/* Header */}
                            <header className="mb-10">
                                {/* Tags */}
                                <div className="flex flex-wrap gap-3 mb-4">
                                    {post.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="inline-flex items-center gap-1 text-xs font-medium tracking-wider uppercase"
                                            style={{ color: 'var(--editorial-accent)' }}
                                        >
                                            <Tag className="w-3 h-3" />
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {/* Title */}
                                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight font-serif">
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

                            <Separator className="mb-10 bg-border/50 hidden xl:block" />

                            {/* Mobile Table of Contents */}
                            {post.headings.length > 0 && (
                                <div className="xl:hidden mb-10">
                                    <details className="bg-muted/30 border border-border rounded-xl p-4 group">
                                        <summary className="font-semibold cursor-pointer text-foreground flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <List className="w-4 h-4" style={{ color: 'var(--editorial-accent)' }} />
                                                <span>Table of Contents</span>
                                            </div>
                                            <span className="text-xs text-muted-foreground group-open:hidden">Tap to expand</span>
                                            <span className="text-xs text-muted-foreground hidden group-open:inline">Tap to collapse</span>
                                        </summary>
                                        <div className="mt-4 pt-4 border-t border-border/50">
                                            <TableOfContents headings={post.headings} isMobile />
                                        </div>
                                    </details>
                                </div>
                            )}

                            {/* Series Navigation (Top) */}
                            {post.series && seriesPosts.length > 0 && (
                                <SeriesNavigation
                                    seriesName={post.series}
                                    seriesPosts={seriesPosts}
                                    currentSlug={post.slug}
                                />
                            )}

                            {/* Content */}
                            <div className="prose-custom">
                                <MDXRemote
                                    source={post.content}
                                    options={mdxOptions}
                                    components={getMDXComponents({})}
                                />
                            </div>

                            {/* Series Navigation (Bottom) */}
                            {post.series && seriesPosts.length > 0 && (
                                <SeriesNavigation
                                    seriesName={post.series}
                                    seriesPosts={seriesPosts}
                                    currentSlug={post.slug}
                                />
                            )}

                            <Separator className="my-12 bg-border/50" />

                            {/* About the Author Snippet */}
                            <section className="bg-muted/20 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-center sm:items-start border border-border/50">
                                <Image
                                    src="https://avatars.githubusercontent.com/u/45136482?v=4"
                                    alt="Nirmal Magar"
                                    width={80}
                                    height={80}
                                    className="rounded-full flex-shrink-0"
                                />
                                <div className="text-center sm:text-left">
                                    <h3 className="text-xl font-bold mb-2 font-serif tracking-tight">Written by Nirmal Magar</h3>
                                    <p className="text-muted-foreground mb-4 leading-relaxed text-sm">
                                        I&apos;m a Web Developer and SEO Enthusiast who loves messing around with the internet.
                                        I build things, break them, and write about what I learn along the way.
                                    </p>
                                    <div className="flex items-center justify-center sm:justify-start gap-3">
                                        <a href="https://github.com/iam-neo" target="_blank" rel="noopener noreferrer" className="p-2 bg-background border border-border rounded-full hover:bg-muted transition-colors">
                                            <Github className="w-4 h-4 text-foreground" />
                                        </a>
                                        <a href="https://twitter.com/iam_neo" target="_blank" rel="noopener noreferrer" className="p-2 bg-background border border-border rounded-full hover:bg-muted transition-colors" style={{ color: 'var(--editorial-accent)' }}>
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
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                    </div>
                </div>
            </article>
        </>
    );
}

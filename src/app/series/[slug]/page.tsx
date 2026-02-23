import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { ArrowLeft, BookMarked, Calendar, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/section-heading";
import { getAllSeries } from "@/lib/posts";

interface SeriesPageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: SeriesPageProps): Promise<Metadata> {
    const { slug } = await params;
    const allSeries = getAllSeries();
    const series = allSeries.find((s) => s.slug === slug);

    if (!series) return { title: "Series Not Found" };

    return {
        title: `${series.name} Series`,
        description: `Explore the ${series.name} series featuring ${series.totalParts} episodes.`,
    };
}

export async function generateStaticParams() {
    const allSeries = getAllSeries();
    return allSeries.map((series) => ({ slug: series.slug }));
}

export default async function SeriesPage({ params }: SeriesPageProps) {
    const { slug } = await params;
    const allSeries = getAllSeries();
    const series = allSeries.find((s) => s.slug === slug);

    if (!series) {
        notFound();
    }

    return (
        <div className="py-12 md:py-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link href="/series" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
                    <ArrowLeft className="w-4 h-4" />
                    Back to all Series
                </Link>

                <div className="bg-gradient-to-br from-cyan-500/10 via-background to-violet-500/10 border border-border/50 rounded-3xl p-8 sm:p-12 mb-16 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                        <BookMarked className="w-48 h-48 text-cyan-500" />
                    </div>

                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-4">
                            <Badge variant="outline" className="border-cyan-500/30 text-cyan-400 bg-cyan-500/10 hidden sm:inline-flex">
                                Series Overview
                            </Badge>
                            <Badge variant="secondary" className="bg-muted text-foreground">
                                {series.totalParts} Parts
                            </Badge>
                        </div>

                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 font-serif">
                            {series.name}
                        </h1>

                        <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
                            Follow this structured guide step-by-step. Start from Part 1 to build your foundational knowledge, or jump directly into the specific episode you need.
                        </p>
                    </div>
                </div>

                <div className="mb-12">
                    <SectionHeading title="Episodes in this Series" />
                </div>

                <div className="relative border-l-2 border-border/50 ml-4 sm:ml-8 space-y-12 pb-8">
                    {series.posts.map((post, index) => (
                        <div key={post.slug} className="relative pl-8 sm:pl-12">
                            {/* Timeline Node */}
                            <div className="absolute -left-[17px] top-8 w-8 h-8 rounded-full bg-background border-4 border-cyan-500 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.5)] z-10">
                                <span className="text-xs font-bold text-foreground">{index + 1}</span>
                            </div>

                            <Link href={`/blog/${post.slug}`} className="block group">
                                <div className="bg-card border border-border/50 hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/10 transition-all rounded-3xl p-6 sm:p-8">
                                    <div className="flex flex-col sm:flex-row gap-6">

                                        {/* Thumbnail (if any) */}
                                        {post.coverImage && (
                                            <div className="w-full sm:w-48 h-32 shrink-0 rounded-xl overflow-hidden relative">
                                                <Image
                                                    src={post.coverImage}
                                                    alt={post.title}
                                                    fill
                                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                            </div>
                                        )}

                                        <div className="flex-1 min-w-0 flex flex-col justify-center">
                                            <div className="text-sm font-bold text-cyan-400 mb-2 uppercase tracking-wider">
                                                Part {index + 1}
                                            </div>
                                            <h2 className="text-xl sm:text-2xl font-bold mb-3 group-hover:text-cyan-400 transition-colors leading-tight">
                                                {post.title}
                                            </h2>
                                            <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed mb-4">
                                                {post.excerpt}
                                            </p>
                                            <div className="flex items-center gap-4 text-xs text-muted-foreground mt-auto">
                                                <span className="flex items-center gap-1.5">
                                                    <Calendar className="w-3.5 h-3.5" />
                                                    {post.date}
                                                </span>
                                                <span className="flex items-center gap-1.5">
                                                    <Clock className="w-3.5 h-3.5" />
                                                    {post.readingTime}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

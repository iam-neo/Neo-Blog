import { Metadata } from "next";
import Link from "next/link";
import { BookMarked, Layers, ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Badge } from "@/components/ui/badge";
import { getAllSeries } from "@/lib/posts";

export const metadata: Metadata = {
    title: "Series & Guides",
    description: "Multi-part tutorials and deep dives into web development topics.",
};

export default function SeriesIndexPage() {
    const allSeries = getAllSeries();

    return (
        <div className="py-12 md:py-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-12">
                    <SectionHeading title="Series & Guides" />
                    <p className="text-xl text-muted-foreground mt-4 leading-relaxed">
                        Structured learning paths. Follow these multi-part tutorials from start to finish to master complex topics.
                    </p>
                </div>

                {allSeries.length === 0 ? (
                    <div className="text-center py-20 bg-muted/20 rounded-3xl border border-border/50">
                        <Layers className="w-12 h-12 mx-auto text-muted-foreground mb-4 opacity-50" />
                        <h3 className="text-xl font-semibold mb-2">No series available yet</h3>
                        <p className="text-muted-foreground">Check back soon for structured tutorials.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-8">
                        {allSeries.map((series) => (
                            <Link
                                key={series.slug}
                                href={`/series/${series.slug}`}
                                className="group block"
                            >
                                <div className="bg-card border border-border/50 hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/10 rounded-3xl p-6 sm:p-8 transition-all duration-300 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-500 pointer-events-none">
                                        <BookMarked className="w-32 h-32" />
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between relative z-10">
                                        <div>
                                            <div className="flex items-center gap-3 mb-3">
                                                <Badge variant="secondary" className="bg-cyan-500/10 text-cyan-400 border-cyan-500/20">
                                                    {series.totalParts} Parts
                                                </Badge>
                                                <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                                                    Structured Guide
                                                </span>
                                            </div>
                                            <h2 className="text-2xl sm:text-3xl font-bold mb-3 group-hover:text-cyan-400 transition-colors">
                                                {series.name}
                                            </h2>
                                            <p className="text-muted-foreground line-clamp-2 max-w-2xl">
                                                {series.posts[0]?.excerpt || "Dive deep into this topic with our step-by-step guide series."}
                                            </p>
                                        </div>

                                        <div className="shrink-0">
                                            <div className="w-12 h-12 rounded-full bg-muted/50 group-hover:bg-cyan-500 flex items-center justify-center transition-colors">
                                                <ArrowRight className="w-5 h-5 text-foreground group-hover:text-background group-hover:translate-x-1 transition-all" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Preview line of posts */}
                                    <div className="mt-6 pt-6 border-t border-border/50 relative z-10 hidden sm:block">
                                        <p className="text-sm text-muted-foreground mb-3 font-medium">Included in this series:</p>
                                        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
                                            {series.posts.slice(0, 3).map((post, i) => (
                                                <li key={post.slug} className="flex items-center gap-2">
                                                    <span className="text-cyan-500/50">{i + 1}.</span>
                                                    <span className="truncate max-w-[200px]">{post.title}</span>
                                                </li>
                                            ))}
                                            {series.totalParts > 3 && (
                                                <li className="text-cyan-400/70">+{series.totalParts - 3} more...</li>
                                            )}
                                        </ul>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

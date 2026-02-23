import Link from "next/link";
import { BookMarked, ChevronLeft, ChevronRight } from "lucide-react";
import type { PostMeta } from "@/lib/posts";

interface SeriesNavigationProps {
    seriesName: string;
    seriesPosts: PostMeta[];
    currentSlug: string;
}

export function SeriesNavigation({ seriesName, seriesPosts, currentSlug }: SeriesNavigationProps) {
    if (seriesPosts.length <= 1) return null;

    const currentIndex = seriesPosts.findIndex((p) => p.slug === currentSlug);
    const currentPart = (seriesPosts[currentIndex]?.seriesPart) || (currentIndex + 1);
    const prevPost = currentIndex > 0 ? seriesPosts[currentIndex - 1] : null;
    const nextPost = currentIndex < seriesPosts.length - 1 ? seriesPosts[currentIndex + 1] : null;

    return (
        <div className="bg-muted/30 border border-border/50 rounded-2xl p-6 my-10 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-cyan-500 to-violet-500" />

            <div className="flex items-start gap-4 mb-4">
                <div className="p-2 bg-background border border-border/50 rounded-xl shrink-0">
                    <BookMarked className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                    <h4 className="font-bold text-lg leading-tight mb-1">
                        Series: <span className="text-foreground">{seriesName}</span>
                    </h4>
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                        Part {currentPart} of {seriesPosts.length}
                        <Link
                            href={`/series/${seriesName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                            className="text-cyan-400 hover:text-cyan-300 hover:underline inline-flex items-center"
                        >
                            View all parts
                        </Link>
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                {prevPost ? (
                    <Link
                        href={`/blog/${prevPost.slug}`}
                        className="flex flex-col p-4 rounded-xl bg-background border border-border/50 hover:border-cyan-500/50 hover:bg-muted/50 transition-all group/link"
                    >
                        <span className="text-xs text-muted-foreground mb-1 flex items-center gap-1 uppercase tracking-wider font-semibold">
                            <ChevronLeft className="w-3 h-3 group-hover/link:-translate-x-1 transition-transform" />
                            Previous Part
                        </span>
                        <span className="text-sm font-medium line-clamp-1">{prevPost.title}</span>
                    </Link>
                ) : (
                    <div className="hidden sm:block"></div>
                )}

                {nextPost && (
                    <Link
                        href={`/blog/${nextPost.slug}`}
                        className="flex flex-col text-right p-4 rounded-xl bg-background border border-border/50 hover:border-cyan-500/50 hover:bg-muted/50 transition-all group/link sm:col-start-2"
                    >
                        <span className="text-xs text-muted-foreground mb-1 flex items-center justify-end gap-1 uppercase tracking-wider font-semibold">
                            Next Part
                            <ChevronRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
                        </span>
                        <span className="text-sm font-medium line-clamp-1">{nextPost.title}</span>
                    </Link>
                )}
            </div>
        </div>
    );
}

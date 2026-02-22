import type { Metadata } from "next";
import { getAllPosts, getAllTags } from "@/lib/posts";
import { SectionHeading } from "@/components/section-heading";
import { BlogListClient } from "./blog-list-client";

export const metadata: Metadata = {
    title: "Blog",
    description:
        "Thoughts, tutorials, and insights from my developer journey. Articles about web development, JavaScript, React, and more.",
};

export default function BlogPage() {
    const posts = getAllPosts();
    const allTags = getAllTags();

    return (
        <section className="py-12">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionHeading
                    title="Blog"
                    subtitle="Thoughts, tutorials, and insights from my developer journey"
                />
                <BlogListClient posts={posts} allTags={allTags} />
            </div>
        </section>
    );
}

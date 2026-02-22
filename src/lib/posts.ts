import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "src/content/posts");

export interface PostMeta {
    slug: string;
    title: string;
    date: string;
    excerpt: string;
    tags: string[];
    coverImage?: string;
    readingTime: string;
}

export interface Heading {
    text: string;
    slug: string;
    level: 2 | 3;
}

export interface Post extends PostMeta {
    content: string;
    headings: Heading[];
}

function slugify(text: string): string {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]+/g, "")
        .replace(/--+/g, "-");
}

function extractHeadings(content: string): Heading[] {
    const headingRegex = /^(#{2,3})\s+(.+)$/gm;
    const headings: Heading[] = [];
    let match;

    while ((match = headingRegex.exec(content)) !== null) {
        const level = match[1].length as 2 | 3;
        const text = match[2].trim().replace(/[`*_~\[\]]/g, "");
        headings.push({
            text,
            slug: slugify(text),
            level,
        });
    }

    return headings;
}

function calculateReadingTime(content: string): string {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
}

export function getAllPosts(): PostMeta[] {
    if (!fs.existsSync(postsDirectory)) {
        return [];
    }

    const fileNames = fs.readdirSync(postsDirectory);
    const posts = fileNames
        .filter((name) => name.endsWith(".mdx"))
        .map((fileName) => {
            const slug = fileName.replace(/\.mdx$/, "");
            const fullPath = path.join(postsDirectory, fileName);
            const fileContents = fs.readFileSync(fullPath, "utf8");
            const { data, content } = matter(fileContents);

            return {
                slug,
                title: data.title || slug,
                date: data.date || "",
                excerpt: data.excerpt || "",
                tags: data.tags || [],
                coverImage: data.coverImage,
                readingTime: calculateReadingTime(content),
            };
        })
        .sort((a, b) => (a.date > b.date ? -1 : 1));

    return posts;
}

export function getPostBySlug(slug: string): Post | null {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);

    if (!fs.existsSync(fullPath)) {
        return null;
    }

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
        slug,
        title: data.title || slug,
        date: data.date || "",
        excerpt: data.excerpt || "",
        tags: data.tags || [],
        coverImage: data.coverImage,
        readingTime: calculateReadingTime(content),
        content,
        headings: extractHeadings(content),
    };
}

export function getAllTags(): string[] {
    const posts = getAllPosts();
    const tagsSet = new Set<string>();
    posts.forEach((post) => post.tags.forEach((tag) => tagsSet.add(tag)));
    return Array.from(tagsSet).sort();
}

export function getRelatedPosts(currentSlug: string, tags: string[], limit = 3): PostMeta[] {
    const allPosts = getAllPosts().filter((post) => post.slug !== currentSlug);

    const scored = allPosts.map((post) => ({
        post,
        score: post.tags.filter((tag) => tags.includes(tag)).length,
    }));

    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, limit).map((s) => s.post);
}

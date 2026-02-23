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
    series?: string;
    seriesPart?: number;
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

export interface SeriesInfo {
    name: string;
    slug: string;
    posts: PostMeta[];
    totalParts: number;
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
                series: data.series,
                seriesPart: data.seriesPart,
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
        series: data.series,
        seriesPart: data.seriesPart,
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

    // If there are exactly two tags, we might end up with many posts having a score of 1 or 2.
    // If we only limit without tie-breaking, the results might be volatile based on the raw `allPosts` order.
    // To ensure a somewhat stable or at least date-ordered secondary sort:
    scored.sort((a, b) => {
        if (b.score !== a.score) {
            return b.score - a.score;
        }
        // Fallback: sort by date descending if tags score ties
        return b.post.date > a.post.date ? 1 : -1;
    });

    return scored.slice(0, limit).map((s) => s.post);
}

/**
 * Get all posts that belong to a specific series, ordered by part number
 */
export function getSeries(seriesName: string): PostMeta[] {
    const posts = getAllPosts();
    return posts
        .filter((post) => post.series === seriesName)
        .sort((a, b) => (a.seriesPart || 0) - (b.seriesPart || 0));
}

/**
 * Get a categorized list of all series and their respective posts
 */
export function getAllSeries(): SeriesInfo[] {
    const posts = getAllPosts();
    const seriesMap = new Map<string, PostMeta[]>();

    // Group posts by series
    posts.forEach((post) => {
        if (post.series) {
            const existing = seriesMap.get(post.series) || [];
            seriesMap.set(post.series, [...existing, post]);
        }
    });

    // Convert to array and format
    const allSeries: SeriesInfo[] = Array.from(seriesMap.entries()).map(([name, seriesPosts]) => {
        // Sort posts within the series by part number
        const sortedPosts = [...seriesPosts].sort((a, b) => (a.seriesPart || 0) - (b.seriesPart || 0));

        return {
            name,
            slug: slugify(name),
            posts: sortedPosts,
            totalParts: sortedPosts.length
        };
    });

    // Sort series by newest overall post update
    return allSeries.sort((a, b) => {
        const latestDateA = a.posts.reduce((latest, post) => (post.date > latest ? post.date : latest), "");
        const latestDateB = b.posts.reduce((latest, post) => (post.date > latest ? post.date : latest), "");
        return latestDateB > latestDateA ? 1 : -1;
    });
}

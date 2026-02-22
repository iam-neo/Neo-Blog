import type { Metadata } from "next";
import { SectionHeading } from "@/components/section-heading";
import { ProjectCard } from "@/components/project-card";

export const metadata: Metadata = {
    title: "Projects",
    description:
        "A showcase of my open source projects and repositories on GitHub.",
};

const projects = [
    {
        name: "Pinterest-Clone",
        description:
            "A high-performance Pinterest clone featuring a responsive masonry grid, user authentication, and interactive pinning functionality.",
        language: "JavaScript",
        stars: 0,
        forks: 0,
        url: "https://github.com/iam-neo/Pinterest-Clone",
        homepage: "https://gallery.magarnirmal.com.np/",
        topics: ["react", "fullstack", "masonry-layout", "ui-ux"],
    },
    {
        name: "Nepalgunj-Skin-Center",
        description:
            "Official website for Nepalgunj Skin Center — a responsive, SEO-optimized medical platform for dermatology, hair transplants, and aesthetic services.",
        language: "JavaScript",
        stars: 0,
        forks: 0,
        url: "https://github.com/iam-neo/Nepalgunj-Skin-Center",
        homepage: "https://nepalgunjskincenter.com.np",
        topics: ["healthcare-ui", "dermatology", "seo", "clinic-website"],
    },
    {
        name: "BCEM",
        description:
            "The official frontend for Bheri College of Engineering & Management. Modern, responsive SPA built with React and Vite.",
        language: "JavaScript",
        stars: 0,
        forks: 0,
        url: "https://github.com/iam-neo/BCEM",
        homepage: "https://bcem.vercel.app",
        topics: ["react", "vite", "education", "frontend"],
    },
    {
        name: "Univid-Downloader",
        description:
            "A universal video downloader tool built with TypeScript for downloading videos from multiple platforms.",
        language: "TypeScript",
        stars: 0,
        forks: 0,
        url: "https://github.com/iam-neo/Univid-Downloader",
        homepage: "https://univid.vercel.app",
        topics: ["typescript", "video-downloader", "tools"],
    },
    {
        name: "PC-Cleaner-Security-Tool",
        description:
            "A lightweight, all-in-one Windows optimization and security utility designed to declutter system junk, enhance privacy, and fortify performance.",
        language: "Python",
        stars: 0,
        forks: 0,
        url: "https://github.com/iam-neo/PC-Cleaner-Security-Tool",
        homepage: "",
        topics: ["python", "windows-utility", "security", "performance"],
    },
    {
        name: "My-Portfolio",
        description:
            "Personal portfolio website showcasing projects, skills, and experience as a web developer.",
        language: "JavaScript",
        stars: 0,
        forks: 0,
        url: "https://github.com/iam-neo/My-Potfolio",
        homepage: "http://magarnirmal.com.np/",
        topics: ["portfolio", "web-development", "personal"],
    },
    {
        name: "Backend-Roadmap",
        description:
            "Structured curriculum covering JavaScript, Node.js, Express.js, MongoDB, security, testing, and deployment for backend development.",
        language: "JavaScript",
        stars: 0,
        forks: 0,
        url: "https://github.com/iam-neo/Backend-Roadmap",
        topics: ["learning", "node-js", "backend", "curriculum"],
    },
    {
        name: "Recipe-Finder",
        description:
            "A recipe search web application that helps users discover recipes using the Edamam API.",
        language: "JavaScript",
        stars: 0,
        forks: 0,
        url: "https://github.com/iam-neo/Recipe-Finder",
        homepage: "https://recipe.magarnirmal.com.np/",
        topics: ["api-integration", "frontend", "javascript"],
    },
    {
        name: "EJS-Task-Manager",
        description:
            "A task management web app built with EJS, Express, and Node.js featuring CRUD operations.",
        language: "EJS",
        stars: 0,
        forks: 0,
        url: "https://github.com/iam-neo/EJS-Task-Manager",
        topics: ["ejs", "express", "node", "fullstack"],
    },
];

export default function ProjectsPage() {
    return (
        <section className="py-12">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionHeading
                    title="Projects"
                    subtitle="A selection of my open source work and side projects"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project, i) => (
                        <ProjectCard
                            key={project.name}
                            name={project.name}
                            description={project.description}
                            language={project.language}
                            stars={project.stars}
                            forks={project.forks}
                            url={project.url}
                            homepage={project.homepage}
                            topics={project.topics}
                            index={i}
                        />
                    ))}
                </div>

                <div className="text-center mt-12">
                    <a
                        href="https://github.com/iam-neo?tab=repositories"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
                    >
                        View all 36 repositories on GitHub →
                    </a>
                </div>
            </div>
        </section>
    );
}

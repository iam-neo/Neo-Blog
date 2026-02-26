import React from "react";
import { CopyButton } from "@/components/copy-button";

function slugify(text: string): string {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]+/g, "")
        .replace(/--+/g, "-");
}

function getHeadingText(children: React.ReactNode): string {
    if (typeof children === "string") return children;
    if (Array.isArray(children)) return children.map(getHeadingText).join("");
    if (React.isValidElement(children)) {
        const el = children as React.ReactElement<{ children?: React.ReactNode }>;
        if (el.props?.children) return getHeadingText(el.props.children);
    }
    return "";
}

export function getMDXComponents(components: Record<string, React.ComponentType> = {}) {
    return {
        h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
            <h1 className="hidden" aria-hidden="true" {...props} />
        ),
        h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => {
            const id = slugify(getHeadingText(props.children));
            return <h2 id={id} className="text-2xl font-semibold mb-4 mt-8 text-foreground scroll-mt-24" {...props} />;
        },
        h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => {
            const id = slugify(getHeadingText(props.children));
            return <h3 id={id} className="text-xl font-semibold mb-3 mt-6 text-foreground scroll-mt-24" {...props} />;
        },
        p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
            <p className="mb-4 leading-relaxed text-muted-foreground" {...props} />
        ),
        a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
            <a
                className="underline underline-offset-4 transition-colors"
                style={{ color: 'var(--editorial-accent)' }}
                target="_blank"
                rel="noopener noreferrer"
                {...props}
            />
        ),
        ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
            <ul className="list-disc pl-6 mb-4 space-y-2" {...props} />
        ),
        ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
            <ol className="list-decimal pl-6 mb-4 space-y-2" {...props} />
        ),
        li: (props: React.HTMLAttributes<HTMLLIElement>) => (
            <li className="text-muted-foreground" {...props} />
        ),
        blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
            <blockquote
                className="border-l-3 pl-4 italic text-muted-foreground my-6 py-1"
                style={{ borderColor: 'var(--editorial-accent)' }}
                {...props}
            />
        ),
        code: (props: React.HTMLAttributes<HTMLElement>) => (
            <code className="bg-muted px-1.5 py-0.5 rounded text-[0.875em] font-mono text-foreground" {...props} />
        ),
        pre: (props: React.HTMLAttributes<HTMLPreElement>) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const children = props.children as any;
            const textContent = children?.props?.children || "";
            return (
                <div className="relative group my-6">
                    <CopyButton text={typeof textContent === "string" ? textContent : ""} />
                    <pre className="bg-[#1e1e2e] border border-border/40 rounded-xl p-4 overflow-x-auto text-[0.875em] leading-relaxed shadow-lg mb-0" {...props} />
                </div>
            );
        },
        img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img className="rounded-xl my-6 w-full" alt="" {...props} />
        ),
        hr: () => <hr className="border-border my-8" />,
        table: (props: React.HTMLAttributes<HTMLTableElement>) => (
            <div className="overflow-x-auto mb-6">
                <table className="w-full border-collapse" {...props} />
            </div>
        ),
        th: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
            <th className="border border-border px-4 py-2 text-left font-semibold bg-muted text-sm" {...props} />
        ),
        td: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
            <td className="border border-border px-4 py-2 text-sm text-muted-foreground" {...props} />
        ),
        ...components,
    };
}

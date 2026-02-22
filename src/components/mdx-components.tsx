import React from "react";

export function useMDXComponents(components: Record<string, React.ComponentType>) {
    return {
        h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
            <h1 className="text-3xl font-bold mb-6 mt-8 gradient-text" {...props} />
        ),
        h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
            <h2 className="text-2xl font-semibold mb-4 mt-8 text-foreground" {...props} />
        ),
        h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
            <h3 className="text-xl font-semibold mb-3 mt-6 text-foreground" {...props} />
        ),
        p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
            <p className="mb-4 leading-relaxed text-muted-foreground" {...props} />
        ),
        a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
            <a
                className="text-cyan-400 hover:text-cyan-300 underline underline-offset-4 transition-colors"
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
                className="border-l-4 border-cyan-500/50 pl-4 italic text-muted-foreground my-6 py-1"
                {...props}
            />
        ),
        code: (props: React.HTMLAttributes<HTMLElement>) => (
            <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono text-foreground" {...props} />
        ),
        pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
            <pre className="bg-muted/50 border border-border rounded-xl p-4 overflow-x-auto mb-6 text-sm" {...props} />
        ),
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

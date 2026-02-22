"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FileText, User, FolderOpen } from "lucide-react";

import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command";

interface CommandPaletteProps {
    posts: { slug: string; title: string }[];
}

export function CommandPalette({ posts }: CommandPaletteProps) {
    const [open, setOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };

        const openFromHeader = () => setOpen(true);

        document.addEventListener("keydown", down);
        document.addEventListener("open-command-palette", openFromHeader);

        return () => {
            document.removeEventListener("keydown", down);
            document.removeEventListener("open-command-palette", openFromHeader);
        };
    }, []);

    const runCommand = (command: () => void) => {
        setOpen(false);
        command();
    };

    return (
        <CommandDialog open={open} onOpenChange={setOpen}>
            <CommandInput placeholder="Type a command or search posts..." />
            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Pages">
                    <CommandItem onSelect={() => runCommand(() => router.push("/"))}>
                        <FolderOpen className="mr-2 h-4 w-4" />
                        <span>Home</span>
                    </CommandItem>
                    <CommandItem onSelect={() => runCommand(() => router.push("/blog"))}>
                        <FileText className="mr-2 h-4 w-4" />
                        <span>Blog</span>
                    </CommandItem>
                    <CommandItem onSelect={() => runCommand(() => router.push("/about"))}>
                        <User className="mr-2 h-4 w-4" />
                        <span>About</span>
                    </CommandItem>
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="Blog Posts">
                    {posts.map((post) => (
                        <CommandItem
                            key={post.slug}
                            value={post.title}
                            onSelect={() => runCommand(() => router.push(`/blog/${post.slug}`))}
                        >
                            <FileText className="mr-2 h-4 w-4" />
                            <span>{post.title}</span>
                        </CommandItem>
                    ))}
                </CommandGroup>
            </CommandList>
        </CommandDialog>
    );
}

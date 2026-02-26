import Link from "next/link";
import { Github, Mail, Globe, Heart, ArrowUp } from "lucide-react";

const socialLinks = [
    { href: "https://github.com/iam-neo", icon: Github, label: "GitHub" },
    { href: "mailto:nirmalrokamagar54@gmail.com", icon: Mail, label: "Email" },
    { href: "https://magarnirmal.com.np", icon: Globe, label: "Website" },
];

const quickLinks = [
    { href: "/", label: "Home" },
    { href: "/blog", label: "Blog" },
    { href: "/about", label: "About" },
];

export function Footer() {
    return (
        <footer className="relative mt-20">
            {/* Subtle top border */}
            <div className="h-px bg-border" />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {/* Brand */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold font-serif">Neo Blog</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
                            Messing around internet and web. Sharing thoughts, code snippets,
                            and adventures in the world of web development.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                            Quick Links
                        </h4>
                        <nav className="flex flex-col space-y-2">
                            {quickLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="text-sm text-muted-foreground hover:text-foreground transition-colors w-fit"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* Connect */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                            Connect
                        </h4>
                        <div className="flex gap-3">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center text-muted-foreground hover:text-foreground transition-all"
                                    aria-label={social.label}
                                >
                                    <social.icon className="w-4 h-4" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="mt-12 pt-8 border-t border-border/50">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
                        <p className="flex items-center gap-1">
                            © {new Date().getFullYear()} Nirmal Magar. Built with
                            <Heart className="w-3 h-3 text-editorial-accent fill-editorial-accent mx-1" />
                            and Next.js
                        </p>
                        <a
                            href="#top"
                            className="flex items-center gap-1 hover:text-foreground transition-colors"
                        >
                            Back to top
                            <ArrowUp className="w-3 h-3" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

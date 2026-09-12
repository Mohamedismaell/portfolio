"use client";

import { useState } from "react";
import { Github, Linkedin } from "lucide-react";
import { SiDiscord, SiWhatsapp } from "react-icons/si";

const SOCIAL_LINKS = [
  { href: "https://github.com/Mohamedismaell", icon: Github, label: "GitHub" },
  { href: "https://www.linkedin.com/in/mohamed-ismail-dev", icon: Linkedin, label: "LinkedIn" },
  { href: "https://discord.com/users/406180177261887489", icon: SiDiscord, label: "Discord" },
  { href: "https://wa.me/201026564376", icon: SiWhatsapp, label: "WhatsApp" },
];

export default function Footer() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("mohamed.ismael.dev@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="border-t border-[var(--border-subtle)] bg-[var(--background-secondary)] py-20 px-6">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
        <span className="text-xs font-mono uppercase tracking-widest mb-3" style={{ color: "var(--text-muted)" }}>
          Initiate Contact
        </span>
        <h2 className="font-editorial text-5xl sm:text-7xl text-[var(--text-primary)] mb-6">
          Let&apos;s build something <br />
          <span className="font-editorial-italic">unforgettable.</span>
        </h2>

        {/* Copy Email Pill */}
        <div className="mt-4 mb-10 flex items-center justify-center">
          <button
            onClick={copyEmail}
            className="group cursor-pointer bg-[var(--surface-solid)] border border-[var(--border-subtle)] hover:border-[var(--text-primary)] rounded-full px-5 py-3 shadow-sm hover:shadow flex items-center gap-3 transition-all"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span className="text-sm font-mono font-medium text-[var(--text-primary)]">mohamed.ismael.dev@gmail.com</span>
            <span className="text-xs px-2 py-1 rounded-full transition-colors" style={{ background: "var(--background-secondary)", color: "var(--text-muted)" }}>
              {copied ? "✓ Copied!" : "Copy 📋"}
            </span>
          </button>
        </div>

        {copied && (
          <p className="text-xs font-mono text-emerald-600 mb-4 font-semibold">✓ Copied to clipboard!</p>
        )}

        {/* Social Links */}
        <div className="flex items-center gap-6 text-sm font-medium mb-12" style={{ color: "var(--text-soft)" }}>
          {SOCIAL_LINKS.map(({ href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--text-primary)] transition-colors"
            >
              {label}
            </a>
          ))}
          <a href="mailto:mohamed.ismael.dev@gmail.com" className="hover:text-[var(--text-primary)] transition-colors">
            Direct Mail
          </a>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-[var(--border-subtle)] w-full flex flex-col sm:flex-row items-center justify-between text-xs font-mono gap-4" style={{ color: "var(--text-muted)" }}>
          <div>© {new Date().getFullYear()} Mohamed Ismael. All rights reserved.</div>
          <div>Crafted with Flutter spirit</div>
        </div>
      </div>
    </footer>
  );
}

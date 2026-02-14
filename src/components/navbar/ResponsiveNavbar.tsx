"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Github, Linkedin } from "lucide-react";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import { useParams } from "next/navigation";

export default function ResponsiveNavbar() {
  const [open, setOpen] = useState(false);
  const params = useParams();
  const locale = params?.locale as string || "en";

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#0B0F19]/80 backdrop-blur-lg border-b border-white/10">
      <div className="container flex items-center justify-between py-4">
        <h1 className="text-lg sm:text-xl font-bold">
          Mohamed<span className="text-blue-500">Ismael.dev</span>
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-sm text-gray-300">
          <Link href={`/${locale}#projects`} className="hover:text-blue-400 transition">Projects</Link>
          <Link href={`/${locale}#about`} className="hover:text-blue-400 transition">About</Link>
          <Link href={`/${locale}#contact`} className="hover:text-blue-400 transition">Contact</Link>
          <LanguageSwitcher />
          <a
            href="https://www.linkedin.com/in/mohamed-ismail-dev"
            target="_blank"
            className="text-blue-400 hover:text-blue-300 transition"
          >
            <Linkedin size={20} />
          </a>
        </div>

        {/* Mobile Button */}
        <button
          className="md:hidden p-2 text-white"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-[#0B0F19] border-t border-white/10 absolute w-full left-0 top-[60px] h-screen bg-[#0B0F19]/95 backdrop-blur-xl">
          <div className="flex flex-col items-center gap-8 py-12 text-lg text-gray-300">
            <Link href={`/${locale}#projects`} onClick={() => setOpen(false)} className="hover:text-blue-400">Projects</Link>
            <Link href={`/${locale}#about`} onClick={() => setOpen(false)} className="hover:text-blue-400">About</Link>
            <Link href={`/${locale}#contact`} onClick={() => setOpen(false)} className="hover:text-blue-400">Contact</Link>
            <div className="pt-4 flex flex-col items-center gap-4">
               <LanguageSwitcher />
            </div>
            <div className="flex gap-6 mt-4">
              <a href="https://github.com/Mohamedismaell" target="_blank" className="text-white hover:text-blue-400"><Github size={24} /></a>
              <a href="https://www.linkedin.com/in/mohamed-ismail-dev" target="_blank" className="text-blue-400 hover:text-white"><Linkedin size={24} /></a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

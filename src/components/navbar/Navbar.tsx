"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { Globe } from "lucide-react";

export default function Navbar() {
  const params = useParams();
  const pathname = usePathname();
  const locale = params?.locale as string;

  // Function to toggle language
  const getTogglePath = () => {
    const newLocale = locale === "en" ? "ar" : "en";
    return pathname.replace(`/${locale}`, `/${newLocale}`);
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#0B0F19]/80 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="font-bold text-xl">
          Mohamed<span className="text-blue-500">Ismael.dev</span>
        </h1>

        <div className="flex gap-6 text-sm text-gray-300 items-center">
          <Link href={`/${locale}#projects`} className="hover:text-blue-400 transition">Projects</Link>
          <Link href={`/${locale}#about`} className="hover:text-blue-400 transition">About</Link>
          <Link href={`/${locale}#contact`} className="hover:text-blue-400 transition">Contact</Link>
          
          <Link 
            href={getTogglePath()} 
            className="flex items-center gap-2 px-3 py-1 bg-white/5 hover:bg-white/10 rounded-lg transition border border-white/10"
          >
            <Globe className="w-4 h-4" />
            <span>{locale === "en" ? "العربية" : "English"}</span>
          </Link>

          <a
            href="https://www.linkedin.com/in/mohamed-ismail-dev"
            target="_blank"
            className="hidden md:block text-blue-400 border border-blue-400/30 px-3 py-1 rounded-lg hover:bg-blue-400/10 transition"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </nav>
  );
}

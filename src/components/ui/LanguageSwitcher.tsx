"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const params = useParams();
  const locale = params?.locale as string || "en";

  const getNewPath = (newLocale: string) => {
    // Basic replacement for standard paths
    if (pathname.startsWith(`/${locale}`)) {
      return pathname.replace(`/${locale}`, `/${newLocale}`);
    }
    return `/${newLocale}`;
  };

  return (
    <div className="flex gap-2 text-sm">
      <Link
        href={getNewPath("en")}
        className={`px-3 py-1 rounded-md border border-white/20 transition ${locale === "en" ? "bg-white/10 text-white border-blue-500" : "text-gray-400 hover:border-blue-500 hover:text-white"
          }`}
      >
        EN
      </Link>

    </div>
  );
}

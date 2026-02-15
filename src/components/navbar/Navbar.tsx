// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { Menu, X, Github, Linkedin, Mail, Globe } from "lucide-react";
// import { useParams, usePathname } from "next/navigation";

// export default function ResponsiveNavbar() {
//   const [open, setOpen] = useState(false);
//   const params = useParams();
//   const pathname = usePathname();
//   const locale = (params?.locale as string) || "en";

//   const toggleLang = () => {
//     const newLocale = locale === "en" ? "ar" : "en";
//     return pathname.replace(`/${locale}`, `/${newLocale}`);
//   };

//   return (
//     <nav className="fixed top-0 w-full z-50 backdrop-blur-xl bg-[#0B0F19]/70 border-b border-white/10">
//       <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

//         {/* LOGO */}
//         <h1 className="text-lg md:text-xl font-bold text-white tracking-wide">
//           Mohamed
//           <span className="bg-gradient-to-r from-[#475AD7] to-[#8B5CF6] bg-clip-text text-transparent">
//             Ismael.dev
//           </span>
//         </h1>

//         {/* DESKTOP */}
//         <div className="hidden md:flex items-center gap-8 text-sm text-gray-300">

//           <Link href={`/${locale}#projects`} className="hover:text-white transition">
//             Portfolio
//           </Link>

//           <Link href={`/${locale}#about`} className="hover:text-white transition">
//             About
//           </Link>

//           <Link href={`/${locale}#contact`} className="hover:text-white transition">
//             Contact
//           </Link>

//           {/* Language */}
//           <Link
//             href={toggleLang()}
//             className="flex items-center gap-2 px-3 py-1 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition"
//           >
//             <Globe size={16} />
//             {locale === "en" ? "AR" : "EN"}
//           </Link>

//           {/* Social Icons */}
//           <div className="flex items-center gap-4 ml-2">
//             <a
//               href="https://github.com/Mohamedismaell"
//               target="_blank"
//               className="hover:text-white transition"
//             >
//               <Github size={18} />
//             </a>

//             <a
//               href="https://www.linkedin.com/in/mohamed-ismail-dev"
//               target="_blank"
//               className="hover:text-white transition"
//             >
//               <Linkedin size={18} />
//             </a>

//             <a
//               href="mailto:your@email.com"
//               className="hover:text-white transition"
//             >
//               <Mail size={18} />
//             </a>
//           </div>

//           {/* CTA */}
//           <Link
//             href={`/${locale}#contact`}
//             className="
//               px-4 py-2 rounded-xl text-white font-semibold
//               bg-gradient-to-r from-[#475AD7] to-[#8B5CF6]
//               shadow-[0_0_20px_rgba(139,92,246,0.5)]
//               hover:scale-105 active:scale-95 transition
//             "
//           >
//             Hire Me
//           </Link>
//         </div>

//         {/* MOBILE BUTTON */}
//         <button
//           onClick={() => setOpen(!open)}
//           className="md:hidden text-white"
//         >
//           {open ? <X /> : <Menu />}
//         </button>
//       </div>

//       {/* MOBILE MENU */}
//       {open && (
//         <div className="md:hidden absolute w-full bg-[#0B0F19]/95 backdrop-blur-2xl border-t border-white/10">
//           <div className="flex flex-col items-center gap-8 py-12 text-lg text-gray-300">

//             <Link href={`/${locale}#projects`} onClick={() => setOpen(false)}>
//               Portfolio
//             </Link>

//             <Link href={`/${locale}#about`} onClick={() => setOpen(false)}>
//               About
//             </Link>

//             <Link href={`/${locale}#contact`} onClick={() => setOpen(false)}>
//               Contact
//             </Link>

//             <div className="flex gap-6 mt-4">
//               <a href="https://github.com/Mohamedismaell" target="_blank">
//                 <Github size={24} />
//               </a>
//               <a href="https://www.linkedin.com/in/mohamed-ismail-dev" target="_blank">
//                 <Linkedin size={24} />
//               </a>
//               <a href="mailto:your@email.com">
//                 <Mail size={24} />
//               </a>
//             </div>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// }

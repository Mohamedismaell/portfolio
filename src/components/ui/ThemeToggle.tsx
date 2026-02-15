// "use client";

// import { useEffect, useState } from "react";
// import { Sun, Moon } from "lucide-react";

// export default function ThemeToggle() {
//   const [dark, setDark] = useState(true);

//   useEffect(() => {
//     document.documentElement.classList.toggle("dark", dark);
//   }, [dark]);

//   return (
//     <button
//       onClick={() => setDark(!dark)}
//       className="fixed bottom-6 right-6 p-3 rounded-full bg-white/10 backdrop-blur border border-white/20 hover:scale-110 transition z-50 text-white"
//     >
//       {dark ? <Sun size={18} /> : <Moon size={18} />}
//     </button>
//   );
// }

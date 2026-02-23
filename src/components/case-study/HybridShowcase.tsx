// "use client";

// import Image from "next/image";
// import { motion } from "framer-motion";
// import useEmblaCarousel from "embla-carousel-react";
// import { useState } from "react";

// type Screen = {
//   image: string;
//   title: string;
//   description: string;
// };

// export default function HybridShowcase({
//   title,
//   description,
//   screens,
// }: {
//   title: string;
//   description: string;
//   screens: Screen[];
// }) {
//   const [emblaRef] = useEmblaCarousel({ loop: false, align: "start" });
//   const [activeImage, setActiveImage] = useState<string | null>(null);

//   return (
//     <section className="mb-40">
//       {/* Header */}
//       <div className="max-w-3xl mb-16">
//         <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
//           {title}
//         </h2>
//         <p className="text-gray-400 text-lg leading-relaxed">
//           {description}
//         </p>
//       </div>

//       {/*  DESKTOP GRID  */}
//       <div className="hidden lg:grid grid-cols-2 xl:grid-cols-4 gap-12">
//         {screens.map((screen, index) => (
//           <ScreenCard
//             key={index}
//             screen={screen}
//             index={index}
//             onClick={() => setActiveImage(screen.image)}
//           />
//         ))}
//       </div>

//       {/*  MOBILE CAROUSEL  */}
//       <div className="lg:hidden overflow-hidden" ref={emblaRef}>
//         <div className="flex gap-8">
//           {screens.map((screen, index) => (
//             <div className="min-w-[80%]" key={index}>
//               <ScreenCard
//                 screen={screen}
//                 index={index}
//                 onClick={() => setActiveImage(screen.image)}
//               />
//             </div>
//           ))}
//         </div>
//       </div>

//       {/*  FULLSCREEN MODAL  */}
//       {activeImage && (
//         <div
//           className="fixed inset-0 z-[999] bg-black/90 flex items-center justify-center p-6"
//           onClick={() => setActiveImage(null)}
//         >
//           <div className="relative w-full max-w-md h-[80vh]">
//             <Image
//               src={activeImage}
//               alt="fullscreen"
//               fill
//               className="object-contain"
//             />
//           </div>
//         </div>
//       )}
//     </section>
//   );
// }

// function ScreenCard({
//   screen,
//   index,
//   onClick,
// }: {
//   screen: Screen;
//   index: number;
//   onClick: () => void;
// }) {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 60 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       transition={{ delay: index * 0.12 }}
//       viewport={{ once: true }}
//       className="group cursor-pointer"
//       onClick={onClick}
//     >
//       {/* Image */}
//       <div className="relative w-full h-[540px] flex items-center justify-center mb-6">
//         <Image
//           src={screen.image}
//           alt={screen.title}
//           fill
//           className="object-contain transition-transform duration-500 group-hover:scale-105"
//           sizes="(max-width: 1024px) 80vw, 300px"
//         />
//       </div>

//       {/* Feature Title */}
//       <h3 className="text-xl font-semibold text-white mb-2">
//         {screen.title}
//       </h3>

//       {/* Feature Description */}
//       <p className="text-gray-400 text-sm leading-relaxed">
//         {screen.description}
//       </p>
//     </motion.div>
//   );
// }

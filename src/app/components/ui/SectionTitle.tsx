"use client";

import { motion } from "framer-motion";

interface Props {
    children: React.ReactNode;
    className?: string;
}

export default function SectionTitle({
    children,
    className = "",
}: Props) {
    return (
        <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`
        text-3xl lg:text-5xl font-bold text-center mb-8
        text-white
        ${className}
      `}
        >
            {children}
        </motion.h2>
    );
}

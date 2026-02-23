// components/ui/PrimaryButton.tsx
"use client";
import { GRADIENTS, SHADOWS } from "@/lib/theme";

interface Props {
    children: React.ReactNode;
    onClick?: () => void;
    type?: "button" | "submit";
    disabled?: boolean;
    variant?: "primary" | "ghost";
    className?: string;
}

export default function PrimaryButton({
    children,
    onClick,
    type = "button",
    disabled,
    variant = "primary",
    className = "",
}: Props) {
    const isPrimary = variant === "primary";

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`
        group relative px-6 sm:px-8 py-3 sm:py-3.5
        rounded-xl font-semibold text-sm sm:text-base
        overflow-hidden transition-all duration-300
        hover:scale-105 active:scale-95 disabled:opacity-50
        ${isPrimary ? "text-black" : "text-white/70 hover:text-white backdrop-blur-sm"}
        ${className}
      `}
            style={{
                background: isPrimary ? GRADIENTS.primaryBtn : GRADIENTS.ghostBtn,
                boxShadow: isPrimary ? SHADOWS.primaryBtn : SHADOWS.ghostBtn,
            }}
        >
            {isPrimary && (
                <span
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500"
                    style={{
                        background: "linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 60%)",
                    }}
                />
            )}
            <span className="relative z-10">{children}</span>
        </button>
    );
}

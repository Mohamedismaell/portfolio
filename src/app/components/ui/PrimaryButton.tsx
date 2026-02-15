"use client";

interface Props {
    children: React.ReactNode;
    onClick?: () => void;
    type?: "button" | "submit";
    disabled?: boolean;
    className?: string;
}

export default function PrimaryButton({
    children,
    onClick,
    type = "button",
    disabled,
    className = "",
}: Props) {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`
        group relative
        px-8 py-3
        rounded-xl
        font-semibold
        text-white
        overflow-hidden
        transition-all duration-300
        hover:scale-105
        active:scale-95
        disabled:opacity-60
        ${className}
      `}
            style={{
                background: "linear-gradient(135deg, #475AD7, #8B5CF6)",
                boxShadow: "0 15px 40px rgba(71,90,215,0.45)",
            }}
        >
            {/* Hover Glow */}
            <span
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500"
                style={{
                    background:
                        "linear-gradient(135deg, rgba(255,255,255,0.15), transparent)",
                }}
            />

            <span className="relative z-10">{children}</span>
        </button>
    );
}

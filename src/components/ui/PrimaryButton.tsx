"use client";

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
      className={[
        "group relative inline-flex items-center justify-center",
        "px-6 sm:px-7 py-3 sm:py-3.5",
        "rounded-[16px] text-sm sm:text-base font-semibold",
        "transition-all duration-300",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        isPrimary
          ? "text-[#171411] hover:-translate-y-0.5"
          : "text-[var(--text-soft)] hover:text-[var(--text-primary)] hover:-translate-y-0.5 border",
        className,
      ].join(" ")}
      style={{
        background: isPrimary ? "var(--gradient-primary-btn)" : "var(--gradient-ghost-btn)",
        boxShadow: isPrimary ? "var(--shadow-primary-btn)" : "var(--shadow-ghost-btn)",
        borderColor: isPrimary ? "transparent" : "var(--border-subtle)",
      }}
    >
      <span className="relative z-10">{children}</span>
    </button>
  );
}
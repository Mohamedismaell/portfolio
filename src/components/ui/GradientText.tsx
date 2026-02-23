import { JSX } from "react";

// components/ui/GradientText.tsx
interface Props {
    children: React.ReactNode;
    gradient: string;
    className?: string;
    as?: keyof JSX.IntrinsicElements;
    filter?: string;
}

export default function GradientText({
    children,
    gradient,
    className = "",
    as: Tag = "span",
    filter,
}: Props) {
    return (
        <Tag
            className={className}
            style={{
                background: gradient,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                ...(filter ? { filter } : {}),
            }}
        >
            {children}
        </Tag>
    );
}

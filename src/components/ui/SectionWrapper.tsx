// components/ui/SectionWrapper.tsx
// Wraps every section with the same background + glow decorations
import { GRADIENTS } from "@/lib/theme";

interface Props {
    children: React.ReactNode;
    id?: string;
    className?: string;
    fullHeight?: boolean;
}

export default function SectionWrapper({
    children,
    id,
    className = "",
    fullHeight = false,
}: Props) {
    return (
        <section
            id={id}
            className={`relative overflow-hidden px-4 sm:px-6 ${fullHeight ? "min-h-screen flex items-center" : "py-20 sm:py-28"} ${className}`}
        // style={{
        //     background: GRADIENTS.pageBg,
        //     backgroundAttachment: "fixed",
        //     backgroundSize: "cover",
        //     backgroundRepeat: "no-repeat",
        // }}
        >
            {/* Top-left glow */}
            <div
                className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full pointer-events-none"
                style={{
                    background:
                        "radial-gradient(circle, rgba(255,255,255,0.10) 0%, rgba(200,200,220,0.04) 40%, transparent 70%)",
                }}
            />

            {/* Bottom-right glow */}
            <div
                className="absolute bottom-0 right-0 w-[300px] h-[300px] lg:w-[500px] lg:h-[500px] rounded-full pointer-events-none"
                style={{
                    background:
                        "radial-gradient(circle, rgba(255,255,255,0.07) 0%, rgba(180,180,200,0.03) 50%, transparent 70%)",
                }}
            />

            {/* Diagonal streak */}
            <div
                className="absolute inset-0 pointer-events-none opacity-20"
                style={{ background: GRADIENTS.streak }}
            />

            {/* Content */}
            <div className="relative w-full">{children}</div>
        </section>
    );
}

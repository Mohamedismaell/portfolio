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
            {/* Content */}
            <div className="relative w-full">{children}</div>
        </section>
    );
}

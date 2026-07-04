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
      className={[
        "relative overflow-hidden",
        "px-4 sm:px-6 lg:px-8",
        fullHeight ? "min-h-screen flex items-center pt-28 pb-14" : "py-14 sm:py-20 lg:py-24",
        className,
      ].join(" ")}
    >
      <div className="relative w-full max-w-[1280px] mx-auto">{children}</div>
    </section>
  );
}
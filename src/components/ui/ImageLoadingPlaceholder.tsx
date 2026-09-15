"use client";

export default function ImageLoadingPlaceholder() {
  return (
    <div
      className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden"
      aria-hidden
    >
      <div
        className="absolute inset-0 animate-pulse"
        style={{ background: "var(--background-secondary)" }}
      />
      <div
        className="relative h-8 w-8 animate-spin rounded-full border-2"
        style={{
          borderColor: "var(--border-subtle)",
          borderTopColor: "var(--text-primary)",
        }}
      />
    </div>
  );
}
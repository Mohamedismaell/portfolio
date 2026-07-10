"use client";

import Image from "next/image";
import { BORDERS, GRADIENTS } from "@/lib/theme";

type ImagePhonePreviewProps = {
  src: string;
  alt: string;
  total?: number;
  index?: number;
  onDotClick?: (nextIndex: number) => void;
};

export default function ImagePhonePreview({
  src,
  alt,
  total = 0,
  index = 0,
  onDotClick,
}: ImagePhonePreviewProps) {
  return (
    <div className="flex h-full w-full items-center justify-center px-2 py-2 sm:px-3">
      <div className="relative w-full max-w-[980px]">
        <div className="relative min-h-[320px] w-full sm:min-h-[420px] lg:min-h-[520px]">
          <Image
            src={src}
            alt={alt}
            fill
            priority
            className="object-contain"
            sizes="(max-width: 640px) 92vw, (max-width: 1024px) 80vw, 980px"
          />
        </div>

        {total > 1 ? (
          <div className="mt-3 flex items-center justify-center gap-1.5 sm:mt-4">
            {Array.from({ length: total }).map((_, dotIndex) => {
              const isActive = dotIndex === index;

              return (
                <button
                  key={dotIndex}
                  type="button"
                  onClick={() => onDotClick?.(dotIndex)}
                  aria-label={`Show slide ${dotIndex + 1}`}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: isActive ? "22px" : "6px",
                    height: "6px",
                    background: isActive ? GRADIENTS.primaryBtn : GRADIENTS.badge,
                    border: isActive
                      ? `1px solid ${BORDERS.medium}`
                      : `1px solid ${BORDERS.subtle}`,
                    opacity: isActive ? 1 : 0.6,
                  }}
                />
              );
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
}
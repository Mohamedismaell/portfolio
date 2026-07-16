"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";

type YouTubePhonePreviewProps = {
  url: string;
  title?: string;
};

function getYouTubeVideoId(url: string) {
  try {
    const parsed = new URL(url);
    const hostname = parsed.hostname.replace("www.", "");

    if (hostname === "youtu.be") {
      return parsed.pathname.split("/").filter(Boolean)[0] ?? null;
    }

    if (
      hostname === "youtube.com" ||
      hostname === "m.youtube.com" ||
      hostname === "music.youtube.com"
    ) {
      return parsed.searchParams.get("v");
    }

    return null;
  } catch {
    return null;
  }
}

export default function YouTubePhonePreview({
  url,
  title = "MindTrip live demo",
}: YouTubePhonePreviewProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const videoId = useMemo(() => getYouTubeVideoId(url), [url]);

  const thumbnailUrl = videoId
    ? `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`
    : null;

  const embedUrl = videoId
    ? `https://www.youtube.com/embed/${videoId}?autoplay=1&playsinline=1&rel=0&controls=1`
    : null;

  if (!videoId || !thumbnailUrl || !embedUrl) {
    return null;
  }

  return (
    <div className="absolute inset-0 h-full w-full overflow-hidden bg-black">
      {!isPlaying ? (
        <button
          type="button"
          onClick={() => setIsPlaying(true)}
          aria-label={`Play ${title}`}
          className="group absolute inset-0 h-full w-full overflow-hidden"
        >
          <Image
            src={thumbnailUrl}
            alt={title}
            fill
            unoptimized
            priority
            className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
            sizes="(max-width: 1024px) 100vw, 700px"
          />
{/* <>
  <Image
    src={thumbnailUrl}
    alt=""
    fill
    unoptimized
    aria-hidden="true"
    className="scale-110 object-cover object-center blur-3xl"
    sizes="(max-width: 1024px) 100vw, 700px"
  />

  <div className="absolute inset-0 bg-black/45" />

  <Image
    src={thumbnailUrl}
    alt={title}
    fill
    unoptimized
    priority
    className="object-contain object-center transition-transform duration-700 group-hover:scale-[1.015]"
    sizes="(max-width: 1024px) 100vw, 700px"
  />
</> */}
          <div className="absolute inset-0 bg-black/25 transition-colors duration-300 group-hover:bg-black/10" />

          <div className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-[68px] w-[68px] items-center justify-center rounded-full bg-[#EF9D57] text-white shadow-2xl transition-transform duration-300 group-hover:scale-110 sm:h-[76px] sm:w-[76px]">
              <Play size={27} fill="currentColor" className="ml-1" />
            </span>
          </div>
        </button>
      ) : (
        <iframe
          src={embedUrl}
          title={title}
          className="absolute inset-0 h-full w-full border-0 bg-black"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      )}
    </div>
  );
}
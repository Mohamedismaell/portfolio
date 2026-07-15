"use client";

import { useEffect, useRef, useState, type ChangeEvent } from "react";
import {
  LoaderCircle,
  Pause,
  Play,
  RotateCcw,
  RotateCw,
} from "lucide-react";
import PhoneFrame from "./PhoneFrame";

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  return `${mins}:${secs}`;
}

type VideoPhonePreviewProps = {
  src: string;
  loop?: boolean;
  onEnded?: () => void;
};

export default function VideoPhonePreview({
  src,
  loop = false,
  onEnded,
}: VideoPhonePreviewProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    setCurrentTime(0);
    setDuration(0);
    setIsPlaying(true);
    setIsLoading(true);
    el.currentTime = 0;

    const playPromise = el.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => setIsPlaying(false));
    }
  }, [src]);

  const togglePlay = () => {
    const el = videoRef.current;
    if (!el) return;

    if (el.paused) {
      const playPromise = el.play();
      if (playPromise !== undefined) {
        playPromise.then(() => setIsPlaying(true)).catch(() => {});
      } else {
        setIsPlaying(true);
      }
    } else {
      el.pause();
      setIsPlaying(false);
    }
  };

  const skip = (seconds: number) => {
    const el = videoRef.current;
    if (!el) return;

    el.currentTime = Math.min(
      Math.max(el.currentTime + seconds, 0),
      el.duration || 0
    );

    if (!isSeeking) {
      setCurrentTime(el.currentTime);
    }
  };

  const handleSeekChange = (e: ChangeEvent<HTMLInputElement>) => {
    const el = videoRef.current;
    if (!el) return;

    const value = Number(e.target.value);
    setCurrentTime(value);
    el.currentTime = value;
  };

  const handleSeekStart = () => setIsSeeking(true);
  const handleSeekEnd = () => setIsSeeking(false);

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="flex w-full flex-col items-center gap-3">
      <div className="relative mx-auto w-full max-w-[340px] sm:max-w-[380px] lg:max-w-[300px] xl:max-w-[320px]">
        <PhoneFrame>
          <video
            ref={videoRef}
            src={src}
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop={loop}
            playsInline
            preload="metadata"
            controls={false}
            onEnded={onEnded}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onLoadStart={() => setIsLoading(true)}
            onLoadedData={() => setIsLoading(false)}
            onCanPlay={() => setIsLoading(false)}
            onWaiting={() => setIsLoading(true)}
            onPlaying={() => setIsLoading(false)}
            onLoadedMetadata={(e) =>
              setDuration(e.currentTarget.duration || 0)
            }
            onTimeUpdate={(e) => {
              if (!isSeeking) {
                setCurrentTime(e.currentTarget.currentTime);
              }
            }}
          />

          {isLoading ? (
            <div
              className="absolute inset-0 z-10 flex items-center justify-center"
              style={{
                background:
                  "linear-gradient(180deg, rgba(10,10,12,0.22), rgba(10,10,12,0.38))",
                backdropFilter: "blur(6px)",
                WebkitBackdropFilter: "blur(6px)",
              }}
            >
              <div className="flex flex-col items-center gap-3">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-full"
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.16)",
                  }}
                >
                  <LoaderCircle
                    size={20}
                    className="animate-spin"
                    style={{ color: "#EF9D57" }}
                  />
                </div>

                <span className="text-[11px] font-[700] uppercase tracking-[0.08em] text-white/80">
                  Loading video
                </span>
              </div>
            </div>
          ) : null}
        </PhoneFrame>
      </div>

      <div
        className="w-full max-w-[300px] rounded-2xl border p-3 sm:max-w-[340px] lg:max-w-[280px] xl:max-w-[300px]"
        style={{
          background: "rgba(18, 19, 23, 0.72)",
          borderColor: "rgba(255, 255, 255, 0.08)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
        }}
      >
        <input
          type="range"
          min={0}
          max={duration || 0}
          step={0.1}
          value={currentTime}
          onMouseDown={handleSeekStart}
          onTouchStart={handleSeekStart}
          onChange={handleSeekChange}
          onMouseUp={handleSeekEnd}
          onTouchEnd={handleSeekEnd}
          onTouchCancel={handleSeekEnd}
          className="h-1.5 w-full cursor-pointer appearance-none rounded-full"
          style={{
            background: `linear-gradient(to right, #EF9D57 ${progressPercent}%, rgba(255,255,255,0.12) ${progressPercent}%)`,
          }}
        />

        <div className="mt-2 flex items-center justify-between gap-2">
          <span className="min-w-[34px] text-left text-[10px] font-mono font-medium tracking-tight text-white/50">
            {formatTime(currentTime)}
          </span>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => skip(-5)}
              aria-label="Rewind 5 seconds"
              className="flex h-8 w-8 items-center justify-center rounded-full text-white/70 transition-colors hover:text-white active:scale-95"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <RotateCcw size={13} />
            </button>

            <button
              type="button"
              onClick={togglePlay}
              aria-label={isPlaying ? "Pause" : "Play"}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-[#EF9D57] text-white shadow transition-transform hover:scale-105 active:scale-90"
            >
              {isPlaying ? (
                <Pause size={12} fill="currentColor" />
              ) : (
                <Play size={12} fill="currentColor" className="ml-[1px]" />
              )}
            </button>

            <button
              type="button"
              onClick={() => skip(5)}
              aria-label="Forward 5 seconds"
              className="flex h-8 w-8 items-center justify-center rounded-full text-white/70 transition-colors hover:text-white active:scale-95"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <RotateCw size={13} />
            </button>
          </div>

          <span className="min-w-[34px] text-right text-[10px] font-mono font-medium tracking-tight text-white/50">
            {formatTime(duration)}
          </span>
        </div>
      </div>
    </div>
  );
}
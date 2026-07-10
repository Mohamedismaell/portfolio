"use client";

import type { ReactNode } from "react";

export default function PhoneFrame({ children }: { children: ReactNode }) {
  const shellInset = "clamp(4px, 0.7vw, 6px)";
  const innerInset = "clamp(6px, 1vw, 8px)";
  const shellRadius = "clamp(30px, 4.2vw, 42px)";
  const screenRadius = "clamp(26px, 3.6vw, 36px)";
  const islandTop = "clamp(7px, 1vw, 10px)";
  const islandHeight = "clamp(14px, 2vw, 18px)";
  const islandWidth = "min(30%, 108px)";

  return (
    <div className="flex h-full w-full items-center justify-center px-2 py-2 sm:px-3">
      <div
        className="relative shrink-0"
        style={{
          width: "min(100%, clamp(240px, 32vw, 390px))",
          aspectRatio: "9 / 19.5",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            borderRadius: shellRadius,
            background:
              "linear-gradient(180deg, #20242b 0%, #0d1015 22%, #090b0f 55%, #151922 100%)",
            border: "1px solid rgba(255,255,255,0.10)",
            boxShadow:
              "0 24px 60px rgba(0,0,0,0.50), inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -1px 0 rgba(255,255,255,0.03)",
          }}
        />

        <div
          className="absolute"
          style={{
            inset: shellInset,
            borderRadius: `calc(${shellRadius} - 4px)`,
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.015) 16%, rgba(0,0,0,0.14) 100%)",
            boxShadow:
              "inset 0 0 0 1px rgba(255,255,255,0.05), inset 0 -10px 24px rgba(0,0,0,0.22)",
          }}
        />

        <div
          className="absolute overflow-hidden bg-black"
          style={{
            inset: innerInset,
            borderRadius: screenRadius,
            boxShadow:
              "inset 0 0 0 1px rgba(255,255,255,0.03), 0 0 0 1px rgba(0,0,0,0.45)",
          }}
        >
          <div className="absolute inset-0">{children}</div>

          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.045) 0%, rgba(255,255,255,0.015) 8%, rgba(255,255,255,0) 20%)",
            }}
          />

          <div
            className="pointer-events-none absolute left-1/2 z-20 -translate-x-1/2"
            style={{
              top: islandTop,
              width: islandWidth,
              height: islandHeight,
              borderRadius: "999px",
              background:
                "linear-gradient(180deg, #050608 0%, #11141a 55%, #050608 100%)",
              boxShadow:
                "inset 0 1px 1px rgba(255,255,255,0.05), 0 1px 2px rgba(0,0,0,0.35)",
            }}
          >
            <div
              className="absolute left-[22%] top-1/2 -translate-y-1/2 rounded-full"
              style={{
                width: "clamp(5px, 0.9vw, 7px)",
                height: "clamp(5px, 0.9vw, 7px)",
                background: "rgba(22, 26, 34, 0.95)",
                boxShadow:
                  "inset 0 0 0 1px rgba(255,255,255,0.03), 0 0 0 1px rgba(0,0,0,0.45)",
              }}
            />
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                width: "clamp(18px, 4vw, 28px)",
                height: "clamp(3px, 0.6vw, 4px)",
                background: "rgba(255,255,255,0.10)",
              }}
            />
          </div>
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute"
          style={{
            right: "-2px",
            top: "18%",
            width: "2px",
            height: "13%",
            borderRadius: "999px",
            background:
              "linear-gradient(180deg, rgba(120,128,143,0.85) 0%, rgba(56,61,71,0.95) 100%)",
          }}
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute"
          style={{
            left: "-2px",
            top: "16%",
            width: "2px",
            height: "7%",
            borderRadius: "999px",
            background:
              "linear-gradient(180deg, rgba(120,128,143,0.85) 0%, rgba(56,61,71,0.95) 100%)",
          }}
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute"
          style={{
            left: "-2px",
            top: "25%",
            width: "2px",
            height: "11%",
            borderRadius: "999px",
            background:
              "linear-gradient(180deg, rgba(120,128,143,0.85) 0%, rgba(56,61,71,0.95) 100%)",
          }}
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 -translate-x-1/2"
          style={{
            bottom: "1.1%",
            width: "28%",
            height: "0.45%",
            minHeight: "3px",
            borderRadius: "999px",
            background: "rgba(255,255,255,0.08)",
          }}
        />
      </div>
    </div>
  );
}
"use client";

import { motion, AnimatePresence, Variants } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { ChevronDown, X, Send } from "lucide-react";
import { toast } from "sonner";

import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionBadge from "@/components/ui/SectionBadge";
import SectionDivider from "@/components/ui/SectionDivider";
import GradientText from "@/components/ui/GradientText";
import { GRADIENTS, BORDERS, TEXT, SHADOWS } from "@/lib/theme";

// ── Animation variants ────────────────────────────────────
const fieldVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.45, ease: "easeOut" },
  }),
};

// ── Shared input style ────────────────────────────────────
const inputClass =
  "w-full px-4 sm:px-5 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl text-sm sm:text-base text-white placeholder:text-white/25 outline-none focus:ring-1 transition-all duration-200";

const inputStyle = {
  background: "rgba(255,255,255,0.04)",
  border: `1px solid ${BORDERS.subtle}`,
};

const inputFocusStyle = {
  background: "rgba(255,255,255,0.06)",
  borderColor: "rgba(255,255,255,0.18)",
};

// ── Services list ─────────────────────────────────────────
const SERVICES = [
  "Flutter App Development",
  "Cross-Platform Mobile Apps",
  "UI Implementation from Figma",
  "Clean Architecture Setup",
  "State Management (Bloc / Cubit)",
  "API Integration",
  "Performance Optimization",
  "Bug Fixing & Refactoring",
  "App Deployment (Play Store / App Store)",
  "Technical Consultation",
  "Other",
];

// ─────────────────────────────────────────────────────────

export default function HireSection() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const wrapperRef = useRef<HTMLDivElement>(null);

  const filteredServices = SERVICES.filter(
    (s) =>
      s.toLowerCase().includes(query.toLowerCase()) && !selected.includes(s)
  );

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      setHighlightedIndex((p) => Math.min(p + 1, filteredServices.length - 1));
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((p) => Math.max(p - 1, 0));
    }
    if (e.key === "Enter") {
      e.preventDefault();
      if (filteredServices[highlightedIndex]) {
        setSelected((p) => [...p, filteredServices[highlightedIndex]]);
        setQuery("");
        setOpen(false);
        setHighlightedIndex(0);
      }
    }
    if (e.key === "Escape") setOpen(false);
  };

  const removeService = (service: string) =>
    setSelected((p) => p.filter((s) => s !== service));

  // ── Submit → /api/contact ─────────────────────────────
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const fd = new FormData(e.currentTarget);
    const message = String(fd.get("message") ?? "").trim();
    const name = String(fd.get("name") ?? "").trim();

    // ✅ Client-side guards — instant feedback, no API call wasted
    if (name.length < 2) {
      toast.error("Name must be at least 2 characters.");
      return;
    }
    if (message.length < 5) {
      toast.error("Message is too short. Please describe your project.");
      return;
    }
    if (selected.length === 0) {
      toast.error("Please select at least one service.");
      return;
    }

    setStatus("sending");

    const body = {
      name,
      email: String(fd.get("email") ?? "").trim(),
      phone: String(fd.get("phone") ?? "").trim(),
      services: selected.join(", "),
      message,
      website: String(fd.get("website") ?? ""),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Request failed");
      }

      toast.success("Message sent! I'll get back to you soon.");
      (e.target as HTMLFormElement).reset();
      setSelected([]);
      setStatus("sent");
      setTimeout(() => setStatus("idle"), 3000);
    } catch (err: any) {
      console.error("Contact error:", err);
      toast.error(err.message || "Something went wrong. Please try again.");
      setStatus("idle");
    }
  };


  return (
    <SectionWrapper id="contact">
      <div className="max-w-3xl mx-auto">

        {/* ── Header ── */}
        <div className="flex flex-col items-center text-center mb-12 sm:mb-16">
          <SectionBadge label="Get In Touch" />

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter leading-none mb-4"
          >
            <GradientText gradient={GRADIENTS.heading} filter={SHADOWS.heading}>
              Let's Work Together
            </GradientText>
          </motion.h2>

          <SectionDivider delay={0.3} className="w-24 mb-5 mx-auto" />

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35 }}
            className="text-sm sm:text-base max-w-xl leading-relaxed"
            style={{ color: TEXT.dim }}
          >
            Select your required services and describe your project. I'll
            respond within 24 hours.
          </motion.p>
        </div>

        {/* ── Form card ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.2 }}
          className="relative rounded-2xl sm:rounded-[28px] p-6 sm:p-10"
          style={{
            background: "rgba(255,255,255,0.03)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: `1px solid ${BORDERS.subtle}`,
            boxShadow: SHADOWS.card,
          }}
        >
          {/* Ambient glow */}
          <div
            className="absolute inset-0 rounded-2xl sm:rounded-[28px] opacity-20 pointer-events-none"
            style={{
              background: `radial-gradient(circle at 30% 20%, rgba(255,255,255,0.06), transparent 60%)`,
            }}
          />

          <form onSubmit={handleSubmit} className="relative space-y-4 sm:space-y-5">

            {/* Honeypot — hidden from real users */}
            <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />

            {/* Name + Email */}
            <motion.div
              custom={0}
              variants={fieldVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5"
            >
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                required
                onFocus={() => setFocusedField("name")}
                onBlur={() => setFocusedField(null)}
                className={inputClass}
                style={focusedField === "name" ? inputFocusStyle : inputStyle}
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                required
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
                className={inputClass}
                style={focusedField === "email" ? inputFocusStyle : inputStyle}
              />
            </motion.div>

            {/* Phone */}
            <motion.div
              custom={1}
              variants={fieldVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <input
                type="tel"
                name="phone"
                placeholder="Phone (Optional)"
                onFocus={() => setFocusedField("phone")}
                onBlur={() => setFocusedField(null)}
                className={inputClass}
                style={focusedField === "phone" ? inputFocusStyle : inputStyle}
              />
            </motion.div>

            {/* Multi-select services */}
            <motion.div
              custom={2}
              variants={fieldVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              ref={wrapperRef}
              className="relative"
            >
              <div
                className="flex flex-wrap items-center gap-2 px-4 py-3 rounded-xl sm:rounded-2xl cursor-text transition-all duration-200"
                style={open ? inputFocusStyle : inputStyle}
                onClick={() => setOpen(true)}
              >
                {/* Selected tags */}
                {selected.map((item) => (
                  <span
                    key={item}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] sm:text-xs font-medium"
                    style={{
                      background: "rgba(255,255,255,0.1)",
                      border: `1px solid ${BORDERS.medium}`,
                      color: "rgba(255,255,255,0.85)",
                    }}
                  >
                    {item}
                    <X
                      size={12}
                      className="cursor-pointer hover:text-white transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeService(item);
                      }}
                    />
                  </span>
                ))}

                {/* Search input */}
                <input
                  type="text"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setOpen(true);
                    setHighlightedIndex(0);
                  }}
                  onKeyDown={handleKeyDown}
                  onFocus={() => setOpen(true)}
                  placeholder={selected.length === 0 ? "Select services..." : ""}
                  className="flex-1 bg-transparent outline-none text-sm text-white placeholder:text-white/25 min-w-[100px]"
                />

                <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown size={16} style={{ color: TEXT.muted }} />
                </motion.div>
              </div>

              {/* Dropdown */}
              <AnimatePresence>
                {open && filteredServices.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.18 }}
                    className="absolute mt-2 w-full rounded-xl sm:rounded-2xl overflow-hidden z-30 max-h-52 overflow-y-auto"
                    style={{
                      background: "rgba(15,15,20,0.95)",
                      backdropFilter: "blur(20px)",
                      border: `1px solid ${BORDERS.subtle}`,
                      boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
                    }}
                  >
                    {filteredServices.map((item, i) => (
                      <div
                        key={item}
                        onClick={() => {
                          setSelected((p) => [...p, item]);
                          setQuery("");
                          setOpen(false);
                          setHighlightedIndex(0);
                        }}
                        className="px-4 sm:px-5 py-2.5 sm:py-3 cursor-pointer text-sm transition-colors duration-150"
                        style={{
                          color: i === highlightedIndex
                            ? "rgba(255,255,255,0.95)"
                            : "rgba(255,255,255,0.6)",
                          background: i === highlightedIndex
                            ? "rgba(255,255,255,0.07)"
                            : "transparent",
                        }}
                        onMouseEnter={() => setHighlightedIndex(i)}
                      >
                        {item}
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Message */}
            <motion.div
              custom={3}
              variants={fieldVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <textarea
                name="message"
                rows={5}
                placeholder="Tell me about your project..."
                required
                onFocus={() => setFocusedField("message")}
                onBlur={() => setFocusedField(null)}
                className={`${inputClass} resize-none`}
                style={focusedField === "message" ? inputFocusStyle : inputStyle}
              />
            </motion.div>

            {/* Submit */}
            <motion.div
              custom={4}
              variants={fieldVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="pt-1"
            >
              <button
                type="submit"
                disabled={status === "sending" || status === "sent"}
                className="group relative w-full flex items-center justify-center gap-2.5 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl text-sm sm:text-base font-semibold transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed hover:scale-[1.01] active:scale-[0.99]"
                style={{
                  background:
                    status === "sent"
                      ? "rgba(255,255,255,0.08)"
                      : "rgba(255,255,255,0.09)",
                  border: `1px solid ${BORDERS.medium}`,
                  color:
                    status === "sent"
                      ? "rgba(255,255,255,0.5)"
                      : "rgba(255,255,255,0.85)",
                  boxShadow:
                    status !== "sent"
                      ? "0 8px 30px rgba(255,255,255,0.05)"
                      : "none",
                }}
              >
                {/* Hover overlay */}
                <span
                  className="absolute inset-0 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ background: "rgba(255,255,255,0.04)" }}
                />

                {status === "sending" && (
                  <svg
                    className="animate-spin h-4 w-4 relative z-10"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                )}

                {status !== "sending" && (
                  <Send
                    size={15}
                    className={`relative z-10 transition-transform duration-300 ${status === "idle" ? "group-hover:translate-x-0.5 group-hover:-translate-y-0.5" : ""}`}
                  />
                )}

                <span className="relative z-10">
                  {status === "sending"
                    ? "Sending..."
                    : status === "sent"
                      ? "Message Sent ✓"
                      : "Send Message"}
                </span>
              </button>
            </motion.div>

          </form>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}

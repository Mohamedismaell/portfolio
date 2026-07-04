"use client";

import { motion, AnimatePresence, Variants } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { ChevronDown, X, Send, BriefcaseBusiness } from "lucide-react";
import { toast } from "sonner";
import SectionWrapper from "@/components/ui/SectionWrapper";

const fieldVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.45, ease: "easeOut" },
  }),
};

const SERVICES = [
  "Flutter App Development",
  "Cross-Platform Mobile Apps",
  "UI Implementation from Figma",
  "Clean Architecture Setup",
  "State Management (Bloc / Cubit)",
  "API Integration",
  "Performance Optimization",
  "Bug Fixing / Refactoring",
  "App Deployment (Play Store / App Store)",
  "Technical Consultation",
  "Other",
];

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
      s.toLowerCase().includes(query.toLowerCase()) && !selected.includes(s),
  );

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
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

    if (e.key === "Escape") {
      setOpen(false);
    }
  };

  const removeService = (service: string) => {
    setSelected((p) => p.filter((s) => s !== service));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") ?? "").trim();
    const message = String(fd.get("message") ?? "").trim();

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

  const baseInputStyle: React.CSSProperties = {
    background: "#fffaf4",
    border: "1px solid rgba(231, 212, 188, 0.76)",
    color: "#2f271f",
    boxShadow: "0 6px 16px rgba(32,24,14,0.02)",
  };

  const focusInputStyle: React.CSSProperties = {
    background: "#ffffff",
    border: "1px solid rgba(239, 157, 87, 0.65)",
    color: "#2f271f",
    boxShadow: "0 0 0 4px rgba(239,157,87,0.10)",
  };

  return (
    <SectionWrapper id="contact" className="pb-12 sm:pb-16 lg:pb-20">
      <div className="mx-auto max-w-[1240px]">
        <div
          className="rounded-[30px] px-4 py-4 sm:px-5 sm:py-5 lg:px-6 lg:py-6"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,248,238,0.96) 0%, rgba(255,252,247,0.90) 100%)",
            border: "1px solid rgba(234, 216, 194, 0.78)",
            boxShadow: "0 18px 40px rgba(32,24,14,0.045)",
          }}
        >
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-[380px_minmax(0,1fr)] lg:gap-6">
            <div
              className="rounded-[24px] p-5 sm:p-6"
              style={{
                background: "#fffaf4",
                border: "1px solid rgba(231, 212, 188, 0.76)",
                boxShadow: "0 8px 18px rgba(32,24,14,0.028)",
              }}
            >
              <p
                className="text-[11px] sm:text-[12px] font-[800] uppercase tracking-[0.1em]"
                style={{ color: "#ef9d57" }}
              >
                Hire Me
              </p>

              <h2
                className="mt-2 text-[2rem] sm:text-[2.3rem] lg:text-[2.5rem] font-[800] leading-[0.98] tracking-[-0.06em]"
                style={{ color: "var(--text-primary)" }}
              >
                Let’s build your next product
              </h2>

              <div className="mt-5 flex flex-col items-start gap-4 sm:flex-row">
                {" "}
                <span
                  className="mt-0.5 flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px]"
                  style={{
                    background:
                      "linear-gradient(180deg, #f7be84 0%, #ef9d57 100%)",
                    color: "#fffaf4",
                    boxShadow: "0 10px 18px rgba(239,157,87,0.16)",
                  }}
                >
                  <BriefcaseBusiness size={22} strokeWidth={2.2} />
                </span>
                <div className="min-w-0">
                  <p
                    className="text-[15px] sm:text-[16px] leading-[1.75]"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    Share your idea, app goals, or product needs. I can help
                    with Flutter apps, architecture, UI implementation, API
                    integration, optimization, and deployment.
                  </p>
                </div>
              </div>

              <div
                className="mt-6 rounded-[20px] p-5"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.65) 0%, rgba(255,250,244,0.95) 100%)",
                  border: "1px solid rgba(231, 212, 188, 0.72)",
                }}
              >
                <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:items-start sm:text-left">
                  {" "}
                  <div
                    className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full sm:h-20 sm:w-20"
                    style={{
                      border: "2px solid rgba(239, 157, 87, 0.55)",
                      background: "#f6ecdf",
                      boxShadow: "0 10px 22px rgba(239,157,87,0.16)",
                    }}
                  >
                    <img
                      src="/projects/news/cover.png"
                      alt="Mohamed Ismael"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <h3
                      className="text-[18px] sm:text-[19px] font-[800] leading-tight"
                      style={{ color: "var(--text-primary)" }}
                    >
                      Mohamed Ismael
                    </h3>

                    <p
                      className="mt-1 text-[13px] font-[700]"
                      style={{ color: "#ef9d57" }}
                    >
                      Flutter Developer
                    </p>

                    <p
                      className="mt-2 text-[13.5px] leading-[1.7]"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      I build polished, scalable apps with smooth UX, clean
                      architecture, and production-ready code.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.12 }}
              className="rounded-[24px] p-4 sm:p-5 lg:p-5"
              style={{
                background: "rgba(255,255,255,0.52)",
                border: "1px solid rgba(231, 212, 188, 0.78)",
                boxShadow: "0 12px 30px rgba(32,24,14,0.03)",
              }}
            >
              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                <input
                  type="text"
                  name="website"
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                <motion.div
                  custom={0}
                  variants={fieldVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                >
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    required
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                    className="w-full rounded-[16px] px-4 py-3.5 text-sm outline-none transition-all placeholder:text-[#9a8c7c]"
                    style={
                      focusedField === "name" ? focusInputStyle : baseInputStyle
                    }
                  />

                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    required
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    className="w-full rounded-[16px] px-4 py-3.5 text-sm outline-none transition-all placeholder:text-[#9a8c7c]"
                    style={
                      focusedField === "email"
                        ? focusInputStyle
                        : baseInputStyle
                    }
                  />
                </motion.div>

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
                    className="w-full rounded-[16px] px-4 py-3.5 text-sm outline-none transition-all placeholder:text-[#9a8c7c]"
                    style={
                      focusedField === "phone"
                        ? focusInputStyle
                        : baseInputStyle
                    }
                  />
                </motion.div>

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
                    className="flex flex-wrap items-center gap-2 rounded-[16px] px-4 py-3 cursor-text transition-all"
                    style={open ? focusInputStyle : baseInputStyle}
                    onClick={() => setOpen(true)}
                  >
                    {selected.map((item) => (
                      <span
                        key={item}
                        className="flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-[700]"
                        style={{
                          background: "rgba(239,157,87,0.10)",
                          border: "1px solid rgba(239,157,87,0.18)",
                          color: "#8f5a2a",
                        }}
                      >
                        {item}
                        <X
                          size={12}
                          className="cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeService(item);
                          }}
                        />
                      </span>
                    ))}

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
                      placeholder={
                        selected.length === 0 ? "Select services..." : ""
                      }
                      className="min-w-[120px] flex-1 bg-transparent text-sm outline-none placeholder:text-[#9a8c7c]"
                    />

                    <motion.div
                      animate={{ rotate: open ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown size={16} style={{ color: "#8f7d69" }} />
                    </motion.div>
                  </div>

                  <AnimatePresence>
                    {open && filteredServices.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.18 }}
                        className="absolute z-30 mt-2 max-h-52 w-full overflow-y-auto rounded-[18px]"
                        style={{
                          background: "#fffdf9",
                          border: "1px solid rgba(231, 212, 188, 0.76)",
                          boxShadow: "0 20px 50px rgba(32,24,14,0.08)",
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
                            onMouseEnter={() => setHighlightedIndex(i)}
                            className="cursor-pointer px-4 py-3 text-sm transition-colors"
                            style={{
                              color:
                                i === highlightedIndex ? "#2f271f" : "#6e5e4f",
                              background:
                                i === highlightedIndex
                                  ? "rgba(239,157,87,0.08)"
                                  : "transparent",
                            }}
                          >
                            {item}
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

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
                    className="w-full resize-none rounded-[16px] px-4 py-3.5 text-sm outline-none transition-all placeholder:text-[#9a8c7c]"
                    style={
                      focusedField === "message"
                        ? focusInputStyle
                        : baseInputStyle
                    }
                  />
                </motion.div>

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
                    className="group relative flex w-full items-center justify-center gap-2.5 rounded-[16px] py-3.5 text-sm font-[700] transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-60"
                    style={{
                      background:
                        status === "sent"
                          ? "rgba(239,157,87,0.12)"
                          : "linear-gradient(180deg, #f7be84 0%, #ef9d57 100%)",
                      border: "1px solid rgba(231, 212, 188, 0.4)",
                      color: status === "sent" ? "#8f5a2a" : "#fffaf4",
                      boxShadow:
                        status !== "sent"
                          ? "0 12px 22px rgba(239,157,87,0.18)"
                          : "none",
                    }}
                  >
                    {status === "sending" ? (
                      <svg
                        className="h-4 w-4 animate-spin"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8H4z"
                        />
                      </svg>
                    ) : (
                      <Send
                        size={15}
                        className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    )}

                    <span>
                      {status === "sending"
                        ? "Sending..."
                        : status === "sent"
                          ? "Message Sent"
                          : "Send Message"}
                    </span>
                  </button>
                </motion.div>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

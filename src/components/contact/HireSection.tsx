"use client";

import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
  useState,
  useEffect,
  useRef,
  type CSSProperties,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import { ChevronDown, X, Send, BriefcaseBusiness } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { BORDERS, TEXT, GRADIENTS, SHADOWS } from "@/lib/theme";

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

const WEB3FORMS_ACCESS_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "";
  
const inputClass =
  "w-full rounded-[16px] px-4 py-4 text-sm outline-none transition-all placeholder:text-[var(--text-secondary)] sm:text-[14px]";

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

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      setHighlightedIndex((p) =>
        Math.min(p + 1, filteredServices.length - 1),
      );
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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!WEB3FORMS_ACCESS_KEY || WEB3FORMS_ACCESS_KEY === "PASTE_YOUR_KEY_HERE") {
      toast.error("Add your Web3Forms access key first.");
      return;
    }

    const form = e.currentTarget;
    const fd = new FormData(form);

    const name = String(fd.get("name") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const phone = String(fd.get("phone") ?? "").trim();
    const message = String(fd.get("message") ?? "").trim();
    const botcheck = fd.get("botcheck");

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
      access_key: WEB3FORMS_ACCESS_KEY,
      subject: "New Portfolio Contact",
      from_name: name,
      name,
      email,
      phone,
      services: selected.join(", "),
      message,
      botcheck: botcheck ? "true" : "",
    };

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(body),
      });

      const result = await res.json();

      if (!res.ok || !result.success) {
        throw new Error(result.message || "Failed to send message");
      }

      toast.success("Message sent! I'll get back to you soon.");
      form.reset();
      setSelected([]);
      setQuery("");
      setOpen(false);
      setHighlightedIndex(0);
      setStatus("sent");
      setTimeout(() => setStatus("idle"), 3000);
    } catch (err: any) {
      console.error("Contact error:", err);
      toast.error(err.message || "Something went wrong. Please try again.");
      setStatus("idle");
    }
  };

  const baseInputStyle: CSSProperties = {
    background: GRADIENTS.ghostBtn,
    border: `1px solid ${BORDERS.subtle}`,
    color: TEXT.primary,
    boxShadow: SHADOWS.ghostBtn,
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
  };

  const focusInputStyle: CSSProperties = {
    background: GRADIENTS.cardBg,
    border: `1px solid ${BORDERS.strong}`,
    color: TEXT.primary,
    boxShadow: SHADOWS.card,
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
  };

  return (
    <SectionWrapper id="contact" className="pb-12 sm:pb-16 lg:pb-20">
      <div className="mx-auto max-w-[1240px]">
        <div
          className="rounded-[30px] px-4 py-4 sm:px-5 sm:py-5 lg:px-6 lg:py-6"
          style={{
            background: GRADIENTS.solidCard,
            border: `1px solid ${BORDERS.subtle}`,
            boxShadow: SHADOWS.card,
          }}
        >
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(340px,0.9fr)_minmax(520px,1.1fr)] lg:gap-6 xl:grid-cols-[minmax(360px,0.88fr)_minmax(580px,1.12fr)]">
            <div
              className="rounded-[24px] p-5 sm:p-6"
              style={{
                background: GRADIENTS.cardBg,
                border: `1px solid ${BORDERS.subtle}`,
                boxShadow: SHADOWS.card,
              }}
            >
              <p
                className="text-[11px] font-[800] uppercase tracking-[0.1em] sm:text-[12px]"
                style={{ color: TEXT.badge }}
              >
                Hire Me
              </p>

              <h2
                className="mt-2 text-[2rem] font-[800] leading-[0.98] tracking-[-0.06em] sm:text-[2.3rem] lg:text-[2.5rem]"
                style={{ color: TEXT.primary }}
              >
                Let&apos;s build your next product
              </h2>

              <div className="mt-5 flex flex-col items-start gap-4 sm:flex-row">
                <span
                  className="mt-0.5 flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px]"
                  style={{
                    background: GRADIENTS.primaryBtn,
                    color: TEXT.inverse,
                    boxShadow: SHADOWS.primaryBtn,
                  }}
                >
                  <BriefcaseBusiness size={22} strokeWidth={2.2} />
                </span>

                <div className="min-w-0">
                  <p
                    className="text-[15px] leading-[1.75] sm:text-[16px]"
                    style={{ color: TEXT.soft }}
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
                  background: GRADIENTS.ghostBtn,
                  border: `1px solid ${BORDERS.subtle}`,
                  boxShadow: SHADOWS.ghostBtn,
                }}
              >
                <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:items-start sm:text-left">
                  <div
                    className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full sm:h-20 sm:w-20"
                    style={{
                      border: `2px solid ${BORDERS.medium}`,
                      background: GRADIENTS.badge,
                      boxShadow: SHADOWS.ghostBtn,
                    }}
                  >
                    <Image
                      src="/person_profile.jpg"
                      alt="Mohamed Ismael"
                      fill
                      sizes="(max-width: 640px) 96px, 80px"
                      className="object-cover object-top"
                    />
                  </div>

                  <div className="min-w-0">
                    <h3
                      className="text-[18px] font-[800] leading-tight sm:text-[19px]"
                      style={{ color: TEXT.primary }}
                    >
                      Mohamed Ismael
                    </h3>

                    <p
                      className="mt-1 text-[13px] font-[700]"
                      style={{ color: TEXT.badge }}
                    >
                      Flutter Developer
                    </p>

                    <p
                      className="mt-2 text-[13.5px] leading-[1.7]"
                      style={{ color: TEXT.soft }}
                    >
                      Every project is a chance to build something meaningful. I
                      enjoy creating mobile apps with thoughtful design, solid
                      architecture, and an experience users can rely on.
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
              className="rounded-[24px] p-5 sm:p-6 lg:p-7"
              style={{
                background: GRADIENTS.cardBg,
                border: `1px solid ${BORDERS.subtle}`,
                boxShadow: SHADOWS.card,
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
              }}
            >
              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                <input
                  type="checkbox"
                  name="botcheck"
                  className="hidden"
                  style={{ display: "none" }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                <motion.div
                  custom={0}
                  variants={fieldVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="grid grid-cols-1 gap-4 sm:grid-cols-2"
                >
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    required
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                    className={inputClass}
                    style={
                      focusedField === "name"
                        ? focusInputStyle
                        : baseInputStyle
                    }
                  />

                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    required
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    className={inputClass}
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
                    className={inputClass}
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
                    className="flex cursor-text flex-wrap items-center gap-2 rounded-[16px] px-4 py-3 transition-all"
                    style={open ? focusInputStyle : baseInputStyle}
                    onClick={() => setOpen(true)}
                  >
                    {selected.map((item) => (
                      <span
                        key={item}
                        className="flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-[700]"
                        style={{
                          background: GRADIENTS.badge,
                          border: `1px solid ${BORDERS.medium}`,
                          color: TEXT.badge,
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
                      className="min-w-[120px] flex-1 bg-transparent text-sm outline-none placeholder:text-[var(--text-secondary)]"
                      style={{ color: TEXT.primary }}
                    />

                    <motion.div
                      animate={{ rotate: open ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown size={16} style={{ color: TEXT.muted }} />
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
                          background: GRADIENTS.solidCard,
                          border: `1px solid ${BORDERS.subtle}`,
                          boxShadow: SHADOWS.card,
                          backdropFilter: "blur(18px)",
                          WebkitBackdropFilter: "blur(18px)",
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
                                i === highlightedIndex
                                  ? TEXT.primary
                                  : TEXT.soft,
                              background:
                                i === highlightedIndex
                                  ? GRADIENTS.badge
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
                    rows={7}
                    placeholder="Tell me about your project..."
                    required
                    onFocus={() => setFocusedField("message")}
                    onBlur={() => setFocusedField(null)}
                    className={`${inputClass} resize-none`}
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
                          ? GRADIENTS.badge
                          : GRADIENTS.primaryBtn,
                      border: `1px solid ${BORDERS.medium}`,
                      color: status === "sent" ? TEXT.badge : TEXT.inverse,
                      boxShadow:
                        status !== "sent" ? SHADOWS.primaryBtn : "none",
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
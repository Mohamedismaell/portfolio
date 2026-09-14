"use client";

import { motion, type Variants } from "framer-motion";
import { useState, type FormEvent } from "react";
import { Send, User, Mail, MessageSquare } from "lucide-react";
import { toast } from "sonner";
import SectionWrapper from "@/components/ui/SectionWrapper";

const INTENT_OPTIONS = [
  "A project",
  "A job opportunity",
  "Something else",
];

const fieldVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.45, ease: "easeOut" },
  }),
};

const WEB3FORMS_ACCESS_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "";

export default function HireSection() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [intent, setIntent] = useState("");

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
    const message = String(fd.get("message") ?? "").trim();

    if (name.length < 2) {
      toast.error("Name must be at least 2 characters.");
      return;
    }

    if (message.length < 5) {
      toast.error("Message is too short. Please describe your project.");
      return;
    }

    setStatus("sending");

    const body = {
      access_key: WEB3FORMS_ACCESS_KEY,
      subject: "New Portfolio Contact",
      from_name: name,
      name,
      email,
      intent,
      message,
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
      setIntent("");
      setStatus("sent");
      setTimeout(() => setStatus("idle"), 3000);
    } catch (err: any) {
      console.error("Contact error:", err);
      toast.error(err.message || "Something went wrong. Please try again.");
      setStatus("idle");
    }
  };

  return (
    <SectionWrapper id="contact" className="py-24 px-4 sm:px-6">
      <div className="mx-auto max-w-[650px]">
        {/* Modal Card */}
        <div className="relative bg-[#131418] border border-[#23252c] rounded-[28px] p-7 sm:p-9 shadow-2xl">
          {/* Header */}
          <header className="relative mb-7">
            <span className="block text-[11px] font-mono font-medium tracking-[0.18em] text-neutral-400 uppercase mb-2.5">
              Direct Inquiry
            </span>
            <h1 className="text-[40px] sm:text-[46px] leading-[1.08] text-[#f2f2f3] font-normal tracking-tight">
              Let&apos;s{" "}
              <span className="font-editorial-italic text-[45px] sm:text-[52px] font-light text-white">
                talk.
              </span>
            </h1>
            <p className="text-[13.5px] sm:text-[14px] leading-relaxed text-[#8f919a] mt-2.5 max-w-[430px]">
              I&apos;m always open to discussing new opportunities, interesting ideas, or potential collaborations.
            </p>
          </header>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Two-column row: Name & Email Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Name Field */}
              <div className="space-y-2">
                <label className="block text-[11px] font-mono tracking-[0.14em] uppercase text-[#737580]">
                  Your Name
                </label>
                <div className="relative rounded-2xl bg-[#18191f]/90 border border-[#26272f] hover:border-[#32343e] focus-within:!border-[#4a4d5c] focus-within:ring-1 focus-within:ring-[#4a4d5c] transition-colors">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#6e707b]">
                    <User size={16} strokeWidth={1.8} />
                  </div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Jane Doe"
                    required
                    className="w-full bg-transparent border-0 pl-10 pr-3.5 py-3 text-sm text-[#e2e3e8] placeholder-[#575965] focus:outline-none focus:ring-0"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label className="block text-[11px] font-mono tracking-[0.14em] uppercase text-[#737580]">
                  Your Email
                </label>
                <div className="relative rounded-2xl bg-[#18191f]/90 border border-[#26272f] hover:border-[#32343e] focus-within:!border-[#4a4d5c] focus-within:ring-1 focus-within:ring-[#4a4d5c] transition-colors">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#6e707b]">
                    <Mail size={16} strokeWidth={1.8} />
                  </div>
                  <input
                    type="email"
                    name="email"
                    placeholder="jane@example.com"
                    required
                    className="w-full bg-transparent border-0 pl-10 pr-3.5 py-3 text-sm text-[#e2e3e8] placeholder-[#575965] focus:outline-none focus:ring-0"
                  />
                </div>
              </div>
            </div>

            {/* Inquiry Reason Category Pills */}
            <div className="space-y-2.5">
              <label className="block text-[11px] font-mono tracking-[0.14em] uppercase text-[#737580]">
                What brings you here?
              </label>
              <div className="flex flex-wrap items-center gap-2.5">
                {INTENT_OPTIONS.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setIntent(opt)}
                    className={`px-5 py-2.5 rounded-full text-[13px] font-medium transition-all duration-150 border ${
                      intent === opt
                        ? "bg-[#1d1e25] text-white border-[#7b7e8d] shadow-[0_0_12px_rgba(255,255,255,0.06)]"
                        : "bg-[#18191f] text-[#8e919c] border-[#262730] hover:border-[#3b3d49] hover:text-[#c4c6cf]"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Tell Me More: Textarea Field */}
            <div className="space-y-2 pt-0.5">
              <label className="block text-[11px] font-mono tracking-[0.14em] uppercase text-[#737580]">
                Tell me more
              </label>
              <div className="relative rounded-2xl bg-[#18191f]/90 border border-[#26272f] hover:border-[#32343e] focus-within:!border-[#4a4d5c] focus-within:ring-1 focus-within:ring-[#4a4d5c] transition-colors p-3.5">
                <div className="flex items-start gap-2.5">
                  <div className="pt-0.5 text-[#6e707b] pointer-events-none flex-shrink-0">
                    <MessageSquare size={16} strokeWidth={1.8} />
                  </div>
                  <textarea
                    name="message"
                    rows={4}
                    placeholder="Share details about your project, timeline, or anything else..."
                    required
                    className="w-full bg-transparent border-0 p-0 text-sm text-[#e2e3e8] placeholder-[#575965] focus:outline-none focus:ring-0 resize-y min-h-[90px]"
                  />
                </div>
              </div>
            </div>

            {/* Primary Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={status === "sending" || status === "sent"}
                className="w-full py-3.5 px-6 rounded-full bg-white text-[#111215] hover:bg-[#eaebee] active:scale-[0.99] font-medium text-[14.5px] transition-all duration-150 flex items-center justify-center gap-2.5 shadow-lg shadow-black/30 disabled:opacity-60 group"
              >
                {status === "sending" ? (
                  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                ) : (
                  <Send
                    size={16}
                    className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-150"
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
            </div>
          </form>

          {/* Footer */}
          <footer className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-[12px] text-[#737580] pt-1">
            <div className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-[#737580] stroke-current" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                <rect height="11" rx="2" ry="2" width="18" x="3" y="11" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <span>Your information is safe with me.</span>
            </div>
            <div className="flex items-center gap-2">
              <span>Usually reply within <strong className="font-semibold text-neutral-300">24 hours</strong>.</span>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22c55e]" />
              </span>
            </div>
          </footer>
        </div>
      </div>
    </SectionWrapper>
  );
}

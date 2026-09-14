"use client";

import { useEffect, useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, User, Mail, MessageSquare, Send } from "lucide-react";
import { toast } from "sonner";

const INTENT_OPTIONS = [
  "A project",
  "A job opportunity",
  "Something else",
];

export default function ContactModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [intent, setIntent] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  useEffect(() => {
    const handler = () => setIsOpen(true);
    window.addEventListener("open-contact-modal", handler);
    return () => window.removeEventListener("open-contact-modal", handler);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    setName("");
    setEmail("");
    setIntent("");
    setMessage("");
    setStatus("idle");
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }
    setStatus("sending");
    try {
      const payload = {
        access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY,
        name,
        email,
        subject: intent || "New Contact",
        message,
      };
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const text = await res.text();
      console.log("Web3Forms raw response:", text);
      let data: Record<string, unknown>;
      try {
        data = JSON.parse(text);
      } catch {
        console.error("Web3Forms returned non-JSON:", text.slice(0, 500));
        throw new Error("Invalid response from server");
      }
      console.log("Web3Forms parsed:", data);
      if (!data.success) throw new Error((data.message as string) || "Failed to send");
      toast.success("Message sent! I'll get back to you soon.");
      handleClose();
    } catch (err) {
      console.error("Contact form error:", err);
      toast.error("Something went wrong. Please try again.");
      setStatus("idle");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
          <motion.div
            key="contact-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#0b0c0e]/95 backdrop-blur-xl overflow-y-auto py-10 px-4 sm:px-6 flex items-center justify-center"
            onClick={handleClose}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative w-full max-w-[650px] bg-[#131418] border border-[#23252c] rounded-[28px] p-7 sm:p-9 shadow-2xl mx-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={handleClose}
                aria-label="Close dialog"
                className="absolute top-6 right-6 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-[#1c1d24] hover:bg-[#272831] border border-[#2b2d36] text-gray-400 hover:text-gray-200 transition-all duration-200 cursor-pointer group"
              >
                <X size={14} className="group-hover:rotate-90 transition-transform duration-200" />
              </button>

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
                      value={name}
                      onChange={(e) => setName(e.target.value)}
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
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="jane@example.com"
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
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
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
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

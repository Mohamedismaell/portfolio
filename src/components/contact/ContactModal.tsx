"use client";

import { useEffect, useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { toast } from "sonner";

const INTENT_OPTIONS = [
  { key: "project", label: "A project" },
  { key: "job", label: "A job opportunity" },
  { key: "other", label: "Something else" },
];

export default function ContactModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
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
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, message, intent, email: "" }),
      });
      if (!res.ok) throw new Error("Failed to send");
      toast.success("Message sent! I'll get back to you soon.");
      handleClose();
    } catch {
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
          className="fixed inset-0 z-50 bg-[#0D0F12]/95 backdrop-blur-xl overflow-y-auto py-10 px-4 sm:px-6 flex items-center justify-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative w-full max-w-2xl bg-[#111317] border border-stone-800 rounded-3xl p-6 sm:p-10 shadow-2xl text-white mx-auto"
          >
            <button
              type="button"
              onClick={handleClose}
              aria-label="Close modal"
              className="absolute top-6 right-6 w-10 h-10 rounded-full border border-stone-700 bg-stone-800/80 hover:bg-stone-700 text-stone-300 hover:text-white flex items-center justify-center transition-all text-base"
            >
              <X size={16} />
            </button>

            <div className="mb-8">
              <span className="text-[11px] font-mono uppercase tracking-widest text-stone-400 block mb-2">DIRECT INQUIRY</span>
              <h2 className="font-editorial text-4xl sm:text-5xl text-white tracking-tight leading-tight">
                Let&apos;s <span className="font-editorial-italic text-stone-300">talk.</span>
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-7">
              <div className="space-y-2">
                <label className="block text-[11px] font-mono uppercase tracking-wider text-stone-400">FIRST THINGS FIRST — YOUR NAME</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jane Doe"
                  required
                  className="w-full bg-transparent border-b border-stone-700 focus:border-white py-2 text-base sm:text-lg text-white placeholder-stone-600 focus:outline-none transition-colors"
                />
              </div>

              <div className="space-y-3">
                <label className="block text-[11px] font-mono uppercase tracking-wider text-stone-400">WHAT BRINGS YOU HERE?</label>
                <div className="flex flex-wrap gap-2">
                  {INTENT_OPTIONS.map((opt) => (
                    <button
                      key={opt.key}
                      type="button"
                      onClick={() => setIntent(opt.key)}
                      className={`px-4 py-2 rounded-full border text-xs sm:text-sm font-sans transition-colors active:scale-95 ${
                        intent === opt.key
                          ? "border-white bg-white/10 text-white"
                          : "border-stone-700 bg-stone-800/60 text-stone-300 hover:border-stone-500"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-[11px] font-mono uppercase tracking-wider text-stone-400">TELL ME MORE</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  placeholder="Share details about your project, timeline, or anything else..."
                  required
                  className="w-full bg-transparent border border-stone-700 focus:border-white rounded-xl p-3 text-sm text-white placeholder-stone-600 focus:outline-none transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full py-3 rounded-full bg-white text-stone-950 font-semibold text-sm hover:bg-stone-200 transition-colors disabled:opacity-60"
              >
                {status === "sending" ? "Sending..." : status === "sent" ? "Sent!" : "Send Message"}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

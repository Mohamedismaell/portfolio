"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { ChevronDown, X } from "lucide-react";
import { toast } from "sonner";
import emailjs from "@emailjs/browser";

import GlassCard from "@/app/components/ui/GlassCard";
import PrimaryButton from "@/app/components/ui/PrimaryButton";
import SectionTitle from "@/app/components/ui/SectionTitle";

export default function HireSection() {
  const services = [
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

  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const wrapperRef = useRef<HTMLDivElement>(null);

  const filteredServices = services.filter(
    (s) =>
      s.toLowerCase().includes(query.toLowerCase()) &&
      !selected.includes(s)
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown" && filteredServices.length > 0) {
      e.preventDefault();
      setOpen(true);
      setHighlightedIndex((prev) =>
        prev < filteredServices.length - 1 ? prev + 1 : prev
      );
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : 0));
    }

    if (e.key === "Enter") {
      e.preventDefault();

      if (filteredServices[highlightedIndex]) {
        setSelected([...selected, filteredServices[highlightedIndex]]);
        setQuery("");
        setOpen(false);
      }
    }

    if (e.key === "Escape") {
      setOpen(false);
    }
  };

  const removeService = (service: string) => {
    setSelected(selected.filter((s) => s !== service));
  };

  // EmailJS submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");

    const formData = new FormData(e.currentTarget);

    const templateParams = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      services: selected.join(", "),
      message: formData.get("message"),
      time: new Date().toLocaleString(),
    };

    try {
      await emailjs.send(
        "service_7ydf0hl",
        "template_msr9p97",
        templateParams,
        "Wy8S1XTzck8GPyqU5"
      );

      toast.success("Message sent successfully!");

      (e.target as HTMLFormElement).reset();
      setSelected([]);
      setStatus("sent");

      setTimeout(() => setStatus("idle"), 3000);
    } catch (error) {
      console.error("EmailJS Error:", error);
      toast.error("Failed to send message.");
      setStatus("idle");
    }
  };

  return (
    <section
      id="contact"
      className="relative py-24 px-6 lg:px-20 max-w-6xl mx-auto"
    >
      <GlassCard className="p-10 sm:p-14">
        {/* Title */}
        <div className="text-center mb-12">
          <SectionTitle className="drop-shadow-[0_0_5px_rgba(255,255,255,0.45)]">
            Let’s Work Together
          </SectionTitle>

          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Select services and describe your project requirements.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="relative max-w-3xl mx-auto space-y-6"
        >
          {/* Name + Email */}
          <div className="grid md:grid-cols-2 gap-6">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white"
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
              className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white"
            />
          </div>

          {/* Phone */}
          <input
            type="tel"
            name="phone"
            placeholder="Phone (Optional)"
            className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white"
          />

          {/* Multi Select */}
          <div ref={wrapperRef} className="relative">
            <div
              className="flex flex-wrap items-center gap-2 px-4 py-3 bg-white/5 border border-white/10 rounded-2xl"
              onClick={() => setOpen(true)}
            >
              {selected.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-sm text-white"
                >
                  {item}
                  <X
                    size={14}
                    className="cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeService(item);
                    }}
                  />
                </div>
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
                placeholder={
                  selected.length === 0
                    ? "Select or type services"
                    : ""
                }
                className="flex-1 bg-transparent outline-none text-white min-w-[120px]"
              />

              <motion.div animate={{ rotate: open ? 180 : 0 }}>
                <ChevronDown size={18} className="text-gray-400" />
              </motion.div>
            </div>

            <AnimatePresence>
              {open && filteredServices.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="absolute mt-2 w-full bg-[#111] border border-white/10 rounded-2xl max-h-60 overflow-y-auto z-20"
                >
                  {filteredServices.map((item) => (
                    <div
                      key={item}
                      onClick={() => {
                        setSelected([...selected, item]);
                        setQuery("");
                        setOpen(false);
                      }}
                      className="px-5 py-3 cursor-pointer hover:bg-white/10 text-white/80"
                    >
                      {item}
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Message */}
          <textarea
            name="message"
            rows={6}
            placeholder="Tell me about your project..."
            required
            className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white"
          />

          {/* Submit */}
          <div className="text-center pt-4">
            <PrimaryButton
              type="submit"
              disabled={status === "sending"}
              className="px-10 py-4"
            >
              {status === "sending"
                ? "Sending..."
                : status === "sent"
                  ? "Message Sent ✓"
                  : "Send Message"}
            </PrimaryButton>
          </div>
        </form>
      </GlassCard>
    </section>
  );
}

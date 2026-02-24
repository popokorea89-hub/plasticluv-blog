"use client";

import { useState } from "react";
import Link from "next/link";

const services = [
  "Facelift & Anti-Aging",
  "Eye Surgery",
  "Liposuction & Body Contouring",
  "Botox & Fillers",
  "Thread Lifting",
  "Laser Treatments",
  "Other",
];

export default function ConsultationPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", phone: "", service: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="max-w-[600px] mx-auto px-6 py-24 md:py-32 text-center">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h1 className="font-[family-name:var(--font-display)] text-3xl text-text mb-3">
          Thank You
        </h1>
        <p className="text-sub text-base leading-relaxed mb-8">
          Your inquiry has been sent successfully. Dr. Lee&apos;s team will review your message and get back to you as soon as possible.
        </p>
        <Link
          href="/"
          className="inline-flex items-center px-5 py-2.5 bg-cta text-white text-sm font-medium rounded-full hover:bg-cta-hover transition-colors"
        >
          Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-[960px] mx-auto px-6 md:px-12 py-12 md:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-10 lg:gap-12 items-start">
        {/* Left — Info */}
        <div className="lg:sticky lg:top-24">
          <h1 className="font-[family-name:var(--font-display)] text-3xl md:text-[40px] text-text leading-tight mb-4">
            Get in Touch
          </h1>
          <p className="text-sub text-base leading-relaxed mb-8 max-w-lg">
            Have a question about a procedure, or ready to explore your options? Send us a message and Dr. Lee&apos;s team will follow up with personalized guidance.
          </p>

          {/* Trust Signals */}
          <div className="space-y-4 mb-10">
            {[
              { icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", text: "Board-certified plastic surgeon" },
              { icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z", text: "International patient coordination available" },
              { icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z", text: "Your information is kept strictly confidential" },
              { icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z", text: "No obligations — just honest, professional advice" },
            ].map((item) => (
              <div key={item.text} className="flex items-start gap-3">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-cta shrink-0 mt-0.5">
                  <path d={item.icon} />
                </svg>
                <span className="text-sub text-sm">{item.text}</span>
              </div>
            ))}
          </div>

          {/* Author Card */}
          <Link href="/about" className="block group max-w-sm">
            <div className="bg-card rounded-xl border border-border overflow-hidden hover:border-accent/40 hover:shadow-md transition-all">
              <img
                src="/images/dr-yongwoo-lee-web.jpg"
                alt="Dr. Yongwoo Lee — Board-Certified Plastic Surgeon"
                className="w-full aspect-[3/4] object-cover object-top"
                loading="lazy"
              />
              <div className="p-5">
                <p className="text-sm font-semibold text-text mb-0.5 group-hover:text-cta transition-colors">Dr. Yongwoo Lee</p>
                <p className="text-xs text-cta font-medium mb-2">Board-Certified Plastic Surgeon</p>
                <p className="text-xs text-sub leading-relaxed">
                  University of Michigan — Ann Arbor &amp; Pusan National University College of Medicine. ISAPS member specializing in anti-aging and aesthetic surgery at VIP Plastic Surgery.
                </p>
              </div>
            </div>
          </Link>
        </div>

        {/* Right — Form */}
        <div className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm">
          <h2 className="font-semibold text-text text-lg mb-1">Send Your Inquiry</h2>
          <p className="text-muted text-sm mb-6">All fields marked with * are required.</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-text mb-1.5">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. Jane Smith"
                className="w-full px-4 py-2.5 text-sm text-text bg-bg border border-border rounded-xl focus:outline-none focus:border-cta focus:ring-1 focus:ring-cta/30 transition-colors placeholder:text-muted/50"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-text mb-1.5">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full px-4 py-2.5 text-sm text-text bg-bg border border-border rounded-xl focus:outline-none focus:border-cta focus:ring-1 focus:ring-cta/30 transition-colors placeholder:text-muted/50"
              />
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-text mb-1.5">
                Phone Number <span className="text-muted font-normal">(optional)</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+1 (555) 000-0000"
                className="w-full px-4 py-2.5 text-sm text-text bg-bg border border-border rounded-xl focus:outline-none focus:border-cta focus:ring-1 focus:ring-cta/30 transition-colors placeholder:text-muted/50"
              />
            </div>

            {/* Service */}
            <div>
              <label htmlFor="service" className="block text-sm font-medium text-text mb-1.5">
                Service of Interest
              </label>
              <select
                id="service"
                name="service"
                value={form.service}
                onChange={handleChange}
                className="w-full px-4 py-2.5 text-sm text-text bg-bg border border-border rounded-xl focus:outline-none focus:border-cta focus:ring-1 focus:ring-cta/30 transition-colors appearance-none"
              >
                <option value="">Select a service...</option>
                {services.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-text mb-1.5">
                Your Message *
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={form.message}
                onChange={handleChange}
                placeholder="Tell us about your goals, questions, or concerns..."
                className="w-full px-4 py-2.5 text-sm text-text bg-bg border border-border rounded-xl focus:outline-none focus:border-cta focus:ring-1 focus:ring-cta/30 transition-colors placeholder:text-muted/50 resize-none"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full py-3 bg-cta text-white text-sm font-medium rounded-xl hover:bg-cta-hover transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === "sending" ? "Sending..." : "Send Inquiry"}
            </button>

            {status === "error" && (
              <p className="text-red-500 text-sm text-center">
                Something went wrong. Please try again or email us directly at{" "}
                <a href="mailto:info@plasticluv.com" className="underline">info@plasticluv.com</a>.
              </p>
            )}

            <p className="text-muted text-xs text-center leading-relaxed">
              By submitting this form, you agree to receive a response from Dr. Lee&apos;s team.
              Your information will not be shared with third parties.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

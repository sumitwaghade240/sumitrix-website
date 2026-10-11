import React, { useState } from 'react';
import { Send, MessageSquare, Mail, ArrowUpRight, CheckCircle2, AlertCircle } from 'lucide-react';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: '3D Web Experience',
    budget: '$5,000 – $10,000',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const projectTypes = [
    '3D Web Experience',
    'Luxury E-Commerce',
    'Custom Portfolio',
    'Frontend Architecture',
    'Other / Advisory',
  ];

  const budgetRanges = [
    '$3,000 – $5,000',
    '$5,000 – $10,000',
    '$10,000 – $25,000',
    '$25,000+',
  ];

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) {
      errs.name = 'Please provide your name or brand.';
    }
    if (!formData.email.trim()) {
      errs.email = 'Please provide your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please provide a valid email format.';
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errs.message = 'Please include a brief overview of your project (at least 10 characters).';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
  };

  // Direct WhatsApp formatted link
  const whatsappUrl = `https://wa.me/919999999999?text=${encodeURIComponent(
    `Hello Sumit, I would like to discuss a project with SUMITRIX.\n\nName: ${formData.name || 'Visitor'}\nEmail: ${formData.email || 'N/A'}\nType: ${formData.projectType}\nBudget: ${formData.budget}\nBrief: ${formData.message || 'Consultation inquiry'}`
  )}`;

  // Direct Mailto formatted link
  const mailtoUrl = `mailto:hello@sumitrix.dev?subject=${encodeURIComponent(
    `SUMITRIX Project Inquiry: ${formData.projectType} [${formData.name || 'New Client'}]`
  )}&body=${encodeURIComponent(
    `Name: ${formData.name}\nEmail: ${formData.email}\nProject Type: ${formData.projectType}\nBudget Range: ${formData.budget}\n\nProject Scope:\n${formData.message}`
  )}`;

  return (
    <section id="contact" className="relative py-32 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/10">
      {/* Editorial Header */}
      <div className="pb-16 border-b border-white/10">
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-neon-lime mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-neon-lime" />
          <span>INITIATE CONTACT // 05</span>
        </div>
        <h2 className="font-display font-black text-4xl sm:text-7xl md:text-8xl uppercase tracking-tighter text-white">
          GOT A BIG IDEA? <br />
          <span className="text-outline-neon text-neon-lime">LET'S MAKE IT REAL.</span>
        </h2>
      </div>

      <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Contact Form */}
        <div className="lg:col-span-7">
          {submitted ? (
            <div className="p-8 md:p-12 rounded-2xl glass-panel-glow border border-neon-lime/40 animate-in fade-in zoom-in-95 duration-300">
              <div className="flex items-center gap-3 text-neon-lime mb-4">
                <CheckCircle2 className="w-8 h-8" />
                <h3 className="font-display font-bold text-2xl uppercase text-white">
                  Brief Prepared Successfully
                </h3>
              </div>
              <p className="text-gray-300 font-light leading-relaxed mb-6">
                Your project scope is ready to dispatch. Choose your preferred channel to connect immediately:
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3.5 px-6 rounded-xl bg-neon-lime text-black font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-white transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Send via WhatsApp</span>
                </a>
                <a
                  href={mailtoUrl}
                  className="flex-1 py-3.5 px-6 rounded-xl glass-panel border border-white/20 text-white font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:border-neon-lime hover:text-neon-lime transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span>Send via Email Client</span>
                </a>
              </div>

              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="text-xs font-mono text-gray-400 hover:text-white underline underline-offset-4"
              >
                ← Edit brief information
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block font-mono text-xs text-gray-400 uppercase tracking-wider mb-2">
                    Your Name / Studio *
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alex Rivera"
                    className={`w-full px-4 py-3 rounded-xl bg-dark-900 border ${
                      errors.name ? 'border-red-500' : 'border-white/10 focus:border-neon-lime'
                    } text-white font-sans text-sm outline-none transition-colors`}
                  />
                  {errors.name && (
                    <span className="text-[11px] font-mono text-red-400 mt-1 block flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.name}
                    </span>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block font-mono text-xs text-gray-400 uppercase tracking-wider mb-2">
                    Email Address *
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@studio.com"
                    className={`w-full px-4 py-3 rounded-xl bg-dark-900 border ${
                      errors.email ? 'border-red-500' : 'border-white/10 focus:border-neon-lime'
                    } text-white font-sans text-sm outline-none transition-colors`}
                  />
                  {errors.email && (
                    <span className="text-[11px] font-mono text-red-400 mt-1 block flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.email}
                    </span>
                  )}
                </div>
              </div>

              {/* Project Type */}
              <div>
                <label className="block font-mono text-xs text-gray-400 uppercase tracking-wider mb-2">
                  Project Category
                </label>
                <div className="flex flex-wrap gap-2">
                  {projectTypes.map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setFormData({ ...formData, projectType: type })}
                      className={`px-3.5 py-2 rounded-lg text-xs font-mono transition-all ${
                        formData.projectType === type
                          ? 'bg-neon-lime text-black font-semibold'
                          : 'bg-dark-900 border border-white/10 text-gray-300 hover:border-white/30'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Budget Range */}
              <div>
                <label className="block font-mono text-xs text-gray-400 uppercase tracking-wider mb-2">
                  Estimated Budget
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {budgetRanges.map((budget) => (
                    <button
                      key={budget}
                      type="button"
                      onClick={() => setFormData({ ...formData, budget })}
                      className={`px-3 py-2 rounded-lg text-xs font-mono text-center transition-all ${
                        formData.budget === budget
                          ? 'bg-neon-lime text-black font-semibold'
                          : 'bg-dark-900 border border-white/10 text-gray-300 hover:border-white/30'
                      }`}
                    >
                      {budget}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block font-mono text-xs text-gray-400 uppercase tracking-wider mb-2">
                  Project Brief & Goals *
                </label>
                <textarea
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell me about your timeline, vision, technical requirements, and objectives..."
                  className={`w-full px-4 py-3 rounded-xl bg-dark-900 border ${
                    errors.message ? 'border-red-500' : 'border-white/10 focus:border-neon-lime'
                  } text-white font-sans text-sm outline-none transition-colors resize-none`}
                />
                {errors.message && (
                  <span className="text-[11px] font-mono text-red-400 mt-1 block flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.message}
                  </span>
                )}
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-neon-lime text-black font-mono font-bold text-sm uppercase tracking-wider hover:bg-white transition-all duration-300 shadow-[0_0_25px_rgba(204,255,0,0.25)] flex items-center justify-center gap-2"
              >
                <span>Generate Project Brief</span>
                <Send className="w-4 h-4" />
              </button>

              <p className="text-center font-mono text-[11px] text-gray-500">
                Direct brief dispatch to WhatsApp or Email client. Zero spam, 100% confidential.
              </p>
            </form>
          )}
        </div>

        {/* Studio Direct Reach & Channels */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-12">
          <div className="space-y-8">
            <div className="p-6 rounded-2xl glass-panel border border-white/10">
              <span className="block font-mono text-xs text-neon-lime uppercase tracking-widest mb-1">
                Direct Inquiries
              </span>
              <a
                href="mailto:hello@sumitrix.dev"
                className="font-display font-bold text-xl sm:text-2xl text-white hover:text-neon-lime transition-colors block"
              >
                hello@sumitrix.dev
              </a>
              <span className="block font-mono text-xs text-gray-400 mt-1">
                Sumit Waghade • Typical reply window: within 24 business hours.
              </span>
            </div>

            <div className="p-6 rounded-2xl glass-panel border border-white/10">
              <span className="block font-mono text-xs text-neon-lime uppercase tracking-widest mb-1">
                Instant Chat & WhatsApp
              </span>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-display font-bold text-xl text-white hover:text-neon-lime transition-colors"
              >
                <span>+91 99999 99999</span>
                <ArrowUpRight className="w-4 h-4 text-neon-lime" />
              </a>
              <span className="block font-mono text-xs text-gray-400 mt-1">
                Available for preliminary discovery calls and voice briefings.
              </span>
            </div>
          </div>

          {/* Social Profiles with clean SVG icons */}
          <div className="pt-8 border-t border-white/10">
            <span className="block font-mono text-xs text-gray-400 uppercase tracking-widest mb-4">
              Digital Coordinates
            </span>
            <div className="flex items-center gap-3">
              {/* GitHub */}
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-xl glass-panel border border-white/10 flex items-center justify-center text-gray-300 hover:text-neon-lime hover:border-neon-lime transition-colors"
                aria-label="GitHub Profile"
              >
                <svg className="w-5 h-5 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-xl glass-panel border border-white/10 flex items-center justify-center text-gray-300 hover:text-neon-lime hover:border-neon-lime transition-colors"
                aria-label="LinkedIn Profile"
              >
                <svg className="w-5 h-5 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>

              {/* X / Twitter */}
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-xl glass-panel border border-white/10 flex items-center justify-center text-gray-300 hover:text-neon-lime hover:border-neon-lime transition-colors"
                aria-label="Twitter Profile"
              >
                <svg className="w-5 h-5 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

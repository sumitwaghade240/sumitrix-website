import React, { useState, useEffect } from 'react';
import { Send, MessageSquare, Mail, ArrowUpRight, CheckCircle2, AlertCircle, Copy, Check, Globe2, Tag } from 'lucide-react';
import {
  COUNTRIES,
  PRICING_TIERS_META,
  getCountryConfig,
  getTierPrice
} from '../data/pricingData';

interface ContactProps {
  selectedCountryCode: string;
  onSelectCountry: (countryCode: string) => void;
  selectedPackageId: string | null;
  onSelectPackage: (packageId: string | null) => void;
}

export const Contact: React.FC<ContactProps> = ({
  selectedCountryCode,
  onSelectCountry,
  selectedPackageId,
  onSelectPackage,
}) => {
  const currentCountry = getCountryConfig(selectedCountryCode);

  const getBudgetsForCurrency = (symbol: string, code: string) => {
    if (code === 'INR') {
      return ['₹1,000 – ₹5,000', '₹5,000 – ₹15,000', '₹15,000 – ₹30,000', '₹30,000+'];
    }
    return [
      `${symbol}50 – ${symbol}250`,
      `${symbol}250 – ${symbol}1,000`,
      `${symbol}1,000 – ${symbol}3,000`,
      `${symbol}3,000+`
    ];
  };

  const currentBudgets = getBudgetsForCurrency(currentCountry.symbol, currentCountry.currency);

  const [formData, setFormData] = useState({
    name: '',
    business: '',
    email: '',
    projectType: '3D Web Experience',
    budget: currentBudgets[1],
    message: '',
  });

  // Keep budget updated when currency changes if using defaults
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      budget: getBudgetsForCurrency(currentCountry.symbol, currentCountry.currency)[1]
    }));
  }, [selectedCountryCode]);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const projectTypes = [
    '3D Web Experience',
    'Luxury E-Commerce',
    'Custom Portfolio',
    'Frontend Architecture',
    'Other / Advisory',
  ];

  const selectedTier = PRICING_TIERS_META.find((t) => t.id === selectedPackageId);
  const startingPrice = selectedPackageId
    ? getTierPrice(selectedCountryCode, selectedPackageId)
    : 'Custom Quote';
  const packageName = selectedTier ? selectedTier.name : 'Custom / Open Discussion';

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

  // Structured messages with country, currency, package, and starting price
  const getFormWhatsAppMessage = () => [
    'Hello Sumit! I visited your SUMITRIX website and would like to discuss a project.',
    '',
    `Name: ${formData.name.trim() || 'Visitor'}`,
    `Business: ${formData.business.trim() || 'N/A'}`,
    `Country: ${currentCountry.name}`,
    `Currency: ${currentCountry.currency} (${currentCountry.symbol})`,
    `Package: ${packageName}`,
    `Starting price: ${startingPrice}`,
    `Project type: ${formData.projectType}`,
    `Budget: ${formData.budget}`,
    `Project details: ${formData.message.trim() || 'Consultation inquiry'}`,
    '',
    'Please let me know the next steps. Thank you!',
  ].join('\n');

  const defaultWhatsAppMessage = [
    'Hello Sumit! I visited your SUMITRIX website and would like to discuss a project.',
    '',
    'Name: [Visitor\'s name]',
    'Business: [Business name]',
    `Country: ${currentCountry.name}`,
    `Currency: ${currentCountry.currency} (${currentCountry.symbol})`,
    `Package: ${packageName}`,
    `Starting price: ${startingPrice}`,
    'Project type: [Project type]',
    'Budget: [Selected budget]',
    'Project details: [Project description]',
    '',
    'Please let me know the next steps. Thank you!',
  ].join('\n');

  const emailSubject = `SUMITRIX Project Enquiry - ${packageName}`;

  const getFormEmailBody = () => [
    'Hello Sumit,',
    '',
    'I visited your SUMITRIX website and would like to discuss a project.',
    '',
    `Name: ${formData.name.trim() || 'Visitor'}`,
    `Business: ${formData.business.trim() || 'N/A'}`,
    `Country: ${currentCountry.name}`,
    `Currency: ${currentCountry.currency} (${currentCountry.symbol})`,
    `Package: ${packageName}`,
    `Starting price: ${startingPrice}`,
    `Project type: ${formData.projectType}`,
    `Budget: ${formData.budget}`,
    `Project details: ${formData.message.trim() || 'Consultation inquiry'}`,
    '',
    'Please let me know the next steps.',
    '',
    'Thank you!',
  ].join('\n');

  const defaultEmailBody = [
    'Hello Sumit,',
    '',
    'I visited your SUMITRIX website and would like to discuss a project.',
    '',
    'Name: [Visitor\'s name]',
    'Business: [Business name]',
    `Country: ${currentCountry.name}`,
    `Currency: ${currentCountry.currency} (${currentCountry.symbol})`,
    `Package: ${packageName}`,
    `Starting price: ${startingPrice}`,
    'Project type: [Project type]',
    'Budget: [Selected budget]',
    'Project details: [Project description]',
    '',
    'Please let me know the next steps.',
    '',
    'Thank you!',
  ].join('\n');

  // Form generated links
  const formWhatsAppUrl = `https://wa.me/917219083021?text=${encodeURIComponent(getFormWhatsAppMessage())}`;
  const formMailtoUrl = `mailto:sumitwaghade240@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(getFormEmailBody())}`;

  // Direct sidebar links
  const directWhatsAppUrl = `https://wa.me/917219083021?text=${encodeURIComponent(defaultWhatsAppMessage)}`;
  const directMailtoUrl = `mailto:sumitwaghade240@gmail.com?subject=${encodeURIComponent('SUMITRIX Project Enquiry')}&body=${encodeURIComponent(defaultEmailBody)}`;

  const handleCopyBrief = () => {
    const briefText = getFormWhatsAppMessage();
    navigator.clipboard.writeText(briefText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    });
  };

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
        {/* Contact Form Area */}
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
                Your project brief has been compiled with regional currency and package parameters. Review below, copy the text, or dispatch directly via WhatsApp or Email:
              </p>

              {/* Prepared Brief Summary Box */}
              <div className="mb-6 p-4 rounded-xl bg-dark-900 border border-white/10 font-mono text-xs text-gray-300 whitespace-pre-wrap leading-relaxed max-h-56 overflow-y-auto select-all">
                {getFormWhatsAppMessage()}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <a
                  href={formWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3.5 px-6 rounded-xl bg-neon-lime text-black font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-white transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Send via WhatsApp</span>
                </a>
                <a
                  href={formMailtoUrl}
                  className="flex-1 py-3.5 px-6 rounded-xl glass-panel border border-white/20 text-white font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:border-neon-lime hover:text-neon-lime transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span>Send via Email Client</span>
                </a>
              </div>

              {/* Secondary Controls: Copy & Edit */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={handleCopyBrief}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-dark-900 border border-white/15 text-xs font-mono text-gray-300 hover:text-neon-lime hover:border-neon-lime/40 transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-neon-lime" />
                      <span className="text-neon-lime font-bold">Brief Copied to Clipboard! ✓</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Project Brief</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="text-xs font-mono text-gray-400 hover:text-white underline underline-offset-4"
                >
                  ← Edit brief details
                </button>
              </div>

              <p className="mt-4 text-[11px] font-mono text-gray-500 leading-normal">
                * Note: &ldquo;Send via WhatsApp&rdquo; opens WhatsApp in a new tab with your pre-filled message. &ldquo;Send via Email Client&rdquo; opens your default mail application addressed to sumitwaghade240@gmail.com.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              {/* Selected Package Badge & Quick Switcher */}
              <div className="p-4 rounded-xl bg-dark-900/80 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <Tag className="w-4 h-4 text-neon-lime shrink-0" />
                  <div>
                    <span className="block font-mono text-[10px] uppercase tracking-wider text-gray-400">
                      Selected Scope Package
                    </span>
                    <span className="text-xs font-display font-bold text-white">
                      {packageName} • <span className="text-neon-lime">Starting at {startingPrice}</span>
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 flex-wrap">
                  <button
                    type="button"
                    onClick={() => onSelectPackage(null)}
                    className={`px-2 py-1 rounded text-[10px] font-mono transition-colors ${
                      selectedPackageId === null
                        ? 'bg-neon-lime text-black font-bold'
                        : 'bg-white/5 text-gray-400 hover:text-white'
                    }`}
                  >
                    Custom
                  </button>
                  {PRICING_TIERS_META.map((tier) => (
                    <button
                      key={tier.id}
                      type="button"
                      onClick={() => onSelectPackage(tier.id)}
                      className={`px-2 py-1 rounded text-[10px] font-mono transition-colors ${
                        selectedPackageId === tier.id
                          ? 'bg-neon-lime text-black font-bold'
                          : 'bg-white/5 text-gray-400 hover:text-white'
                      }`}
                    >
                      {tier.name.replace(' Starter', '')}
                    </button>
                  ))}
                </div>
              </div>

              {/* Country & Currency Selector Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="country-select" className="block font-mono text-xs text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Globe2 className="w-3.5 h-3.5 text-neon-lime" />
                    <span>Your Country *</span>
                  </label>
                  <select
                    id="country-select"
                    value={selectedCountryCode}
                    onChange={(e) => onSelectCountry(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-dark-900 border border-white/10 focus:border-neon-lime text-white font-sans text-sm outline-none transition-colors appearance-none cursor-pointer"
                  >
                    {COUNTRIES.map((country) => (
                      <option key={country.code} value={country.code} className="bg-dark-950 text-white">
                        {country.flag} {country.name} ({country.currency} · {country.symbol})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-mono text-xs text-gray-400 uppercase tracking-wider mb-2">
                    Preferred Currency (Automatic)
                  </label>
                  <div className="w-full px-4 py-3 rounded-xl bg-dark-900/60 border border-white/5 text-neon-lime font-mono text-sm flex items-center justify-between">
                    <span>{currentCountry.currency} ({currentCountry.symbol})</span>
                    <span className="text-[10px] text-gray-400 uppercase font-sans">
                      {currentCountry.name}
                    </span>
                  </div>
                </div>
              </div>

              {/* Name & Business Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block font-mono text-xs text-gray-400 uppercase tracking-wider mb-2">
                    Your Name *
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

                {/* Business / Brand Name */}
                <div>
                  <label htmlFor="business" className="block font-mono text-xs text-gray-400 uppercase tracking-wider mb-2">
                    Business / Brand Name
                  </label>
                  <input
                    id="business"
                    type="text"
                    value={formData.business}
                    onChange={(e) => setFormData({ ...formData, business: e.target.value })}
                    placeholder="e.g. Studio Vertex or Personal"
                    className="w-full px-4 py-3 rounded-xl bg-dark-900 border border-white/10 focus:border-neon-lime text-white font-sans text-sm outline-none transition-colors"
                  />
                </div>
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

              {/* Budget Range (in selected country's currency) */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block font-mono text-xs text-gray-400 uppercase tracking-wider">
                    Estimated Budget ({currentCountry.currency})
                  </label>
                  <span className="font-mono text-[10px] text-neon-lime">
                    Currency: {currentCountry.currency} ({currentCountry.symbol})
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {currentBudgets.map((budget) => (
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
                href={directMailtoUrl}
                className="font-display font-bold text-lg sm:text-xl md:text-2xl text-white hover:text-neon-lime transition-colors block break-all"
              >
                sumitwaghade240@gmail.com
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
                href={directWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-display font-bold text-xl text-white hover:text-neon-lime transition-colors"
              >
                <span>+91 7219083021</span>
                <ArrowUpRight className="w-4 h-4 text-neon-lime" />
              </a>
              <span className="block font-mono text-xs text-gray-400 mt-1">
                Available for preliminary discovery calls and voice briefings.
              </span>
            </div>
          </div>

          {/* Social Profiles */}
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

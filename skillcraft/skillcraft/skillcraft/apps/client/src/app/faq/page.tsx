'use client';
import React, { useState } from 'react';

const faqs = [
  { q: "Is SkillCraft free to start?", a: "Yes! You can start learning for free with a 7-day trial. No credit card required." },
  { q: "Can I learn at my own pace?", a: "Absolutely. All courses are self-paced and you can revisit lessons anytime." },
  { q: "Are certificates provided?", a: "Yes, you earn certificates and badges for completed courses and projects." },
  { q: "Is there a community?", a: "Yes, join study groups, live workshops, and connect with peers and mentors." },
  { q: "How do I reset my password?", a: "Go to the login page and click 'Forgot Password' to receive a reset link." },
  { q: "Can I access courses on mobile?", a: "Yes, SkillCraft is fully responsive and works on all devices." },
];

const FAQPage = () => {
  const [open, setOpen] = useState(-1);
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0a0a23] via-[#18182f] to-[#1a1333] text-white font-sans overflow-x-hidden px-4 pb-16">
      <div className="max-w-2xl mx-auto pt-16">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-8 text-center">Frequently Asked Questions</h1>
        <div className="divide-y divide-gray-700 rounded-2xl bg-[#23234a] shadow-lg border border-[#23234a]">
          {faqs.map((faq, i) => (
            <div key={i}>
              <button
                className="w-full flex justify-between items-center py-5 px-6 text-left text-lg font-semibold text-gray-200 hover:text-blue-400 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-expanded={open === i}
                aria-controls={`faq-panel-${i}`}
                id={`faq-header-${i}`}
                onClick={() => setOpen(open === i ? -1 : i)}
              >
                {faq.q}
                <span className={`ml-2 transition-transform ${open === i ? "rotate-180" : "rotate-0"}`}>▼</span>
              </button>
              <div
                id={`faq-panel-${i}`}
                role="region"
                aria-labelledby={`faq-header-${i}`}
                className={`overflow-hidden transition-all duration-300 ${open === i ? 'max-h-40 py-2 px-6' : 'max-h-0 py-0 px-6'}`}
                style={{ background: open === i ? '#18182f' : 'transparent' }}
              >
                <p className="text-gray-400 text-base">{open === i && faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default FAQPage; 
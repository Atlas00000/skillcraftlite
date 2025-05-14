'use client';
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TestimonialsPage = () => {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    setLoading(true);
    fetch('/api/testimonials')
      .then((res) => res.json())
      .then((data) => {
        setTestimonials(data.testimonials);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load testimonials');
        setLoading(false);
      });
  }, []);

  // Carousel auto-advance for mobile
  useEffect(() => {
    if (testimonials.length > 1) {
      const timer = setTimeout(() => setIdx((idx + 1) % testimonials.length), 5000);
      return () => clearTimeout(timer);
    }
  }, [idx, testimonials]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0a0a23] via-[#18182f] to-[#1a1333] text-white font-sans overflow-x-hidden px-4 pb-16">
      <div className="max-w-3xl mx-auto pt-16">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-8 text-center">Testimonials</h1>
        {loading ? (
          <div className="text-center text-gray-400 py-12">Loading testimonials...</div>
        ) : error ? (
          <div className="text-center text-red-400 py-12">{error}</div>
        ) : testimonials.length === 0 ? (
          <div className="text-center text-gray-400 py-12">No testimonials available.</div>
        ) : (
          <>
            {/* Carousel for mobile, grid for desktop */}
            <div className="block md:hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.5 }}
                  className="bg-[#23234a] rounded-2xl p-8 flex flex-col items-center shadow-lg border border-[#23234a] min-h-[260px]"
                >
                  <img src={testimonials[idx].avatar} alt={testimonials[idx].name} width={60} height={60} className="rounded-full mb-4 border-2 border-blue-600" />
                  <p className="text-gray-200 text-lg mb-4 text-center">“{testimonials[idx].quote}”</p>
                  <span className="font-bold text-base text-blue-400 mb-1">{testimonials[idx].name}</span>
                  <span className="text-gray-400 text-sm">{testimonials[idx].title}</span>
                </motion.div>
              </AnimatePresence>
              <div className="flex gap-2 justify-center mt-4">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    className={`w-3 h-3 rounded-full ${i === idx ? "bg-blue-500" : "bg-gray-600"}`}
                    onClick={() => setIdx(i)}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>
            </div>
            <div className="hidden md:grid grid-cols-1 md:grid-cols-2 gap-8">
              {testimonials.map((t, i) => (
                <div key={i} className="bg-[#23234a] rounded-2xl p-8 flex flex-col items-center shadow-lg border border-[#23234a] min-h-[260px]">
                  <img src={t.avatar} alt={t.name} width={60} height={60} className="rounded-full mb-4 border-2 border-blue-600" />
                  <p className="text-gray-200 text-lg mb-4 text-center">“{t.quote}”</p>
                  <span className="font-bold text-base text-blue-400 mb-1">{t.name}</span>
                  <span className="text-gray-400 text-sm">{t.title}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default TestimonialsPage; 
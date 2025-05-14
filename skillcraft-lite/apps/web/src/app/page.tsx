'use client';
import React, { useEffect, useRef, useState } from 'react';
import Button from './components/Button';
import Card from './components/Card';
import { motion, useAnimation, useInView } from 'framer-motion';

// Add SVG import for hero illustration
import GlobeSVG from '../public/globe.svg';
import FileSVG from '../public/file.svg';
import WindowSVG from '../public/window.svg';
import NextSVG from '../public/next.svg';

// Animated Counter component
function AnimatedCounter({ value, duration = 1.2, ...props }: { value: number | string, duration?: number, className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const controls = useAnimation();
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (inView && typeof value === 'number') {
      controls.start({ count: value });
    }
  }, [inView, value, controls]);
  return (
    <motion.span
      ref={ref}
      animate={controls}
      initial={{ count: 0 }}
      transition={{ duration, ease: 'easeOut' }}
      className={props.className}
    >
      {typeof value === 'number' ? (
        <motion.span
          animate={{
            textContent: value,
          }}
          transition={{ duration, ease: 'easeOut' }}
        >
          {value}
        </motion.span>
      ) : value}
    </motion.span>
  );
}

// 1. Update featured courses: use Unsplash images, avatars, ratings, tags
const featuredCourses = [
  {
    title: 'Introduction to Python Programming',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80',
    instructor: 'David Chen',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    rating: 4.8,
    students: 15320,
    category: 'Tech & Coding',
    level: 'Beginner',
  },
  {
    title: 'UI/UX Design Fundamentals',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    instructor: 'Alex Rivera',
    avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
    rating: 4.7,
    students: 11027,
    category: 'Design',
    level: 'Beginner',
  },
  {
    title: 'Modern JavaScript Development',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80',
    instructor: 'Ryan Thompson',
    avatar: 'https://randomuser.me/api/portraits/men/65.jpg',
    rating: 4.9,
    students: 18354,
    category: 'Tech & Coding',
    level: 'Intermediate',
  },
  {
    title: 'Data Analysis with Pandas',
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    instructor: 'Sarah Johnson',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    rating: 4.8,
    students: 9145,
    category: 'Tech & Coding',
    level: 'Intermediate',
  },
];

// 2. Testimonials carousel sample data
const testimonials = [
  {
    name: 'Maria Garcia',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    quote: 'SkillCraft made learning Python fun and interactive. The progress tracking kept me motivated!',
    title: 'Data Analyst',
  },
  {
    name: 'James Wilson',
    avatar: 'https://randomuser.me/api/portraits/men/51.jpg',
    quote: 'The course variety and quality are top-notch. I landed a new job thanks to SkillCraft!',
    title: 'Frontend Developer',
  },
  {
    name: 'Laura Kennedy',
    avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
    quote: 'I love the community and the gamified achievements. Highly recommended for all learners.',
    title: 'UX Designer',
  },
];

// 3. Animated progress widget
function AnimatedProgressWidget() {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="bg-background-card rounded-2xl p-6 shadow-card flex flex-col items-center gap-3 max-w-xs mx-auto">
      <span className="text-lg font-bold text-primary">Community Progress</span>
      <div className="w-full h-3 bg-background-surface rounded-full overflow-hidden mb-2">
        <motion.div initial={{ width: 0 }} animate={{ width: '78%' }} transition={{ duration: 1.2, delay: 0.3 }} className="h-full bg-success rounded-full" />
      </div>
      <span className="text-text-secondary text-sm">78% of learners completed their weekly goal</span>
    </motion.div>
  );
}

// Testimonials Carousel component
function TestimonialsCarousel() {
  const [index, setIndex] = useState(0);
  const testimonial = testimonials[index];
  function next() { setIndex((i) => (i + 1) % testimonials.length); }
  function prev() { setIndex((i) => (i - 1 + testimonials.length) % testimonials.length); }
  return (
    <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="max-w-2xl mx-auto my-12">
      <div className="relative bg-background-card rounded-2xl shadow-card p-8 flex flex-col items-center text-center hover:scale-105 hover:shadow-glow transition-all duration-300">
        <motion.img key={testimonial.avatar} src={testimonial.avatar} alt={testimonial.name} className="w-16 h-16 rounded-full border-4 border-primary shadow mb-4" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} />
        <motion.blockquote key={testimonial.quote} className="text-xl font-semibold text-text-primary mb-2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>{`"${testimonial.quote}"`}</motion.blockquote>
        <span className="text-accent-purple font-bold">{testimonial.name}</span>
        <span className="text-text-muted text-sm mb-2">{testimonial.title}</span>
        <div className="flex gap-2 mt-4">
          <button onClick={prev} className="rounded-full bg-background-surface p-2 hover:bg-primary hover:text-white transition"><span>&larr;</span></button>
          <button onClick={next} className="rounded-full bg-background-surface p-2 hover:bg-primary hover:text-white transition"><span>&rarr;</span></button>
        </div>
        <div className="flex gap-1 mt-3 justify-center">
          {testimonials.map((_, i) => (
            <span key={i} className={`w-2 h-2 rounded-full ${i === index ? 'bg-primary' : 'bg-border'} transition`} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// 4. Recent Activity Feed sample data
const recentActivity = [
  { user: 'Maria Garcia', action: 'completed', item: 'Python Basics', time: '2m ago', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
  { user: 'James Wilson', action: 'earned', item: '7-Day Streak Badge', time: '10m ago', avatar: 'https://randomuser.me/api/portraits/men/51.jpg' },
  { user: 'Laura Kennedy', action: 'joined', item: 'UI/UX Design Fundamentals', time: '20m ago', avatar: 'https://randomuser.me/api/portraits/women/65.jpg' },
];

// 5. Leaderboard sample data
const leaderboard = [
  { name: 'David Chen', xp: 4230, avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
  { name: 'Maria Garcia', xp: 4100, avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
  { name: 'James Wilson', xp: 3980, avatar: 'https://randomuser.me/api/portraits/men/51.jpg' },
];

// 6. Upcoming Events sample data
const events = [
  { title: 'Python Project Workshop', date: 'Jun 25, 2025', time: '3:00 PM', instructor: 'David Chen' },
  { title: 'Data Science Q&A Session', date: 'Jun 28, 2025', time: '6:00 PM', instructor: 'Sarah Johnson' },
];

// 7. FAQ sample data
const faqs = [
  { q: 'How do I track my progress?', a: 'Your progress is automatically tracked and shown on your dashboard.' },
  { q: 'Can I reset a course?', a: 'Yes, you can reset any course from the course details page.' },
  { q: 'How do I earn badges?', a: 'Complete lessons, quizzes, and streaks to earn badges.' },
];

// 8. Animated Skill Tree sample data
const skillTree = [
  { skill: 'Python', level: 4 },
  { skill: 'React', level: 3 },
  { skill: 'Data Analysis', level: 2 },
  { skill: 'Design', level: 2 },
  { skill: 'Machine Learning', level: 1 },
];

// 9. LazySection component for lazy loading
function LazySection({ children, className = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  return (
    <motion.section ref={ref} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className={className}>
      {inView ? children : <div className="h-32 animate-pulse bg-background-surface rounded-2xl" />}
    </motion.section>
  );
}

// 10. FAQ Accordion
function FAQAccordion() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="max-w-2xl mx-auto my-12">
      <h2 className="text-2xl font-extrabold mb-6">Quick Tips & FAQ</h2>
      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <div key={i} className="bg-background-card rounded-2xl shadow-card p-4">
            <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex justify-between items-center font-bold text-left text-text-primary focus:outline-none">
              {faq.q}
              <span className={`transform transition-transform ${open === i ? 'rotate-90 text-primary' : 'rotate-0 text-text-muted'}`}>▶</span>
            </button>
            <motion.div initial={false} animate={{ height: open === i ? 'auto' : 0, opacity: open === i ? 1 : 0 }} className="overflow-hidden text-text-secondary text-sm mt-2">
              {open === i && <div>{faq.a}</div>}
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
}

// 11. Animated Skill Tree
function AnimatedSkillTree() {
  const skills = [
    { skill: 'Python', level: 4, max: 5, icon: '🐍', color: 'from-primary to-accent-blue', desc: 'Mastery in Python programming.' },
    { skill: 'React', level: 3, max: 5, icon: '⚛️', color: 'from-accent-blue to-info', desc: 'Building modern UIs with React.' },
    { skill: 'Data Analysis', level: 2, max: 5, icon: '📊', color: 'from-success to-primary', desc: 'Analyzing data for insights.' },
    { skill: 'Design', level: 2, max: 5, icon: '🎨', color: 'from-accent-purple to-primary', desc: 'UI/UX and visual design skills.' },
    { skill: 'Machine Learning', level: 1, max: 5, icon: '🤖', color: 'from-info to-success', desc: 'Intro to ML and AI.' },
  ];
  const center = { x: 144, y: 144 };
  const radius = 110; // Increased radius for better spacing
  const angleStep = (2 * Math.PI) / skills.length;
  const angleOffset = Math.PI / 2; // Start at top
  const [hovered, setHovered] = useState(null);
  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="bg-background-card rounded-2xl shadow-card p-6 flex flex-col items-center gap-3 max-w-md mx-auto my-12">
      <h2 className="text-lg font-bold text-primary mb-4">Your Skill Tree</h2>
      <div className="relative w-80 h-80 mx-auto flex items-center justify-center">
        {/* SVG lines */}
        <svg className="absolute top-0 left-0 w-full h-full pointer-events-none" viewBox="0 0 320 320">
          {skills.map((node, i) => {
            const angle = i * angleStep - angleOffset;
            const x = center.x + radius * Math.cos(angle);
            const y = center.y + radius * Math.sin(angle);
            return (
              <line key={node.skill} x1={center.x} y1={center.y} x2={x} y2={y} stroke="#60a5fa" strokeWidth="2" />
            );
          })}
        </svg>
        {/* Central node (smaller) */}
        <motion.div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10" initial={{ scale: 0.8, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }}>
          <span className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent-purple text-white flex items-center justify-center font-bold text-xl shadow-card mb-1 border-4 border-background-surface">🌳</span>
          <span className="text-text-secondary text-xs font-semibold">Skill Tree</span>
        </motion.div>
        {/* Skill nodes with progress rings and tooltips */}
        {skills.map((node, i) => {
          const angle = i * angleStep - angleOffset;
          const x = center.x + radius * Math.cos(angle);
          const y = center.y + radius * Math.sin(angle);
          const progress = (node.level / node.max) * 100;
          return (
            <motion.div
              key={node.skill}
              className={`absolute flex flex-col items-center group`}
              style={{ left: x, top: y, transform: 'translate(-50%, -50%)' }}
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.15, zIndex: 2 }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="relative flex flex-col items-center">
                <svg width="72" height="72" className="absolute top-0 left-0">
                  <circle cx="36" cy="36" r="32" fill="none" stroke="#23234a" strokeWidth="6" />
                  <motion.circle
                    cx="36" cy="36" r="32" fill="none"
                    stroke="#60a5fa"
                    strokeWidth="6"
                    strokeDasharray={2 * Math.PI * 32}
                    strokeDashoffset={2 * Math.PI * 32 * (1 - progress / 100)}
                    initial={{ strokeDashoffset: 2 * Math.PI * 32 }}
                    animate={{ strokeDashoffset: 2 * Math.PI * 32 * (1 - progress / 100) }}
                    transition={{ duration: 1 }}
                  />
                </svg>
                <span className={`w-14 h-14 rounded-full bg-gradient-to-br ${node.color} text-white flex items-center justify-center font-bold text-2xl shadow-card mb-2 transition-all duration-300 group-hover:ring-4 group-hover:ring-accent-blue relative z-10`}>{node.icon}</span>
                <span className="text-text-secondary text-sm font-semibold group-hover:text-primary transition-all text-center">{node.skill}</span>
                <span className="text-primary text-xs font-bold text-center">Level {node.level}</span>
              </div>
              {hovered === i && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute -top-16 left-1/2 -translate-x-1/2 bg-background-surface text-text-primary text-xs rounded-xl px-3 py-2 shadow-card z-20">
                  {node.desc}
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

// 12. Live Chat Widget
function LiveChatWidget() {
  const [open, setOpen] = useState(false);
  const messages = [
    { from: 'support', text: 'Hi! How can we help you today?' },
    { from: 'user', text: 'How do I reset my course progress?' },
    { from: 'support', text: 'You can reset any course from the course details page.' },
  ];
  return (
    <>
      <button onClick={() => setOpen(true)} className="fixed bottom-8 right-8 z-50 bg-primary text-white rounded-full p-4 shadow-lg hover:scale-110 transition-all">
        💬
      </button>
      {open && (
        <div className="fixed bottom-24 right-8 z-50 bg-background-card rounded-2xl shadow-card p-6 w-80 max-w-full animate-fade-in">
          <div className="flex justify-between items-center mb-2">
            <span className="font-bold text-primary">Live Chat</span>
            <button onClick={() => setOpen(false)} className="text-text-muted hover:text-primary">✕</button>
          </div>
          <div className="space-y-2 max-h-48 overflow-y-auto mb-2">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}> 
                <span className={`px-3 py-2 rounded-xl ${msg.from === 'user' ? 'bg-primary text-white' : 'bg-background-surface text-text-primary'} shadow-card`}>{msg.text}</span>
              </div>
            ))}
          </div>
          <input className="w-full rounded-xl border border-border bg-background-surface p-2 text-sm" placeholder="Type a message..." />
        </div>
      )}
    </>
  );
}

// 13. Notifications Widget
function NotificationsWidget() {
  const [open, setOpen] = useState(false);
  const notifications = [
    { text: 'You earned the Python Apprentice badge!', time: '2m ago' },
    { text: 'Your weekly goal is 80% complete.', time: '10m ago' },
    { text: 'New course: Advanced Machine Learning', time: '1h ago' },
  ];
  return (
    <div className="fixed top-8 right-8 z-50">
      <button onClick={() => setOpen((v) => !v)} className="relative bg-background-card p-3 rounded-full shadow-card hover:scale-110 transition-all">
        <span className="text-2xl">🔔</span>
        <span className="absolute top-1 right-1 w-3 h-3 rounded-full bg-success animate-pulse border-2 border-background-card" />
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-72 bg-background-card rounded-2xl shadow-card p-4 animate-fade-in">
          <span className="font-bold text-primary mb-2 block">Notifications</span>
          <div className="space-y-2">
            {notifications.map((n, i) => (
              <div key={i} className="bg-background-surface rounded-xl p-2 text-sm text-text-primary flex justify-between items-center">
                <span>{n.text}</span>
                <span className="text-text-muted text-xs ml-2">{n.time}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// 14. Trending Courses Carousel
const trendingCourses = [
  {
    title: 'Spanish for Beginners',
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
    instructor: 'Maria Garcia',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    rating: 4.7,
    students: 6273,
    category: 'Languages',
    level: 'Beginner',
  },
  {
    title: 'Advanced Machine Learning',
    image: 'https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=400&q=80',
    instructor: 'Emily Zhang',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    rating: 4.9,
    students: 8421,
    category: 'Tech & Coding',
    level: 'Advanced',
  },
  {
    title: 'Photography Masterclass',
    image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=400&q=80',
    instructor: 'Laura Kennedy',
    avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
    rating: 4.8,
    students: 8127,
    category: 'Creative Arts',
    level: 'All',
  },
];
function TrendingCoursesCarousel() {
  const [index, setIndex] = useState(0);
  const course = trendingCourses[index];
  function next() { setIndex((i) => (i + 1) % trendingCourses.length); }
  function prev() { setIndex((i) => (i - 1 + trendingCourses.length) % trendingCourses.length); }
  return (
    <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="max-w-2xl mx-auto my-12">
      <div className="relative bg-background-card rounded-2xl shadow-card p-8 flex flex-col items-center text-center hover:scale-105 hover:shadow-glow transition-all duration-300">
        <img src={course.image} alt={course.title} className="w-full h-40 object-cover rounded-xl mb-4" />
        <h3 className="text-xl font-bold mb-2">{course.title}</h3>
        <div className="flex items-center gap-2 mb-2">
          <img src={course.avatar} alt={course.instructor} className="w-8 h-8 rounded-full" />
          <span className="text-accent-purple text-sm font-semibold">{course.instructor}</span>
        </div>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-accent-purple text-sm font-semibold">{course.category}</span>
          <span className="text-text-muted text-xs">• {course.level}</span>
        </div>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-accent-purple text-sm font-semibold">Rating:</span>
          <span className="text-text-muted text-xs">{course.rating.toFixed(1)}</span>
        </div>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-accent-purple text-sm font-semibold">Students:</span>
          <span className="text-text-muted text-xs">{course.students.toLocaleString()}</span>
        </div>
        <div className="flex gap-2 mt-4">
          <button onClick={prev} className="rounded-full bg-background-surface p-2 hover:bg-primary hover:text-white transition"><span>&larr;</span></button>
          <button onClick={next} className="rounded-full bg-background-surface p-2 hover:bg-primary hover:text-white transition"><span>&rarr;</span></button>
        </div>
        <div className="flex gap-1 mt-3 justify-center">
          {trendingCourses.map((_, i) => (
            <span key={i} className={`w-2 h-2 rounded-full ${i === index ? 'bg-primary' : 'bg-border'} transition`} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// Helper for fallback image
function FallbackImage({ src, alt, className, fallback }) {
  const [error, setError] = useState(false);
  return error ? (
    fallback || <span className={className} role="img" aria-label={alt}>📅</span>
  ) : (
    <img src={src} alt={alt} className={className} onError={() => setError(true)} />
  );
}

// 2. Refined CTA Section
function RefinedCTA() {
  return (
    <motion.section initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 1 }}
      className="max-w-7xl mx-auto px-8 py-20 text-center rounded-2xl bg-gradient-to-br from-accent-purple/40 via-primary/30 to-background-surface/80 shadow-card relative overflow-hidden my-16">
      <motion.div initial={{ scale: 0.95 }} whileInView={{ scale: 1 }} transition={{ duration: 0.7 }}>
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-white drop-shadow-lg">Start Your Learning Journey Today</h2>
        <p className="text-lg text-text-secondary mb-8 max-w-2xl mx-auto">Join millions of learners worldwide and unlock your potential with interactive courses designed for real skill mastery.</p>
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.97 }}
          className="px-8 py-4 rounded-full bg-primary text-white font-bold text-xl shadow-card hover:shadow-glow focus:outline-none focus:ring-4 focus:ring-accent-purple transition-all animate-pulse"
        >
          Get Started for Free
        </motion.button>
      </motion.div>
      {/* Confetti effect (simple dots) */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(18)].map((_, i) => (
          <span key={i} className="absolute rounded-full bg-accent-purple/40" style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, width: 8 + Math.random() * 8, height: 8 + Math.random() * 8, opacity: 0.5 + Math.random() * 0.5 }} />
        ))}
      </div>
    </motion.section>
  );
}

// 3. Refined Community Progress
function RefinedCommunityProgress() {
  const progress = 78;
  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="bg-background-card rounded-2xl p-8 shadow-card flex flex-col items-center gap-3 max-w-xs mx-auto my-12 relative">
      <div className="relative w-28 h-28 mb-2">
        <svg width="112" height="112">
          <circle cx="56" cy="56" r="48" fill="none" stroke="#23234a" strokeWidth="10" />
          <motion.circle
            cx="56" cy="56" r="48" fill="none"
            stroke="#22c55e"
            strokeWidth="10"
            strokeDasharray={2 * Math.PI * 48}
            strokeDashoffset={2 * Math.PI * 48 * (1 - progress / 100)}
            initial={{ strokeDashoffset: 2 * Math.PI * 48 }}
            animate={{ strokeDashoffset: 2 * Math.PI * 48 * (1 - progress / 100) }}
            transition={{ duration: 1 }}
            style={{ filter: 'drop-shadow(0 0 8px #22c55e88)' }}
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-3xl font-extrabold text-success">{progress}%</span>
        <span className="absolute top-2 right-2 w-4 h-4 rounded-full bg-success animate-pulse border-2 border-background-card" />
      </div>
      <span className="text-lg font-bold text-primary">Community Progress</span>
      <span className="text-text-secondary text-sm">{progress}% of learners completed their weekly goal</span>
    </motion.div>
  );
}

// 4. Refined FAQ Accordion
function RefinedFAQAccordion() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="max-w-2xl mx-auto my-12">
      <h2 className="text-2xl font-extrabold mb-6">Quick Tips & FAQ</h2>
      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <div key={i} className={`bg-background-card rounded-2xl shadow-card p-4 transition-all duration-300 ${open === i ? 'ring-2 ring-primary' : ''}` }>
            <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex justify-between items-center font-bold text-left text-text-primary focus:outline-none">
              <span className="flex items-center gap-2">
                <span className="text-xl">{open === i ? '💡' : '❓'}</span>
                {faq.q}
              </span>
              <span className={`transform transition-transform ${open === i ? 'rotate-90 text-primary' : 'rotate-0 text-text-muted'}`}>▶</span>
            </button>
            <motion.div initial={false} animate={{ height: open === i ? 'auto' : 0, opacity: open === i ? 1 : 0 }} className="overflow-hidden text-text-secondary text-sm mt-2">
              {open === i && <div>{faq.a}</div>}
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
}

// 5. Refined Explore by Category
const categories = [
  { name: 'Tech & Coding', icon: '💻' },
  { name: 'Business', icon: '📈' },
  { name: 'Creative Arts', icon: '🎨' },
  { name: 'Languages', icon: '🌐' },
  { name: 'Lifestyle', icon: '🏄' },
];

// 6. Refined Hero Section
function RefinedHero() {
  return (
    <motion.section initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="max-w-7xl mx-auto px-8 py-14 flex flex-col md:flex-row items-center gap-12">
      <div className="flex-1 space-y-6">
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
          Master New Skills with <span className="text-accent-purple">Interactive Learning</span>
        </h1>
        <p className="text-xl text-text-secondary max-w-xl">
          Personalized, gamified education that adapts to your learning style. Join millions of learners worldwide on their journey to mastery.
        </p>
        <div className="flex gap-4 mt-6">
          <Button size="lg" variant="primary">Start Learning For Free</Button>
          <Button size="lg" variant="secondary">Watch Demo</Button>
        </div>
        <div className="mt-8 flex items-center gap-3 text-text-muted text-sm">
          <span className="rounded-full bg-success w-2 h-2 animate-pulse inline-block"></span>
          10M+ Learners Worldwide
        </div>
      </div>
      <div className="flex-1 flex justify-center items-center">
        {/* Use a high-quality SVG illustration from unDraw or similar */}
        <FallbackImage src="/hero_illustration.svg" alt="Online Learning Illustration" className="w-[380px] h-[280px] object-contain animate-fade-in" fallback={<span className="text-6xl">🎓</span>} />
      </div>
    </motion.section>
  );
}

export default function Home() {
  const [activeCat, setActiveCat] = useState(0);
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-background-gradientFrom via-background-gradientVia to-background-gradientTo text-text-primary font-sans">
      {/* Hero Section */}
      <RefinedHero />
      {/* Stats Bar */}
      <motion.section initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }} className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 px-8 pb-14">
        {[
          { label: 'Global Learners', value: 10000000, display: '10M+' },
          { label: 'Interactive Courses', value: 1000, display: '1,000+' },
          { label: 'Expert Instructors', value: 200, display: '200+' },
          { label: 'Completion Rate', value: 92, display: '92%' },
        ].map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 * i }} className="bg-background-card rounded-2xl p-6 flex flex-col items-center shadow-card">
            <AnimatedCounter value={stat.display} className="text-3xl font-extrabold text-primary" />
            <span className="text-text-muted text-sm mt-2 uppercase tracking-wider">{stat.label}</span>
          </motion.div>
        ))}
      </motion.section>
      {/* Featured Courses */}
      <motion.section initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.4 }} className="max-w-7xl mx-auto px-8 pb-14">
        <h2 className="text-3xl font-extrabold mb-8">Featured Courses</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {featuredCourses.map((course) => (
            <Card key={course.title}>
              <div className="h-40 w-full bg-background-surface rounded-xl mb-4 flex items-center justify-center">
                <img src={course.image} alt={course.title} className="w-full h-full object-cover rounded-xl" />
              </div>
              <h3 className="text-xl font-bold mb-2">{course.title}</h3>
              <div className="flex items-center gap-2">
                <img src={course.avatar} alt={course.instructor} className="w-8 h-8 rounded-full" />
                <span className="text-accent-purple text-sm font-semibold">{course.instructor}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-accent-purple text-sm font-semibold">{course.category}</span>
                <span className="text-text-muted text-xs">• {course.level}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-accent-purple text-sm font-semibold">Rating:</span>
                <span className="text-text-muted text-xs">{course.rating.toFixed(1)}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-accent-purple text-sm font-semibold">Students:</span>
                <span className="text-text-muted text-xs">{course.students.toLocaleString()}</span>
              </div>
            </Card>
          ))}
        </div>
      </motion.section>
      {/* Category Explorer */}
      <motion.section initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.6 }} className="max-w-7xl mx-auto px-8 pb-14">
        <h2 className="text-3xl font-extrabold mb-8">Explore by Category</h2>
        <div className="flex gap-4 mb-6">
          {categories.map((cat, idx) => (
            <button key={cat.name} className={`px-5 py-2 rounded-full font-bold transition border-2 ${activeCat === idx ? 'bg-primary text-white border-primary' : 'bg-background-surface text-text-secondary border-border hover:bg-background-card hover:text-primary'}`} onClick={() => setActiveCat(idx)}>
              {cat.name}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {['Python', 'JavaScript', 'Machine Learning', 'Cybersecurity', 'React', 'DevOps', 'Design', 'Spanish'].map((skill) => (
            <div key={skill} className="bg-background-card rounded-2xl p-5 flex items-center justify-center text-lg font-semibold text-primary shadow-card hover:scale-105 hover:shadow-glow transition cursor-pointer">{skill}</div>
          ))}
        </div>
      </motion.section>
      {/* Value Props */}
      <motion.section initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.8 }} className="max-w-7xl mx-auto px-8 pb-14 grid grid-cols-1 md:grid-cols-4 gap-8">
        {[
          { icon: '🎯', title: 'Interactive Learning', desc: 'Enjoy in-app live events, exercises, interviews, and real-world projects.' },
          { icon: '🧭', title: 'Personalized Paths', desc: 'All course recommendations adapt to your ongoing needs, pace, and goals.' },
          { icon: '📈', title: 'Progress Tracking', desc: 'Monitor your advancement with analytics and achievement systems.' },
          { icon: '🤝', title: 'Community Support', desc: 'Connect with fellow learners and instructors for growth and collaboration.' },
        ].map((prop) => (
          <Card key={prop.title}>
            <div className="text-4xl mb-4">{prop.icon}</div>
            <h3 className="text-xl font-bold mb-2">{prop.title}</h3>
            <p className="text-text-secondary">{prop.desc}</p>
          </Card>
        ))}
      </motion.section>
      {/* Call to Action */}
      <RefinedCTA />
      <RefinedCommunityProgress />
      <TestimonialsCarousel />
      <LazySection className="max-w-7xl mx-auto px-8 py-14">
        <h2 className="text-3xl font-extrabold mb-8">Recent Activity</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {recentActivity.map((activity) => (
            <Card key={activity.user}>
              <div className="flex items-center gap-4">
                <img src={activity.avatar} alt={activity.user} className="w-12 h-12 rounded-full" />
                <div>
                  <span className="text-accent-purple font-bold">{activity.user}</span>
                  <span className="text-text-muted text-sm">{activity.time}</span>
                </div>
              </div>
              <p className="text-text-secondary">{activity.action} {activity.item}</p>
            </Card>
          ))}
        </div>
      </LazySection>
      <LazySection className="max-w-7xl mx-auto px-8 py-14">
        <h2 className="text-3xl font-extrabold mb-8">Leaderboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {leaderboard.map((user) => (
            <Card key={user.name}>
              <div className="flex items-center gap-4">
                <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full" />
                <div>
                  <span className="text-accent-purple font-bold">{user.name}</span>
                  <span className="text-text-muted text-sm">XP: {user.xp}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </LazySection>
      <LazySection className="max-w-7xl mx-auto px-8 py-14">
        <h2 className="text-3xl font-extrabold mb-8">Upcoming Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {events.map((event) => (
            <Card key={event.title}>
              <div className="flex items-center gap-4">
                <FallbackImage src="/event_icon.svg" alt="Event Icon" className="w-12 h-12" fallback={<span className="text-3xl">📅</span>} />
                <div>
                  <span className="text-accent-purple font-bold">{event.title}</span>
                  <span className="text-text-muted text-sm">{event.date} at {event.time}</span>
                </div>
              </div>
              <p className="text-text-secondary">{event.instructor}</p>
            </Card>
          ))}
        </div>
      </LazySection>
      <LazySection className="max-w-7xl mx-auto px-8 py-14">
        <h2 className="text-3xl font-extrabold mb-8">FAQ</h2>
        <RefinedFAQAccordion />
      </LazySection>
      <LazySection className="max-w-7xl mx-auto px-8 py-14">
        <h2 className="text-3xl font-extrabold mb-8">Animated Skill Tree</h2>
        <AnimatedSkillTree />
      </LazySection>
      <LiveChatWidget />
      <NotificationsWidget />
      <TrendingCoursesCarousel />
    </div>
  );
}

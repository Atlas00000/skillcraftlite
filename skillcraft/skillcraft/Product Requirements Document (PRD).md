 Product Requirements Document (PRD)
1. Product Overview
Product Name: SkillCraft
Tagline: Master skills. Unleash potential. Anywhere.

Mission: Empower learners worldwide to master skills through interactive, personalized, and gamified education.
Vision: Become the Netflix of Skills Development by 2030.

Product Summary:
SkillCraft is a skill-based learning platform offering personalized learning paths, gamified experiences, and project-based certification programs. It leverages AI-driven recommendations, community learning, and real-world skill application — accessible across web and mobile platforms.

2. Problem Statement
Traditional e-learning is passive, uninspiring, and lacks engagement.

There's a gap in gamified, project-based, cross-disciplinary learning that adapts to real-world career needs.

Lack of personalized learning pathways tuned to the evolving skill demands of the future economy.

3. Goals and Objectives
✅ Deliver an engaging, personalized, and gamified learning platform.

✅ Support career advancement, hobby exploration, and corporate upskilling.

✅ Integrate real-world projects, certifications, and industry partnerships.

✅ Provide seamless experiences across devices (Web, Mobile, Tablet).

✅ Enable offline learning and social collaboration features.

4. Target Audience

Segment	Description
Professionals	Career upskilling in tech, business, and leadership.
Students	Supplemental STEM, language, and creative learning.
Hobbyists	Photography, cooking, arts, and lifestyle skills.
Instructors	Educators monetizing courses and mentoring learners.
Corporations	Team training, custom skill development programs.
Demographics: Ages 16–45, global users (English, Spanish, Hindi, Mandarin).

5. Key Features & Functionalities
5.1 Core Interfaces

Interface	Features
Home Page	Cinematic dark mode, hero section with CTA, trending courses, skill categories carousel.
Dashboard	Progress wheel, skill tree, AI recommendations, XP badges and streaks.
Course Interface	Split-view: Video/Simulation + Interactive Notebook, Mid-lesson Quizzes, XP progress bars.
Social Community	Study groups, mentorship matching, live workshops, peer reviews.
Mobile Experience	Swipeable card lessons, offline mode, voice interaction for language learning.
Portfolio Builder	Showcase projects, certifications, badges; exportable to LinkedIn.
5.2 Gamification
XP Points, Daily Streaks, Achievements Badges.

Leaderboards by course, region, global.

Story-driven challenges (e.g., quests to earn certifications).

5.3 Project-Based Learning
Real-world capstone projects with peer feedback loops.

Cross-disciplinary challenges (ex: "Design a sustainable city using AI and creative arts").

Certification partnerships (Adobe, Microsoft, AWS).

5.4 Adaptive Learning & AI Personalization
Learning Path Recommendations (AI-driven).

Adaptive quiz difficulty based on performance.

Chatbot Tutoring Assistant (LangChain + TensorFlow based).

6. Technology Stack

Area	Technology
Frontend	Next.js + TypeScript, Tailwind CSS, Shadcn UI/MUI, Zustand, Three.js, React Flow
Backend	NestJS, PostgreSQL, MongoDB, Prisma, Mongoose, Socket.io/Liveblocks
AI/ML	TensorFlow (Adaptive Learning Engine), LangChain (AI Tutoring Bots)
Hosting	Vercel (Frontend), AWS (Backend, Storage, AI services)
Integrations	Stripe, PayPal, NextAuth.js, Mixpanel, Daily.co/Zoom API
DevOps	GitHub Actions, Docker, AWS Lambda, Terraform, Kubernetes

## Backend Dependency & Prisma Management Best Practices

To prevent version mismatches and type errors (like those encountered with Prisma) in a monorepo, adopt the following best practices:

1. **Single Source of Truth for Dependencies**
   - Keep shared dependencies (e.g., `@prisma/client`, `prisma`, `@playwright/test`) only in the root `package.json`.
   - Do not add these dependencies to sub-apps' `package.json` files.
   - This ensures all parts of the monorepo use the same version.

2. **Clean Install Process**
   - When upgrading or troubleshooting, always:
     - Remove all `node_modules` folders (root and sub-apps).
     - Remove all lockfiles (`pnpm-lock.yaml`, etc.).
     - Reinstall dependencies from the root.

3. **Prisma Client Generation**
   - Maintain a single, authoritative `schema.prisma` file.
   - Always generate the Prisma client from this schema at the root.
   - Use the correct `--schema` path if your schema is not in the default location.

4. **Consistent Imports**
   - Always import Prisma from the root install:
     ```ts
     import { PrismaClient } from '@prisma/client';
     ```
   - Never use relative imports or import from sub-app `node_modules`.

5. **Workspace & Tooling Configuration**
   - Use workspace tools (e.g., pnpm workspaces, Turborepo) with hoisting enabled for shared dependencies.
   - Regularly audit your workspace configuration to ensure no duplicate dependencies.

6. **Documentation & Onboarding**
   - Document these practices in the PRD and developer onboarding guides.
   - Add a troubleshooting section for common Prisma and dependency errors.

7. **CI/CD Safeguards**
   - Add a CI check to fail builds if multiple versions of critical dependencies are detected.
   - Run `pnpm dedupe` or similar tools as part of your pipeline.

8. **E2E Testing with Playwright**
   - Keep `@playwright/test` only in the root package.json.
   - Run Playwright tests using the root installation:
     ```bash
     # From the root directory
     pnpm test:e2e:client

     # From the skillcraft directory
     pnpm test:e2e

     # From the client directory
     pnpm test:e2e
     ```
   - All test scripts should reference the same Playwright configuration.
   - If you encounter "test() is not defined" or similar errors, it's likely due to multiple Playwright versions.

By following these practices, you will:
- Avoid type and runtime errors due to version mismatches.
- Ensure smooth upgrades and onboarding for new developers.
- Maintain a robust, scalable backend architecture.
- Prevent Playwright test runner issues in the monorepo.

## E2E Testing, Errors & Fixes

### Playwright E2E Test Runner Issue (Version Mismatch)

**Problem:**
- Playwright tests failed with errors like `test() is not defined` or `test.beforeAll() is not defined`.
- Root cause: Multiple versions of `@playwright/test` installed in the monorepo (root and sub-apps), causing version mismatches and test runner errors.

**Solution:**
1. **Single Source of Truth for Playwright**
   - Kept `@playwright/test` only in the root `package.json`.
   - Removed all sub-app Playwright dependencies.
2. **Unified Configuration**
   - Added a root-level `playwright.config.ts` file.
   - All test scripts reference this configuration.
3. **Clean Install**
   - Deleted all `node_modules` and lockfiles.
   - Reinstalled dependencies from the root.
4. **Consistent Test Scripts**
   - All test scripts in the monorepo use the root Playwright installation and config.
5. **Documentation**
   - Added troubleshooting tips and best practices to the PRD.

**How to Run Tests:**
- You can run Playwright tests from the root, the `skillcraft` directory, or the `client` directory. All commands use the same Playwright installation and configuration.

**Why This Works:**
- Only one version of Playwright is used in the monorepo.
- All test scripts and configuration are unified.
- Prevents version mismatch errors and ensures reliable E2E testing.

**Troubleshooting Tips:**
- If you see errors like `test() is not defined`, check for multiple Playwright installations.
- Always keep E2E test dependencies only in the root `package.json`.
- Clean all `node_modules` and lockfiles before reinstalling dependencies.
- Document any fixes and update onboarding guides to prevent future issues.

By following these practices, you ensure robust, maintainable, and scalable E2E testing in your monorepo.

7. Design Principles
Visual Ethos: FAANG-style (Apple minimalism + Netflix dark cinematic palette).

Micro-Interactions: Google's Material Motion (300ms transitions).

Layouts: Facebook's grid-based modular hierarchy.

Navigation: TikTok-style gesture navigation for mobile.

Personalization: Amazon-like dynamic UI recommendations.

3D and Neumorphism: Light WebGL simulations, neumorphic card textures.

Data Viz: Google Analytics-style crisp, minimalist data charts.

Loading/Empty States: Slack-like illustrations, LinkedIn's skeleton loaders.

8. User Journeys (Examples)

Journey	Steps
New User Onboarding	Welcome > Choose Skill Interests > Personalize Learning Path > Start Free Lesson.
Daily Learning Journey	Dashboard > Resume Lesson > Mid-quiz Challenge > Earn XP/Badge.
Project Submission	Complete project > Submit > Peer Review > Showcase on Portfolio.
Peer Collaboration	Join Study Group > Collaborate Live > Attend Weekly Workshop.
Certification Sharing	Earn Badge > Share to LinkedIn > Add to Portfolio.
9. Performance Metrics
Activation Rate: % completing first lesson.

Retention Rate: % returning users weekly/monthly.

Completion Rate: % completing full learning paths.

XP Earned: Average XP per user per week.

Peer Interaction Rate: % participating in groups/projects.

10. Milestones & Phases

Phase	Deliverables
Phase 1 - MVP	Core user onboarding, Dashboard, Course module, Project submission
Phase 2 - Gamification Launch	XP system, Leaderboards, Badges, Daily Streaks
Phase 3 - Social/Community	Peer groups, Live workshops, Mentorship
Phase 4 - AI Personalization	Learning path AI, Adaptive quizzes, AI Tutoring
Phase 5 - Corporate Expansion	Company team plans, Instructor monetization tools
11. Risks & Assumptions
Risk: Heavy 3D elements (WebGL) may impact mobile performance.

Mitigation: Progressive enhancement with fallback static visuals.

Risk: Over-complexity in gamification may distract users.

Mitigation: UX testing at each gamification feature rollout.

Assumption: Users will prefer blended project-based and bite-sized content.

12. References & Design Inspirations
MasterClass - Cinematic, inspirational learning visuals. master.png

Brilliant.org - Interactive problem solving and gamification. bri.png

Google Classroom - Easy navigation and collaborative tools. google.png

Duolingo - Gamified learning paths and mobile optimization.

(Reference images: uploaded.)

optimized folder structure:

bash
Copy
Edit
skillcraft/
├── apps/
│   ├── client/                       # Presentation Layer (Next.js + TS)
│   │   ├── app/                      # App Router routes
│   │   ├── components/               # Reusable UI components
│   │   ├── features/                 # Feature-based folders (Dashboard, Course, Profile, Auth)
│   │   ├── lib/                      # Hooks, helpers, API clients
│   │   ├── services/                 # Frontend API wrappers (fetchers for backend)
│   │   ├── public/                   # Static assets (images, fonts)
│   │   ├── styles/                   # Tailwind CSS / Global Styles
│   │   ├── types/                    # Frontend-specific TypeScript types
│   │   ├── locales/                  # i18next translations
│   │   ├── .env.local                # NEXT_PUBLIC_* vars
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   └── server/                       # Application Layer (NestJS + TS)
│       ├── src/
│       │   ├── modules/              # Feature Modules (auth, users, courses, projects)
│       │   │   ├── auth/
│       │   │   ├── user/
│       │   │   ├── course/
│       │   │   ├── project/
│       │   │   └── portfolio/
│       │   ├── common/               # Global utilities (guards, filters, pipes)
│       │   ├── config/               # App configs (env, database)
│       │   ├── main.ts               # Entry bootstrap
│       ├── test/                     # Integration and E2E tests
│       ├── .env                      # Backend env vars
│       ├── package.json
│       └── tsconfig.json
│
├── db/                                # Data Layer (PostgreSQL + MongoDB + Prisma)
│   ├── prisma/                        # PostgreSQL schema + migrations
│   │   ├── schema.prisma
│   │   ├── migrations/
│   ├── mongo/                         # MongoDB schemas (for unstructured data)
│   │   ├── activityLog.schema.ts
│   │   ├── userContent.schema.ts
│   ├── seed/                          # Seed data scripts
│   ├── docker-compose.yml             # Local dev DBs (Postgres & Mongo)
│
├── services/                          # Independent Microservices
│   ├── ai-engine/                     # Python/TensorFlow Microservice for AI adaptivity
│   │   ├── src/
│   │   ├── requirements.txt
│   │   └── Dockerfile
│   ├── real-time/                     # Socket.io / Liveblocks server (for live classes)
│   │   ├── src/
│   │   └── Dockerfile
│
├── shared/                            # Shared cross-cutting libraries
│   ├── types/                         # Shared TS types/interfaces (User, Course, Project, etc.)
│   ├── schemas/                       # Zod validation schemas (server + client)
│   ├── utils/                         # Reusable utilities (date formatting, ID generators)
│   ├── constants/                     # App-wide constants (roles, permissions, paths)
│   └── config/                        # Shared configs (eslint, prettier, tailwind)
│
├── infra/                             # Infrastructure as Code (IaC)
│   ├── terraform/                     # AWS Infra: RDS, S3, EC2, VPC
│   ├── k8s/                            # Kubernetes Helm charts and manifests
│
├── docker/                            # Containerization configs
│   ├── client.Dockerfile               # Client Docker build
│   ├── server.Dockerfile               # Server Docker build
│   ├── docker-compose.prod.yml         # Full prod setup
│
├── .github/                            # GitHub Actions CI/CD
│   ├── workflows/
│   │   ├── client-ci.yml               # Build/test client
│   │   ├── server-ci.yml               # Build/test server
│   │   ├── deploy.yml                  # Deploy workflow
│
├── scripts/                            # Utility scripts
│   ├── build.sh
│   ├── deploy.sh
│   └── seed-db.sh
│
├── pnpm-workspace.yaml                 # Monorepo workspace config
├── turbo.json                          # Turborepo build and cache config
├── package.json                        # Root-level scripts and dev dependencies
├── tsconfig.base.json                  # Base TypeScript config for all projects
└── README.md                           # Onboarding, architecture guide


SkillCraft UI Guide
1. Color Palette
Primary Background:
from-[#0a0a23] via-[#18182f] to-[#1a1333] (deep blue/purple gradient)
Surface/Section Backgrounds:
#18182f, #23234a (dark, slightly varied for card/section contrast)
Accent Colors:
Blue: #2563eb, #60a5fa, #2563eb (buttons, links, highlights)
Purple: #a21caf, #6d28d9 (secondary accents, gradients)
Text:
Primary: #fff
Secondary: #cbd5e1, #94a3b8 (muted grays)
Borders/Dividers:
#23234a, #3b3b5c (subtle, for separation)
Success/Info:
Green: #22c55e
Info: #38bdf8
2. Typography
Font Family:
Sans-serif (e.g., Inter, system-ui, sans-serif)
Headings:
Large, bold, tight leading (font-extrabold, leading-tight)
Use color accents for keywords (e.g., <span className="text-purple-400">)
Body:
Clean, readable, moderate size (text-base to text-lg)
Muted for secondary info (text-gray-300)
Labels/Tags:
All-caps, small, tracking-wide (uppercase, tracking-wider, text-xs)
3. Spacing & Layout
Max Width:
max-w-7xl mx-auto for main content
Section Padding:
px-8 py-14 for desktop, reduced on mobile
Card Padding:
p-5 to p-8 for cards and sections
Grid System:
Use responsive grids (grid-cols-1 sm:grid-cols-2 md:grid-cols-4)
Rounded Corners:
rounded-2xl for cards/sections, rounded-full for buttons and avatars
4. Components & Patterns
Header
Logo left, nav center, auth actions right
Sticky or static, with shadow on scroll (optional)
Responsive collapse to hamburger on mobile
Hero
Two-column layout (text + illustration)
Large headline, subheadline, two CTAs
Progress bar widget for gamification
Social proof (e.g., "10M+ Learners")
Stats Bar
Animated counters
Four key stats, bold numbers, muted labels
Cards
Used for courses, testimonials, value props, etc.
Shadow, border, hover scale/glow
Image top, content below
Tabs/Category Explorer
Horizontal tabs with animated underline
Active tab: accent color, underline
Tab content: skill chips, animated on hover
Buttons
Primary: Blue, bold, rounded, shadow, scale on hover
Secondary: Dark, bordered, subtle hover
All: transition, focus:outline-none, focus:ring
FAQ Accordion
Expand/collapse with smooth animation
Chevron rotates
Testimonials Carousel
Card with avatar, quote, name, title
Slide/fade transitions, dot navigation
Footer
Three columns: logo, nav links, social icons
Muted, with hover color transitions
5. Visual Effects & Animation
Framer Motion for:
Section fade/slide-in on scroll
Animated counters
Carousel transitions
FAQ expand/collapse
Button/card scale and glow
Animated progress bars
Tailwind for:
Hover, focus, and transition states
Responsive design
6. Imagery & Icons
Avatars:
Circular, bordered, shadowed
Course Images:
Rounded, object-cover, zoom on hover
SVGs:
Custom illustrations for hero/empty states
Icons:
Emoji or SVG, large and colorful for value props
7. Responsiveness
Mobile:
Stack columns, reduce padding, increase font size for touch
Tablet/Desktop:
Multi-column layouts, more spacing
8. Accessibility
Color Contrast:
Ensure all text/buttons meet WCAG AA
Focus States:
Visible outlines/rings on all interactive elements
ARIA Labels:
For navigation, carousels, accordions
Keyboard Navigation:
All controls accessible via keyboard
9. Micro-Interactions
Pulsing CTAs
Live/animated dots for "active" or "online" indicators
Skill chips and tabs animate on hover
Cards lift and glow on hover
Progress bars animate on load
10. Content Hierarchy
Section Headings:
Large, bold, spaced for scanning
Primary Actions:
Visually dominant, repeated as needed
Secondary Info:
Muted, smaller, less visual weight
11. Reusable Component Library
Create a /components directory for:
Button
Card
Section
TabBar
Accordion
Carousel
ProgressBar
Stat
Avatar
Props for all components to allow easy reuse and customization
12. Design Tokens (Optional for Scaling)
Colors, spacing, font sizes, border radii, shadows as variables (via Tailwind config or CSS variables)
13. Sample Usage for New Pages
Dashboard:
Use cards, stats, progress bars, tabs, and value props
Course Page:
Hero, progress, tabs for lessons/resources, FAQ, testimonials
Profile:
Avatar, stats, badges, cards for achievements
Onboarding:
Stepper, progress bar, cards, CTA, FAQ
14. Design Consistency Checklist
Use only the defined color palette and typography
All sections/cards/buttons use the same border radius and shadow
All interactive elements have hover/focus/active states
Spacing and grid system are consistent across pages
Animations are smooth, subtle, and not distracting
All icons/images are styled as per guide
Responsive and accessible by default
15. Reference
This homepage is your "north star" for all new pages.
When in doubt, match the layout, spacing, and visual style of the homepage.
Use the /components directory for all new UI elements.



📦 Structure Highlights
Vertical Separation: apps/client, apps/server, db/, services/, infra/

Horizontal Layers: Inside each app (features/modules)

Monorepo Best Practice: pnpm-workspace.yaml and turbo.json ensure isolated builds.

Containerization: Dockerfiles and docker-compose for local and prod.

Real-Time Ready: Separate real-time microservice (Socket.io / Liveblocks).

AI Engine Ready: TensorFlow-powered microservice for adaptive learning AI.

Shared Everything: Common types, schemas, constants across client/server.


MVP Feature Prioritization Table (SkillCraft)

Feature	Priority	Description	Complexity (Dev + Tech)	Notes
User Authentication	Must-Have	Sign-up/login via email, OAuth (Google)	🟨 Medium (NextAuth.js setup + OAuth)	Secure login required; email + Google first, SSO later.
Personalized Dashboard	Must-Have	Progress wheel, skill recommendations, daily goals	🟥 High (AI recs + real-time updates)	Use static recommendations at MVP, full AI in later phase.
Course Module	Must-Have	Video player + interactive notebook (split-screen)	🟥 High (custom media player, note-taking module)	Can use existing libraries like Plyr.js; focus on minimal friction.
Skill Tree Visualization	Should-Have	Interactive skill tree maps	🟥 High (React Flow, custom design)	Static skill paths first, full drag-and-drop later.
Gamification (XP, Badges)	Must-Have	XP points, badge unlocks, progress tracking	🟨 Medium (backend + frontend sync)	XP tracking first; badge system next.
In-Lesson Quizzes	Must-Have	Mid-video quizzes to reinforce concepts	🟩 Low (Form builder + quiz engine)	Hardcode quizzes in MVP; dynamic quizzes later.
Responsive Mobile Layout	Must-Have	Swipeable cards, offline mode basics	🟨 Medium (PWA basics + swipe UI)	Offline mode partial (only pre-downloaded videos).
User Portfolio Builder	Nice-to-Have	Showcases projects, badges, certificates	🟨 Medium (public profiles, uploads)	Basic public profiles first, then add project uploads.
Project-Based Submissions	Should-Have	Submit capstone projects for review	🟨 Medium (upload system + review)	Peer review delayed until after MVP launch.
Certification & Badges	Should-Have	Skill completion certificates and shareable badges	🟨 Medium (PDF generator + digital badge issuing)	Minimal certification for early courses only.
Community Groups	Nice-to-Have	Study groups, basic chatrooms	🟥 High (Socket.io integration)	Launch with Discord community link first, integrate chat later.
Basic Admin Dashboard	Must-Have	Manage users, courses, reports	🟨 Medium (admin panel with RBAC)	Build with Next.js pages, Prisma admin queries.
Analytics (Mixpanel/Amplitude)	Should-Have	Track user behavior & funnel	🟩 Low (SDK integration)	Implement early to track MVP usage.
Payment Gateway	Optional for MVP	Stripe & PayPal integration	🟨 Medium (Stripe SDK)	If freemium model first, can delay until premium.
🧠 Complexity Breakdown (Simplified)

Complexity Level	Meaning	Dev Timeline Estimate
🟩 Low	Straightforward (easy integration, available SDKs)	1–3 days
🟨 Medium	Moderate complexity (customization, config, security)	3–7 days
🟥 High	High complexity (custom logic, real-time systems, 3D/UI heavy)	7–14+ days
🏗 MVP Launch Scope Recommendation
✅ Absolute Minimum Scope (4–6 Weeks Build):

User Authentication (NextAuth.js Email + OAuth)

Personalized Dashboard (no heavy AI yet — static recommendations)

Core Course Module (video + simple note-taking)

Gamification (XP system without full leaderboard yet)

Basic Mobile Responsiveness

Minimal Admin Dashboard

In-Lesson Quizzes (hardcoded)

Analytics tracking (Mixpanel basic)

🔮 Phase 2 (Post-MVP Immediate Priorities):

Real AI Personalized Recommendations

Portfolio Builder (public profile + projects)

Real Skill Tree Visualizer (dynamic with React Flow)

Community Groups (live messaging/chat)


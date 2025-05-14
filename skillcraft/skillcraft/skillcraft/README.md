# SkillCraft

Master skills. Unleash potential. Anywhere.

---

## Overview
SkillCraft is a next-generation skill-based learning platform focused on personalized, gamified, and project-based education. This monorepo is structured for scalability, maintainability, and rapid feature development, following the Product Requirements Document (PRD).

- **Tech Stack:** Next.js (TypeScript), NestJS, Prisma, MongoDB, Tailwind, Shadcn UI/MUI, Zustand, Three.js, React Flow, Docker, GitHub Actions, AWS, Vercel, and more.
- **Design:** FAANG-inspired, cinematic, accessible, and mobile-first.
- **Reference:** See `Product Requirements Document (PRD).md` for full details.

---

## Folder Structure

```
apps/
  client/    # Next.js frontend (TypeScript)
  server/    # NestJS backend (TypeScript)
db/          # Database schemas, migrations, seed scripts
services/    # Microservices (AI, real-time)
shared/      # Shared types, schemas, utils, config
infra/       # Infrastructure as code (Terraform, K8s)
docker/      # Dockerfiles and compose files
.github/     # CI/CD workflows
scripts/     # Utility scripts
```

---

## MVP Focus
- User Authentication (NextAuth.js)
- Personalized Dashboard (static recommendations)
- Course Module (video + notes)
- Gamification (XP system)
- Mobile Responsiveness
- Admin Dashboard
- In-Lesson Quizzes (hardcoded)
- Analytics (Mixpanel basic)

---

## Getting Started
1. Install dependencies: `pnpm install`
2. Set up environment variables in `apps/client/.env.local` and `apps/server/.env`
3. Start development servers for client and server
4. See `Product Requirements Document (PRD).md` for full requirements and roadmap

---

## Contributing
- Follow the folder structure and tech stack as defined in the PRD
- Use feature branches and pull requests
- Keep documentation up to date

---

## License
TBD 
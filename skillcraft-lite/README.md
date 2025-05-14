# SkillCraft Lite

A lightweight version of the SkillCraft learning platform, focused on showcasing core functionality and aesthetics.

## Project Structure

```
skillcraft-lite/
├── apps/
│   ├── client/     # Next.js frontend
│   └── server/     # NestJS backend
├── package.json
├── pnpm-workspace.yaml
├── tsconfig.json
├── .eslintrc.js
├── .prettierrc
├── docker-compose.yml
├── apps/client/Dockerfile
└── apps/server/Dockerfile
```

## Prerequisites

- Node.js (v18 or later)
- pnpm (v8 or later)
- Docker and Docker Compose (for development)

## Getting Started

### Local Development

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Start the development servers:
   ```bash
   # Start both frontend and backend
   pnpm dev

   # Start only frontend
   cd apps/client && pnpm dev

   # Start only backend
   cd apps/server && pnpm dev
   ```

### Docker Development

1. Build and start the containers:
   ```bash
   docker-compose up --build
   ```

2. Access the applications:
   - Frontend: http://localhost:3000
   - Backend: http://localhost:4000
   - Database: localhost:5432

3. Stop the containers:
   ```bash
   docker-compose down
   ```

4. View logs:
   ```bash
   # All services
   docker-compose logs -f

   # Specific service
   docker-compose logs -f frontend
   docker-compose logs -f backend
   docker-compose logs -f db
   ```

## Development

- Frontend (Next.js) is located in `apps/client`
- Backend (NestJS) is located in `apps/server`
- Shared configurations are in the root directory

## Available Scripts

- `pnpm dev` - Start all applications in development mode
- `pnpm build` - Build all applications
- `pnpm lint` - Run ESLint on all applications
- `pnpm test` - Run tests for all applications

## Tech Stack

### Frontend
- Next.js 14
- TypeScript
- Tailwind CSS
- Shadcn UI
- Zustand (State Management)
- NextAuth.js

### Backend
- NestJS
- TypeScript
- PostgreSQL
- Prisma
- JWT Authentication
- Swagger/OpenAPI

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Submit a pull request

## License

This project is licensed under the MIT License. 
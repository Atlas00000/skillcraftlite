# Production-ready Dockerfile for Next.js client app

# 1. Install dependencies and build app
FROM node:20-alpine AS builder
WORKDIR /app

# Copy package files from client and pnpm-lock.yaml from monorepo root
COPY package.json ./
COPY ../../pnpm-lock.yaml ./

# Install pnpm
RUN npm install -g pnpm

# Install dependencies
RUN pnpm install

# Install prisma as a dev dependency (for generate)
RUN pnpm add -D prisma

# Copy the rest of the app
COPY . .
# Copy the db/prisma directory for schema access
COPY ../db/prisma ./db/prisma

# Generate Prisma client (run from client context, schema path relative to client)
RUN pnpm exec prisma generate --schema=./db/prisma/schema.prisma

# Build Next.js app
RUN pnpm run build

# 2. Run app in minimal image
FROM node:20-alpine AS runner
WORKDIR /app

# Copy only necessary files from builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Expose port
EXPOSE 3000

# Start Next.js app in production mode
CMD ["pnpm", "run", "start"] 
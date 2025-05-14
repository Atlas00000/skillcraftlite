# Build stage
FROM node:18-bullseye AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies and generate package-lock.json
RUN npm install

# Copy source code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build the application
RUN npm run build

# Debug: List contents of /app and /app/dist after build
RUN ls -l /app && ls -l /app/dist || true

# Production stage
FROM node:18-bullseye

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install production dependencies
RUN npm install --omit=dev

# Copy built application from builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

# Expose port
EXPOSE 4000

# Start the application
CMD ["node", "dist/src/main"] 
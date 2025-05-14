# SkillCraft Server

This is the backend server for the SkillCraft Learning Platform, built with NestJS and Prisma.

## Prerequisites

- Node.js (v18 or later)
- PostgreSQL (v14 or later)
- Docker (optional, for containerized development)

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file in the root directory with the following variables:
   ```
   # Database
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/skillcraft?schema=public"

   # JWT
   JWT_SECRET="your-super-secret-key-change-in-production"
   JWT_EXPIRATION="7d"

   # Server
   PORT=4000
   NODE_ENV="development"

   # Frontend URL
   FRONTEND_URL="http://localhost:3000"
   ```

3. Generate Prisma client:
   ```bash
   npm run prisma:generate
   ```

4. Run database migrations:
   ```bash
   npm run prisma:migrate
   ```

## Development

Start the development server:
```bash
npm run start:dev
```

## API Documentation

The API documentation is available at `/api` when the server is running.

## Available Scripts

- `npm run build` - Build the application
- `npm run start:dev` - Start the development server
- `npm run start:debug` - Start the server in debug mode
- `npm run start:prod` - Start the production server
- `npm run lint` - Run ESLint
- `npm run test` - Run tests
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:studio` - Open Prisma Studio

## Docker

To run the application using Docker:

1. Build the image:
   ```bash
   docker build -t skillcraft-server .
   ```

2. Run the container:
   ```bash
   docker run -p 4000:4000 skillcraft-server
   ```

## License

This project is licensed under the MIT License. 
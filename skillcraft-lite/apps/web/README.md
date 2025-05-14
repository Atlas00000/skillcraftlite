# SkillCraft Lite Frontend

## Project Structure
- `src/`: Contains the source code for the Next.js application.
  - `app/`: Contains the main application pages and components.
    - `page.tsx`: The main landing page.
    - `layout.tsx`: The root layout component.
    - `globals.css`: Global styles for the application.
- `public/`: Static assets for the application.
- `Dockerfile`: Configuration for Docker deployment.
- `package.json`: Project dependencies and scripts.
- `tsconfig.json`: TypeScript configuration.
- `next.config.ts`: Next.js configuration.
- `postcss.config.mjs`: PostCSS configuration for Tailwind CSS.
- `eslint.config.mjs`: ESLint configuration.

## Getting Started
1. Install dependencies:
   ```bash
   npm install
   ```
2. Run the development server:
   ```bash
   npm run dev
   ```
3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Building for Production
```bash
npm run build
```

## Docker Deployment
```bash
docker build -t skillcraft-lite-frontend .
docker run -p 3000:3000 skillcraft-lite-frontend
```

## Testing
```bash
npm run test
```

## Contributing
Please read the contributing guidelines before submitting a pull request.

## License
This project is licensed under the MIT License.

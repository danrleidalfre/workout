# Workout

## Server
- Node + Typescript
- Docker
- Postgres
- DrizzleORM
- Fastify
- Zod

```bash
cd server
cp .env.example .env
docker compose up -d
npx drizzle-kit generate
npx drizzle-kit migrate
npm run seed
npm run dev
```

## Web
- React + Typescript
- Tailwind
- shadcn/ui
- React Query
- Axios
- React Hook Form
- Zod

```bash
cd web
cp .env.local.example .env.local
npm run dev
```

## Mobile
- React Native

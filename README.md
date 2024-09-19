# Workout

## Server
- Node + Typescript
- Docker
- Postgres
- DrizzleORM
- Fastify

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

```bash
cd web
npm run dev
```

## Mobile
- React Native

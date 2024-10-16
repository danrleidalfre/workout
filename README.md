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
npm i
docker compose up -d
npx drizzle-kit generate
npx drizzle-kit migrate
npm run seed
npm run server
```

## Web
- React + Typescript
- Tailwind
- shadcn/ui
- React Query
- Axios
- React Hook Form
- Zod
- Lucide Icons

```bash
cd web
cp .env.local.example .env.local
npm i
npm run web
```

## Mobile
- React Native + Typescript
- NativeWind
- Lucide Icons
- Axios
- React Hook Form

```bash
cd mobile
npm i
npm run mobile
```

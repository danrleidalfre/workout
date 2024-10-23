# Workout

## Roadmap
✅|Funcionalidade
:-:| -
✅|Web - Tema Light e Dark
✅|Web - CRUD de exercícios
✅|Web - Montar treino: Exercícios, séries, repetições e tempo de descanso
✅|Web - Gráficos: Últimos treinos, total de treinos nos últimos meses, séries por agrupamento (filtrar por data), volume e duração de treino semanal
✅|Web - Filtros na listagem dos exercícios e treinos
✅|Mobile - Tema Light e Dark
✅|Mobile - Iniciar treino
✅|Mobile - Definir carga e reps por exercícios
✅|Mobile - Marcar série como concluída
✅|Mobile - Temporizador com o tempo de descanso para cada conclusão de série 
✅|Mobile - Finalizar treino
✅|Mobile - Descartar treino
❌|Web - Ordenar exercícios
❌|Mobile - Adicionar séries e exercícios no treino em andamento
❌|Mobile - Remover séries e exercícios no treino em andamento
❌|Autenticação

## Server
- Node + Typescript
- Docker
- Postgres
- DrizzleORM
- Fastify
- Zod
- dayjs

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
- date-fns

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

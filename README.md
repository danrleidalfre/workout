# Workout

## Roadmap
Status|Funcionalidade
:-:| -
✅|Web/Server - CRUD de exercícios
✅|Web/Server - Montar treino: Exercícios, séries, repetições, tempo de descanso e observação por exercício
✅|Web/Server - Gráficos: Últimos treinos, total de treinos nos últimos meses, séries por agrupamento (filtrar por data), volume e duração de treino semanal
✅|Web/Server - Filtros na listagem dos exercícios e treinos
✅|Web/Mobile - Tema Light, Dark e Auto
✅|Mobile - Iniciar treino
✅|Mobile - Definir carga e reps por exercícios
✅|Mobile - Marcar série como concluída
✅|Mobile - Temporizador com o tempo de descanso para cada conclusão de série 
✅|Mobile - Finalizar treino
✅|Mobile - Descartar treino
✅|Mobile - Salvar em local storage o progresso do treino, para lembrete de continuar, caso o app for fechado
✅|Mobile/Server - Adicionar séries no treino em andamento
✅|Mobile/Server - Adicionar exercícios no treino em andamento
✅|Mobile - Notificação via push quando tempo de descanso acabar
❌|Mobile - Tempo de descanso e notificações em background
❌|Web/Mobile/Server - Autenticação

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
cp .env.example .env
npm run mobile
```

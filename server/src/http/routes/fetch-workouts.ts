import { db } from '@/db'
import { workouts } from '@/db/schema'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'

export const fetchWorkouts: FastifyPluginAsyncZod = async app => {
  app.get('/workouts', async () => {
    return await db.select().from(workouts)
  })
}

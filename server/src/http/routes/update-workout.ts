import { db } from '@/db'
import { workouts } from '@/db/schema'
import { eq } from 'drizzle-orm'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'

export const updateWorkout: FastifyPluginAsyncZod = async app => {
  app.put(
    '/workouts/:id',
    {
      schema: {
        params: z.object({
          id: z.string(),
        }),
        body: z.object({
          title: z.string(),
        }),
      },
    },
    async request => {
      const { id } = request.params
      const { title } = request.body

      await db.update(workouts).set({ title }).where(eq(workouts.id, id))
    }
  )
}

import { db } from '@/db'
import { workouts } from '@/db/schema'
import { eq } from 'drizzle-orm'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'

export const deleteWorkout: FastifyPluginAsyncZod = async app => {
  app.delete(
    '/workouts/:id',
    {
      schema: {
        params: z.object({
          id: z.string(),
        }),
      },
    },
    async request => {
      const { id } = request.params

      await db.delete(workouts).where(eq(workouts.id, id))
    }
  )
}

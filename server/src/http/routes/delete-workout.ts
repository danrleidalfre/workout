import { db } from '@/db'
import { workouts } from '@/db/schema'
import { and, eq } from 'drizzle-orm'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { auth } from '../middlewares/auth'

export const deleteWorkout: FastifyPluginAsyncZod = async app => {
  app.register(auth).delete(
    '/workouts/:id',
    {
      schema: {
        params: z.object({
          id: z.string(),
        }),
      },
    },
    async (request, reply) => {
      const { id } = request.params
      const userId = await request.getCurrentUserId()

      const [workout] = await db
        .select()
        .from(workouts)
        .where(and(eq(workouts.id, id), eq(workouts.userId, userId)))

      if (!workout) {
        return reply.code(401).send({ message: 'Unauthorized' })
      }

      await db.delete(workouts).where(eq(workouts.id, id))
    }
  )
}

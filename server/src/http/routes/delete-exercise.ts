import { db } from '@/db'
import { exercises } from '@/db/schema'
import { and, eq } from 'drizzle-orm'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { auth } from '../middlewares/auth'

export const deleteExercise: FastifyPluginAsyncZod = async app => {
  app.register(auth).delete(
    '/exercises/:id',
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

      const [exercise] = await db
        .select()
        .from(exercises)
        .where(and(eq(exercises.id, id), eq(exercises.userId, userId)))

      if (!exercise) {
        return reply.code(401).send({ message: 'Unauthorized' })
      }

      await db.delete(exercises).where(eq(exercises.id, id))
    }
  )
}

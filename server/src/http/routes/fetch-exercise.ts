import { db } from '@/db'
import { exercises, groups } from '@/db/schema'
import { and, eq } from 'drizzle-orm'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { auth } from '../middlewares/auth'

export const fetchExercise: FastifyPluginAsyncZod = async app => {
  app.register(auth).get(
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

      const [exerciseExists] = await db
        .select()
        .from(exercises)
        .where(and(eq(exercises.id, id), eq(exercises.userId, userId)))

      if (!exerciseExists) {
        return reply.code(401).send({ message: 'Unauthorized' })
      }

      const exercise = await db
        .select({
          id: exercises.id,
          exercise: exercises.title,
          group: groups.title,
        })
        .from(exercises)
        .leftJoin(groups, eq(exercises.groupId, groups.id))
        .where(eq(exercises.id, id))

      return exercise[0]
    }
  )
}

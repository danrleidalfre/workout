import { db } from '@/db'
import { exercises } from '@/db/schema'
import { and, eq } from 'drizzle-orm'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'

export const updateExercise: FastifyPluginAsyncZod = async app => {
  app.put(
    '/exercises/:id',
    {
      schema: {
        params: z.object({
          id: z.string(),
        }),
        body: z.object({
          title: z.string(),
          groupId: z.string(),
        }),
      },
    },
    async (request, reply) => {
      const { id } = request.params
      const { title, groupId } = request.body
      const userId = await request.getCurrentUserId()

      const [exercise] = await db
        .select()
        .from(exercises)
        .where(and(eq(exercises.id, id), eq(exercises.userId, userId)))

      if (!exercise) {
        return reply.code(401).send({ message: 'Unauthorized' })
      }

      await db
        .update(exercises)
        .set({ title, groupId })
        .where(eq(exercises.id, id))
    }
  )
}

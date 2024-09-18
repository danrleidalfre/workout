import { db } from '@/db'
import { exercises, groups } from '@/db/schema'
import { eq } from 'drizzle-orm'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'

export const fetchExercise: FastifyPluginAsyncZod = async app => {
  app.get(
    '/exercises/:id',
    {
      schema: {
        params: z.object({
          id: z.string(),
        }),
      },
    },
    async request => {
      const { id } = request.params

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

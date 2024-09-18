import { db } from '@/db'
import { exercises, groups } from '@/db/schema'
import { eq } from 'drizzle-orm'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'

export const fetchExercisesByGroup: FastifyPluginAsyncZod = async app => {
  app.get(
    '/exercises-by-group/:groupId',
    {
      schema: {
        params: z.object({
          groupId: z.string(),
        }),
      },
    },
    async request => {
      const { groupId } = request.params

      return await db
        .select({
          exercise: exercises.title,
        })
        .from(exercises)
        .leftJoin(groups, eq(exercises.groupId, groups.id))
        .where(eq(groups.id, groupId))
    }
  )
}

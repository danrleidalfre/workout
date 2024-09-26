import { db } from '@/db'
import { exercises, groups } from '@/db/schema'
import { eq, like } from 'drizzle-orm'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'

export const fetchExercises: FastifyPluginAsyncZod = async app => {
  app.get(
    '/exercises',
    {
      schema: {
        querystring: z.object({
          groupId: z.string().optional(),
          term: z.string().optional(),
        }),
      },
    },
    async request => {
      const { groupId, term } = request.query

      const query = db
        .select({
          id: exercises.id,
          exercise: exercises.title,
          group: groups.title,
        })
        .from(exercises)
        .leftJoin(groups, eq(exercises.groupId, groups.id))

      if (groupId) {
        query.where(eq(groups.id, groupId))
      }

      if (term) {
        query.where(like(exercises.title, `%${term}%`))
      }

      return await query
    }
  )
}

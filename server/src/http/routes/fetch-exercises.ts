import { db } from '@/db'
import { exercises, groups } from '@/db/schema'
import { and, eq, ilike } from 'drizzle-orm'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'

export const fetchExercises: FastifyPluginAsyncZod = async app => {
  app.get(
    '/exercises',
    {
      schema: {
        querystring: z.object({
          groupId: z.string().optional(),
          search: z.string().optional(),
        }),
      },
    },
    async request => {
      const { groupId, search } = request.query

      return await db
        .select({
          id: exercises.id,
          exercise: exercises.title,
          group: groups.title,
        })
        .from(exercises)
        .leftJoin(groups, eq(exercises.groupId, groups.id))
        .where(
          and(
            search ? ilike(exercises.title, `%${search}%`) : undefined,
            groupId ? eq(exercises.groupId, groupId) : undefined
          )
        )
    }
  )
}

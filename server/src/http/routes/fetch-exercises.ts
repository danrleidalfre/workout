import { db } from '@/db'
import { exercises, groups } from '@/db/schema'
import { eq } from 'drizzle-orm'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'

export const fetchExercises: FastifyPluginAsyncZod = async app => {
  app.get('/exercises', async () => {
    return await db
      .select({
        exercise: exercises.title,
        group: groups.title,
      })
      .from(exercises)
      .leftJoin(groups, eq(exercises.groupId, groups.id))
  })
}

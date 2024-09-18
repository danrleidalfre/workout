import { db } from '@/db'
import { exercises } from '@/db/schema'
import { eq } from 'drizzle-orm'
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
    async request => {
      const { id } = request.params
      const { title, groupId } = request.body

      await db
        .update(exercises)
        .set({ title, groupId })
        .where(eq(exercises.id, id))
    }
  )
}

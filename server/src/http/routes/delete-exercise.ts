import { db } from '@/db'
import { exercises } from '@/db/schema'
import { eq } from 'drizzle-orm'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'

export const deleteExercise: FastifyPluginAsyncZod = async app => {
  app.delete(
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

      await db.delete(exercises).where(eq(exercises.id, id))
    }
  )
}

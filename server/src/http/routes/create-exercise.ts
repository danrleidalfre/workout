import { db } from '@/db'
import { exercises } from '@/db/schema'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'

export const createExercise: FastifyPluginAsyncZod = async app => {
  app.post(
    '/exercises',
    {
      schema: {
        body: z.object({
          title: z.string(),
          groupId: z.string(),
        }),
      },
    },
    async request => {
      const { title, groupId } = request.body

      await db.insert(exercises).values({ title, groupId })
    }
  )
}

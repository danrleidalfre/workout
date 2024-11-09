import { db } from '@/db'
import { exercises } from '@/db/schema'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { auth } from '../middlewares/auth'

export const createExercise: FastifyPluginAsyncZod = async app => {
  app.register(auth).post(
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
      const userId = await request.getCurrentUserId()

      await db.insert(exercises).values({ title, groupId, userId })
    }
  )
}

import { db } from '@/db'
import { workouts } from '@/db/schema'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'

export const createWorkout: FastifyPluginAsyncZod = async app => {
  app.post(
    '/workouts',
    {
      schema: {
        body: z.object({
          title: z.string(),
        }),
      },
    },
    async request => {
      const { title } = request.body

      await db.insert(workouts).values({ title })
    }
  )
}

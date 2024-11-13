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
        tags: ['Exercício'],
        summary: 'Cria um exercício',
        security: [{ bearerAuth: [] }],
        body: z.object({
          title: z.string(),
          groupId: z.string(),
        }),
        response: {
          201: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { title, groupId } = request.body
      const userId = await request.getCurrentUserId()

      await db.insert(exercises).values({ title, groupId, userId })

      return reply.status(201).send({ message: 'Exercício criado com sucesso' })
    }
  )
}

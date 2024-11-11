import { db } from '@/db'
import { users } from '@/db/schema'
import { eq } from 'drizzle-orm'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { auth } from '../middlewares/auth'

export const fetchAuthenticateUser: FastifyPluginAsyncZod = async app => {
  app.register(auth).get(
    '/sessions',
    {
      schema: {
        tags: ['Autenticação'],
        summary: 'Busca os dados do usuário logado',
        security: [{ bearerAuth: [] }],
        response: {
          200: z.object({
            id: z.string(),
            name: z.string(),
            email: z.string(),
          }),
          404: z.object({ message: z.string() }),
        },
      },
    },
    async (request, reply) => {
      const userId = await request.getCurrentUserId()

      const [user] = await db
        .select({
          id: users.id,
          name: users.name,
          email: users.email,
        })
        .from(users)
        .where(eq(users.id, userId))

      if (!user) {
        return reply.status(404).send({ message: 'User não encontrado' })
      }

      return reply.status(200).send(user)
    }
  )
}

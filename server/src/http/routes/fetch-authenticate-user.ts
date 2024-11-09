import { db } from '@/db'
import { users } from '@/db/schema'
import { eq } from 'drizzle-orm'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { auth } from '../middlewares/auth'

export const fetchAuthenticateUser: FastifyPluginAsyncZod = async app => {
  app.register(auth).get('/sessions', {}, async (request, reply) => {
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
      return reply.status(400).send({ message: 'User not found' })
    }

    return user
  })
}

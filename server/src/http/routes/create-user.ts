import { db } from '@/db'
import { users } from '@/db/schema'
import { hash } from 'bcryptjs'
import { eq } from 'drizzle-orm'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'

export const createUser: FastifyPluginAsyncZod = async app => {
  app.post(
    '/users',
    {
      schema: {
        body: z.object({
          name: z.string(),
          email: z.string().email(),
          password: z.string(),
        }),
      },
    },
    async (request, reply) => {
      const { name, email, password } = request.body

      const [user] = await db.select().from(users).where(eq(users.email, email))

      if (user) {
        return reply.status(400).send({ message: 'User already exists' })
      }

      const passwordHash = await hash(password, 6)

      await db.insert(users).values({
        name,
        email,
        password: passwordHash,
      })
    }
  )
}

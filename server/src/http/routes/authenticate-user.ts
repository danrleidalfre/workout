import { db } from '@/db'
import { users } from '@/db/schema'
import { compare } from 'bcryptjs'
import { eq } from 'drizzle-orm'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'

export const authenticateUser: FastifyPluginAsyncZod = async app => {
  app.post(
    '/sessions',
    {
      schema: {
        tags: ['Autenticação'],
        summary: 'Autentica um usuário',
        body: z.object({
          email: z.string().email(),
          password: z.string(),
        }),
        response: {
          200: z.string(),
          400: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { email, password } = request.body

      const [user] = await db.select().from(users).where(eq(users.email, email))

      if (!user) {
        return reply.status(400).send({ message: 'Invalid credential' })
      }

      const isPasswordValid = await compare(password, user.password)

      if (!isPasswordValid) {
        return reply.status(400).send({ message: 'Invalid credential' })
      }

      const token = await reply.jwtSign(
        {},
        {
          sign: {
            sub: user.id,
          },
        }
      )

      const refreshToken = await reply.jwtSign(
        {},
        {
          sign: {
            sub: user.id,
            expiresIn: '7d',
          },
        }
      )

      return reply
        .setCookie('refreshToken', refreshToken, {
          path: '/',
          secure: true,
          sameSite: true,
          httpOnly: true,
        })
        .status(200)
        .send(token)
    }
  )
}

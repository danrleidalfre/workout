import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'

export const refreshToken: FastifyPluginAsyncZod = async app => {
  app.patch(
    '/sessions',
    {
      schema: {
        tags: ['Autenticação'],
        summary: 'Gera um refresh token',
        response: {
          200: z.string(),
          404: z.object({ message: z.string() }),
        },
      },
    },
    async (request, reply) => {
      await request.jwtVerify({ onlyCookie: true })

      const token = await reply.jwtSign(
        {},
        {
          sign: {
            sub: request.user.sub,
          },
        }
      )

      const refreshToken = await reply.jwtSign(
        {},
        {
          sign: {
            sub: request.user.sub,
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
        .status(201)
        .send(token)
    }
  )
}

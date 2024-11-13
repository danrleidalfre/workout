import { db } from '@/db'
import { groups } from '@/db/schema'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { auth } from '../middlewares/auth'

export const fetchGroups: FastifyPluginAsyncZod = async app => {
  app.register(auth).get(
    '/groups',
    {
      schema: {
        tags: ['Grupo Muscular'],
        summary: 'Busca os grupos musculares',
        security: [{ bearerAuth: [] }],
        response: {
          200: z.array(
            z.object({
              id: z.string(),
              group: z.string(),
            })
          ),
        },
      },
    },
    async (_, reply) => {
      const groupsResponse = await db
        .select({
          id: groups.id,
          group: groups.title,
        })
        .from(groups)

      return reply.status(200).send(groupsResponse)
    }
  )
}

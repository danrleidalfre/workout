import { db } from '@/db'
import { exercises, groups } from '@/db/schema'
import { and, eq, ilike } from 'drizzle-orm'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { auth } from '../middlewares/auth'

export const fetchExercises: FastifyPluginAsyncZod = async app => {
  app.register(auth).get(
    '/exercises',
    {
      schema: {
        tags: ['Exercício'],
        summary: 'Busca os exercícios cadastrados',
        security: [{ bearerAuth: [] }],
        querystring: z.object({
          groupId: z.string().optional(),
          search: z.string().optional(),
        }),
        response: {
          200: z.array(
            z.object({
              id: z.string(),
              title: z.string(),
              group: z.string().nullable(),
              groupId: z.string().nullable(),
            })
          ),
        },
      },
    },
    async (request, reply) => {
      const { groupId, search } = request.query
      const userId = await request.getCurrentUserId()

      const exercisesResponse = await db
        .select({
          id: exercises.id,
          title: exercises.title,
          group: groups.title,
          groupId: groups.id,
        })
        .from(exercises)
        .leftJoin(groups, eq(exercises.groupId, groups.id))
        .where(
          and(
            search ? ilike(exercises.title, `%${search}%`) : undefined,
            groupId ? eq(exercises.groupId, groupId) : undefined,
            eq(exercises.userId, userId)
          )
        )

      return reply.status(200).send(exercisesResponse)
    }
  )
}

import { db } from '@/db'
import {
  exercises,
  groups,
  workoutCompletions,
  workoutCompletionSeries,
  workouts,
} from '@/db/schema'
import { dayjs } from '@/lib/dayjs'
import { and, between, count, eq } from 'drizzle-orm'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { auth } from '../middlewares/auth'

interface SeriesByGroup {
  series: number
  group: string
}

export const fetchSeriesByGroupCompletions: FastifyPluginAsyncZod =
  async app => {
    app.register(auth).get(
      '/workouts/series-by-group-completions',
      {
        schema: {
          tags: ['Treino'],
          summary: 'Busca o total de séries agrupado por grupo muscular',
          security: [{ bearerAuth: [] }],
          querystring: z.object({
            start: z.string(),
            end: z.string(),
          }),
          response: {
            200: z.array(
              z.object({
                group: z.string(),
                series: z.number(),
              })
            ),
          },
        },
      },
      async (request, reply) => {
        const { start, end } = request.query
        const userId = await request.getCurrentUserId()

        const seriesByGroup: SeriesByGroup[] = await db
          .select({
            series: count(workoutCompletionSeries.exerciseId),
            group: groups.title,
          })
          .from(groups)
          .leftJoin(exercises, eq(exercises.groupId, groups.id))
          .leftJoin(
            workoutCompletionSeries,
            eq(workoutCompletionSeries.exerciseId, exercises.id)
          )
          .leftJoin(
            workoutCompletions,
            eq(
              workoutCompletions.id,
              workoutCompletionSeries.workoutCompletionId
            )
          )
          .leftJoin(workouts, eq(workoutCompletions.workoutId, workouts.id))
          .groupBy(groups.id)
          .where(
            and(
              between(
                workoutCompletions.end,
                dayjs(`${start} 21:00:00`).toDate(),
                dayjs(`${end} 20:59:59`).toDate()
              ),
              eq(workouts.userId, userId),
              eq(exercises.userId, userId)
            )
          )

        const groupMap = new Map<string, number>()

        seriesByGroup.map(({ series, group }) => {
          if (group === 'Tríceps' || group === 'Bíceps') {
            groupMap.set('Braços', (groupMap.get('Braços') || 0) + series)
          } else {
            groupMap.set(group, (groupMap.get(group) || 0) + series)
          }
        })

        const seriesByGroups = Array.from(groupMap.entries())
          .map(([group, series]) => ({ group, series }))
          .sort((a, b) => a.series - b.series)

        return reply.status(200).send(seriesByGroups)
      }
    )
  }

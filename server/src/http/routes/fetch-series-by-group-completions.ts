import { db } from '@/db'
import {
  exercises,
  groups,
  workoutCompletions,
  workoutCompletionSeries,
} from '@/db/schema'
import { dayjs } from '@/lib/dayjs'
import { between, count, eq } from 'drizzle-orm'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'

interface SeriesByGroup {
  series: number
  group: string
}

export const fetchSeriesByGroupCompletions: FastifyPluginAsyncZod =
  async app => {
    app.get(
      '/workouts/series-by-group-completions',
      {
        schema: {
          querystring: z.object({
            start: z.string(),
            end: z.string(),
          }),
        },
      },
      async request => {
        const { start, end } = request.query

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
          .groupBy(groups.id)
          .where(
            between(
              workoutCompletions.end,
              dayjs(`${start} 21:00:00`).toDate(),
              dayjs(`${end} 20:59:59`).toDate()
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

        return Array.from(groupMap.entries())
          .map(([group, series]) => ({ group, series }))
          .sort((a, b) => a.series - b.series)
      }
    )
  }

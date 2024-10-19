import { db } from '@/db'
import { exercises, groups, workoutCompletionSeries } from '@/db/schema'
import { count, eq } from 'drizzle-orm'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'

interface SeriesByGroup {
  series: number
  group: string
}

export const fetchSeriesByGroupCompletions: FastifyPluginAsyncZod =
  async app => {
    app.get('/workouts/series-by-group-completions', async () => {
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
        .groupBy(groups.id)

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
    })
  }

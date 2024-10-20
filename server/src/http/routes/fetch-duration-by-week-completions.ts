import { db } from '@/db'
import { workoutCompletions } from '@/db/schema'
import { dayjs } from '@/lib/dayjs'
import { between } from 'drizzle-orm'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'

export const fetchDurationByWeekCompletions: FastifyPluginAsyncZod =
  async app => {
    app.get('/workouts/duration-by-week-completions', async () => {
      const weeks = Array.from({ length: 7 }, (_, index) => {
        const startWeek = dayjs()
          .subtract(index, 'week')
          .startOf('week')
          .toDate()
        const endWeek = dayjs().subtract(index, 'week').endOf('week').toDate()

        return {
          start: startWeek,
          end: endWeek,
        }
      }).reverse()

      return await Promise.all(
        weeks.map(async week => {
          const startAndEndByWeek = await db
            .select({
              start: workoutCompletions.start,
              end: workoutCompletions.end,
            })
            .from(workoutCompletions)
            .where(between(workoutCompletions.end, week.start, week.end))

          const totalDuration = startAndEndByWeek.reduce((sum, completion) => {
            const start = dayjs(completion.start)
            const end = dayjs(completion.end)

            const diff = end.diff(start, 'hour')

            return sum + diff
          }, 0)

          return {
            week: `${dayjs(week.start).format('DD/MM')} a ${dayjs(week.end).format('DD/MM')}`,
            duration: totalDuration,
          }
        })
      )
    })
  }

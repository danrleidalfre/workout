import { db } from '@/db'
import { workoutCompletions } from '@/db/schema'
import { dayjs } from '@/lib/dayjs'
import { between, count } from 'drizzle-orm'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'

export const fetchWorkoutsByMonthCompletions: FastifyPluginAsyncZod =
  async app => {
    app.get('/workouts/workouts-by-month-completions', async () => {
      const months = Array.from({ length: 6 }, (_, index) => {
        const startMonth = dayjs()
          .subtract(index, 'month')
          .startOf('month')
          .toDate()
        const endMonth = dayjs()
          .subtract(index, 'month')
          .endOf('month')
          .toDate()

        return {
          start: startMonth,
          end: endMonth,
        }
      }).reverse()

      return await Promise.all(
        months.map(async month => {
          const [workoutByMonth] = await db
            .select({
              count: count(workoutCompletions.id),
            })
            .from(workoutCompletions)
            .where(between(workoutCompletions.end, month.start, month.end))

          return {
            month: dayjs(month.start).format('MMMM'),
            workouts: workoutByMonth.count,
          }
        })
      )
    })
  }

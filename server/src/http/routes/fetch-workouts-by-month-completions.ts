import { db } from '@/db'
import { workoutCompletions, workouts } from '@/db/schema'
import { dayjs } from '@/lib/dayjs'
import { and, between, count, eq } from 'drizzle-orm'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { auth } from '../middlewares/auth'

export const fetchWorkoutsByMonthCompletions: FastifyPluginAsyncZod =
  async app => {
    app
      .register(auth)
      .get('/workouts/workouts-by-month-completions', async request => {
        const userId = await request.getCurrentUserId()

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
              .leftJoin(workouts, eq(workoutCompletions.workoutId, workouts.id))
              .where(
                and(
                  between(workoutCompletions.end, month.start, month.end),
                  eq(workouts.userId, userId)
                )
              )

            return {
              month: dayjs(month.start).format('MMMM'),
              workouts: workoutByMonth.count,
            }
          })
        )
      })
  }

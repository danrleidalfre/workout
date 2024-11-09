import { db } from '@/db'
import {
  workoutCompletions,
  workoutCompletionSeries,
  workouts,
} from '@/db/schema'
import { dayjs } from '@/lib/dayjs'
import { and, between, eq } from 'drizzle-orm'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { auth } from '../middlewares/auth'

export const fetchVolumeByWeekCompletions: FastifyPluginAsyncZod =
  async app => {
    app
      .register(auth)
      .get('/workouts/volume-by-week-completions', async request => {
        const userId = await request.getCurrentUserId()

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
            const loadAndRepsByWeek = await db
              .select({
                load: workoutCompletionSeries.load,
                reps: workoutCompletionSeries.reps,
              })
              .from(workoutCompletions)
              .leftJoin(
                workoutCompletionSeries,
                eq(
                  workoutCompletionSeries.workoutCompletionId,
                  workoutCompletions.id
                )
              )
              .leftJoin(workouts, eq(workoutCompletions.workoutId, workouts.id))
              .where(
                and(
                  between(workoutCompletions.end, week.start, week.end),
                  eq(workouts.userId, userId)
                )
              )

            const totalVolume = loadAndRepsByWeek.reduce(
              (acc, { load, reps }) => {
                return acc + (load ?? 0) * (reps ?? 0)
              },
              0
            )

            return {
              week: `${dayjs(week.start).format('DD/MM')} a ${dayjs(week.end).format('DD/MM')}`,
              volume: totalVolume,
            }
          })
        )
      })
  }

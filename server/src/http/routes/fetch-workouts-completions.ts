import { db } from '@/db'
import {
  workoutCompletions,
  workoutCompletionSeries,
  workouts,
} from '@/db/schema'
import { dayjs } from '@/lib/dayjs'
import { countDistinct, desc, eq, sum } from 'drizzle-orm'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'

export const fetchWorkoutsCompletions: FastifyPluginAsyncZod = async app => {
  app.get('/workouts/completions', async () => {
    const completions = await db
      .select({
        id: workoutCompletions.id,
        workout: workouts.title,
        start: workoutCompletions.start,
        end: workoutCompletions.end,
        load: sum(workoutCompletionSeries.load),
        exercises: countDistinct(workoutCompletionSeries.exerciseId),
        series: countDistinct(workoutCompletionSeries.id),
      })
      .from(workoutCompletions)
      .leftJoin(workouts, eq(workouts.id, workoutCompletions.workoutId))
      .leftJoin(
        workoutCompletionSeries,
        eq(workoutCompletionSeries.workoutCompletionId, workoutCompletions.id)
      )
      .groupBy(
        workoutCompletions.id,
        workouts.title,
        workoutCompletions.start,
        workoutCompletions.end
      )
      .orderBy(desc(workoutCompletions.end))

    return completions.map(completion => ({
      id: completion.id,
      workout: completion.workout,
      duration: dayjs(completion.end).from(completion.start, true),
      completedAgo: dayjs(completion.end).fromNow(),
      load: Number(completion.load),
      exercises: Number(completion.exercises),
      series: Number(completion.series),
    }))
  })
}

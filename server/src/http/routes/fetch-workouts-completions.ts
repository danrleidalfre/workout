import { db } from '@/db'
import {
  exercises,
  workoutCompletions,
  workoutCompletionSeries,
  workouts,
} from '@/db/schema'
import { dayjs } from '@/lib/dayjs'
import { and, countDistinct, desc, eq } from 'drizzle-orm'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { auth } from '../middlewares/auth'

export const fetchWorkoutsCompletions: FastifyPluginAsyncZod = async app => {
  app.register(auth).get(
    '/workouts/completions',
    {
      schema: {
        tags: ['Treino'],
        summary: 'Busca as informações dos últimos treinos finalizados',
        security: [{ bearerAuth: [] }],
        response: {
          200: z.array(
            z.object({
              id: z.string(),
              workout: z.string().nullable(),
              duration: z.string(),
              completedAgo: z.string(),
              load: z.number(),
              exercises: z.number(),
              series: z.number(),
            })
          ),
        },
      },
    },
    async (request, reply) => {
      const userId = await request.getCurrentUserId()

      const completions = await db
        .select({
          id: workoutCompletions.id,
          workout: workouts.title,
          start: workoutCompletions.start,
          end: workoutCompletions.end,
          exercises: countDistinct(workoutCompletionSeries.exerciseId),
          series: countDistinct(workoutCompletionSeries.id),
        })
        .from(workoutCompletions)
        .leftJoin(workouts, eq(workouts.id, workoutCompletions.workoutId))
        .leftJoin(
          workoutCompletionSeries,
          eq(workoutCompletionSeries.workoutCompletionId, workoutCompletions.id)
        )
        .leftJoin(
          exercises,
          eq(workoutCompletionSeries.exerciseId, exercises.id)
        )
        .where(and(eq(workouts.userId, userId), eq(exercises.userId, userId)))
        .groupBy(
          workoutCompletions.id,
          workouts.title,
          workoutCompletions.start,
          workoutCompletions.end
        )
        .orderBy(desc(workoutCompletions.end))
        .limit(3)

      const completionWithVolume = await Promise.all(
        completions.map(async completion => {
          const loadAndReps = await db
            .select({
              load: workoutCompletionSeries.load,
              reps: workoutCompletionSeries.reps,
            })
            .from(workoutCompletionSeries)
            .where(
              eq(workoutCompletionSeries.workoutCompletionId, completion.id)
            )

          const totalVolume = loadAndReps.reduce(
            (acc, { load, reps }) => acc + load * reps,
            0
          )

          return {
            ...completion,
            totalVolume,
          }
        })
      )

      const result = completionWithVolume.map(completion => ({
        id: completion.id,
        workout: completion.workout,
        duration: dayjs(completion.end).from(completion.start, true),
        completedAgo: dayjs(completion.end).fromNow(),
        load: Number(completion.totalVolume),
        exercises: Number(completion.exercises),
        series: Number(completion.series),
      }))

      return reply.status(200).send(result)
    }
  )
}

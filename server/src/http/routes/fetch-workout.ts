import { db } from '@/db'
import {
  exercises,
  workoutExercises,
  workoutExerciseSeries,
  workouts,
} from '@/db/schema'
import { eq } from 'drizzle-orm'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'

export const fetchWorkout: FastifyPluginAsyncZod = async app => {
  app.get(
    '/workouts/:id',
    {
      schema: {
        params: z.object({
          id: z.string(),
        }),
      },
    },
    async request => {
      const { id } = request.params

      const result = await db
        .select({
          workoutTitle: workouts.title,
          exerciseId: workoutExercises.exerciseId,
          exerciseOrder: workoutExercises.order,
          exerciseTitle: exercises.title,
          serieId: workoutExerciseSeries.id,
          reps: workoutExerciseSeries.reps,
          load: workoutExerciseSeries.load,
          order: workoutExerciseSeries.order,
        })
        .from(workouts)
        .leftJoin(workoutExercises, eq(workouts.id, workoutExercises.workoutId))
        .leftJoin(exercises, eq(workoutExercises.exerciseId, exercises.id))
        .leftJoin(
          workoutExerciseSeries,
          eq(workoutExercises.id, workoutExerciseSeries.workoutExerciseId)
        )
        .where(eq(workouts.id, id))
        .orderBy(workoutExercises.order)

      return {
        title: result[0]?.workoutTitle || null,
        exercises: result.reduce(
          (acc, row) => {
            let exercise = acc.find(e => e.exerciseId === row.exerciseId)

            if (!exercise) {
              exercise = {
                exerciseId: row.exerciseId || '',
                exerciseTitle: row.exerciseTitle || '',
                series: [],
              }
              acc.push(exercise)
            }

            exercise.series.push({
              serieId: row.serieId,
              reps: row.reps || 0,
              load: row.load,
              completed: false,
            })

            exercise.series.sort((a, b) => {
              const serieA = result.find(r => r.serieId === a.serieId)
              const serieB = result.find(r => r.serieId === b.serieId)
              return (serieA?.order ?? 0) - (serieB?.order ?? 0)
            })

            return acc
          },
          [] as {
            exerciseId: string
            exerciseTitle: string
            series: {
              serieId: string | null
              reps: number
              load: number | null
              completed: boolean
            }[]
          }[]
        ),
      }
    }
  )
}

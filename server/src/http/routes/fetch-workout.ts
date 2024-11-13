import { db } from '@/db'
import {
  exercises,
  workoutExercises,
  workoutExerciseSeries,
  workouts,
} from '@/db/schema'
import { and, eq } from 'drizzle-orm'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { auth } from '../middlewares/auth'

export const fetchWorkout: FastifyPluginAsyncZod = async app => {
  app.register(auth).get(
    '/workouts/:id',
    {
      schema: {
        tags: ['Treino'],
        summary: 'Busca um treino',
        security: [{ bearerAuth: [] }],
        params: z.object({
          id: z.string(),
        }),
        response: {
          200: z.object({
            id: z.string(),
            title: z.string(),
            exercises: z.array(
              z.object({
                exerciseId: z.string(),
                exerciseTitle: z.string(),
                rest: z.string(),
                note: z.string().nullable(),
                series: z.array(
                  z.object({
                    serieId: z.string().nullable(),
                    reps: z.number(),
                    load: z.number().nullable(),
                    completed: z.boolean(),
                  })
                ),
              })
            ),
          }),
          401: z.object({ message: z.string() }),
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params
      const userId = await request.getCurrentUserId()

      const [workout] = await db
        .select()
        .from(workouts)
        .where(and(eq(workouts.id, id), eq(workouts.userId, userId)))

      if (!workout) {
        return reply.code(401).send({ message: 'Unauthorized' })
      }

      const result = await db
        .select({
          id: workouts.id,
          workoutTitle: workouts.title,
          exerciseId: workoutExercises.exerciseId,
          exerciseOrder: workoutExercises.order,
          rest: workoutExercises.rest,
          note: workoutExercises.note,
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

      const workoutResult = {
        id: result[0]?.id,
        title: result[0]?.workoutTitle,
        exercises: result.reduce(
          (acc, row) => {
            let exercise = acc.find(e => e.exerciseId === row.exerciseId)

            if (!exercise) {
              exercise = {
                exerciseId: row.exerciseId || '',
                exerciseTitle: row.exerciseTitle || '',
                rest: String(row.rest),
                note: row.note,
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
            rest: string
            note: string | null
            series: {
              serieId: string | null
              reps: number
              load: number | null
              completed: boolean
            }[]
          }[]
        ),
      }

      return reply.status(200).send(workoutResult)
    }
  )
}

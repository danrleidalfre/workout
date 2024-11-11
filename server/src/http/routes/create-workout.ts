import { db } from '@/db'
import { workoutExercises, workoutExerciseSeries, workouts } from '@/db/schema'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { auth } from '../middlewares/auth'

export const createWorkout: FastifyPluginAsyncZod = async app => {
  app.register(auth).post(
    '/workouts',
    {
      schema: {
        tags: ['Treinos'],
        summary: 'Cria um treino',
        security: [{ bearerAuth: [] }],
        body: z.object({
          title: z.string(),
          exercises: z.array(
            z.object({
              exerciseId: z.string(),
              rest: z.coerce.number(),
              note: z.string().optional(),
              series: z.array(
                z.object({
                  load: z.coerce.number(),
                  reps: z.coerce.number(),
                })
              ),
            })
          ),
        }),
        response: {
          201: z.object({ message: z.string() }),
        },
      },
    },
    async (request, reply) => {
      const { title, exercises } = request.body
      const userId = await request.getCurrentUserId()

      const [workout] = await db
        .insert(workouts)
        .values({ title, userId })
        .returning({ id: workouts.id })

      await Promise.all(
        exercises.map(async (exercise, index) => {
          const [workoutExercise] = await db
            .insert(workoutExercises)
            .values({
              workoutId: workout.id,
              exerciseId: exercise.exerciseId,
              rest: exercise.rest,
              note: exercise.note || null,
              order: index + 1,
            })
            .returning({ id: workoutExercises.id })

          await Promise.all(
            exercise.series.map(async (serie, index) => {
              const { load, reps } = serie

              await db.insert(workoutExerciseSeries).values({
                workoutExerciseId: workoutExercise.id,
                load,
                reps,
                order: index + 1,
              })
            })
          )
        })
      )

      return reply.status(201).send({ message: 'Treino criado com sucesso' })
    }
  )
}

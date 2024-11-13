import { db } from '@/db'
import { workoutExercises, workoutExerciseSeries, workouts } from '@/db/schema'
import { and, eq } from 'drizzle-orm'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { auth } from '../middlewares/auth'

export const updateWorkout: FastifyPluginAsyncZod = async app => {
  app.register(auth).put(
    '/workouts/:id',
    {
      schema: {
        tags: ['Treino'],
        summary: 'Atualiza um treino',
        security: [{ bearerAuth: [] }],
        params: z.object({
          id: z.string(),
        }),
        body: z.object({
          title: z.string(),
          exercises: z.array(
            z.object({
              exerciseId: z.string(),
              rest: z.coerce.number(),
              note: z.string().nullable(),
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
          204: z.object({
            message: z.string(),
          }),
          401: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params
      const { title, exercises } = request.body

      const userId = await request.getCurrentUserId()

      const [workout] = await db
        .select()
        .from(workouts)
        .where(and(eq(workouts.id, id), eq(workouts.userId, userId)))

      if (!workout) {
        return reply.code(401).send({ message: 'Unauthorized' })
      }

      await db.update(workouts).set({ title }).where(eq(workouts.id, id))

      const [workoutExercise] = await db
        .delete(workoutExercises)
        .where(eq(workoutExercises.workoutId, id))
        .returning({ id: workoutExercises.id })

      if (workoutExercise) {
        await db
          .delete(workoutExerciseSeries)
          .where(
            eq(workoutExerciseSeries.workoutExerciseId, workoutExercise.id)
          )
      }

      await Promise.all(
        exercises.map(async (exercise, index) => {
          const [workoutExercise] = await db
            .insert(workoutExercises)
            .values({
              workoutId: id,
              exerciseId: exercise.exerciseId,
              order: index + 1,
              rest: exercise.rest,
              note: exercise.note,
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

      return reply
        .status(204)
        .send({ message: 'Treino atualizado com sucesso' })
    }
  )
}

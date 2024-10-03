import { db } from '@/db'
import { workoutExercises, workoutExerciseSeries, workouts } from '@/db/schema'
import { eq } from 'drizzle-orm'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'

export const updateWorkout: FastifyPluginAsyncZod = async app => {
  app.put(
    '/workouts/:id',
    {
      schema: {
        params: z.object({
          id: z.string(),
        }),
        body: z.object({
          title: z.string(),
          exercises: z.array(
            z.object({
              exerciseId: z.string(),
              series: z.array(
                z.object({
                  load: z.coerce.number(),
                  reps: z.coerce.number(),
                })
              ),
            })
          ),
        }),
      },
    },
    async request => {
      const { id } = request.params
      const { title, exercises } = request.body

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
        exercises.map(async exercise => {
          const [workoutExercise] = await db
            .insert(workoutExercises)
            .values({ workoutId: id, exerciseId: exercise.exerciseId })
            .returning({ id: workoutExercises.id })

          await Promise.all(
            exercise.series.map(async serie => {
              const { load, reps } = serie

              await db.insert(workoutExerciseSeries).values({
                workoutExerciseId: workoutExercise.id,
                load,
                reps,
              })
            })
          )
        })
      )
    }
  )
}

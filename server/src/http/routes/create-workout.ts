import { db } from '@/db'
import { workoutExercises, workoutExerciseSeries, workouts } from '@/db/schema'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'

export const createWorkout: FastifyPluginAsyncZod = async app => {
  app.post(
    '/workouts',
    {
      schema: {
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
      const { title, exercises } = request.body

      const [workout] = await db
        .insert(workouts)
        .values({ title })
        .returning({ id: workouts.id })

      await Promise.all(
        exercises.map(async exercise => {
          const [workoutExercise] = await db
            .insert(workoutExercises)
            .values({ workoutId: workout.id, exerciseId: exercise.exerciseId })
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

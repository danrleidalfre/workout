import { db } from '@/db'
import { workoutCompletions, workoutCompletionSeries } from '@/db/schema'
import { dayjs } from '@/lib/dayjs'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'

export const completionWorkout: FastifyPluginAsyncZod = async app => {
  app.post(
    '/workouts/:id/completion',
    {
      schema: {
        params: z.object({
          id: z.string(),
        }),
        body: z.object({
          start: z.string(),
          end: z.string(),
          exercises: z.array(
            z.object({
              exerciseId: z.string(),
              series: z.array(
                z.object({
                  load: z.coerce.number(),
                  reps: z.coerce.number(),
                  completed: z.boolean(),
                })
              ),
            })
          ),
        }),
      },
    },
    async request => {
      const { id } = request.params
      const { start, end, exercises } = request.body

      const [workoutCompletion] = await db
        .insert(workoutCompletions)
        .values({
          workoutId: id,
          start: dayjs(start).toDate(),
          end: dayjs(end).toDate(),
        })
        .returning({ id: workoutCompletions.id })

      await Promise.all(
        exercises.map(async exercise => {
          exercise.series.map(async serie => {
            const { completed, load, reps } = serie
            if (completed) {
              await db.insert(workoutCompletionSeries).values({
                workoutCompletionId: workoutCompletion.id,
                exerciseId: exercise.exerciseId,
                load,
                reps,
              })
            }
          })
        })
      )
    }
  )
}

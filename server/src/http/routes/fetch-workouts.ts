import { db } from '@/db'
import { exercises, groups, workoutExercises, workouts } from '@/db/schema'
import { and, eq, ilike } from 'drizzle-orm'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { auth } from '../middlewares/auth'

interface Workout {
  id: string
  title: string
  groups: string[]
  exercises: string
}

export const fetchWorkouts: FastifyPluginAsyncZod = async app => {
  app.register(auth).get(
    '/workouts',
    {
      schema: {
        querystring: z.object({
          search: z.string().optional(),
        }),
      },
    },
    async request => {
      const { search } = request.query
      const userId = await request.getCurrentUserId()

      const result = await db
        .select({
          workoutId: workouts.id,
          workoutTitle: workouts.title,
          groupTitle: groups.title,
          exerciseTitle: exercises.title,
        })
        .from(workouts)
        .leftJoin(workoutExercises, eq(workouts.id, workoutExercises.workoutId))
        .leftJoin(exercises, eq(workoutExercises.exerciseId, exercises.id))
        .leftJoin(groups, eq(exercises.groupId, groups.id))
        .where(
          and(
            search ? ilike(exercises.title, `%${search}%`) : undefined,
            eq(exercises.userId, userId)
          )
        )
        .orderBy(workouts.title)

      return result.reduce((acc: Workout[], row) => {
        let workout = acc.find(w => w.title === row.workoutTitle)

        if (!workout) {
          workout = {
            id: row.workoutId,
            title: row.workoutTitle,
            groups: [],
            exercises: '',
          }
          acc.push(workout)
        }

        if (row.groupTitle && !workout.groups.includes(row.groupTitle)) {
          workout.groups.push(row.groupTitle)
        }

        if (
          row.exerciseTitle &&
          !workout.exercises.includes(row.exerciseTitle)
        ) {
          workout.exercises = workout.exercises
            ? `${workout.exercises}, ${row.exerciseTitle}`
            : row.exerciseTitle
        }

        return acc
      }, [])
    }
  )
}

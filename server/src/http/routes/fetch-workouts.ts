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
        tags: ['Treino'],
        summary: 'Busca os treinos',
        security: [{ bearerAuth: [] }],
        querystring: z.object({
          search: z.string().optional(),
        }),
        response: {
          200: z.array(
            z.object({
              id: z.string(),
              title: z.string(),
              groups: z.array(z.string()),
              exercises: z.string(),
            })
          ),
        },
      },
    },
    async (request, reply) => {
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

      const workoutsResult = result.reduce((acc: Workout[], row) => {
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

      return reply.status(200).send(workoutsResult)
    }
  )
}

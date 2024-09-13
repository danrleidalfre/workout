import { createId } from '@paralleldrive/cuid2'
import { integer, pgTable, text } from 'drizzle-orm/pg-core'

export const workouts = pgTable('workouts', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  title: text('title').notNull(),
})

export const groups = pgTable('groups', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  title: text('title').notNull(),
})

export const exercises = pgTable('exercises', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  groupId: text('group_id')
    .references(() => groups.id)
    .notNull(),
  title: text('title').notNull(),
})

export const workoutExercises = pgTable('workout_exercises', {
  workoutId: text('workout_id')
    .references(() => workouts.id)
    .notNull(),
  exerciseId: text('exercise_id')
    .references(() => exercises.id)
    .notNull(),
  series: integer('series'),
  reps: integer('reps'),
})

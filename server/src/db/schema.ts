import { createId } from '@paralleldrive/cuid2'
import { integer, pgTable, real, text } from 'drizzle-orm/pg-core'

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
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  workoutId: text('workout_id')
    .references(() => workouts.id)
    .notNull(),
  exerciseId: text('exercise_id')
    .references(() => exercises.id, { onDelete: 'cascade' })
    .notNull(),
})

export const workoutExerciseSeries = pgTable('workout_exercise_series', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  workoutExerciseId: text('workout_exercise_id')
    .references(() => workoutExercises.id, { onDelete: 'cascade' })
    .notNull(),
  reps: integer('reps').notNull(),
  load: real('load'),
})

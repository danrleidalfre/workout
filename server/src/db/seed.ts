import { hash } from 'bcryptjs'
import { client, db } from '.'
import {
  exercises,
  groups,
  users,
  workoutCompletions,
  workoutCompletionSeries,
  workoutExercises,
  workoutExerciseSeries,
  workouts,
} from './schema'

async function seed() {
  await db.delete(workoutCompletionSeries)
  await db.delete(workoutCompletions)
  await db.delete(workoutExerciseSeries)
  await db.delete(workoutExercises)
  await db.delete(exercises)
  await db.delete(groups)
  await db.delete(workouts)
  await db.delete(users)

  const passwordHash = await hash('admin', 6)

  const [user] = await db
    .insert(users)
    .values([
      { name: 'Admin', email: 'admin@admin.com', password: passwordHash },
    ])
    .returning()

  const [pushWorkout, pullWorkout, legsWorkout] = await db
    .insert(workouts)
    .values([
      { title: 'Push', userId: user.id },
      { title: 'Pull', userId: user.id },
      { title: 'Legs', userId: user.id },
    ])
    .returning()

  const [chest, back, shoulders, biceps, triceps, legs] = await db
    .insert(groups)
    .values([
      { title: 'Peito' },
      { title: 'Costas' },
      { title: 'Ombros' },
      { title: 'Bíceps' },
      { title: 'Tríceps' },
      { title: 'Pernas' },
    ])
    .returning()

  const [
    chestPress,
    fly,
    row,
    lat,
    shoulderPress,
    curl,
    skullcrusher,
    squat,
    deadlift,
    stiff,
  ] = await db
    .insert(exercises)
    .values([
      { title: 'Supino', groupId: chest.id, userId: user.id },
      { title: 'Crucifixo', groupId: chest.id, userId: user.id },
      { title: 'Remada', groupId: back.id, userId: user.id },
      { title: 'Puxada', groupId: back.id, userId: user.id },
      { title: 'Desenvolvimento', groupId: shoulders.id, userId: user.id },
      { title: 'Rosca Direta', groupId: biceps.id, userId: user.id },
      { title: 'Tríceps Testa', groupId: triceps.id, userId: user.id },
      { title: 'Agachamento Livre', groupId: legs.id, userId: user.id },
      { title: 'Levantamento Terra', groupId: legs.id, userId: user.id },
      { title: 'Stiff', groupId: legs.id, userId: user.id },
    ])
    .returning()

  const workoutExercisesCreated = await db
    .insert(workoutExercises)
    .values([
      {
        workoutId: pushWorkout.id,
        exerciseId: chestPress.id,
        rest: 120,
        order: 1,
      },
      {
        workoutId: pushWorkout.id,
        exerciseId: fly.id,
        rest: 120,
        order: 2,
      },
      {
        workoutId: pushWorkout.id,
        exerciseId: shoulderPress.id,
        rest: 120,
        order: 3,
      },
      {
        workoutId: pushWorkout.id,
        exerciseId: skullcrusher.id,
        rest: 120,
        order: 4,
      },
      {
        workoutId: pullWorkout.id,
        exerciseId: row.id,
        rest: 120,
        order: 1,
      },
      {
        workoutId: pullWorkout.id,
        exerciseId: lat.id,
        rest: 120,
        order: 2,
      },
      {
        workoutId: pullWorkout.id,
        exerciseId: curl.id,
        rest: 120,
        order: 3,
      },
      {
        workoutId: legsWorkout.id,
        exerciseId: squat.id,
        rest: 120,
        order: 1,
      },
      {
        workoutId: legsWorkout.id,
        exerciseId: deadlift.id,
        rest: 120,
        order: 2,
      },
      {
        workoutId: legsWorkout.id,
        exerciseId: stiff.id,
        rest: 120,
        order: 3,
      },
    ])
    .returning()

  await db.insert(workoutExerciseSeries).values([
    {
      workoutExerciseId: workoutExercisesCreated[0].id,
      reps: 12,
      load: 0,
      order: 1,
    },
    {
      workoutExerciseId: workoutExercisesCreated[0].id,
      reps: 12,
      load: 0,
      order: 2,
    },
    {
      workoutExerciseId: workoutExercisesCreated[0].id,
      reps: 12,
      load: 0,
      order: 3,
    },
    {
      workoutExerciseId: workoutExercisesCreated[1].id,
      reps: 12,
      load: 0,
      order: 1,
    },
    {
      workoutExerciseId: workoutExercisesCreated[1].id,
      reps: 12,
      load: 0,
      order: 2,
    },
    {
      workoutExerciseId: workoutExercisesCreated[1].id,
      reps: 12,
      load: 0,
      order: 3,
    },
    {
      workoutExerciseId: workoutExercisesCreated[2].id,
      reps: 12,
      load: 0,
      order: 1,
    },
    {
      workoutExerciseId: workoutExercisesCreated[2].id,
      reps: 12,
      load: 0,
      order: 2,
    },
    {
      workoutExerciseId: workoutExercisesCreated[2].id,
      reps: 12,
      load: 0,
      order: 3,
    },
    {
      workoutExerciseId: workoutExercisesCreated[3].id,
      reps: 12,
      load: 0,
      order: 1,
    },
    {
      workoutExerciseId: workoutExercisesCreated[3].id,
      reps: 12,
      load: 0,
      order: 2,
    },
    {
      workoutExerciseId: workoutExercisesCreated[3].id,
      reps: 12,
      load: 0,
      order: 3,
    },
    {
      workoutExerciseId: workoutExercisesCreated[4].id,
      reps: 12,
      load: 0,
      order: 1,
    },
    {
      workoutExerciseId: workoutExercisesCreated[4].id,
      reps: 12,
      load: 0,
      order: 2,
    },
    {
      workoutExerciseId: workoutExercisesCreated[4].id,
      reps: 12,
      load: 0,
      order: 3,
    },
    {
      workoutExerciseId: workoutExercisesCreated[4].id,
      reps: 12,
      load: 0,
      order: 4,
    },
    {
      workoutExerciseId: workoutExercisesCreated[5].id,
      reps: 12,
      load: 0,
      order: 1,
    },
    {
      workoutExerciseId: workoutExercisesCreated[5].id,
      reps: 12,
      load: 0,
      order: 2,
    },
    {
      workoutExerciseId: workoutExercisesCreated[5].id,
      reps: 12,
      load: 0,
      order: 3,
    },
    {
      workoutExerciseId: workoutExercisesCreated[5].id,
      reps: 12,
      load: 0,
      order: 4,
    },
    {
      workoutExerciseId: workoutExercisesCreated[6].id,
      reps: 12,
      load: 0,
      order: 1,
    },
    {
      workoutExerciseId: workoutExercisesCreated[6].id,
      reps: 12,
      load: 0,
      order: 2,
    },
    {
      workoutExerciseId: workoutExercisesCreated[6].id,
      reps: 12,
      load: 0,
      order: 3,
    },
    {
      workoutExerciseId: workoutExercisesCreated[6].id,
      reps: 12,
      load: 0,
      order: 4,
    },
    {
      workoutExerciseId: workoutExercisesCreated[7].id,
      reps: 12,
      load: 0,
      order: 1,
    },
    {
      workoutExerciseId: workoutExercisesCreated[7].id,
      reps: 12,
      load: 0,
      order: 2,
    },
    {
      workoutExerciseId: workoutExercisesCreated[7].id,
      reps: 12,
      load: 0,
      order: 3,
    },
    {
      workoutExerciseId: workoutExercisesCreated[7].id,
      reps: 12,
      load: 0,
      order: 4,
    },
    {
      workoutExerciseId: workoutExercisesCreated[8].id,
      reps: 12,
      load: 0,
      order: 1,
    },
    {
      workoutExerciseId: workoutExercisesCreated[8].id,
      reps: 12,
      load: 0,
      order: 2,
    },
    {
      workoutExerciseId: workoutExercisesCreated[8].id,
      reps: 12,
      load: 0,
      order: 3,
    },
    {
      workoutExerciseId: workoutExercisesCreated[8].id,
      reps: 12,
      load: 0,
      order: 4,
    },
    {
      workoutExerciseId: workoutExercisesCreated[9].id,
      reps: 12,
      load: 0,
      order: 1,
    },
    {
      workoutExerciseId: workoutExercisesCreated[9].id,
      reps: 12,
      load: 0,
      order: 2,
    },
    {
      workoutExerciseId: workoutExercisesCreated[9].id,
      reps: 12,
      load: 0,
      order: 3,
    },
    {
      workoutExerciseId: workoutExercisesCreated[9].id,
      reps: 12,
      load: 0,
      order: 4,
    },
  ])
}

seed().finally(() => {
  client.end()
})

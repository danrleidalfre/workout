import { client, db } from '.'
import {
  exercises,
  groups,
  workoutExercises,
  workoutExerciseSeries,
  workouts,
} from './schema'

async function seed() {
  await db.delete(workoutExerciseSeries)
  await db.delete(workoutExercises)
  await db.delete(exercises)
  await db.delete(groups)
  await db.delete(workouts)

  const workoutsCreated = await db
    .insert(workouts)
    .values([{ title: 'Push' }, { title: 'Pull' }, { title: 'Legs' }])
    .returning()

  const groupsCreated = await db
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

  const exercisesCreated = await db
    .insert(exercises)
    .values([
      { title: 'Supino', groupId: groupsCreated[0].id },
      { title: 'Crucifixo', groupId: groupsCreated[0].id },
      { title: 'Remada', groupId: groupsCreated[1].id },
      { title: 'Puxada', groupId: groupsCreated[1].id },
      { title: 'Desenvolvimento', groupId: groupsCreated[2].id },
      { title: 'Rosca Direta', groupId: groupsCreated[3].id },
      { title: 'Tríceps Testa', groupId: groupsCreated[4].id },
      { title: 'Agachamento Livre', groupId: groupsCreated[5].id },
      { title: 'Levantamento Terra', groupId: groupsCreated[5].id },
      { title: 'Stiff', groupId: groupsCreated[5].id },
    ])
    .returning()

  const workoutExercisesCreated = await db
    .insert(workoutExercises)
    .values([
      { workoutId: workoutsCreated[0].id, exerciseId: exercisesCreated[0].id },
      { workoutId: workoutsCreated[0].id, exerciseId: exercisesCreated[1].id },
      { workoutId: workoutsCreated[0].id, exerciseId: exercisesCreated[4].id },
      { workoutId: workoutsCreated[0].id, exerciseId: exercisesCreated[6].id },
      { workoutId: workoutsCreated[1].id, exerciseId: exercisesCreated[2].id },
      { workoutId: workoutsCreated[1].id, exerciseId: exercisesCreated[3].id },
      { workoutId: workoutsCreated[1].id, exerciseId: exercisesCreated[5].id },
      { workoutId: workoutsCreated[2].id, exerciseId: exercisesCreated[7].id },
      { workoutId: workoutsCreated[2].id, exerciseId: exercisesCreated[8].id },
      { workoutId: workoutsCreated[2].id, exerciseId: exercisesCreated[9].id },
    ])
    .returning()

  await db.insert(workoutExerciseSeries).values([
    {
      workoutExerciseId: workoutExercisesCreated[0].id,
      reps: 12,
    },
    {
      workoutExerciseId: workoutExercisesCreated[0].id,
      reps: 12,
    },
    {
      workoutExerciseId: workoutExercisesCreated[0].id,
      reps: 12,
    },
    {
      workoutExerciseId: workoutExercisesCreated[1].id,
      reps: 12,
    },
    {
      workoutExerciseId: workoutExercisesCreated[1].id,
      reps: 12,
    },
    {
      workoutExerciseId: workoutExercisesCreated[1].id,
      reps: 12,
    },
    {
      workoutExerciseId: workoutExercisesCreated[2].id,
      reps: 12,
    },
    {
      workoutExerciseId: workoutExercisesCreated[2].id,
      reps: 12,
    },
    {
      workoutExerciseId: workoutExercisesCreated[2].id,
      reps: 12,
    },
    {
      workoutExerciseId: workoutExercisesCreated[3].id,
      reps: 12,
    },
    {
      workoutExerciseId: workoutExercisesCreated[3].id,
      reps: 12,
    },
    {
      workoutExerciseId: workoutExercisesCreated[3].id,
      reps: 12,
    },
    {
      workoutExerciseId: workoutExercisesCreated[4].id,
      reps: 12,
    },
    {
      workoutExerciseId: workoutExercisesCreated[4].id,
      reps: 12,
    },
    {
      workoutExerciseId: workoutExercisesCreated[4].id,
      reps: 12,
    },
    {
      workoutExerciseId: workoutExercisesCreated[4].id,
      reps: 12,
    },
    {
      workoutExerciseId: workoutExercisesCreated[5].id,
      reps: 12,
    },
    {
      workoutExerciseId: workoutExercisesCreated[5].id,
      reps: 12,
    },
    {
      workoutExerciseId: workoutExercisesCreated[5].id,
      reps: 12,
    },
    {
      workoutExerciseId: workoutExercisesCreated[5].id,
      reps: 12,
    },
    {
      workoutExerciseId: workoutExercisesCreated[6].id,
      reps: 12,
    },
    {
      workoutExerciseId: workoutExercisesCreated[6].id,
      reps: 12,
    },
    {
      workoutExerciseId: workoutExercisesCreated[6].id,
      reps: 12,
    },
    {
      workoutExerciseId: workoutExercisesCreated[6].id,
      reps: 12,
    },
    {
      workoutExerciseId: workoutExercisesCreated[7].id,
      reps: 12,
    },
    {
      workoutExerciseId: workoutExercisesCreated[7].id,
      reps: 12,
    },
    {
      workoutExerciseId: workoutExercisesCreated[7].id,
      reps: 12,
    },
    {
      workoutExerciseId: workoutExercisesCreated[7].id,
      reps: 12,
    },
    {
      workoutExerciseId: workoutExercisesCreated[8].id,
      reps: 12,
    },
    {
      workoutExerciseId: workoutExercisesCreated[8].id,
      reps: 12,
    },
    {
      workoutExerciseId: workoutExercisesCreated[8].id,
      reps: 12,
    },
    {
      workoutExerciseId: workoutExercisesCreated[8].id,
      reps: 12,
    },
    {
      workoutExerciseId: workoutExercisesCreated[9].id,
      reps: 12,
    },
    {
      workoutExerciseId: workoutExercisesCreated[9].id,
      reps: 12,
    },
    {
      workoutExerciseId: workoutExercisesCreated[9].id,
      reps: 12,
    },
    {
      workoutExerciseId: workoutExercisesCreated[9].id,
      reps: 12,
    },
  ])
}

seed().finally(() => {
  client.end()
})

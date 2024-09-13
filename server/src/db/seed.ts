import { client, db } from '.'
import { exercises, groups, workoutExercises, workouts } from './schema'

async function seed() {
  await db.delete(workoutExercises)
  await db.delete(exercises)
  await db.delete(groups)
  await db.delete(workouts)

  const workoutsCreated = await db
    .insert(workouts)
    .values([{ title: 'Superiores' }, { title: 'Inferiores' }])
    .returning()

  const groupsCreated = await db
    .insert(groups)
    .values([
      { title: 'Peito' },
      { title: 'Costas' },
      { title: 'Pernas' },
      { title: 'Ombros' },
      { title: 'Braços' },
    ])
    .returning()

  const exercisesCreated = await db
    .insert(exercises)
    .values([
      { title: 'Supino', groupId: groupsCreated[0].id },
      { title: 'Remanda Curvada', groupId: groupsCreated[1].id },
      { title: 'Barra Fixa', groupId: groupsCreated[1].id },
      { title: 'Agachamento Livre', groupId: groupsCreated[2].id },
      { title: 'Levantamento Terra', groupId: groupsCreated[2].id },
      { title: 'Stiff', groupId: groupsCreated[2].id },
      { title: 'Desenvolvimento', groupId: groupsCreated[3].id },
      { title: 'Rosca Direta', groupId: groupsCreated[4].id },
      { title: 'Tríceps Testa', groupId: groupsCreated[4].id },
    ])
    .returning()

  await db.insert(workoutExercises).values([
    {
      workoutId: workoutsCreated[0].id,
      exerciseId: exercisesCreated[0].id,
      series: 3,
      reps: 12,
    },
    {
      workoutId: workoutsCreated[0].id,
      exerciseId: exercisesCreated[1].id,
      series: 3,
      reps: 12,
    },
    {
      workoutId: workoutsCreated[0].id,
      exerciseId: exercisesCreated[2].id,
      series: 3,
      reps: 12,
    },
    {
      workoutId: workoutsCreated[0].id,
      exerciseId: exercisesCreated[6].id,
      series: 3,
      reps: 12,
    },
    {
      workoutId: workoutsCreated[0].id,
      exerciseId: exercisesCreated[7].id,
      series: 3,
      reps: 12,
    },
    {
      workoutId: workoutsCreated[0].id,
      exerciseId: exercisesCreated[8].id,
      series: 3,
      reps: 12,
    },
    {
      workoutId: workoutsCreated[1].id,
      exerciseId: exercisesCreated[3].id,
      series: 5,
      reps: 12,
    },
    {
      workoutId: workoutsCreated[1].id,
      exerciseId: exercisesCreated[4].id,
      series: 5,
      reps: 12,
    },
    {
      workoutId: workoutsCreated[1].id,
      exerciseId: exercisesCreated[5].id,
      series: 5,
      reps: 12,
    },
  ])
}

seed().finally(() => {
  client.end()
})

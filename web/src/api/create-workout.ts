type Series = {
  load: string
  reps: string
}

type Exercise = {
  exerciseId: string
  series: Series[]
}

export type Workout = {
  title: string
  exercises: Exercise[]
}

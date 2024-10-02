import type { Workout } from '@/api/create-workout'
import { SelectExercises } from '@/components/select-exercises'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import type { Control, UseFormRegister } from 'react-hook-form'
import { Controller } from 'react-hook-form'
import { WorkoutFormSeries } from '../series'

type Props = {
  exerciseIndex: number
  control: Control<Workout>
  register: UseFormRegister<Workout>
  removeExercise: (index: number) => void
}

export function WorkoutFormExercise({
  exerciseIndex,
  control,
  register,
  removeExercise,
}: Props) {
  return (
    <div className="grid gap-2">
      <div className="grid grid-cols-[auto_1fr_auto] gap-2">
        <div className="size-9 flex justify-center items-center border rounded-md text-sm bg-primary text-primary-foreground">
          {exerciseIndex + 1}°
        </div>
        <Controller
          control={control}
          name={`exercises.${exerciseIndex}.exerciseId`}
          render={({ field }) => (
            <SelectExercises
              selectedExercise={field.value}
              onSelectedExercise={field.onChange}
            />
          )}
        />
        <Button
          size="icon"
          variant="destructive"
          onClick={() => removeExercise(exerciseIndex)}
        >
          <Trash2 className="size-4" />
        </Button>
      </div>

      <WorkoutFormSeries
        exerciseIndex={exerciseIndex}
        control={control}
        register={register}
      />
    </div>
  )
}

import type { Workout } from '@/api/create-workout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  CheckCircle2,
  CircleChevronLeft,
  LoaderCircle,
  PlusCircle,
} from 'lucide-react'
import { useEffect } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { WorkoutFormExercise } from './exercise'

type Props = {
  workout?: Workout
  isSubmitting: boolean
  handleSubmitForm: (workout: Workout) => void
}

const defaultValues = {
  title: '',
  exercises: [{ exerciseId: '', rest: '', series: [] }],
}

export function WorkoutForm({
  workout,
  isSubmitting,
  handleSubmitForm,
}: Props) {
  const navigate = useNavigate()

  const { control, handleSubmit, register, reset } = useForm<Workout>({
    defaultValues: workout || defaultValues,
  })

  useEffect(() => {
    if (workout) {
      reset(workout)
    }
  }, [workout, reset])

  const {
    fields: exerciseFields,
    append: addExercise,
    remove: removeExercise,
  } = useFieldArray({
    control,
    name: 'exercises',
  })

  const onSubmit = (workout: Workout) => {
    handleSubmitForm(workout)
  }

  return (
    <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-[1fr_auto] gap-4">
        <Input placeholder="Nome do treino" {...register('title')} />
        <Button
          type="button"
          className="items-center gap-1"
          onClick={() =>
            addExercise({
              exerciseId: '',
              rest: '',
              series: [],
            })
          }
        >
          <PlusCircle className="size-4" />
          <span>Exercício</span>
        </Button>
      </div>

      {exerciseFields.map((exercise, index) => (
        <WorkoutFormExercise
          key={exercise.id}
          exerciseIndex={index}
          control={control}
          register={register}
          removeExercise={removeExercise}
        />
      ))}

      <div className="flex justify-between">
        <Button
          className="items-center gap-1"
          variant="outline"
          onClick={() => navigate('/workouts')}
        >
          <CircleChevronLeft className="size-4" />
          <span>Voltar</span>
        </Button>
        <Button type="submit" className="items-center gap-1">
          {isSubmitting ? (
            <>
              <LoaderCircle className="size-4 animate-spin" />
              <span>Salvando...</span>
            </>
          ) : (
            <>
              <CheckCircle2 className="size-4" />
              <span>Salvar</span>
            </>
          )}
        </Button>
      </div>
    </form>
  )
}

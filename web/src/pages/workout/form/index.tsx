import type { Workout } from '@/api/create-workout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { CheckCircle2, CircleChevronLeft, PlusCircle } from 'lucide-react'
import { useFieldArray, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { WorkoutFormExercise } from './exercise'

type Props = {
  handleSubmitForm: (data: Workout) => void
}

export function WorkoutForm({ handleSubmitForm }: Props) {
  const navigate = useNavigate()

  const { control, handleSubmit, register } = useForm<Workout>({
    defaultValues: {
      title: '',
      exercises: [{ exerciseId: '', series: [] }],
    },
  })

  const {
    fields: exerciseFields,
    append: addExercise,
    remove: removeExercise,
  } = useFieldArray({
    control,
    name: 'exercises',
  })

  const onSubmit = (data: Workout) => {
    handleSubmitForm(data)
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
          <CheckCircle2 className="size-4" />
          <span>Salvar</span>
        </Button>
      </div>
    </form>
  )
}

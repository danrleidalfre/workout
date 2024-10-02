import { SelectExercises } from '@/components/select-exercises'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  CheckCircle2,
  CircleChevronLeft,
  PlusCircle,
  Trash2,
} from 'lucide-react'
import type { Control, UseFormRegister } from 'react-hook-form'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'

interface Series {
  load: string
  reps: string
}

interface Exercise {
  exerciseId: string
  series: Series[]
}

interface WorkoutForm {
  title: string
  exercises: Exercise[]
}

export function Workout() {
  const { id } = useParams()
  const navigate = useNavigate()

  const { control, handleSubmit, register } = useForm<WorkoutForm>({
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

  const onSubmit = (data: WorkoutForm) => {
    console.log(data)
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

      {exerciseFields.map((exercise, exerciseIndex) => (
        <div key={exercise.id} className="grid gap-2">
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

          <SeriesFieldArray
            exerciseIndex={exerciseIndex}
            control={control}
            register={register}
          />
        </div>
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

interface SeriesFieldArrayProps {
  exerciseIndex: number
  control: Control<WorkoutForm>
  register: UseFormRegister<WorkoutForm>
}

function SeriesFieldArray({
  exerciseIndex,
  control,
  register,
}: SeriesFieldArrayProps) {
  const {
    fields: seriesFields,
    append: addSeries,
    remove: removeSeries,
  } = useFieldArray({
    control,
    name: `exercises.${exerciseIndex}.series` as const,
  })

  return (
    <div className="grid gap-2">
      {seriesFields.map((series, seriesIndex) => (
        <div
          key={series.id}
          className="grid grid-cols-[auto_1fr_1fr_auto] gap-2"
        >
          <div className="size-9 flex justify-center items-center border rounded-md text-sm">
            {seriesIndex + 1}ª
          </div>
          <Input
            placeholder="Carga"
            {...register(
              `exercises.${exerciseIndex}.series.${seriesIndex}.load` as const
            )}
          />
          <Input
            placeholder="Repetições"
            {...register(
              `exercises.${exerciseIndex}.series.${seriesIndex}.reps` as const
            )}
          />
          <Button
            size="icon"
            variant="outline"
            onClick={() => removeSeries(seriesIndex)}
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
      ))}

      <Button
        type="button"
        className="items-center gap-1"
        variant="outline"
        onClick={() => addSeries({ load: '', reps: '' })}
      >
        <PlusCircle className="size-4" />
        <span>Série</span>
      </Button>
    </div>
  )
}

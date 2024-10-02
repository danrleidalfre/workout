import type { Workout } from '@/api/create-workout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { PlusCircle, Trash2 } from 'lucide-react'
import type { Control, UseFormRegister } from 'react-hook-form'
import { useFieldArray } from 'react-hook-form'

type Props = {
  exerciseIndex: number
  control: Control<Workout>
  register: UseFormRegister<Workout>
}

export function WorkoutFormSeries({ exerciseIndex, control, register }: Props) {
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

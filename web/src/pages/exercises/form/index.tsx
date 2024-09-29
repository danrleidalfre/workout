import { createExercise } from '@/api/create-exercise'
import type { UpdateExerciseBody } from '@/api/update-exercise'
import { updateExercise } from '@/api/update-exercise'
import { SelectGroup } from '@/components/select-groups'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { zodResolver } from '@hookform/resolvers/zod'
import type { DialogProps } from '@radix-ui/react-dialog'
import { useQueryClient } from '@tanstack/react-query'
import { CheckCircle2, LoaderCircle } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
  title: z.string(),
  groupId: z.string(),
})

type FormSchema = z.infer<typeof formSchema>

type Props = DialogProps & {
  exercise?: UpdateExerciseBody
  onCloseForm?: () => void
}

export function ExerciseForm({ exercise, onCloseForm, ...props }: Props) {
  const queryClient = useQueryClient()

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: exercise?.title,
      groupId: exercise?.groupId,
    },
  })

  const handleSave = async ({ title, groupId }: FormSchema) => {
    if (exercise?.id) {
      await updateExercise({ id: exercise.id, title, groupId })
      if (onCloseForm) {
        onCloseForm()
      }
    } else {
      await createExercise({ title, groupId })
    }

    queryClient.invalidateQueries({ queryKey: ['exercises'] })

    reset({
      title: '',
      groupId: '',
    })
  }

  return (
    <Sheet {...props}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{exercise?.id ? 'Editar' : 'Criar'} exercício</SheetTitle>
        </SheetHeader>
        <form
          onSubmit={handleSubmit(handleSave)}
          id="form"
          className="grid gap-4 my-4"
        >
          <Input
            placeholder="Nome do exercício"
            required
            {...register('title')}
          />
          <Controller
            name="groupId"
            control={control}
            render={({ field: { name, onChange, value } }) => {
              return (
                <SelectGroup
                  name={name}
                  onValueChange={onChange}
                  value={value}
                  required
                />
              )
            }}
          />
        </form>
        <SheetFooter>
          <Button type="submit" form="form" className="items-center gap-1">
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
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

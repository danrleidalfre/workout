import { createExercise } from '@/api/create-exercise'
import { SelectGroup } from '@/components/select-group'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { CheckCircle2, LoaderCircle, PlusCircle } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
  title: z.string(),
  groupId: z.string(),
})

type FormSchema = z.infer<typeof formSchema>

export function ExerciseForm() {
  const queryClient = useQueryClient()

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  })

  const handleSave = async ({ title, groupId }: FormSchema) => {
    await createExercise({ title, groupId })

    queryClient.invalidateQueries({ queryKey: ['exercises'] })

    reset({
      title: '',
      groupId: '',
    })
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="items-center gap-1">
          <PlusCircle className="size-4" />
          <span>Exercício</span>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Novo exercício</SheetTitle>
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

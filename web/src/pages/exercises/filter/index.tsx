import { fetchExercises } from '@/api/fetch-exercises'
import { SelectGroup } from '@/components/select-groups'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { Eraser, Search } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

const filterSchema = z.object({
  search: z.string().optional(),
  groupId: z.string().optional(),
})

type FilterSchema = z.infer<typeof filterSchema>

export function ExerciseFilter() {
  const [searchParams, setSearchParams] = useSearchParams()

  const search = searchParams.get('search')
  const groupId = searchParams.get('groupId')

  useQuery({
    queryKey: ['exercises', search, groupId],
    queryFn: () => fetchExercises({ search, groupId }),
  })

  const { register, handleSubmit, control, reset } = useForm<FilterSchema>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      search: search ?? '',
      groupId: groupId ?? '',
    },
  })

  const handleFilter = async ({ search, groupId }: FilterSchema) => {
    setSearchParams(state => {
      if (search) {
        state.set('search', search)
      } else {
        state.delete('search')
      }

      if (groupId) {
        state.set('groupId', groupId)
      } else {
        state.delete('groupId')
      }

      return state
    })
  }

  const handleClearFilter = () => {
    setSearchParams(state => {
      state.delete('search')
      state.delete('groupId')
      return state
    })

    reset({
      search: '',
      groupId: '',
    })
  }

  return (
    <form onSubmit={handleSubmit(handleFilter)} className="flex gap-2">
      <Input
        className="w-56"
        placeholder="Pesquisar..."
        {...register('search')}
      />
      <Controller
        name="groupId"
        control={control}
        render={({ field: { name, onChange, value } }) => {
          return (
            <div className="w-56">
              <SelectGroup
                name={name}
                onValueChange={onChange}
                value={value}
                placeholder="Filtrar por grupo muscular"
              />
            </div>
          )
        }}
      />
      <Button type="submit" variant="outline" className="items-center gap-1">
        <Search className="size-4" />
        <span>Filtrar</span>
      </Button>
      <Button
        variant="outline"
        className="items-center gap-1"
        onClick={handleClearFilter}
      >
        <Eraser className="size-4" />
        <span>Limpar</span>
      </Button>
    </form>
  )
}

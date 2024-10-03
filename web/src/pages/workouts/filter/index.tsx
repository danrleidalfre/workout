import { fetchWorkouts } from '@/api/fetch-workouts'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { Eraser, Search } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

const filterSchema = z.object({
  search: z.string().optional(),
})

type FilterSchema = z.infer<typeof filterSchema>

export function WorkoutFilter() {
  const [searchParams, setSearchParams] = useSearchParams()

  const search = searchParams.get('search')

  useQuery({
    queryKey: ['workouts', search],
    queryFn: () => fetchWorkouts({ search }),
    staleTime: 60 * 1000,
  })

  const { register, handleSubmit, reset } = useForm<FilterSchema>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      search: search ?? '',
    },
  })

  const handleFilter = async ({ search }: FilterSchema) => {
    setSearchParams(state => {
      if (search) {
        state.set('search', search)
      } else {
        state.delete('search')
      }

      return state
    })
  }

  const handleClearFilter = () => {
    setSearchParams(state => {
      state.delete('search')
      return state
    })

    reset({
      search: '',
    })
  }

  return (
    <form onSubmit={handleSubmit(handleFilter)} className="flex gap-2">
      <Input
        className="w-56"
        placeholder="Pesquisar..."
        {...register('search')}
      />
      <Button type="submit" variant="outline" className="items-center gap-1">
        <Search className="size-4" /> Filtrar
      </Button>
      <Button
        variant="outline"
        className="items-center gap-1"
        onClick={handleClearFilter}
      >
        <Eraser className="size-4" /> Limpar
      </Button>
    </form>
  )
}

import { fetchExercises } from '@/api/fetch-exercises'
import { fetchGroups } from '@/api/fetch-groups'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import {
  Edit3,
  Ellipsis,
  Eraser,
  PlusCircle,
  Search,
  Trash2,
} from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'
import { ExerciseCardSkeleton } from './skeleton'

const filterSchema = z.object({
  search: z.string().optional(),
  groupId: z.string().optional(),
})

type FilterSchema = z.infer<typeof filterSchema>

export function Exercises() {
  const [searchParams, setSearchParams] = useSearchParams()

  const search = searchParams.get('search')
  const groupId = searchParams.get('groupId')

  const { data: exercises } = useQuery({
    queryKey: ['exercises', search, groupId],
    queryFn: () => fetchExercises({ search, groupId }),
    staleTime: 1000 * 60,
  })

  const { data: groups } = useQuery({
    queryKey: ['groups'],
    queryFn: fetchGroups,
    staleTime: 1000 * 60,
  })

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
  } = useForm<FilterSchema>({
    resolver: zodResolver(filterSchema),
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
    <>
      <div className="flex justify-between mb-4">
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
                <Select name={name} onValueChange={onChange} value={value}>
                  <SelectTrigger className="w-56">
                    <SelectValue placeholder="Filtrar por grupo muscular" />
                  </SelectTrigger>
                  <SelectContent>
                    {groups?.map(group => (
                      <SelectItem key={group.id} value={group.id}>
                        {group.group}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )
            }}
          />
          <Button
            type="submit"
            variant="outline"
            className="items-center gap-1"
          >
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
            <SheetDescription className="grid gap-4 my-4">
              <Input placeholder="Nome do exercício" />
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o grupo muscular" />
                </SelectTrigger>
                <SelectContent>
                  {groups?.map(group => (
                    <SelectItem key={group.id} value={group.id}>
                      {group.group}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </SheetDescription>
            <SheetFooter>
              <SheetClose asChild>
                <Button type="submit">Salvar</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {exercises?.map(exercise => (
          <Card key={exercise.id}>
            <CardContent className="flex items-center justify-between p-5">
              <div className="flex items-center gap-2">
                <h2 className="font-semibold text-base select-none">
                  {exercise.exercise}
                </h2>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Ellipsis className="text-primary cursor-pointer" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <DropdownMenuItem>
                      <Edit3 className="size-4 mr-2" />
                      <span>Editar</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Trash2 className="size-4 mr-2" />
                      <span>Excluir</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <Badge className="select-none">{exercise.group}</Badge>
            </CardContent>
          </Card>
        ))}
        {(!exercises || isSubmitting) && <ExerciseCardSkeleton />}
      </div>
    </>
  )
}

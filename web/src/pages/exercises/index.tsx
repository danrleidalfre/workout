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
import { useQuery } from '@tanstack/react-query'
import { Edit3, Ellipsis, PlusCircle, Trash2 } from 'lucide-react'

export function Exercises() {
  const exercises = useQuery({
    queryKey: ['exercises'],
    queryFn: fetchExercises,
    staleTime: 1000 * 60,
  })

  const groups = useQuery({
    queryKey: ['groups'],
    queryFn: fetchGroups,
    staleTime: 1000 * 60,
  })

  return (
    <>
      <div className="flex justify-between mb-4">
        <div className="flex gap-2">
          <Input className="w-56" placeholder="Pesquisar..." />
          <Select>
            <SelectTrigger className="w-56">
              <SelectValue placeholder="Filtrar por grupo muscular" />
            </SelectTrigger>
            <SelectContent>
              {groups.data?.map(group => (
                <SelectItem key={group.id} value={group.id}>
                  {group.group}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button className="gap-1">
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
                  {groups.data?.map(group => (
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
        {exercises.data?.map(exercise => (
          <Card key={exercise.id}>
            <CardContent className="flex items-center justify-between p-5">
              <div className="flex items-center gap-2">
                <h2 className="font-semibold text-base">{exercise.exercise}</h2>
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
              <Badge>{exercise.group}</Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  )
}

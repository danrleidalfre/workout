import { fetchExercises } from '@/api/fetch-exercises'
import { fetchGroups } from '@/api/fetch-groups'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useQuery } from '@tanstack/react-query'
import { PlusCircle } from 'lucide-react'

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
        <Button className="gap-1">
          <PlusCircle className="size-4" />
          <span>Exercício</span>
        </Button>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {exercises.data?.map(exercise => (
          <Card key={exercise.id}>
            <CardHeader>
              <CardTitle>{exercise.exercise}</CardTitle>
              <CardDescription>{exercise.group}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </>
  )
}

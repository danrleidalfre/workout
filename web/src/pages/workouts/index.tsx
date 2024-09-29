import { fetchWorkouts } from '@/api/fetch-workouts'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useQuery } from '@tanstack/react-query'
import { Edit3, Ellipsis, PlusCircle, Trash2 } from 'lucide-react'

export function Workouts() {
  const { data: workouts } = useQuery({
    queryKey: ['workouts'],
    queryFn: fetchWorkouts,
    staleTime: 1000 * 60,
  })

  return (
    <div className="grid gap-4 w-[768px] mx-auto">
      <div className="flex justify-end">
        <Button className="items-center gap-1">
          <PlusCircle className="size-4" />
          <span>Treino</span>
        </Button>
      </div>
      {workouts?.map(workout => (
        <Card key={workout.id}>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h2 className="font-semibold text-base">{workout.title}</h2>
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
              <div className="flex gap-1">
                {workout.groups.map(group => (
                  <Badge key={group}>{group}</Badge>
                ))}
              </div>
            </div>
            <p className="text-sm mt-1">{workout.exercises}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

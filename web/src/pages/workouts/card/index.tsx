import type { Workout } from '@/api/fetch-workouts'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Edit3, Ellipsis, Trash2 } from 'lucide-react'

type Props = {
  workout: Workout
}

export function WorkoutCard({ workout }: Props) {
  return (
    <Card>
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
  )
}

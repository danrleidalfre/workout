import { deleteWorkout } from '@/api/delete-workout'
import type { Workout } from '@/api/fetch-workouts'
import { AlertDialogConfirmation } from '@/components/alert-dialog-confirmation'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useToast } from '@/hooks/use-toast'
import { useQueryClient } from '@tanstack/react-query'
import { Edit3, Ellipsis, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

type Props = {
  workout: Workout
}

export function WorkoutCard({ workout }: Props) {
  const navigate = useNavigate()
  const { toast } = useToast()

  const [isAlertOpen, setIsAlertOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const queryClient = useQueryClient()

  const onConfirm = async () => {
    setIsDeleting(true)
    await deleteWorkout(workout.id)
    setIsDeleting(false)
    setIsAlertOpen(false)
    queryClient.invalidateQueries({ queryKey: ['workouts'] })
    toast({ title: 'Sucesso', description: 'Treino removido com sucesso' })
  }

  return (
    <>
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
                  <DropdownMenuItem
                    onClick={() => navigate(`/workout/${workout.id}`)}
                  >
                    <Edit3 className="size-4 mr-2" />
                    <span>Editar</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setIsAlertOpen(true)}>
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
      <AlertDialogConfirmation
        open={isAlertOpen}
        onConfirm={onConfirm}
        onCancel={() => setIsAlertOpen(false)}
        isDeleting={isDeleting}
      />
    </>
  )
}

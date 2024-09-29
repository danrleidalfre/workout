import { deleteExercise } from '@/api/delete-exercise'
import type { Exercise } from '@/api/fetch-exercises'
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
import { ExerciseForm } from '../form'

type Props = {
  exercise: Exercise
}

export function ExerciseCard({ exercise }: Props) {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isAlertOpen, setIsAlertOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const { toast } = useToast()

  const queryClient = useQueryClient()

  const onConfirm = async () => {
    setIsDeleting(true)
    await deleteExercise(exercise.id)
    setIsDeleting(false)
    setIsAlertOpen(false)
    queryClient.invalidateQueries({ queryKey: ['exercises'] })
    toast({ title: 'Sucesso', description: 'Exercício removido com sucesso' })
  }

  return (
    <>
      <Card key={exercise.id}>
        <CardContent className="flex items-center justify-between p-5">
          <div className="flex items-center gap-2">
            <h2 className="font-semibold text-base select-none">
              {exercise.title}
            </h2>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Ellipsis className="text-primary cursor-pointer" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem onClick={() => setIsFormOpen(true)}>
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
          <Badge className="select-none">{exercise.group}</Badge>
        </CardContent>
      </Card>
      <ExerciseForm
        exercise={exercise}
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        onCloseForm={() => setIsFormOpen(false)}
      />
      <AlertDialogConfirmation
        open={isAlertOpen}
        onConfirm={onConfirm}
        onCancel={() => setIsAlertOpen(false)}
        isDeleting={isDeleting}
      />
    </>
  )
}

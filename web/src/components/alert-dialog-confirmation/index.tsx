import type { AlertDialogProps } from '@radix-ui/react-alert-dialog'
import { LoaderCircle } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog'

type Props = AlertDialogProps & {
  onConfirm: () => void
  onCancel: () => void
  isDeleting: boolean
}

export function AlertDialogConfirmation({
  onConfirm,
  onCancel,
  isDeleting,
  ...props
}: Props) {
  return (
    <AlertDialog {...props}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Atenção</AlertDialogTitle>
          <AlertDialogDescription>
            Tem certeza que deseja remover esse registro?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>Não</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>
            {isDeleting ? (
              <LoaderCircle className="size-4 animate-spin" />
            ) : (
              'Sim'
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

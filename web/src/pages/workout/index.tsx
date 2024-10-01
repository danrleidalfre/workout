import { SelectExercises } from '@/components/select-exercises'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import {
  CheckCircle2,
  CircleChevronLeft,
  Copy,
  Ellipsis,
  PlusCircle,
  Trash2,
} from 'lucide-react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

export function Workout() {
  const { id } = useParams()

  const [selectedExercise, setSelectedExercise] = useState('')

  return (
    <form className="grid gap-4">
      <div className="grid grid-cols-[1fr_auto] gap-4">
        <Input placeholder="Nome do treino" />
        <Button className="items-center gap-1">
          <PlusCircle className="size-4" />
          <span>Exercício</span>
        </Button>
      </div>

      <div className="grid gap-2">
        <div className="grid grid-cols-[1fr_auto] gap-4">
          <SelectExercises onSelectedExercise={setSelectedExercise} />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="outline">
                <Ellipsis className="cursor-pointer" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <PlusCircle className="size-4 mr-2" />
                <span>Adicionar série</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Copy className="size-4 mr-2" />
                <span>Duplicar exercício</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Trash2 className="size-4 mr-2" />
                <span>Excluir exercício</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="grid grid-cols-[1fr_1fr_auto] gap-4">
          <Input placeholder="Carga" />
          <Input placeholder="Repetições" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="outline">
                <Ellipsis className="cursor-pointer" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Copy className="size-4 mr-2" />
                <span>Duplicar série</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Trash2 className="size-4 mr-2" />
                <span>Excluir série</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="flex justify-between">
        <Button className="items-center gap-1" variant="outline">
          <CircleChevronLeft className="size-4" />
          <span>Voltar</span>
        </Button>
        <Button className="items-center gap-1">
          <CheckCircle2 className="size-4" />
          <span>Salvar</span>
        </Button>
      </div>
    </form>
  )
}

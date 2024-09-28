import { fetchGroups } from '@/api/fetch-groups'
import { Button } from '@/components/ui/button'
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
import { PlusCircle } from 'lucide-react'

export function ExerciseFormSheet() {
  const { data: groups } = useQuery({
    queryKey: ['groups'],
    queryFn: fetchGroups,
    staleTime: 1000 * 60,
  })

  return (
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
  )
}

import { SelectGroup } from '@/components/select-group'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
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
import { PlusCircle } from 'lucide-react'

export function ExerciseForm() {
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
        <SheetDescription>
          <form className="grid gap-4 my-4">
            <Input placeholder="Nome do exercício" />
            <SelectGroup />
          </form>
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

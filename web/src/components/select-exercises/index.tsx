import { Check, ChevronsUpDown } from 'lucide-react'

import { fetchExercises } from '@/api/fetch-exercises'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

type Props = {
  onSelectedExercise: (value: string) => void
}

export function SelectExercises({ onSelectedExercise }: Props) {
  const [open, setOpen] = useState(false)
  const [selectedExercise, setSelectedExercise] = useState('')

  const { data: exercises } = useQuery({
    queryKey: ['exercises'],
    queryFn: () => fetchExercises({ search: null, groupId: null }),
  })

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between"
        >
          {selectedExercise
            ? exercises?.find(exercise => exercise.id === selectedExercise)
                ?.title
            : 'Selecione o exercício'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command>
          <CommandInput placeholder="Pesquisar..." />
          <CommandList>
            <CommandEmpty>Exercício não encontrado</CommandEmpty>
            <CommandGroup>
              {exercises?.map(exercise => (
                <CommandItem
                  key={exercise.id}
                  value={exercise.id}
                  onSelect={currentValue => {
                    const value =
                      currentValue === selectedExercise ? '' : currentValue
                    setSelectedExercise(value)
                    onSelectedExercise(value)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      selectedExercise === exercise.id
                        ? 'opacity-100'
                        : 'opacity-0'
                    )}
                  />
                  {exercise.title}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

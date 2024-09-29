import { fetchGroups } from '@/api/fetch-groups'
import type { SelectProps } from '@radix-ui/react-select'
import { useQuery } from '@tanstack/react-query'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'

type Props = SelectProps & {
  placeholder?: string
}

export function SelectGroup({
  placeholder = 'Selecione o grupo muscular',
  ...props
}: Props) {
  const { data: groups } = useQuery({
    queryKey: ['groups'],
    queryFn: fetchGroups,
  })

  return (
    <Select {...props}>
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {groups?.map(group => (
          <SelectItem key={group.id} value={group.id}>
            {group.group}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

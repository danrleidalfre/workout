import type { SelectProps } from '@radix-ui/react-select'
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

export function SelectRestTime({
  placeholder = 'Selecione o tempo de descanso',
  ...props
}: Props) {
  return (
    <Select {...props}>
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="0">Nenhum</SelectItem>
        <SelectItem value="30">30s</SelectItem>
        <SelectItem value="45">45s</SelectItem>
        <SelectItem value="60">1 minuto</SelectItem>
        <SelectItem value="75">1 minuto e 15s</SelectItem>
        <SelectItem value="90">1 minuto e 30s</SelectItem>
        <SelectItem value="105">1 minuto e 45s</SelectItem>
        <SelectItem value="120">2 minutos</SelectItem>
        <SelectItem value="135">2 minutos e 15s</SelectItem>
        <SelectItem value="150">2 minutos e 30s</SelectItem>
        <SelectItem value="165">2 minutos e 45s</SelectItem>
        <SelectItem value="180">3 minutos</SelectItem>
        <SelectItem value="210">3 minutos e 30s</SelectItem>
        <SelectItem value="240">4 minutos</SelectItem>
        <SelectItem value="270">4 minutos e 30s</SelectItem>
        <SelectItem value="300">5 minutos</SelectItem>
      </SelectContent>
    </Select>
  )
}

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { CalendarIcon } from 'lucide-react'
import { type HTMLAttributes, useState } from 'react'
import type { DateRange } from 'react-day-picker'

interface DatePickerRangeProps extends HTMLAttributes<HTMLDivElement> {
  onDateChange?: (date: DateRange | undefined) => void
}

export function DatePickerRange({
  className,
  onDateChange,
}: DatePickerRangeProps) {
  const [date, setDate] = useState<DateRange | undefined>(undefined)

  const handleSelect = (selectedDate: DateRange | undefined) => {
    setDate(selectedDate)
    if (onDateChange) {
      onDateChange(selectedDate)
    }
  }

  return (
    <div className={cn('', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outline"
            size="icon"
            className={cn('font-normal', !date && 'text-muted-foreground')}
          >
            <CalendarIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleSelect}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

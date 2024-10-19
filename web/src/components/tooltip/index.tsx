import type { ReactNode } from 'react'
import {
  Tooltip as TooltipBase,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip'

type Props = {
  content: string
  children: ReactNode
}

export function Tooltip({ content, children }: Props) {
  return (
    <TooltipProvider>
      <TooltipBase delayDuration={100}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent>{content}</TooltipContent>
      </TooltipBase>
    </TooltipProvider>
  )
}

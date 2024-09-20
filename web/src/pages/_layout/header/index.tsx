import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { BicepsFlexed } from 'lucide-react'
import { NavLink } from './nav-link'

export function Header() {
  return (
    <header className="flex justify-between items-center h-20 px-8 border-b">
      <div className="flex items-center gap-4">
        <BicepsFlexed className="size-10 text-primary" />

        <Separator orientation="vertical" className="h-8" />

        <nav className="flex gap-4">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/workouts">Workouts</NavLink>
          <NavLink to="/exercises">Exercises</NavLink>
        </nav>
      </div>
      <Avatar>
        <AvatarImage src="https://github.com/danrleidalfre.png" />
        <AvatarFallback>DF</AvatarFallback>
      </Avatar>
    </header>
  )
}

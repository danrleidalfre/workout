import { Separator } from '@/components/ui/separator'
import { BicepsFlexed, Dumbbell, Home, Trophy } from 'lucide-react'
import { Account } from './account'
import { NavLink } from './nav-link'
import { ToggleTheme } from './toggle-theme'

export function Header() {
  return (
    <header className="flex justify-between items-center h-20 px-8 border-b">
      <div className="flex items-center gap-5">
        <BicepsFlexed className="size-10 text-primary" strokeWidth={1} />

        <Separator orientation="vertical" className="h-10" />

        <nav className="flex gap-5">
          <NavLink to="/">
            <Home className="size-5" />
            <span>Início</span>
          </NavLink>
          <NavLink to="/workouts">
            <Trophy className="size-5" />
            <span>Treinos</span>
          </NavLink>
          <NavLink to="/exercises">
            <Dumbbell className="size-5" />
            <span>Exercícios</span>
          </NavLink>
        </nav>
      </div>

      <div className="flex gap-4">
        <ToggleTheme />
        <Account />
      </div>
    </header>
  )
}

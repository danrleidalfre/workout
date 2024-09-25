import { Separator } from '@/components/ui/separator'
import { BicepsFlexed } from 'lucide-react'
import { Account } from './account'
import { NavLink } from './nav-link'
import { ToggleTheme } from './toggle-theme'

export function Header() {
  return (
    <header className="flex justify-between items-center h-20 px-8 border-b">
      <div className="flex items-center gap-4">
        <BicepsFlexed className="size-10 text-primary" strokeWidth={1} />

        <Separator orientation="vertical" className="h-10" />

        <nav className="flex gap-4">
          <NavLink to="/">Início</NavLink>
          <NavLink to="/workouts">Treinos</NavLink>
          <NavLink to="/exercises">Exercícios</NavLink>
        </nav>
      </div>

      <div className="flex gap-4">
        <ToggleTheme />
        <Account />
      </div>
    </header>
  )
}

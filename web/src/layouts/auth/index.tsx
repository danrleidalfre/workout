import { BicepsFlexed } from 'lucide-react'
import { Outlet } from 'react-router-dom'

export function AuthLayout() {
  return (
    <div className="grid grid-cols-2 h-screen">
      <div className="flex justify-center items-center bg-secondary">
        <BicepsFlexed className="size-60 text-primary" strokeWidth={1} />
      </div>
      <Outlet />
    </div>
  )
}

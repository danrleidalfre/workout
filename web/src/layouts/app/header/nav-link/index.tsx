import { Link, type LinkProps, useLocation } from 'react-router-dom'

export function NavLink(props: LinkProps) {
  const { pathname } = useLocation()

  const isActive =
    pathname === props.to ||
    (props.to === '/workouts' && pathname.startsWith('/workout'))

  return (
    <Link
      data-active={isActive}
      className="text-sm font-semibold text-muted-primary hover:text-primary data-[active=true]:text-primary transition-all flex gap-1 items-center"
      {...props}
    />
  )
}

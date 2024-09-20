import { Link, type LinkProps, useLocation } from 'react-router-dom'

export function NavLink(props: LinkProps) {
  const { pathname } = useLocation()

  return (
    <Link
      data-active={pathname === props.to}
      className="text-sm font-medium text-muted-foreground hover:text-foreground data-[active=true]:text-foreground"
      {...props}
    />
  )
}

import { Link, type LinkProps, useLocation } from 'react-router-dom'

export function NavLink(props: LinkProps) {
  const { pathname } = useLocation()

  return (
    <Link
      data-active={pathname === props.to}
      className="text-base font-semibold text-muted-primary hover:text-primary data-[active=true]:text-primary transition-all flex gap-1 items-center"
      {...props}
    />
  )
}

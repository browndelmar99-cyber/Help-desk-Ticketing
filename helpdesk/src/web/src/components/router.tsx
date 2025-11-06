import React, { ReactNode } from 'react'

type Route = { path: string, element: ReactNode }

export function Router({ routes }: { routes: Route[] }) {
  const [path, setPath] = React.useState(window.location.pathname)
  React.useEffect(() => {
    const onPop = () => setPath(window.location.pathname)
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])
  const match = routes.find(r => path.startsWith(r.path)) || routes[0]
  return <>{match.element}</>
}

export function Link({ to, children, className }: { to: string, children: ReactNode, className?: string }) {
  return <a href={to} className={className} onClick={(e) => { e.preventDefault(); window.history.pushState({}, '', to); window.dispatchEvent(new PopStateEvent('popstate')) }}>{children}</a>
}

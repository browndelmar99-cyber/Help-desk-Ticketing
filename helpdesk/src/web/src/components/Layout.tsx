import { ReactNode } from 'react'
import { Link } from './router'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-4">
          <Link to="/" className="font-semibold text-lg">
            <span className="text-brand-green">●</span> Helpdesk
          </Link>
          <nav className="ml-auto flex gap-4 text-sm">
            <Link to="/dashboard" className="hover:underline">Helpdesk Dashboard</Link>
            <Link to="/ticket" className="hover:underline">Find Ticket</Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        {children}
      </main>
      <footer className="border-t bg-white">
        <div className="max-w-5xl mx-auto px-4 py-6 text-sm text-gray-500">© {new Date().getFullYear()} Helpdesk</div>
      </footer>
    </div>
  )
}

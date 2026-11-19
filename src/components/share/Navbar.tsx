import React from 'react'
import { StarCheck } from 'lucide-react'
import { Link } from 'react-router-dom'

export const Navbar: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/80  shadow shadow-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2 group">
            <img
              loading='lazy'
              src="/images/logo.jpg"
              alt="Rick y Morty"
              className="h-11 w-auto object-contain rounded-md transition-all duration-300 group-hover:scale-105 group-hover:drop-shadow-[0_0_12px_rgba(57,255,20,0.5)]"
            />
          </Link>
        </div>

        <nav className="flex items-center gap-4">
          <Link
            to="/favorites"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700/60 text-xs font-medium transition-all"
          >
            <StarCheck className="w-4 h-4 text-accent" />
            <span>Mis favoritos</span>
          </Link>
        </nav>
      </div>
    </header>
  )
}

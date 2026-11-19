import React from 'react'
import { Heart, Code2 } from 'lucide-react'

export const Footer: React.FC = () => {
  return (
    <footer className="py-8 border-t border-slate-800/80 mt-16 text-center text-xs text-slate-500">
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-slate-400">
          <Code2 className="w-4 h-4 text-blue-400" />
          <span>React Basic Template — Arquitectura para Proyectos Sencillos</span>
        </div>
        <p className="flex items-center gap-1">
          Hecho con <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" /> para desarrollo ágil
        </p>
      </div>
    </footer>
  )
}

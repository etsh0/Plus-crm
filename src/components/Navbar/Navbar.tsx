'use client'

import { useState } from 'react'
import Link from 'next/link'

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none px-4">
        <nav 
          className={`
            pointer-events-auto mt-10 px-4 py-2 md:px-6 md:py-3 
            flex flex-col md:flex-row items-center justify-between 
            gap-4 md:gap-8 max-w-4xl w-full mx-auto 
            rounded-3xl md:rounded-full 
            bg-white/5 backdrop-blur-md border border-white/10 
            shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] 
            transition-all duration-300 ease-in-out
            ${isOpen ? 'py-8' : ''}
          `}
        >
            <div className="flex items-center justify-between w-full md:w-auto">
                {/* ── Logo ── */}
                <Link
                    href="/"
                    className="shrink-0 text-sm sm:text-lg font-bold tracking-tight select-none"
                    onClick={() => setIsOpen(false)}
                >
                    <span className="text-white">PLUS</span>
                    <span className="bg-linear-to-r from-fuchsia-400 via-violet-400 to-purple-400 bg-clip-text text-transparent"> CRM</span>
                </Link>

                {/* ── Burger Button (Mobile Only) ── */}
                <button 
                  onClick={() => setIsOpen(!isOpen)}
                  className="md:hidden flex flex-col justify-center items-center gap-1.5 w-8 h-8 transition-all hover:bg-white/10"
                  aria-label="Toggle menu"
                >
                  <span className={`w-5 h-0.5 bg-white rounded-full transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
                  <span className={`w-5 h-0.5 bg-white rounded-full transition-all duration-300 ${isOpen ? 'opacity-0 scale-x-0' : ''}`} />
                  <span className={`w-5 h-0.5 bg-white rounded-full transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                </button>
            </div>

            {/* ── Nav links ── */}
            <ul 
              className={`
                ${isOpen ? 'flex opacity-100 translate-y-0' : 'hidden md:flex opacity-0 md:opacity-100 -translate-y-4 md:translate-y-0'} 
                flex-col md:flex-row items-center gap-6 md:gap-8 list-none m-0 p-0 text-white/60 
                transition-all duration-300 w-full md:w-auto
              `}
            >
                <li>
                    <Link href="/" className="text-sm font-medium transition-all duration-300 hover:text-white" onClick={() => setIsOpen(false)}>Features</Link>
                </li>
                <li>
                    <Link href="/" className="text-sm font-medium transition-all duration-300 hover:text-white" onClick={() => setIsOpen(false)}>How it Works</Link>
                </li>
                <li>
                    <Link href="/" className="text-sm font-medium transition-all duration-300 hover:text-white" onClick={() => setIsOpen(false)}>Testimonials</Link>
                </li>
                <li>
                    <Link href="/" className="text-sm font-medium transition-all duration-300 hover:text-white" onClick={() => setIsOpen(false)}>Pricing</Link>
                </li>
                {/* Mobile-only Sign In Link */}
                <li className="md:hidden w-full pt-4 border-t border-white/5">
                  <Link
                    href="/login"
                    className="flex justify-center items-center w-full py-3 rounded-2xl bg-white/5 text-sm font-medium text-white border border-white/10"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign In
                  </Link>
                </li>
            </ul>

            {/* ── Sign In button (Desktop Only) ── */}
            <Link
                href="/login"
                className="hidden md:flex shrink-0 text-sm font-medium text-white/80 px-5 py-2 rounded-full border border-white/20 transition-all duration-300 hover:text-white hover:bg-white/10 hover:border-white/30"
                >
                Sign In
            </Link>
        </nav>
    </header>
  )
}


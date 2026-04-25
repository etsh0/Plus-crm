'use client'

import Link from 'next/link'

export const Navbar = () => {

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none">
      <nav
        className="pointer-events-auto mt-10 px-6 py-3 flex items-center justify-between gap-8 max-w-4xl w-full mx-auto rounded-full bg-white/5 backdrop-blur-md border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] transition-all duration-300
        "
        aria-label="Main navigation"
      >
        {/* ── Logo ── */}
        <Link
          href="/"
          className="shrink-0 text-lg font-bold tracking-tight select-none"
        >
          <span className="text-white">PLUS CRM</span>
        </Link>

        {/* ── Nav links (hidden on mobile) ── */}
        <ul className="hidden md:flex items-center gap-6 list-none m-0 p-0 text-white/60">
            <li >
                <Link href={""} className='text-sm font-medium transition-all duration-300 hover:text-white'>Features</Link>
            </li>
            <li >
                <Link href={""} className='text-sm font-medium transition-all duration-300 hover:text-white'>Pricing</Link>
            </li>
            <li >
                <Link href={""} className='text-sm font-medium transition-all duration-300 hover:text-white'>Testimonials</Link>
            </li>
            <li >
                <Link href={""} className='text-sm font-medium transition-all duration-300 hover:text-white'>About</Link>
            </li>
        </ul>

        {/* ── Sign In button ── */}
        <Link
          href="/login"
          className="
            shrink-0
            text-sm font-medium text-white/80
            px-5 py-2
            rounded-full
            border border-white/20
            transition-all duration-300
            hover:text-white
            hover:bg-white/10
            hover:border-white/30
          "
        >
          Sign In
        </Link>
      </nav>
    </header>
  )
}

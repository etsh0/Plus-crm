import Link from 'next/link'


export const Hero = () => {
  return (
    <section
      aria-label="Hero"
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-black"
    >
      <div 
        data-aos="fade" 
        data-aos-duration="1500"
        className="absolute inset-0 pointer-events-none select-none overflow-hidden"
      >
        <video
          src="/light-pillar-1776935081893.webm" 
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-90"
        />
      </div>

      {/* ── Subtle dark vignette so text stays legible ── */}
      <div
        data-aos="fade"
        data-aos-duration="2000"
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_50%_50%,transparent_20%,rgba(0,0,0,0.72)_100%)]"
      />

      {/* ── Content — perfectly centered over the pillar ── */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 pt-40 pb-24 max-w-4xl mx-auto gap-7">

        {/* Badge */}
        <div data-aos="fade-up" className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-400/20 bg-violet-500/10 backdrop-blur-sm text-[10px] sm:text-xs font-medium text-violet-300 tracking-wide">
          <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
          Now in public beta — free to get started
        </div>

        {/* Headline */}
        <h1 data-aos="fade-up" data-aos-delay="150" className="text-[34px] sm:text-6xl md:text-7xl font-bold leading-[1.08] tracking-tight text-white drop-shadow-[0_2px_24px_rgba(168,85,247,0.4)]">
          Your customers,{' '}
          <span className="bg-linear-to-r from-fuchsia-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
            finally
          </span>
          {' '}under control
        </h1>

        {/* Sub-headline */}
        <p data-aos="fade-up" data-aos-delay="300" className="max-w-xl text-xs sm:text-lg text-white/55 leading-relaxed">
          PulseCRM is the high-performance command center for sales
          teams. Streamline your workflow, automate follow-ups, and
          visualize your entire pipeline in one luminous interface.
        </p>

        {/* CTAs */}
        <div data-aos="fade-up" data-aos-delay="450" className="flex flex-wrap items-center justify-center gap-4 mt-1">

          {/* Primary */}
          <Link
            href="/register"
            className="
              inline-flex items-center gap-2
              px-7 py-3.5 rounded-full
              border border-violet-400/20
              bg-violet-500/10
              backdrop-blur-sm
              text-sm font-medium text-violet-200
              transition-all duration-300
              hover:bg-violet-500/20
              hover:border-violet-400/40
              hover:text-white
            "
          >
            <span className="">
              Get started free
            </span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* Social proof */}
        <div data-aos="fade-up" data-aos-delay="600" className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 mt-3">

          {/* Avatars */}
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2.5">
              {['EB', 'JM', 'AR', 'TK'].map((initials, i) => (
                <span
                  key={initials}
                  style={{
                    zIndex: 4 - i,
                    background: `hsl(${270 + i * 18} 65% ${30 + i * 7}%)`,
                  }}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold text-white ring-2 ring-black"
                >
                  {initials}
                </span>
              ))}
            </div>
            <p className="text-xs text-white/40">
              Joined by{' '}
              <span className="text-violet-300 font-medium">2,400+</span> teams
            </p>
          </div>

          <div className="hidden sm:block w-px h-5 bg-white/10" />

          {/* Stars */}
          <div className="flex items-center gap-2">
            <div className="flex gap-0.5" aria-label="5 star rating">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="w-3.5 h-3.5 text-fuchsia-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-xs text-white/40">
              <span className="text-violet-300 font-medium">4.9/5</span> from 380 reviews
            </p>
          </div>
        </div>
      </div>

      {/* ── Bottom fade to black ── */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent pointer-events-none"
      />
    </section>
  )
}

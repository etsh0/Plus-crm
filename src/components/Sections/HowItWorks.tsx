export const HowItWorks = () => {
  return (
    <section className="relative w-full py-24 bg-black overflow-hidden flex flex-col items-center">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-fuchsia-600/10 blur-[150px] rounded-[100%] pointer-events-none" />

      <div className="relative z-10 max-w-6xl w-full px-6 flex flex-col items-center">
        {/* ── Heading ── */}
        <div className="text-center max-w-2xl mb-24">
          <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight leading-tight mb-6">
            How it works
          </h2>
          <p className="text-white/50 text-xs md:text-base leading-relaxed">
            Get up and running in minutes. Our streamlined process ensures you spend less time setting up and more time closing deals.
          </p>
        </div>

        {/* ── Steps Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative w-full">
          {/* Connection Line for desktop */}
          <div className="hidden md:block absolute top-8 left-[16%] right-[16%] h-[1px] bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />

          {/* Step 1 */}
          <div className="relative flex flex-col items-center text-center group">
            {/* Number badge */}
            <div className="relative mb-8 transition-transform duration-500 ">
              <div className="absolute inset-0 bg-violet-500/20 blur-xl rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="w-16 h-16 rounded-2xl bg-[#050508] border border-white/10 flex items-center justify-center relative z-10 backdrop-blur-xl shadow-[0_0_30px_rgba(139,92,246,0.2)]">
                <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-violet-400 to-fuchsia-400">1</span>
              </div>
            </div>
            
            <div className="bg-white/[0.02] border border-white/5 p-8 rounded-2xl backdrop-blur-sm w-full h-full transition-all duration-500 group-hover:bg-white/[0.04] group-hover:border-white/10 shadow-[0_0_0_rgba(0,0,0,0)] group-hover:shadow-[0_8px_32px_rgba(139,92,246,0.1)]">
              <h3 className="text-xl font-semibold text-white mb-3">Create account</h3>
              <p className="text-white/50 leading-relaxed text-sm">
                Sign up in seconds. No credit card required. Experience the full
                power of PulseCRM immediately.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="relative flex flex-col items-center text-center group">
            <div className="relative mb-8 transition-transform duration-500">
              <div className="absolute inset-0 bg-fuchsia-500/20 blur-xl rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="w-16 h-16 rounded-2xl bg-[#050508] border border-white/10 flex items-center justify-center relative z-10 backdrop-blur-xl shadow-[0_0_30px_rgba(217,70,239,0.2)]">
                <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-fuchsia-400 to-purple-400">2</span>
              </div>
            </div>
            
            <div className="bg-white/[0.02] border border-white/5 p-8 rounded-2xl backdrop-blur-sm w-full h-full transition-all duration-500 group-hover:bg-white/[0.04] group-hover:border-white/10 shadow-[0_0_0_rgba(0,0,0,0)] group-hover:shadow-[0_8px_32px_rgba(217,70,239,0.1)]">
              <h3 className="text-xl font-semibold text-white mb-3">Add customers</h3>
              <p className="text-white/50 leading-relaxed text-sm">
                Import your existing contacts via CSV or sync with your email
                provider. Our AI cleans the data automatically.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="relative flex flex-col items-center text-center group">
            <div className="relative mb-8 transition-transform duration-500">
              <div className="absolute inset-0 bg-purple-500/20 blur-xl rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="w-16 h-16 rounded-2xl bg-[#050508] border border-white/10 flex items-center justify-center relative z-10 backdrop-blur-xl shadow-[0_0_30px_rgba(168,85,247,0.2)]">
                <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-purple-400 to-violet-400">3</span>
              </div>
            </div>
            
            <div className="bg-white/[0.02] border border-white/5 p-8 rounded-2xl backdrop-blur-sm w-full h-full transition-all duration-500 group-hover:bg-white/[0.04] group-hover:border-white/10 shadow-[0_0_0_rgba(0,0,0,0)] group-hover:shadow-[0_8px_32px_rgba(168,85,247,0.1)]">
              <h3 className="text-xl font-semibold text-white mb-3">Track deals</h3>
              <p className="text-white/50 leading-relaxed text-sm">
                Watch your sales cycle accelerate. Set up automation rules to
                nurture leads while you sleep.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

import { ChartNoAxesCombined, Percent, User } from "lucide-react"

export const Features = () => {
  return (
    <section className="relative w-full py-24 bg-black overflow-hidden flex flex-col items-center">
      {/* Background Ambient Glow */}
      
      <div className="relative z-10 max-w-6xl w-full px-6 flex flex-col items-center">
        
        {/* ── Section Heading ── */}
        <div className="text-center max-w-2xl mb-20">
          <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight leading-tight mb-6 drop-shadow-sm">
              Engineered for Excellence
          </h2>
          <p className="text-white/50 text-xs md:text-base leading-relaxed">
              PulseCRM delivers the tools you need to outpace the competition without the complexity
              of legacy systems.
          </p>
        </div>

        {/* ── 3-Column Features Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          
          {/* Card 1 */}
          <div className="group relative p-px rounded-lg bg-linear-to-b from-violet-500/30 to-white/5 overflow-hidden transition-all duration-500 shadow-[0_0_40px_-10px_rgba(168,85,247,0.3)]">
            <div className="relative h-full bg-[#050508] backdrop-blur-xl rounded-lg p-8 flex flex-col ">  
              <div className="text-white mb-4 flex items-center ">
                <User size={"40"} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Customer Management</h3>
              <p className="text-white/50 leading-relaxed text-sm">
                Centralize every interaction.
                Keep a 360-degree view of your
                customer relationships in real-
                time.              
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="group relative p-px rounded-lg bg-linear-to-b from-violet-500/30 to-white/5 overflow-hidden transition-all duration-500 shadow-[0_0_40px_-10px_rgba(168,85,247,0.3)]">
            <div className="relative h-full bg-[#050508] backdrop-blur-xl rounded-lg p-8 flex flex-col">
              <div className="text-white mb-4 flex items-center ">
                <Percent size={"40"} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Sales Pipeline</h3>
              <p className="text-white/50 leading-relaxed text-sm">
                  Visualize your deal flow. Drag,
                  drop, and close with a pipeline
                  built for high-velocity sales.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="group relative p-px rounded-lg bg-linear-to-b from-violet-500/30 to-white/5 overflow-hidden transition-all duration-500 shadow-[0_0_40px_-10px_rgba(168,85,247,0.3)]">
            <div className="relative h-full bg-[#050508] backdrop-blur-xl rounded-lg p-8 flex flex-col">
              <div className="text-white mb-4 flex items-center ">
                <ChartNoAxesCombined size={"40"} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Analytics</h3>
              <p className="text-white/50 leading-relaxed text-sm">
                  Data-driven decisions. Uncover
                  bottlenecks and growth
                  opportunities with automated
                  reporting.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

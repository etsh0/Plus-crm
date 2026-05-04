
export const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CEO at TechFlow",
      content: "PulseCRM has completely transformed how we handle our sales pipeline. The automation features are a game changer.",
      initials: "SJ"
    },
    {
      name: "Michael Chen",
      role: "Head of Sales at Orbis Systems",
      content: "The most intuitive CRM I've ever used. The interface is blazingly fast and the team loves it.",
      initials: "MC"
    },
    {
      name: "Elena Rodriguez",
      role: "Founder of NovaSpark",
      content: "Finally, a CRM that doesn't get in the way. It's built for speed and efficiency.",
      initials: "ER"
    },
    {
      name: "David Smith",
      role: "Product Manager at CloudScale",
      content: "The analytics insights provided by PulseCRM helped us identify bottlenecks we didn't even know existed.",
      initials: "DS"
    },
    {
      name: "Jessica Lee",
      role: "VP of Growth at SkyRocket",
      content: "Deployment was seamless. We were up and running in less than a day with all our data imported.",
      initials: "JL"
    },
    {
      name: "Marcus Wright",
      role: "Director of Operations at PeakForce",
      content: "Customer support is top-notch. Any question we had was answered within minutes.",
      initials: "MW"
    }
  ];

  return (
    <section className="relative w-full py-24 bg-black overflow-hidden flex flex-col items-center">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-violet-600/10 blur-[120px] rounded-[100%] pointer-events-none" />

      <div className="relative z-10 max-w-6xl w-full px-6 flex flex-col items-center">
        {/* Heading */}
        <div className="text-center max-w-2xl mb-20">
          <h2 data-aos="fade-up" className="text-4xl sm:text-5xl font-bold text-white tracking-tight leading-tight mb-6">
            Loved by Teams Worldwide
          </h2>
          <p data-aos="fade-up" data-aos-delay="100" className="text-white/50 text-xs md:text-base leading-relaxed">
            Join thousands of teams who have optimized their sales process with PulseCRM.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {testimonials.map((t, i) => (
            <div 
              key={i}
              data-aos="fade-up"
              data-aos-delay={i * 100 + 200}
              className="group relative p-8 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-sm flex flex-col transition-all duration-500 hover:bg-white/[0.04] hover:border-white/10"
            >
              <div className="flex items-center gap-4 mb-6">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white ring-1 ring-white/10"
                  style={{ background: `hsl(${260 + i * 15}, 60%, 40%)` }}
                >
                  {t.initials}
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">{t.name}</h4>
                  <p className="text-xs text-white/40">{t.role}</p>
                </div>
              </div>
              <p className="text-white/70 text-sm leading-relaxed italic">
                {t.content}
              </p>
              
              {/* Subtle accent glow on hover */}
              <div className="absolute inset-0 rounded-2xl transition-opacity duration-500 opacity-0 group-hover:opacity-100 pointer-events-none shadow-[0_0_40px_rgba(139,92,246,0.1)]" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


export const Pricing = () => {
  const plans = [
    {
      name: "Starter",
      price: "0",
      description: "Perfect for individuals and small teams just getting started.",
      features: [
        "Up to 100 contacts",
        "1 sales pipeline",
        "Basic reporting",
        "Mobile app access",
        "Email support"
      ],
      cta: "Get started free",
      popular: false
    },
    {
      name: "Pro",
      price: "49",
      description: "For growing teams that need more power and automation.",
      features: [
        "Unlimited contacts",
        "5 sales pipelines",
        "AI-powered insights",
        "Automated workflows",
        "Priority 24/7 support"
      ],
      cta: "Start 14-day trial",
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "Advanced features and support for large organizations.",
      features: [
        "Dedicated account manager",
        "Custom API integrations",
        "SSO & Advanced security",
        "White-glove onboarding",
        "Custom legal terms"
      ],
      cta: "Contact sales",
      popular: false
    }
  ];

  return (
    <section className="relative w-full py-24 bg-black overflow-hidden flex flex-col items-center">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-fuchsia-600/5 blur-[150px] rounded-[100%] pointer-events-none" />

      <div className="relative z-10 max-w-6xl w-full px-6 flex flex-col items-center">
        {/* Heading */}
        <div className="text-center max-w-2xl mb-20">
          <h2 data-aos="fade-up" className="text-4xl sm:text-5xl font-bold text-white tracking-tight leading-tight mb-6">
            Plans for every stage of growth
          </h2>
          <p data-aos="fade-up" data-aos-delay="100" className="text-white/50 text-xs md:text-base leading-relaxed">
            Choose the plan that fits your team needs. All plans include our core blazingly fast workspace.
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full items-stretch">
          {plans.map((plan, i) => (
            <div 
              key={i}
              data-aos="fade-up"
              data-aos-delay={i * 100 + 200}
              className={`
                relative flex flex-col p-8 rounded-3xl border transition-all duration-500
                ${plan.popular 
                  ? 'bg-white/[0.04] border-violet-500/40 shadow-[0_0_50px_rgba(139,92,246,0.15)] scale-105 z-10' 
                  : 'bg-white/[0.02] border-white/5 hover:border-white/10 hover:bg-white/[0.03]'}
              `}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full text-[10px] font-bold text-white tracking-wider uppercase">
                  Most Popular
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-4xl font-bold text-white">
                    {plan.price !== "Custom" && "$"}
                    {plan.price}
                  </span>
                  {plan.price !== "Custom" && (
                    <span className="text-sm text-white/40">/month</span>
                  )}
                </div>
                <p className="text-sm text-white/50 leading-relaxed">
                  {plan.description}
                </p>
              </div>

              <div className="flex-1 mb-8">
                <p className="text-xs font-bold text-white/70 uppercase tracking-widest mb-4">What is included:</p>
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm text-white/60">
                      <svg className="w-5 h-5 text-fuchsia-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <button 
                className={`
                  w-full py-3 px-6 rounded-xl font-semibold text-sm transition-all duration-300
                  ${plan.popular 
                    ? 'bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)]' 
                    : 'bg-white/10 text-white hover:bg-white/20 border border-white/5'}
                `}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
      
    </section>
  );
};

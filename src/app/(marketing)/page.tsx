import { Hero } from "@/components/Sections/Hero";
import { Features } from "@/components/Sections/Features";
import { HowItWorks } from "@/components/Sections/HowItWorks";
import { Testimonials } from "@/components/Sections/Testimonials";
import { Pricing } from "@/components/Sections/Pricing";

export default function page() {
  return (
    <>
      <div>
          <Hero />
          <Features />
          <HowItWorks />
          <Testimonials />
          <Pricing />
      </div>
    </>
  )
}

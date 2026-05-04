import { Hero } from "@/components/Sections/Hero";
import { Features } from "@/components/Sections/Features";
import { HowItWorks } from "@/components/Sections/HowItWorks";
import { Testimonials } from "@/components/Sections/Testimonials";
import { Pricing } from "@/components/Sections/Pricing";
import { AosInit } from "@/components/AosInit";

export default function page() {
  return (
    <>
      <AosInit />
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

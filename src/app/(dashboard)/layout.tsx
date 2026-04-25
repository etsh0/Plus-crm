import Sidebar from "@/components/Dashboard/Sidebar";
import Image from "next/image";
import bgImg from "@/assets/light-pillar-1776934798991.png";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen overflow-hidden">
      {/* Background Image */}
      <Image
        src={bgImg}
        alt=""
        fill
        priority
        className="object-cover object-center -z-20"
      />
      {/* Dark overlay to ensure readability */}
      <div className="absolute inset-0 -z-10 bg-black/60 backdrop-blur-[2px]" />

      {/* Sidebar with Glassmorphism */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto relative z-10">{children}</main>
    </div>
  );
}

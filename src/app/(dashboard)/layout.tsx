import Sidebar from "@/components/Dashboard/Sidebar";


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex h-screen overflow-hidden bg-[#0A0A0A]">
      
      <Sidebar />
      <main className="flex-1 overflow-y-auto relative z-10 custom-scrollbar">
        {children}
      </main>

    </div>
  );
}

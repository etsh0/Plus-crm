import Sidebar from "@/components/Dashboard/Sidebar";
import Topbar from "@/components/Dashboard/Topbar";
import { Toaster } from 'sonner';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex h-screen overflow-hidden bg-[#f8fafc] dark:bg-[#111111] transition-colors duration-300">
      <Toaster 
        theme="system" 
        position="top-center" 
        richColors
      />
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-y-auto relative z-10 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

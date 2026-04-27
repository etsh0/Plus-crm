import Sidebar from "@/components/Dashboard/Sidebar";
import { Toaster } from 'sonner';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex h-screen overflow-hidden bg-[#0A0A0A]">
      <Toaster 
        theme="dark" 
        position="top-center" 
        toastOptions={{
          style: {
            background: '#18181b',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            color: '#fff',
          },
        }}
      />
      <Sidebar />
      <main className="flex-1 overflow-y-auto relative z-10 custom-scrollbar">
        {children}
      </main>
    </div>
  );
}

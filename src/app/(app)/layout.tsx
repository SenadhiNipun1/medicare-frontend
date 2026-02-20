import type { ReactNode } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="h-screen flex bg-white overflow-hidden">
      {/* Sidebar (Fixed Height) */}
      <Sidebar />

      {/* Main Area */}
      <div className="flex-1 flex flex-col bg-[#F8FAFC]">
        <Navbar />

        {/* Scrollable Content Area */}
        <main className="flex-1 overflow-y-auto px-6 py-8 lg:px-12">
          {children}
        </main>
      </div>
    </div>
  );
}

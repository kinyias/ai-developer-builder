import DashboardHeader from '@/components/dashboard/Header';
import DashboardSidebar from '@/components/dashboard/Sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';

export default function DashboardLayout({ children }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <DashboardSidebar />
        <div className="flex flex-col w-full">
          <DashboardHeader />
          <main className="flex w-full">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}

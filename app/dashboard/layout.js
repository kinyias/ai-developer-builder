import  DashboardSidebar from "@/components/dashboard/Sidebar"
import {SidebarProvider} from "@/components/ui/sidebar"

export default function DashboardLayout({
  children,
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <DashboardSidebar />
        <main className="flex w-full">{children}</main>
      </div>
    </SidebarProvider>
  )
}


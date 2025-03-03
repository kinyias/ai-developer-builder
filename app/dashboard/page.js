import  DashboardHeader from "@/components/dashboard/Header"
import DashboardCards  from "@/components/dashboard/Cards"
import  DashboardCharts from "@/components/dashboard/Charts"
import DashboardTable from "@/components/dashboard/Table"

export default function DashboardPage() {
  return (
    <div className="flex flex-col w-full">
      <DashboardHeader />
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        </div>
        <DashboardCards />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <DashboardCharts />
          <DashboardTable />
        </div>
      </div>
    </div>
  )
}


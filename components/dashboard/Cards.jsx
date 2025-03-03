import { Users, CreditCard, DollarSign, Activity } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function DashboardCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Tổng doanh thu</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">45,231,890đ</div>
          <p className="text-xs text-muted-foreground">+20.1% so với tháng trước</p>
          <div className="mt-4 h-1 w-full rounded-full bg-muted">
            <div className="h-1 w-[75%] rounded-full bg-primary"></div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Lượt đăng kí gói</CardTitle>
          <CreditCard className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">+2350</div>
          <p className="text-xs text-muted-foreground">+180.1% so với tháng trước</p>
          <div className="mt-4 h-1 w-full rounded-full bg-muted">
            <div className="h-1 w-[65%] rounded-full bg-primary"></div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Tổng số khách hàng</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">+12,234</div>
          <p className="text-xs text-muted-foreground">+19% so với tháng trước</p>
          <div className="mt-4 h-1 w-full rounded-full bg-muted">
            <div className="h-1 w-[45%] rounded-full bg-primary"></div>
          </div>
        </CardContent>
      </Card>
      {/* <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Now</CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">+573</div>
          <p className="text-xs text-muted-foreground">+201 since last hour</p>
          <div className="mt-4 h-1 w-full rounded-full bg-muted">
            <div className="h-1 w-[25%] rounded-full bg-primary"></div>
          </div>
        </CardContent>
      </Card> */}
    </div>
  )
}


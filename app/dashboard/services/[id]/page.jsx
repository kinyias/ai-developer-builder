import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Clock, CreditCard, Download, Edit, User } from "lucide-react"
import Link from "next/link"

// This would normally come from a database
const getServiceDetails = (id) => {
  return {
    id: id,
    name: "Nâng cao",
    description: "Enterprise cloud storage solution with advanced security features",
    user: "Sarah Johnson",
    email: "sarah@example.com",
    company: "Acme Inc.",
    registeredDate: "2023-12-10",
    expiryDate: "2024-12-10",
    status: "active",
    plan: "Enterprise",
    price: "$199.99",
    billingCycle: "monthly",
    usage: "75%",
    features: [
      "500TB Storage",
      "Unlimited users",
      "Advanced encryption",
      "24/7 support",
      "Custom domain",
      "API access",
    ],
    activity: [
      { date: "2024-03-08", action: "Storage increased", user: "Sarah Johnson" },
      { date: "2024-02-15", action: "Payment processed", user: "System" },
      { date: "2024-01-20", action: "Added 5 team members", user: "Sarah Johnson" },
      { date: "2023-12-10", action: "Service activated", user: "Admin" },
    ],
  }
}

export default function ServiceDetailsPage({ params }) {
  const service = getServiceDetails(params.id)

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "suspended":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" asChild>
              <Link href="/dashboard/admin/services">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <h2 className="text-3xl font-bold tracking-tight">{service.name}</h2>
            <Badge variant="outline" className={getStatusBadgeVariant(service.status)}>
              {service.status.charAt(0).toUpperCase() + service.status.slice(1)}
            </Badge>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-7">
          {/* Service Info */}
          <Card className="md:col-span-5">
            <CardHeader>
              <CardTitle>Thông tin chi tiết</CardTitle>
              <CardDescription>Details about the registered service</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
               
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h3 className="font-semibold">Service ID</h3>
                    <p className="text-muted-foreground">{service.id}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold">Plan</h3>
                    <p className="text-muted-foreground">{service.plan}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold">Registration Date</h3>
                    <p className="text-muted-foreground">{formatDate(service.registeredDate)}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold">Expiry Date</h3>
                    <p className="text-muted-foreground">{formatDate(service.expiryDate)}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold">Price</h3>
                    <p className="text-muted-foreground">
                      {service.price} / {service.billingCycle}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold">Usage</h3>
                    <div className="flex flex-col gap-1">
                      <span className="text-muted-foreground">{service.usage}</span>
                      <div className="h-2 w-full rounded-full bg-muted">
                        <div className="h-2 rounded-full bg-primary" style={{ width: service.usage }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Features</h3>
                  <ul className="grid gap-2 md:grid-cols-2">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* User Info */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Thông tin người dùng</CardTitle>
              <CardDescription>Chi tiết người đăng kí dịch vụ</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center gap-4 text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                  <User className="h-10 w-10 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{service.user}</h3>
                  <p className="text-muted-foreground">{service.email}</p>
                  <p className="text-muted-foreground">{service.company}</p>
                </div>
                <Button variant="outline" className="w-full">
                  View User Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Billing Tabs */}
        <Tabs defaultValue="billing">
          <TabsList>
            <TabsTrigger value="billing">Lịch sử hoá đơn</TabsTrigger>
          </TabsList>
          <TabsContent value="billing">
            <Card>
              <CardHeader>
                <CardTitle>Lịch sử hoá đơn</CardTitle>
                <CardDescription>Lịch sử thanh toán dịch vụ</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((item) => (
                    <div key={item} className="flex items-start gap-4 border-b pb-4 last:border-0">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                        <CreditCard className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                          <p className="font-medium">Payment for {service.plan} Plan</p>
                          <p className="text-sm text-muted-foreground">
                            {formatDate(`2024-${(4 - item).toString().padStart(2, "0")}-15`)}
                          </p>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                          <p className="text-sm text-muted-foreground">
                            Invoice #INV-{2024}0{item}
                          </p>
                          <p className="font-medium">{service.price}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
  )
}


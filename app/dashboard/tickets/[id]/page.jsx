import { TicketDetails } from "@/components/tickets/TicketsDetail"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function TicketDetailPage({ params }) {
  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/dashboard/tickets">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h2 className="text-3xl font-bold tracking-tight">Yêu cầu #{params.id}</h2>
        </div>
        <div className="w-full">
          <div className=" space-y-4">
            <TicketDetails id={params.id} />
          </div>
        </div>
      </div>
    </div>
  )
}


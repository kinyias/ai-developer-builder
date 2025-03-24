import { TicketsHeader } from "@/components/tickets/TicketsHeader"
import { TicketsTable } from "@/components/tickets/TicketsTable"

export default function TicketsPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
        <TicketsHeader />
        <TicketsTable />
    </div>
  )
}


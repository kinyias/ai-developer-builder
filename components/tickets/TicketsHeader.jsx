"use client"

import { useState } from "react"
import { Search, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function TicketsHeader() {
  const [status, setStatus] = useState("all")
  const [priority, setPriority] = useState("all")

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Hô trợ khách hàng</h2>
        <p className="text-muted-foreground">Quản lý yêu cầu hỗ trợ của khách hàng</p>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search tickets..." className="w-full pl-8" />
        </div>
        <Button>
          <Filter className="mr-2 h-4 w-4" />
          Tìm kiếm
        </Button>
      </div>
    </div>
  )
}


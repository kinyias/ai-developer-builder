"use client"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "../ui/button"

// Get ticket data (in a real app, this would come from an API)
const getTicketData = (id) => {
  // This is mock data - in a real app, you would fetch this from your API
  return {
    id,
    subject: "Cannot access my account",
    customer: {
      name: "Sarah Johnson",
      email: "sarah@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
      company: "Acme Inc.",
    },
    status: "open",
    priority: "high",
    category: "Account Access",
    createdAt: "2024-03-15T10:30:00Z",
    lastUpdated: "2024-03-15T10:30:00Z",
    assignedTo: null,
    messages: [
      {
        id: "msg-1",
        type: "customer",
        sender: {
          name: "Sarah Johnson",
          email: "sarah@example.com",
          avatar: "/placeholder.svg?height=32&width=32",
        },
        content:
          "I've been trying to log in to my account for the past hour but keep getting an 'Invalid credentials' error. I'm sure I'm using the correct password as I have it saved in my password manager. I've also tried resetting my password but I'm not receiving the reset email. Please help me regain access to my account as soon as possible as I have an important presentation tomorrow that requires access to your platform.",
        attachments: [{ name: "screenshot.png", url: "#", size: "245 KB" }],
        timestamp: "2024-03-15T10:30:00Z",
      }
    ],
  }
}

// Get status badge variant
const getStatusBadgeVariant = (status) => {
  switch (status) {
    case "open":
      return "bg-blue-100 text-blue-800"
    case "in-progress":
      return "bg-yellow-100 text-yellow-800"
    case "waiting":
      return "bg-purple-100 text-purple-800"
    case "resolved":
      return "bg-green-100 text-green-800"
    case "closed":
      return "bg-gray-100 text-gray-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

// Format date for display
const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export function TicketDetails({ id }) {
  const ticket = getTicketData(id)
    
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className={getStatusBadgeVariant(ticket.status)}>
              {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1).replace("-", " ")}
            </Badge>
          </div>
          <CardTitle className="text-xl">{ticket.subject}</CardTitle>
          <CardDescription>
            Gửi lúc {formatDate(ticket.createdAt)} bởi {ticket.customer.name}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {ticket.messages.map((message) => (
            <div key={message.id} className="space-y-2">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={message.sender.avatar} alt={message.sender.name} />
                  <AvatarFallback>{message.sender.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{message.sender.name}</span>
                  <span className="text-xs text-muted-foreground">{formatDate(message.timestamp)}</span>
                </div>
              </div>
              <div className="rounded-lg border p-4">
                <p className="whitespace-pre-wrap text-sm">{message.content}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
      <Button variant="destructive" className="flex">
          Đóng yêu cầu
        </Button>
      </CardFooter>
    </Card>
  )
}


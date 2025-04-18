'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '../ui/button';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useEffect, useState } from 'react';
import axios from 'axios';

// Get ticket data (in a real app, this would come from an API)
const getTicketData = (id) => {
  // This is mock data - in a real app, you would fetch this from your API
  return {
    id,
    subject: 'Cannot access my account',
    customer: {
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      avatar: '/placeholder.svg?height=32&width=32',
      company: 'Acme Inc.',
    },
    status: 'open',
    priority: 'high',
    category: 'Account Access',
    createdAt: '2024-03-15T10:30:00Z',
    lastUpdated: '2024-03-15T10:30:00Z',
    assignedTo: null,
    messages: [
      {
        id: 'msg-1',
        type: 'customer',
        sender: {
          name: 'Sarah Johnson',
          email: 'sarah@example.com',
          avatar: '/placeholder.svg?height=32&width=32',
        },
        content:
          "I've been trying to log in to my account for the past hour but keep getting an 'Invalid credentials' error. I'm sure I'm using the correct password as I have it saved in my password manager. I've also tried resetting my password but I'm not receiving the reset email. Please help me regain access to my account as soon as possible as I have an important presentation tomorrow that requires access to your platform.",
        attachments: [{ name: 'screenshot.png', url: '#', size: '245 KB' }],
        timestamp: '2024-03-15T10:30:00Z',
      },
    ],
  };
};

// Get status badge variant
const getStatusBadgeVariant = (status) => {
  if (status) {
    return 'bg-blue-100 text-blue-800';
  } else {
    return 'bg-gray-100 text-gray-800';
  }
};
// Format date for display
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export function TicketDetails({ id }) {
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const response = await axios.get(`/api/tickets/${id}`);
        setTicket(response.data);
      } catch (err) {
        setError('Failed to fetch ticket');
      } finally {
        setLoading(false);
      }
    };

    fetchTicket();
  }, [id]);
  const handleStatusTicket = async () => {
    if (!ticket) return;
    
    setIsUpdating(true);
    try {
      const response = await axios.put(`/api/tickets/${id}`, { 
        status: !ticket.ticket.status // Toggle the status
      });
      // Update local state with the new status
      setTicket(prev => ({
        ...prev,
        status: status
      }));
    } catch (err) {
      setError('Failed to update ticket status');
      console.error('Update error:', err);
    } finally {
      setIsUpdating(false);
    }
  };
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!ticket) return <div>No ticket found</div>;
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className={getStatusBadgeVariant(true)}>
              {ticket.ticket.status ?  'Đã xử lý' : 'Chờ xử lý'}
            </Badge>
          </div>
          <CardTitle className="text-xl">{ticket.ticket.email}</CardTitle>
          <CardDescription>
            Gửi lúc {formatDate(ticket.ticket._creationTime)} bởi {ticket.name}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              {/* <Avatar className="h-8 w-8">
                  <AvatarImage src={message.sender.avatar} alt={message.sender.name} />
                  <AvatarFallback>{message.sender.name.charAt(0)}</AvatarFallback>
                </Avatar> */}
              <div className="flex flex-col">
                <span className="text-sm font-medium">
                  {ticket.ticket.name}
                </span>
                <span className="text-xs text-muted-foreground">
                  {formatDate(ticket.ticket._creationTime)}
                </span>
              </div>
            </div>
            <div className="rounded-lg border p-4">
              <p className="whitespace-pre-wrap text-sm">
                {ticket.ticket.message}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button 
          variant={ticket.ticket.status ? "destructive" : "default"}
          onClick={handleStatusTicket}
          disabled={isUpdating}
        >
          {isUpdating ? 'Processing...' : ticket.ticket.status ? 'Mở lại yêu cầu': 'Đóng yêu cầu'}
        </Button>
        
        {/* Optional: Add a back button */}
        <Button 
          variant="outline" 
          onClick={() => router.push('/dashboard/tickets')}
        >
          Quay lại
        </Button>
      </CardFooter>
    </Card>
  );
}

import { NextResponse } from 'next/server';
import { ConvexHttpClient } from 'convex/browser';
import { api } from '@/convex/_generated/api';

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL);

//GET ALL TICKETS: GET api/tickets
export async function GET() {
  try {
    // Call your Convex query function to get all tickets
    const tickets = await convex.query(api.tickets.GetAllTickets);
    
    return NextResponse.json({
      success: true,
      tickets: tickets,
    });
  } catch (e) {
    console.log('Error at /api/tickets GET', e);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

// ADD TICKETS: POST api/tickets
export async function POST(req) {
  try {
    // Parse the request body
    const {name, email, message} = await req.json();
    
    // Validate required fields
    if (!name || !email || !message) {
      return new NextResponse('Thiếu thông tin', { status: 400 });
    }
    // Call your Convex mutation to create the ticket
    const ticketId = await convex.mutation(api.tickets.CreateTicket, {
      name: name,
      email: email,
      message: message,
      status: false // Default to false if not provided
    });

    return NextResponse.json({
      success: true,
      ticketId: ticketId
    });

  } catch (e) {
    console.error('Error at /api/tickets POST', e);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
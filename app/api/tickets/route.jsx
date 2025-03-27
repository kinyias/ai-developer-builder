import { NextResponse } from 'next/server';
import { ConvexHttpClient } from 'convex/browser';
import { api } from '@/convex/_generated/api';

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL);

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
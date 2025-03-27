import { api } from '@/convex/_generated/api';
import { getConvexClient } from '@/convex/client';
import { NextResponse } from 'next/server';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return new NextResponse('Missing userId', { status: 400 });
  }

  try {
    const convex = getConvexClient();
    const result = await convex.query(api.GetAllWorkspace, { userId });

    return NextResponse.json({ result });
  } catch (e) {
    console.error('Error at /api/get-all-workspaces GET', e);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

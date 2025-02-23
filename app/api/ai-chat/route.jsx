import { chatSession } from '@/configs/AiMode';
import { NextResponse } from 'next/server';
export async function POST(req) {
  const { prompt } = await req.json();
  try {
    const result = await chatSession.sendMessage(prompt);
    const res = result.response.text();
    return NextResponse.json({
      result: res,
    });
  } catch (e) {
    console.log('Error at /api/ai-chat POST', e);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

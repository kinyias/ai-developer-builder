import { genAiCode } from '@/configs/AiMode';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const { prompt } = await req.json();
  try {
    const result = await genAiCode.sendMessage(prompt);
    const res = result.response.text();
    return NextResponse.json(res);
  } catch (e) {
    console.log('Error at /api/gen-ai-code POST', e);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

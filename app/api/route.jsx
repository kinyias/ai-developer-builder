import { NextResponse } from "next/server";

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      message: 'Server is running',
    });
  } catch (e) {
    console.log('Error at /api GET', e);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL);

export async function POST(req) {
  try {
    const body = await req.json();

    // Gọi mutation CreateUser trên Convex
    const result = await convex.mutation(api.users.CreateUser, {
      name: body.name,
      email: body.email,
      picture: body.picture,
      uid: body.uid,
      date: body.date || new Date().toISOString(),
    });

    return NextResponse.json({ success: true, message: "User created successfully", data: result });
  } catch (error) {
    console.error("Error at /api/users/create POST", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

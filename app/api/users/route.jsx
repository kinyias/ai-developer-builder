import { NextResponse } from "next/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL);

// GET: Lấy danh sách users hoặc user theo email
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email"); // Lấy email từ query string

    let users;
    if (email) {
      users = await convex.query(api.users.getUsers, { email }); // Tìm user theo email
    } else {
      users = await convex.query(api.users.getAllUsers); // Lấy toàn bộ users
    }

    return NextResponse.json({ success: true, data: users });
  } catch (error) {
    console.error("Error at /api/users GET:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL);

export async function GET() {
  try {
    const userStats = await convex.query(api.users.getUserStats);
    return Response.json({ success: true, userStats });
  } catch (error) {
    console.error("Lỗi tại /api/users/stats:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

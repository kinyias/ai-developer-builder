import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL);

export async function GET() {
  try {
    const totalCustomers = await convex.query(api.users.getTotalCustomers);
    return Response.json({ success: true, totalCustomers });
  } catch (error) {
    console.error("Lỗi:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

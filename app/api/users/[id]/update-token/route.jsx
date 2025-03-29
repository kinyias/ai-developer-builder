import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL);

export async function PUT(req, { params }) {
  try {
    const { id } = params; // Lấy userId từ URL
    const { token } = await req.json(); // Nhận token từ body

    if (!id || token === undefined) {
      return new Response(JSON.stringify({ success: false, message: "Missing userId or token" }), { status: 400 });
    }

    await convex.mutation(api.users.UpdateToken, { userId: id, token });

    return new Response(JSON.stringify({ success: true, message: "Token updated successfully" }), { status: 200 });
  } catch (error) {
    console.error("Lỗi tại /api/users/[id]/update-token:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

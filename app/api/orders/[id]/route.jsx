import { NextResponse } from "next/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL);

export async function GET(request, { params }) {
    try {
      const { id } = await params; 
  
      if (!id) {
        return NextResponse.json({ error: "Thiếu trường ID" }, { status: 400 });
      }
  
      const orders = await convex.query(api.orders.getAllOrders);
      const order = orders.find(o => o._id === id);
  
      if (!order) {
        return NextResponse.json({ error: "Không tìm thấy order" }, { status: 404 });
      }
  
      return NextResponse.json({ success: true, order });
    } catch (error) {
      console.error("Error at /api/orders/[id] GET:", error);
      return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
  }
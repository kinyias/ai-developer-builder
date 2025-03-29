import { NextResponse } from "next/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL);

export async function GET(req) {
    try {
      const { searchParams } = new URL(req.url);
      const action = searchParams.get("action"); // Dùng query param để xác định hành động
      const userId = searchParams.get("userId");
  
      if (action === "latest-customers") {
        const latestCustomers = await convex.query(api.orders.getLatestCustomers);
        return NextResponse.json({ success: true, data: latestCustomers });
      } else if (action === "total-revenue") {
        const totalRevenue = await convex.query(api.orders.getTotalRevenue);
        return NextResponse.json({ success: true, data: totalRevenue });
      } else if (action === "total-orders") {
        const totalOrders = await convex.query(api.orders.getTotalOrders);
        return NextResponse.json({ success: true, data: totalOrders });
      } else {
       
        let orders = await convex.query(api.orders.getAllOrders);
        if (userId) { //có userId thì lọc theo userId
          orders = orders.filter(order => order.userId === userId);
        }
        return NextResponse.json({ success: true, data: orders });
      }
    } catch (error) {
      console.error("Error at /api/orders GET:", error);
      return new NextResponse("Internal Server Error", { status: 500 });
    }
  }
  
  export async function POST(req) {
    try {
      const body = await req.json();
      const { action } = body;
  
      if (action === "create") {
        const { userId, amount, currencyCode, status, createdAt, transId, expiryDate } = body;
        if (!userId || !amount || !currencyCode || !status) {
          return new NextResponse("Thiếu các trường bắt buộc: userId, amount, currencyCode, status", { status: 400 });
        }
        const orderId = await convex.mutation(api.orders.CreateOrder, {
          userId,
          amount,
          currencyCode,
          status,
          createdAt: createdAt || new Date().toISOString(),
          transId: transId || null,
          expiryDate: expiryDate || null,
        });
        return NextResponse.json({ success: true, message: "Order created successfully", orderId });
    //   } else if (action === "check-expired-tokens") {
    //     await convex.mutation(api.orders.checkAndDeductExpiredTokens);
    //     return NextResponse.json({ success: true, message: "Checked and deducted expired tokens" });
      } else if (action === "search-by-email") {
        const { email } = body;
        if (!email) {
          return new NextResponse("Thiếu trường email", { status: 400 });
        }
        const matchedOrders = await convex.mutation(api.orders.searchOrdersByEmail, { email });
        return NextResponse.json({ success: true, data: matchedOrders });
      } else {
        return new NextResponse("Action không hợp lệ", { status: 400 });
      }
    } catch (error) {
      console.error("Error at /api/orders POST:", error);
      return new NextResponse("Internal Server Error", { status: 500 });
    }
  }
  
  // UpdateToken
  export async function PUT(req) {
    try {
      const body = await req.json();
      const { userId, token } = body;
  
      if (!userId || token === undefined) {
        return new NextResponse("Thiếu trường userId hoặc token", { status: 400 });
      }
  
      const result = await convex.mutation(api.orders.UpdateToken, { userId, token });
      return NextResponse.json({ success: true, message: "Token updated successfully", data: result });
    } catch (error) {
      console.error("Error at /api/orders PUT:", error);
      return new NextResponse("Internal Server Error", { status: 500 });
    }
  }
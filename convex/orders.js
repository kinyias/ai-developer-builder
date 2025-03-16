import { query } from "./_generated/server"; // CẦN IMPORT query!
import LOOKUP_DATA from "../data/Lookup"
import { mutation } from "./_generated/server";
import { v } from "convex/values";
import { action } from "./_generated/server";

export const CreateOrder = mutation({
  args: {
    userId: v.id("users"),  // ✅ Dùng v.id("users")
    amount: v.number(),
    currencyCode: v.string(),
    status: v.string(),
    createdAt: v.optional(v.string()),
    transId: v.optional(v.string()),  
    expiryDate: v.optional(v.string()),  // ✅ Thêm ngày hết hạn
  },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.userId);
    if (!user) {
      throw new Error("User không tồn tại!");
    }

    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 30);
    const expiryDateString = expiryDate.toISOString();

    const order = await ctx.db.insert("orders", {
      userId: args.userId,
      amount: args.amount,
      currencyCode: args.currencyCode,
      status: args.status,
      createdAt: args.createdAt || new Date().toISOString(),
      transId: args.transId || null,
      expiryDate: expiryDateString, 
    });

    return order;
  },
});

export const UpdateToken = mutation({
  args: {
    userId: v.id("users"),
    token: v.number(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.userId);
    if (!user) {
      throw new Error("User không tồn tại!");
    }

    const updatedToken = (user.token || 0) + args.token;
    await ctx.db.patch(args.userId, { token: updatedToken });

    console.log(`✅ Đã cập nhật token cho userId: ${args.userId}, Tổng token: ${updatedToken}`);

    return { success: true, newToken: updatedToken };
  },
});
//Giới hạn lấy 5 đơn hàng mới nhất: truongan
export const getLatestCustomers = query(async ({ db }) => {
  // Lấy tất cả đơn hàng, sau đó lọc status === "success" (tối ưu hơn nếu có createdAt để sắp xếp)
  const allOrders = await db.query("orders").collect();

  // Chỉ lấy 5 đơn hàng mới nhất có status là "success"
  const latestOrders = allOrders
    .filter((order) => order.status === "success")
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sắp xếp giảm dần theo createdAt
    .slice(0, 5); // Lấy 5 đơn gần nhất

  console.log("🔹 Đơn hàng mới nhất:", latestOrders);

  // Hàm tìm plan
  // const findPlanByPrice = (price) => {
  //   const plan = LOOKUP_DATA.PRICING_OPTIONS.find(p => Math.floor(p.price_f) === Math.floor(price));
  //   return plan ? plan.name : "Miễn phí";
  // };

  // Lấy thông tin user + plan từ order
  const customers = await Promise.all(
    latestOrders.map(async (order) => {
      const user = await db.get(order.userId);
      return {
        name: user?.name || "Unknown",
        plan: findPlanByPrice(order.amount), // Tìm gói t
      };
    })
  );

  console.log(" Khách hàng gần đây:", customers);
  return customers;
});

// Tổng doanh thu
export const getTotalRevenue = query(async ({ db }) => {
  const allOrders = await db.query("orders").collect();
  const totalRevenue = allOrders.reduce((sum, order) => sum + order.amount, 0);
  return totalRevenue;
});

// Tổng số lượng đơn hàng
export const getTotalOrders = query(async ({ db }) => {
  return await db.query("orders").count();
});

// Kiểm tra và trừ token nếu hết hạn
export const checkAndDeductExpiredTokens = mutation(async ({ db }) => {
  const now = new Date();
  
  // ✅ Lấy tất cả đơn hàng chưa hết hạn
  const validOrders = await db.query("orders")
    .filter(q => q.gte(q.field("expiryDate"), now.toISOString())) // Lọc đơn hàng còn hạn
    .collect();

  // ✅ Lấy tất cả user có đơn hàng hết hạn
  const expiredOrders = await db.query("orders")
    .filter(q => q.lt(q.field("expiryDate"), now.toISOString())) // Lọc đơn hàng hết hạn
    .collect();

  const affectedUsers = new Set(expiredOrders.map(order => order.userId));

  for (const userId of affectedUsers) {
    const user = await db.get(userId);
    if (user) {
      // ✅ Tính tổng token từ các đơn hàng còn hạn
      const remainingToken = validOrders
        .filter(order => order.userId === userId)
        .reduce((sum, order) => sum + order.amount, 0);

      // ✅ Cập nhật token
      await db.patch(userId, { token: remainingToken });

      console.log(`✅ Đã cập nhật token cho user: ${user.name}, Số token còn lại: ${remainingToken}`);
    }
  }
});


//// Tìm kiếm dịch vụ đã đăng ký theo email người dùng
export const searchOrdersByEmail = mutation({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const users = await ctx.db.query("users").collect();
    const matchedUsers = users.filter(user => user.email.toLowerCase().includes(args.email.toLowerCase()));

    if (matchedUsers.length === 0) return [];

    const userIds = matchedUsers.map(user => user._id);
    const orders = await ctx.db.query("orders").collect();
    const matchedOrders = orders.filter(order => userIds.includes(order.userId));

    return matchedOrders.map(order => {
      const user = matchedUsers.find(u => u._id === order.userId);
      return {
        _id: user?._id || "N/A",
        user: user?.name || "Unknown",
        email: user?.email || "N/A",
        registeredDate: order.createdAt,
        expiryDate: order.expiryDate,
        status: order.status,
        amount: order.amount,
      };
    });
  },
});


//lay tat ca don hang
export const getAllOrders = query(async ({ db }) => {
  return await db.query("orders").collect();
});

//dua vao pricing data lay plan
export const findPlanByPrice = (price) => {
  const plan = LOOKUP_DATA.PRICING_OPTIONS.find(p => Math.floor(p.price_f) === Math.floor(price));
  return plan ? plan.name : "Miễn phí";
};


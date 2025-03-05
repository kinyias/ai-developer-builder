
// import { mutation } from "./_generated/server";
// import { v } from "convex/values";

// // ✅ Mutation để tạo order
// export const CreateOrder = mutation({
//   args: {
//     userId: v.id("users"),
//     amount: v.number(),
//     currencyCode: v.string(),
//     status: v.string(),
//     createdAt: v.optional(v.string()),
//     transId: v.optional(v.string()),
//   },
//   handler: async (ctx, args) => {
//     console.log("🔹 Đang tạo order cho userId:", args.userId);

//     // ✅ Kiểm tra user có tồn tại không
//     const user = await ctx.db.get(args.userId);
//     if (!user) {
//       console.error("❌ User không tồn tại với _id:", args.userId);
//       throw new Error("User không tồn tại!");
//     }

//     // ✅ Tạo đơn hàng
//     const order = await ctx.db.insert("orders", {
//       userId: args.userId,
//       amount: args.amount,
//       currencyCode: args.currencyCode,
//       status: args.status,
//       createdAt: args.createdAt || new Date().toISOString(),
//       transId: args.transId || null,
//     });

//     console.log("✅ Đơn hàng đã tạo:", order);
//     return order;
//   },
// });

///test
import { mutation } from "./_generated/server";
import { v } from "convex/values";
export const CreateOrder = mutation({
  args: {
    userId: v.id("users"),  // ✅ Dùng v.id("users")
    amount: v.number(),
    currencyCode: v.string(),
    status: v.string(),
    createdAt: v.optional(v.string()),
    transId: v.optional(v.string()),  
  },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.userId);
    if (!user) {
      throw new Error("User không tồn tại!");
    }

    const order = await ctx.db.insert("orders", {
      userId: args.userId,
      amount: args.amount,
      currencyCode: args.currencyCode,
      status: args.status,
      createdAt: args.createdAt || new Date().toISOString(),
      transId: args.transId || null,
    });

    // const updatedToken = (user.token || 0) + args.amount;
    // await ctx.db.patch(user._id, { token: updatedToken });

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
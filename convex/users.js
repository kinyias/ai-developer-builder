import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const CreateUser = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    picture: v.string(),
    uid: v.string(),
    date: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    console.log("Mutation CreateUser nhận được:", args);

    const existingUser = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), args.email))
      .first();

    if (!existingUser) {
      const newUser = await ctx.db.insert("users", {
        name: args.name,
        email: args.email,
        picture: args.picture,
        uid: args.uid,
        token: 50000,
        date: args.date || new Date().toISOString()
      });
      console.log("User mới đã được lưu:", newUser);
    } else {
      console.log("User đã tồn tại:", existingUser);
    }
  },
});

// Đảm bảo `getUsers` có tham số `ctx`
export const getUsers = query({
  args: { email: v.optional(v.string()) }, // ✅ Cho phép truyền email
  handler: async (ctx, args) => {
    if (args.email) {
      const users = await ctx.db
        .query("users")
        .filter((q) => q.eq(q.field("email"), args.email))
        .collect();
      return users[0] || null; // Trả về user nếu có, nếu không thì trả về null
    } else {
      return await ctx.db.query("users").collect(); // Nếu không có email, lấy tất cả users
    }
  },
});


//cap nhat token ben chat view
export const UpdateToken = mutation({
  args: {
    token: v.number(),
    userId: v.id('users')
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.patch(args.userId, {
      token: args.token
    });
    return result;
  }
});

//lay tong so user
export const getTotalCustomers = query(async ({ db }) => {
  const users = await db.query("users").collect(); // Lấy tất cả user
  return users.length; // Trả về tổng số user
});
//lay tong so user theo tung ngay
export const getUserStats = query(async ({ db }) => {
  const today = new Date();
  const startDate = new Date();

  startDate.setDate(today.getDate() - 6); // Lấy 7 ngày gần nhất
  startDate.setHours(0, 0, 0, 0);

  const formatDate = (date) => {
    if (!date) return null;
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return isNaN(d) ? null : d.toISOString().split("T")[0]; // YYYY-MM-DD
  };

  // 🔍 Truy vấn users trong khoảng thời gian 7 ngày gần nhất
  const users = await db
    .query("users")
    .filter((q) => q.gte(q.field("date"), startDate.toISOString()))
    .order("asc") // Sắp xếp từ cũ -> mới
    .collect();

  // 🔍 Truy vấn tổng số user trước ngày startDate (ngày 17) để lấy số activeUsers trước đó
  const previousUsers = await db
    .query("users")
    .filter((q) => q.lt(q.field("date"), startDate.toISOString()))
    .collect(); // Lấy danh sách user trước ngày 17

  const previousUsersCount = previousUsers.length; // Đếm số lượng user trước ngày 17
  let lastActiveUsers = previousUsersCount; // ✅ Khai báo biến trước khi dùng

  const userStatsMap = new Map();

  // Đưa dữ liệu vào Map
  users.forEach((user) => {
    const date = formatDate(user.date);
    if (!date) return;

    if (!userStatsMap.has(date)) {
      userStatsMap.set(date, { date, newUsers: 0, activeUsers: 0 });
    }
    userStatsMap.get(date).newUsers += 1;
  });

  // Đảm bảo có đủ 7 ngày liên tục, nếu không có user mới thì vẫn giữ activeUsers của ngày trước đó
  for (let i = 0; i < 7; i++) {
    const dateString = formatDate(new Date(startDate.getTime() + i * 86400000));
    if (!userStatsMap.has(dateString)) {
      userStatsMap.set(dateString, { date: dateString, newUsers: 0, activeUsers: lastActiveUsers });
    }
  }

  // Sắp xếp lại ngày
  const sortedDates = [...userStatsMap.keys()].sort((a, b) => new Date(a) - new Date(b));

  // Cập nhật activeUsers liên tục từ ngày trước đó
  sortedDates.forEach((date, index) => {
    const currentStats = userStatsMap.get(date);
    if (index === 0) {
      currentStats.activeUsers = lastActiveUsers + currentStats.newUsers;
    } else {
      const prevDate = sortedDates[index - 1];
      currentStats.activeUsers = userStatsMap.get(prevDate).activeUsers + currentStats.newUsers;
    }
    lastActiveUsers = currentStats.activeUsers; // Cập nhật giá trị mới nhất
  });

  return sortedDates.map((date) => userStatsMap.get(date));
});


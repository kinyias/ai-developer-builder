import { mutation, query } from './_generated/server';
import { v } from 'convex/values';

export const CreateUser = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    picture: v.string(),
    uid: v.string(),
  },
  handler: async (ctx, args) => {
    console.log('Mutation CreateUser nhận được:', args);

    const existingUser = await ctx.db
      .query('users')
      .filter((q) => q.eq(q.field('email'), args.email))
      .first();

    if (!existingUser) {
      const newUser = await ctx.db.insert('users', {
        name: args.name,
        email: args.email,
        picture: args.picture,
        uid: args.uid,
        token: 50000,
      });
      console.log('User mới đã được lưu:', newUser);
    } else {
      console.log('User đã tồn tại:', existingUser);
    }
  },
});

// Đảm bảo `getUsers` có tham số `ctx`
export const getUsers = query({
  args: { email: v.optional(v.string()) }, // ✅ Cho phép truyền email
  handler: async (ctx, args) => {
    if (args.email) {
      const users = await ctx.db
        .query('users')
        .filter((q) => q.eq(q.field('email'), args.email))
        .collect();
      return users[0] || null; // Trả về user nếu có, nếu không thì trả về null
    } else {
      return await ctx.db.query('users').collect(); // Nếu không có email, lấy tất cả users
    }
  },
});

//cap nhat token ben chat view
export const UpdateToken = mutation({
  args: {
    token: v.number(),
    userId: v.id('users'),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.patch(args.userId, {
      token: args.token,
    });
    return result;
  },
});

//lay tong so user
export default query(async ({ db }) => {
  return await db.query('users').count();
});

export const getTotalCustomers = query(async ({ db }) => {
  const users = await db.query('users').count(); // Lấy tất cả user
  return users; // Trả về tổng số user
});

//lay tat ca user
export const getAllUsers = query(async ({ db }) => {
  return await db.query('users').collect();
});

export const getUsersWithOrders = query(
  async ({ db }, { cursor, pageSize }) => {
    // Fetch users with cursor-based pagination
    let query = db.query('users').order('asc').take(pageSize);

    if (cursor) {
      query = query.filter((q) => q.gt(q.field('_id'), cursor)); // Use the cursor to fetch the next page
    }

    const users = await query;

    // Fetch orders for each user
    const usersWithOrders = await Promise.all(
      users.map(async (user) => {
        const orders = await db
          .query('orders')
          .filter((q) => q.eq(q.field('userId'), user._id))
          .collect();

        return {
          ...user,
          orders,
        };
      })
    );

    // Get the last user's ID as the next cursor
    const nextCursor = users[users.length - 1]?._id || null;

    return {
      usersWithOrders,
      nextCursor,
    };
  }
);

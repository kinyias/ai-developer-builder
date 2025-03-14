import { defineSchema, defineTable } from "convex/server"; //export default defineSchema
import { v } from "convex/values";

export default defineSchema({ //bảng user
    users:defineTable({
        name:v.string(),
        email:v.string(),
        picture:v.string(),
        uid:v.string(),
        token:v.optional(v.number())
    }),
    orders: defineTable({
        userId: v.id("users"),           // ✅ Dùng string để lưu userId
        amount: v.number(),
        currencyCode: v.string(),
        status: v.string(),
        createdAt: v.string(),
        transId: v.optional(v.string()), // ✅ Mã giao dịch Momo
        expiryDate: v.optional(v.string())
    }),
    workspace:defineTable({
        messages:v.any(),
        fileData:v.optional(v.any()),
        user:v.id('users')
    })
})
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
    workspace:defineTable({
        messages:v.any(),
        fileData:v.optional(v.any()),
        user:v.id('users')
    })
})
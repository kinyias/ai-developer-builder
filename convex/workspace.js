import { v } from "convex/values";
import { mutation } from "./_generated/server";
import { query } from "./_generated/server";

//  Tạo workspace mới
export const CreateWorkspace = mutation({
  args: {
    messages: v.array(v.object({ role: v.string(), content: v.string() })), 
    user: v.id("users"),
  },
  handler: async (ctx, args) => {
    const workspaceId = await ctx.db.insert("workspace", {
      messages: args.messages,
      user: args.user,
    });
    return workspaceId;
  },
});

export const GetWorkspace = query({
  args: {
    workspaceId: v.id("workspace"),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.get(args.workspaceId);
    return result;
  },
});

// export const AddMessageToWorkspace = mutation({
//     args: {
//       workspaceId: v.id("workspace"),
//       message: v.object({ role: v.string(), content: v.string() }),
//     },
//     handler: async (ctx, args) => {
//       const workspace = await ctx.db.get(args.workspaceId);
//       if (!workspace) throw new Error("Workspace không tồn tại!");
  
//       console.log(" Tin nhắn trước khi thêm:", workspace.messages);
  
//       await ctx.db.patch(args.workspaceId, {
//         messages: [...(workspace.messages || []), args.message],
//       });
  
//       console.log(" Tin nhắn mới đã được thêm:", args.message);
  
//       return args.workspaceId;
//     },
//   });

//  Cập nhật danh sách tin nhắn trong workspace
export const UpdateMessages = mutation({
  args: {
    workspaceId: v.id("workspace"),
    messages: v.array(v.object({ role: v.string(), content: v.string() })),
  },
  handler: async (ctx, args) => {
    const workspace = await ctx.db.get(args.workspaceId);
    if (!workspace) throw new Error("Workspace không tồn tại!");

    await ctx.db.patch(args.workspaceId, {
      messages: args.messages,
    });

    return args.workspaceId;
  },
});

export const UpdateFiles = mutation({
  args: {
    workspaceId: v.id("workspace"),
    files: v.any()
  },
  handler: async (ctx, args) => {
    const workspace = await ctx.db.get(args.workspaceId);
    if (!workspace) throw new Error("Workspace không tồn tại!");

    await ctx.db.patch(args.workspaceId, {
      fileData: args.files,
    });

    return args.workspaceId;
  },
});

//  Lấy danh sách tin nhắn của workspace
export const GetMessages = query({
  args: { workspaceId: v.id("workspace") },
  handler: async (ctx, args) => {
    const workspace = await ctx.db.get(args.workspaceId);
    if (!workspace) throw new Error("Workspace không tồn tại!");
    return workspace.messages || [];
  },
});

export const GetAllWorkspace=query({
  args:{
    userId:v.id('users')
  },
  handler:async(ctx,args)=>{
    const result=await ctx.db.query('workspace')
    .filter(q=>q.eq(q.field('user'),args.userId))
    .collect();
    return result;
  }
})
export const DeleteWorkspace=mutation({
  args:{
    workspaceId:v.id('workspace')
  },
  handler:async(ctx,args)=>{
    const result=await ctx.db.get(args.workspaceId);
    if (!result) {
      throw new Error('Workspace not found');
    }
    await ctx.db.delete(args.workspaceId);
    return { success: true };
  }
})

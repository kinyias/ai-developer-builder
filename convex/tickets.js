import { v } from "convex/values";
import { mutation } from "./_generated/server";
import { query } from "./_generated/server";
export const CreateTicket = mutation({
    args: {
      name: v.string(),
      email: v.string(),
      messages: v.any(),
    },
    handler: async (ctx, args) => {
      const ticketId = await ctx.db.insert("tickets", {
        name: args.name,
        email: args.email,
        messages: args.messages,
      });
      return ticketId;
    },
  });
  
  export const GetTicket = query({
    args: {
      ticketId: v.id("tickets"),
    },
    handler: async (ctx, args) => {
      const ticket = await ctx.db.get(args.ticketId);
      return ticket;
    },
  });
  
  export const GetAllTickets = query({
    handler: async (ctx) => {
      const tickets = await ctx.db.query("tickets").collect();
      return tickets;
    },
  });
  
  export const UpdateTicket = mutation({
    args: {
      ticketId: v.id("tickets"),
      name: v.optional(v.string()),
      email: v.optional(v.string()),
      messages: v.optional(v.any()),
      status: v.optional(v.boolean()),
    },
    handler: async (ctx, args) => {
      await ctx.db.patch(args.ticketId, {
        ...args,
      });
      return { success: true };
    },
  });
  
  export const DeleteTicket = mutation({
    args: {
      ticketId: v.id("tickets"),
    },
    handler: async (ctx, args) => {
      await ctx.db.delete(args.ticketId);
      return { success: true };
    },
  });
  
import { NextResponse } from 'next/server';
import { ConvexHttpClient } from 'convex/browser';
import { api } from '@/convex/_generated/api';

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL);
//http://localhost:3000/api/workspace/{id}/messages
//Lay tin nhan chatview trong workspace
export async function GET(request, { params }) {
    try {
        const { id } = params; // Lấy workspaceId từ URL

        if (!id) {
            return NextResponse.json(
                { error: "Thiếu workspaceId" },
                { status: 400 }
            );
        }

        // Gọi Convex để lấy tin nhắn từ workspace
        const messages = await convex.query(api.workspace.GetMessages, { workspaceId: id });

        return NextResponse.json({ messages });

    } catch (error) {
        console.error("Lỗi lấy tin nhắn:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
export async function POST(req, { params }) {
    try {
      const workspaceId = params.id; // Lấy workspaceId từ URL
      const { messages } = await req.json(); // Lấy dữ liệu từ body
  
      // Kiểm tra dữ liệu đầu vào
      if (!workspaceId || !messages || !Array.isArray(messages) || messages.length === 0) {
        return NextResponse.json({ error: "Thiếu thông tin hoặc dữ liệu không hợp lệ." }, { status: 400 });
      }
  
      // Gọi Convex mutation để cập nhật messages
      await convex.mutation(api.workspace.UpdateMessages, {
        workspaceId,
        messages
      });
  
      return NextResponse.json({
        success: true,
        workspaceId
      });
  
    } catch (e) {
      console.error("Lỗi tại /api/workspaces/[id]/messages POST", e);
      return NextResponse.json({ error: "Lỗi máy chủ." }, { status: 500 });
    }
  }
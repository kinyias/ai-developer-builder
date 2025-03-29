import { NextResponse } from 'next/server';
import { ConvexHttpClient } from 'convex/browser';
import { api } from '@/convex/_generated/api';
import { mutation, mutationGeneric } from "convex/server";
////http://localhost:3000/api/workspace/{id}/messages
const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL);
//Get All Workpace
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'Thiếu userId' }, { status: 400 });
    }

    const workspaces = await convex.query(api.workspace.GetAllWorkspace, { userId });
    console.log("Dữ liệu từ Convex:", workspaces);

    return NextResponse.json({
      success: true,
      workspaces,
    });
  } catch (error) {
    console.error('Lỗi khi lấy danh sách workspaces:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}


//Cập nhật message
export async function PATCH(request) {
  try {
    const { workspaceId, messages } = await request.json();

    if (!workspaceId || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Thiếu workspaceId hoặc messages không hợp lệ" },
        { status: 400 }
      );
    }

    // Kiểm tra workspace có tồn tại không
    const workspace = await convex.query(api.workspace.GetWorkspace, { workspaceId });

    if (!workspace) {
      return NextResponse.json(
        { error: "Không tìm thấy workspace" },
        { status: 404 }
      );
    }

    // Cập nhật messages của workspace
    await convex.mutation(api.workspace.UpdateMessages, { workspaceId, messages });

    return NextResponse.json(
      { message: "Cập nhật messages thành công", success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("Lỗi khi cập nhật messages:", error);
    return NextResponse.json(
      { error: "Lỗi server nội bộ" },
      { status: 500 }
    );
  }
}
//Add workspace
export async function POST(req) {
  try {
    // Parse JSON từ request
    const { messages, userId } = await req.json();

    // Kiểm tra dữ liệu đầu vào
    if (!messages || !Array.isArray(messages) || messages.length === 0 || !userId) {
      return NextResponse.json({ error: "Thiếu thông tin hoặc dữ liệu không hợp lệ." }, { status: 400 });
    }

    // Gửi dữ liệu vào Convex
    const workspaceId = await convex.mutation(api.workspace.CreateWorkspace, {
      messages: messages,
      user: userId,
    });

    return NextResponse.json({
      success: true,
      workspaceId: workspaceId
    });

  } catch (e) {
    console.error("Lỗi tại /api/workspaces POST", e);
    return NextResponse.json({ error: "Lỗi máy chủ." }, { status: 500 });
  }
}

//http://localhost:3000/api/workspace/{id}
import { NextResponse } from 'next/server';
import { ConvexHttpClient } from 'convex/browser';
import { api } from '@/convex/_generated/api';

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL);
//Lấy 1 workspace cụ thể
export async function GET(request, { params }) {
    try {
        const { id } = params; // Lấy workspaceId từ URL

        if (!id) {
            return NextResponse.json(
                { error: "Thiếu trường ID" },
                { status: 400 }
            );
        }

        const workspace = await convex.query(api.workspace.GetWorkspace, { workspaceId: id });

        if (!workspace) {
            return NextResponse.json(
                { error: "Không tìm thấy workspace" },
                { status: 404 }
            );
        }

        return NextResponse.json({ workspace });

    } catch (error) {
        console.error("Lỗi workspace:", error);
        return NextResponse.json(
            { error: "Lỗi máy chủ nội bộ" },
            { status: 500 }
        );
    }
}
//Xóa workspace theo id
export async function DELETE(request, { params }) {
    try {
        const { id } = params; // Lấy ID từ URL

        if (!id) {
            return NextResponse.json(
                { error: "Thiếu ID của workspace" },
                { status: 400 }
            );
        }

        // Kiểm tra workspace có tồn tại không
        const workspace = await convex.query(api.workspace.GetWorkspace, { workspaceId: id });

        if (!workspace) {
            return NextResponse.json(
                { error: "Không tìm thấy workspace" },
                { status: 404 }
            );
        }

        // Thực hiện xoá workspace
        await convex.mutation(api.workspace.DeleteWorkspace, { workspaceId: id });

        return NextResponse.json(
            { message: "Xoá workspace thành công", success: true },
            { status: 200 }
        );
    } catch (error) {
        console.error("Lỗi khi xoá workspace:", error);
        return NextResponse.json(
            { error: "Lỗi server nội bộ" },
            { status: 500 }
        );
    }
}
export async function POST(req, { params }) {
    try {
      const { id } = params; // Lấy workspaceId từ URL
      const { files } = await req.json(); // Lấy files từ body request
  
      if (!files) {
        return NextResponse.json(
          { error: "Thiếu dữ liệu files" },
          { status: 400 }
        );
      }
  
      // Gọi mutation để update fileData của workspace
      await convex.mutation(api.workspace.UpdateFiles, {
        workspaceId: id,
        files,
      });
  
      return NextResponse.json(
        { message: "Cập nhật files thành công", workspaceId: id },
        { status: 200 }
      );
    } catch (error) {
      console.error("Lỗi cập nhật files:", error);
      return NextResponse.json(
        { error: "Lỗi server khi cập nhật files" },
        { status: 500 }
      );
    }
  }
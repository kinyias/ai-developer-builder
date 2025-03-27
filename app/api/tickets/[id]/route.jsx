// File: app/api/tickets/[id]/route.js
import { NextResponse } from 'next/server';
import { ConvexHttpClient } from 'convex/browser';
import { api } from '@/convex/_generated/api';

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL);

export async function GET(request, { params }) {
  try {
    const { id } = await params; // Matches [id] in the filename

    if (!id) {
      return NextResponse.json(
        { error: 'Thiếu trường ID' },
        { status: 400 }
      );
    }

    const ticket = await convex.query(api.tickets.GetTicket, { ticketId: id });

    if (!ticket) {
      return NextResponse.json(
        { error: 'Không tìm thấy yêu cầu' },
        { status: 404 }
      );
    }

    return NextResponse.json({ ticket });
    
  } catch (error) {
    console.error('Lỗi ticket:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
    try {
      const { id } = await params;
      if (!id) {
        return NextResponse.json(
          { error: 'Không tìm thấy ID' },
          { status: 400 }
        );
      }
  
      const result = await convex.mutation(api.tickets.DeleteTicket, { ticketId: id });
  
      if (!result.success) {
        return NextResponse.json(
          { error: 'Xoá yêu cầu thất bại' , success: false },
          { status: 500 }
        );
      }
  
      return NextResponse.json(
        { message: 'Xoá yêu cầu hỗ trợ thành công' , success: true },
        { status: 200 }
      );
    } catch (error) {
      console.error('Lỗi ticket:', error);
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      );
    }
  }

  export async function PUT(request, { params }) {
    try {
      const { id } = await params; // Matches [id] in the filename
  
      if (!id) {
        return NextResponse.json(
          { error: 'Thiếu trường ID' },
          { status: 400 }
        );
      }
  
      // Parse the request body
      const body = await request.json();
      const { name, email, message, status } = body;
  
      // Validate that at least one field is provided for update
      if (!name && !email && !message && status === undefined) {
        return NextResponse.json(
          { error: 'Cần ít nhât một trường (name, email, message, or status) để cập nhật' },
          { status: 400 }
        );
      }
  
      // Prepare the update object, only including provided fields
      const updateFields = {};
      if (name !== undefined) updateFields.name = name;
      if (email !== undefined) updateFields.email = email;
      if (message !== undefined) updateFields.message = message;
      if (status !== undefined) updateFields.status = status;
  
      // Call the UpdateTicket mutation
      const result = await convex.mutation(api.tickets.UpdateTicket, {
        ticketId: id,
        ...updateFields,
      });
  
      if (!result.success) {
        return NextResponse.json(
          { error: 'Cập nhật thất bại', success: false },
          { status: 500 }
        );
      }
  
      return NextResponse.json(
        { message: 'Cập nhật thành công', success: true },
        { status: 200 }
      );
    } catch (error) {
      console.error('Lỗi ticket:', error);
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      );
    }
  }
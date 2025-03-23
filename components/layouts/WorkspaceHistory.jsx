'use client';


import { useUserDetail } from '@/app/context/UserDetailContext';
import { api } from '@/convex/_generated/api';
import { useConvex } from 'convex/react';


import React, { useContext, useEffect, useState } from 'react'
import { useSidebar } from '../ui/sidebar';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Trash, Trash2Icon } from 'lucide-react';

function WorkspaceHistory() {
  const { userDetail, setUserDetail } = useUserDetail();
  const convex = useConvex();
  const [workspaceList, setWorkspaceList] = useState();
  const { toggleSidebar } = useSidebar();
  //const router=useRouter();
  useEffect(() => {
    userDetail && GetAllWorkspace();
  }, [userDetail])

  const GetAllWorkspace = async () => {
    // Kiểm tra xem userDetail có tồn tại và có _id không
    if (!userDetail?._id) {
      console.warn("User  is not logged in or userId is missing.");
      setWorkspaceList([]); // Hoặc có thể hiển thị thông báo cho người dùng
      return; // Không thực hiện truy vấn nếu không có userId
    }

    try {
      const result = await convex.query(api.workspace.GetAllWorkspace, {
        userId: userDetail._id
      });
      setWorkspaceList(result);
      console.log(result);
    } catch (error) {
      console.error("Error fetching workspaces:", error);
      // Xử lý lỗi nếu cần
    }
  }
  const handleDeleteWorkspace = async (workspaceId) => {
    const isConfirmed = window.confirm("Bạn có chắc chắn muốn xóa workspace này?");
    if (!isConfirmed) return; // Nếu chọn "No", không làm gì cả
  
    try {
      await convex.mutation(api.workspace.DeleteWorkspace, { workspaceId });
      setWorkspaceList(prevList => prevList.filter(workspace => workspace._id !== workspaceId));
    } catch (error) {
      console.error("Error deleting workspace:", error);
    }
  };
  return (
    <div>
      <h2 className="font-medium text-lg">Your Chats</h2>
      <div>
        {workspaceList?.length > 0 ? (
          workspaceList.map((workspace, index) => (
            <div key={index} className="flex items-center group">
              {/* Link vào workspace */}
              <Link href={'/workspace/' + workspace._id} className="flex-1">
                <h2
                  onClick={toggleSidebar}
                  className="text-sm text-gray-400 mt-2 font-light cursor-pointer hover:text-white"
                >
                 {workspace?.messages[0]?.content
                    ? workspace.messages[0].content.length > 15
                      ? workspace.messages[0].content.slice(0, 15) + "..."
                      : workspace.messages[0].content
                    : "No messages"}
                </h2>
              </Link>

              {/* Icon xóa chỉ hiển thị khi hover */}
              <button
                onClick={() => handleDeleteWorkspace(workspace._id)}
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-200
                 text-gray-400 hover:text-red-500 ml-2"
              >
                <Trash2Icon size={16} />
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm mt-2">No workspaces found.</p>
        )}
      </div>
    </div>
  );
}

export default WorkspaceHistory
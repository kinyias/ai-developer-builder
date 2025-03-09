'use client';


import { useUserDetail } from '@/app/context/UserDetailContext';
import { api } from '@/convex/_generated/api';
import { useConvex } from 'convex/react';


import React, { useContext, useEffect, useState } from 'react'
import { useSidebar } from '../ui/sidebar';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

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
  return (
    <div>
      <h2 className='font-medium text-lg'>Your Chats</h2>
      <div>
        {workspaceList && workspaceList?.map((workspace, index) => (

          <Link href={'/workspace/' + workspace?._id} key={index}>

            <h2 onClick={toggleSidebar} className='text-sm text-gray-400 mt-2 font-light cusor-pointer hover:text-white'>
              {workspace?.messages[0]?.content || "No messages"}
            </h2>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default WorkspaceHistory
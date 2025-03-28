'use client'; // Chỉ định rằng file này sẽ chạy trên client-side.

import React, { useEffect, useState } from 'react';
import {
  SandpackProvider, // Cung cấp môi trường Sandpack cho code sandbox.
  SandpackLayout, // Layout chứa trình biên tập và xem trước code.
  SandpackCodeEditor, // Trình chỉnh sửa code trong sandbox.
  SandpackPreview, // Xem trước kết quả của code đang chạy.
  SandpackFileExplorer, // Trình quản lý file trong sandbox.
} from '@codesandbox/sandpack-react';
import axios from 'axios'; // Thư viện để gửi request HTTP.
import Prompt from '@/data/Prompt'; // Nhập các prompt mặc định.
import { Loader2Icon } from 'lucide-react'; // Biểu tượng loader hiển thị khi đang tải.
import { useConvex, useMutation, useQuery } from 'convex/react'; // Hook để truy vấn dữ liệu từ Convex.
import { api } from '@/convex/_generated/api'; // API của Convex để lấy dữ liệu.
import { useParams } from 'next/navigation'; // Hook lấy tham số từ URL.
import SandpackPreviewClient from '../layouts/SandpackPreviewClient';

export default function CodeView() {
  const { id } = useParams(); // Lấy workspace ID từ URL.
  const [activeTab, setActiveTab] = useState('code'); // State lưu trạng thái tab đang mở (hiện tại mặc định là "code").
  const [files, setFiles] = useState(Prompt.DEFAULT_FILE); // State lưu trữ danh sách file code.
  const [loading, setLoading] = useState(false); // State để hiển thị trạng thái loading.

  const UpdateFiles=useMutation(api.workspace.UpdateFiles)

  const convex=useConvex();

  useEffect(()=>{
    id&&GetFiles();
  },[id])

  const GetFiles=async()=>{
    const result=await convex.query(api.workspace.GetWorkspace,{
      workspaceId:id
    });
    const mergedFiles = { ...Prompt.DEFAULT_FILE, ...result?.fileData }; //load lại trang vẫn có data của phiên đăng nhập đó
    setFiles(mergedFiles); // Cập nhật state với mã nguồn mới.
  }

  // Lấy danh sách tin nhắn từ Convex theo workspace ID
  const messages = useQuery(api.workspace.GetMessages, { workspaceId: id }) || [];

  // Hàm gọi AI để sinh mã nguồn dựa trên tin nhắn cuối cùng của người dùng
  const generateAiCode = async () => {
    if (messages.length === 0) return; // Nếu chưa có tin nhắn nào thì không làm gì.

    setLoading(true); // Bật trạng thái loading để hiển thị spinner.

    // Chuẩn bị nội dung prompt từ tin nhắn cuối cùng của user
    const PROMPT =
      JSON.stringify(messages)+ ': ' + Prompt.CODE_GEN_PROMPT;

    // Gửi request đến API để lấy mã nguồn do AI sinh ra
    const result = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/gen-ai-code`, {
      prompt: PROMPT,
    });

    // Chuyển đổi kết quả từ JSON
    const aiRes = JSON.parse(result.data);
    console.log(aiRes); // In ra console để kiểm tra dữ liệu trả về từ API.

    // Gộp file mặc định với file do AI sinh ra
    const mergedFiles = { ...Prompt.DEFAULT_FILE, ...aiRes?.files };
    setFiles(mergedFiles); // Cập nhật state với mã nguồn mới.
    setLoading(false); // Tắt trạng thái loading.

    await UpdateFiles({
      workspaceId:id,
      files:aiRes?.files
    }); //up file lên convex
  };

  // useEffect chạy mỗi khi `messages` thay đổi
  useEffect(() => {
    if (messages.length > 0) { // Kiểm tra nếu có tin nhắn
      const lastMessage = messages[messages.length - 1]; // Lấy tin nhắn cuối cùng
      if (lastMessage.role === 'user') { // Nếu tin nhắn cuối cùng là của người dùng
        generateAiCode(); // Gọi hàm để sinh mã nguồn từ AI.
      }
    }
  }, [messages]); // useEffect sẽ chạy lại khi `messages` thay đổi.
  return (
    <div className="relative">
      <div className="bg-[#cccccc] dark:bg-[#181818] w-full p-2 border">
        <div className="flex items-center flex-wrap shink-0 justify-center bg-white dark:bg-black p-1 w-[140px] gap-3 rounded-full">
          <h2
            onClick={() => setActiveTab('code')}
            className={`text-sm cursor-pointer ${
              activeTab == 'code' &&
              'text-blue-500 bg-blue-500 bg-opacity-25 p-1 px-2 rounded-full'
            }`}
          >
            Code
          </h2>
          <h2
            onClick={() => setActiveTab('preview')}
            className={`text-sm cursor-pointer ${
              activeTab == 'preview' &&
              'text-blue-500 bg-blue-500 bg-opacity-25 p-1 px-2 rounded-full'
            }`}
          >
            Preview
          </h2>
        </div>
      </div>
      <SandpackProvider
        template="react"
        theme={localStorage.getItem('theme')}
        files={files}
        customSetup={{
          dependencies: Prompt.DEPENDANCY,
        }}
        options={{
          externalResources: ['https://unpkg.com/@tailwindcss/browser@4'],
        }}
      >
        <SandpackLayout>
          {activeTab == 'code' ? (
            <>
              <SandpackFileExplorer style={{ height: '80vh' }} />
              <SandpackCodeEditor style={{ height: '80vh' }} />
            </>
          ) : (
            <>
              <SandpackPreviewClient/>
            </>
          )}
        </SandpackLayout>
      </SandpackProvider>
      {loading && (
        <div
          className="p-10 bg-gray-900 bg-opacity-80
      absolute top-0 rounded-lg w-full h-full flex items-center justify-center"
        >
          <Loader2Icon className="animate-spin h-10 w-10 text-white" />
          <h2 className="text-white">Đang tạo file</h2>
        </div>
      )}
    </div>
  );
}

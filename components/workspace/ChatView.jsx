'use client'; // Chỉ định rằng file này sẽ chạy trên client-side.

import { useMessage } from '@/hooks/use-message'; // Hook quản lý state tin nhắn (không cần thiết nữa nếu dùng Convex).
import { useParams } from 'next/navigation'; // Hook lấy tham số từ URL.
import React, { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'; // Thành phần hiển thị ảnh đại diện.
import { Button } from '../ui/button'; // Thành phần nút bấm từ UI library.
import { ArrowRight, Loader2Icon } from 'lucide-react'; // Biểu tượng mũi tên để gửi tin nhắn.
import { cn } from '@/lib/utils'; // Hàm tiện ích để kết hợp className.
import axios from 'axios'; // Thư viện gửi request HTTP.
import Prompt from '@/data/Prompt'; // Prompt mặc định cho AI.
import ReactMarkdown from 'react-markdown'; // Thư viện để hiển thị nội dung markdown.

import { useMutation, useQuery } from 'convex/react'; // Hook để tương tác với Convex.
import { api } from '@/convex/_generated/api'; // API từ Convex để truy vấn và cập nhật dữ liệu.
import { useUserDetail } from '../../app/context/UserDetailContext';

export const countToken = (inputText) => {
  return inputText
    .trim()
    .split(/\s+/)
    .filter((word) => word).length; //hàm đếm token
};

export default function ChatView() {
  const { id } = useParams(); // Lấy workspace ID từ URL.
  const [userInput, setUserInput] = useState(''); // State lưu tin nhắn do người dùng nhập vào.
  const [loading, setLoading] = useState(false);

  // Lấy danh sách tin nhắn từ Convex dựa vào workspace ID.
  const messages =
    useQuery(api.workspace.GetMessages, { workspaceId: id }) || [];
  const { userDetail, setUserDetail } = useUserDetail(); // 💡 Lấy user chi tiết từ Context

  // Tạo mutation để cập nhật tin nhắn lên Convex.
  const updateMessages = useMutation(api.workspace.UpdateMessages);
  //Tạo cái này để cập nhật token
  const UpdateTokens = useMutation(api.users.UpdateToken);

  // useEffect để kiểm tra nếu tin nhắn cuối cùng là của user thì gọi AI phản hồi.
  useEffect(() => {
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1]; // Lấy tin nhắn cuối cùng trong danh sách.
      if (lastMessage.role === 'user') {
        getAIResponse(); // Gọi AI trả lời.
      }
    }
  }, [messages]); // useEffect sẽ chạy lại khi `messages` thay đổi.

  // Hàm gửi tin nhắn của AI
  const getAIResponse = async () => {
    setLoading(true);
    // Tạo prompt từ danh sách tin nhắn hiện tại.
    const PROMPT = JSON.stringify(messages) + ': ' + Prompt.CHAT_PROMPT;

    // Gửi request đến API AI để sinh câu trả lời.
    const result = await axios.post('/api/ai-chat', {
      prompt: PROMPT,
    });

    // Tạo đối tượng tin nhắn của AI.
    const aiMessage = {
      role: 'ai',
      content: result.data.result, // Nội dung trả về từ AI.
    };

    // Cập nhật tin nhắn lên Convex, bao gồm cả tin nhắn mới của AI.
    await updateMessages({
      workspaceId: id,
      messages: [...messages, aiMessage],
    });

    //Cập nhật token của user
    //token hiện tại trừ cho token AI phẩn hồi(chuyển thành chuỗi Json để dếm bằng hàm countToken)
    const token =
      Number(userDetail?.token) - Number(countToken(JSON.stringify(aiMessage)));
    if (userDetail?._id && !isNaN(token)) {
      await UpdateTokens({
        userId: userDetail._id,
        token: token,
      });
      setLoading(false);
    } else {
      console.error('Lỗi: userId hoặc token không hợp lệ!', {
        userId: userDetail?._id,
        token,
      });
    }
  };

  // Hàm xử lý khi nhấn phím Enter để gửi tin nhắn.
  const handleKeyDown = async (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      // Kiểm tra nếu nhấn Enter mà không giữ Shift.
      e.preventDefault(); // Ngăn chặn hành vi mặc định của Enter (xuống dòng).

      // Tạo đối tượng tin nhắn từ người dùng.
      const newMessage = {
        role: 'user',
        content: userInput,
      };

      setUserInput(''); // Xóa nội dung nhập sau khi gửi.

      try {
        // Gửi tin nhắn lên Convex.
        await updateMessages({
          workspaceId: id,
          messages: [...messages, newMessage],
        });
      } catch (error) {
        console.error('Lỗi khi cập nhật tin nhắn:', error);
      }
    }
  };

  return (
    <div className="relative h-[85vh] flex flex-col">
      <div className="flex-1 overflow-y-scroll scrollbar-hide">
        {messages.map((msg, index) => (
          <div
            key={index}
            className="flex items-center gap-3 p-3 rounded-lg mb-2 leading-7 bg-gray-800 dark:bg-secondary text-white"
          >
            {msg.role === 'user' && (
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            )}
            <div className="flex flex-col">
              <ReactMarkdown>{msg.content}</ReactMarkdown>
            </div>
          </div>
        ))}
        {loading && (
          <div className="p-3 round-lg mb-2 flex gap-2 items-center bg-gray-200 dark:bg-secondary">
            <Loader2Icon className="animate-spin" />
            <h2>Generating response...</h2>
          </div>
        )}
      </div>
      <div className="w-full my-8 relative overflow-hidden">
        <form className="relative">
          <div className="p-5 border rounded-xl w-full">
            <div className="flex gap-2">
              <textarea
                className="outline-none bg-transparent w-full h-32 max-h-56 resize-none mr-8"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="How can I help you today?"
              ></textarea>
            </div>
          </div>

          <div
            className={cn(
              'absolute top-3 right-3 transition-all duration-300',
              userInput
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 translate-x-4'
            )}
          >
            <Button
              type="submit"
              size="icon"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
          <div
            className={cn(
              'absolute top-6 right-5 transition-all duration-300',
              userInput
                ? 'opacity-0 translate-x-4'
                : 'opacity-100 translate-x-0'
            )}
          >
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          </div>
        </form>
      </div>
    </div>
  );
}

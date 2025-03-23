'use client'; // Đánh dấu rằng file này chỉ chạy trên client-side (Next.js).

import { useState, useEffect } from 'react'; // Import các hook của React để quản lý state và hiệu ứng.
import { Button } from '@/components/ui/button'; // Import thành phần nút từ thư viện UI của dự án.
import { Paperclip, Sparkles, Zap, ArrowRight } from 'lucide-react'; // Import các icon từ thư viện Lucide.
import { cn } from '@/lib/utils'; // Hàm tiện ích để kết hợp className một cách linh hoạt.
import { useRouter } from 'next/navigation'; // Hook để điều hướng trang trong Next.js.
import { useUser } from '@clerk/nextjs'; // Hook để lấy thông tin người dùng từ Clerk (dịch vụ xác thực người dùng).
import { api } from "@/convex/_generated/api"; // Import API của Convex để truy vấn và cập nhật dữ liệu.
import { v4 as uuidv4 } from "uuid"; // Thư viện tạo UUID ngẫu nhiên.
import { useMutation, useQuery } from "convex/react"; // Hook của Convex để thực hiện mutation và query.
import { useClerk } from "@clerk/nextjs"; // Hook của Clerk để xử lý xác thực người dùng.

import Link from 'next/link'; // chạy pricing

export default function Home() {
  const { user } = useUser(); // Lấy thông tin người dùng đang đăng nhập từ Clerk.
  const createUser = useMutation(api.users.CreateUser); // Gọi mutation để tạo user trong Convex.
  const [userInput, setUserInput] = useState(''); // State lưu trữ nội dung input của người dùng.
  const router = useRouter(); // Hook điều hướng của Next.js.
  const createWorkspace = useMutation(api.workspace.CreateWorkspace); // Gọi API để tạo workspace trên Convex.
  const users = useQuery(api.users.getUsers) || []; // Truy vấn danh sách người dùng từ Convex.
  const [convexUserId, setConvexUserId] = useState(null); // State lưu ID của user trên Convex.
  const { redirectToSignIn } = useClerk(); // Lấy hàm để chuyển hướng đăng nhập từ Clerk.

  // useEffect chạy khi `user` hoặc `users` thay đổi.
  useEffect(() => {
    if (user && users.length > 0) { // Kiểm tra xem user đã đăng nhập và có dữ liệu `users` từ Convex chưa.
      const existingUser = users.find((u) => u.email === user.primaryEmailAddress?.emailAddress);
      // Tìm kiếm user hiện tại trong danh sách user trên Convex dựa vào email.

      if (existingUser) {
        setConvexUserId(existingUser._id); // Nếu user đã tồn tại trong Convex, lưu lại ID của họ.
      } else {
        (async () => {
          // Nếu user chưa tồn tại trong Convex, tạo một user mới.
          const newUserId = await createUser({
            name: user.fullName || "Người dùng mới", // Nếu không có tên, đặt mặc định.
            email: user.primaryEmailAddress?.emailAddress || "", // Email từ Clerk.
            picture: user.imageUrl || "", // Avatar từ Clerk.
            uid: uuidv4(), // Tạo một UUID ngẫu nhiên để gán cho user.
          });
          setConvexUserId(newUserId); // Lưu ID user mới được tạo trong state.
        })();
      }
    }
  }, [user, users, createUser]); // useEffect chạy lại khi `user`, `users` hoặc `createUser` thay đổi.

  // Xử lý sự kiện gửi tin nhắn
  const handleSubmit = async (e) => {
    e.preventDefault(); // Ngăn chặn hành vi mặc định của form.

    if (!userInput.trim()) return; // Nếu input rỗng, không thực hiện gì cả.

    if (!convexUserId) { 
      // Nếu user chưa có ID trong Convex, chuyển hướng họ đến trang đăng nhập.
      redirectToSignIn();
      return;
    }

    // Tạo tin nhắn đầu tiên từ người dùng.
    const msg = {
      role: "user",
      content: userInput,
    };

    try {
      // Gửi yêu cầu tạo workspace trên Convex.
      const workspaceId = await createWorkspace({
        user: convexUserId, // Gửi ID của user lên Convex.
        messages: [msg], // Bắt đầu workspace với tin nhắn đầu tiên.
      });

      console.log("Workspace đã tạo:", workspaceId); // Log để kiểm tra ID của workspace mới.

      // Chuyển hướng đến workspace vừa tạo.
      router.push(`/workspace/${workspaceId}`);
    } catch (error) {
      console.error("Lỗi khi tạo workspace:", error); // Log lỗi nếu có vấn đề xảy ra.
    }
  };

  // Xử lý sự kiện nhấn phím Enter
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { 
      // Kiểm tra nếu phím Enter được nhấn mà không giữ Shift (để tránh xuống dòng).
      e.preventDefault(); // Ngăn chặn hành vi xuống dòng mặc định.
      handleSubmit(e); // Gọi hàm gửi tin nhắn.
    }
  };

  return (
    <div className="flex flex-col h-full w-full ">
      <div className="h-full bg-background text-foreground flex flex-col">
        {/* Main Content */}
        <main className="relative flex-1 flex flex-col items-center justify-center p-4 max-w-4xl mx-auto w-full text-center z-10">
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500">
            Bạn muốn làm website thế nào?
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Viết ý tưởng, chạy, sửa, và hoàn thành website của bạn
          </p>

          {/* Chat Input */}
          <div className="w-full mb-8 relative overflow-hidden">
            <div className="p-2">
              <form onSubmit={handleSubmit} className="relative">
                <div className="p-5 border rounded-xl w-full">
                  <div className="flex gap-2">
                    <textarea
                      className="outline-none bg-transparent w-full h-32 max-h-56 resize-none mr-8"
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Tôi có thể giúp được gì cho bạn?"
                    ></textarea>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <Paperclip className="h-5 w-5" />
                    </Button>
                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <Sparkles className="h-5 w-5" />
                    </Button>
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
        </main>
      
        
      </div>
    </div>
  );
}

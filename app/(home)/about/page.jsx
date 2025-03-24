'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Zap,
  Users,
  Rocket,
  Clock,
  Award,
  Heart,
  Github,
  Twitter,
  Linkedin,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="h-full bg-background text-foreground flex flex-col">

      {/* Main Content */}
      <main className="relative flex-1 flex flex-col items-center p-4 max-w-7xl mx-auto w-full z-10">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-18 text-center">
          <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500">
            Về chúng tôi
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Chúng tôi là nhóm 4 sáng thứ 2 Ca 1 môn Xây dựng phần mềm Web khoa CNTT Trường Đại
            học Công nghệ Sài Gòn.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Badge variant="secondary" className="text-lg py-1.5 px-4">
              Thái Tín Khang
            </Badge>
            <Badge variant="secondary" className="text-lg py-1.5 px-4">
              Nguyễn Minh Luân
            </Badge>
            <Badge variant="secondary" className="text-lg py-1.5 px-4">
              Nguyễn Văn Trường An
            </Badge>
            <Badge variant="secondary" className="text-lg py-1.5 px-4">
              Nguyễn Lê Tiến Dũng
            </Badge>
          </div>
        </section>

        {/* Mission Section */}
        <section className="w-full py-12 md:py-18">
          <div className="w-full">
            <div>
              <h2 className="text-3xl font-bold mb-6">AI Developer Builder</h2>
              <p className="text-lg text-muted-foreground mb-6">
                AI Developer Builder là đồ án cuối kì của môn Xây dựng phần mềm
                Web.
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                AI Developer Builder hỗ trợ người dùng chuyển đổi ý tưởng của
                bạn thành một trang web hoàn chỉnh chỉ bằng cách nhập một mô tả
                đơn giản. Hệ thống tự động phân tích yêu cầu, chọn giao diện phù
                hợp, tích hợp các tính năng cần thiết và triển khai trang web
                chỉ trong vài phút.
              </p>
            <div className='grid md:grid-cols-2 items-center justify-between'>
            <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-green-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Chat với AI</h3>
                    <p className="text-muted-foreground">
                      Chuyển đổi ý tưởng thành một trang web hoàn chỉnh
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-green-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Thanh toán</h3>
                    <p className="text-muted-foreground">
                        Thanh toán trực tuyến qua MOMO
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-green-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Quản lý chat</h3>
                    <p className="text-muted-foreground">
                      Quản lý lịch sử chat của bạn với AI
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-green-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Quản lý tài khoản</h3>
                    <p className="text-muted-foreground">
                     Cho phép người dùng quản lý tài khoản cá nhân, thay đổi thông tin 
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-green-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Giao diện chế độ sáng/tối</h3>
                    <p className="text-muted-foreground">
                     Chế độ sáng/tối thân thiện với người dùng
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-green-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Deloyment</h3>
                    <p className="text-muted-foreground">
                     Cho phép người dùng đẩy lên host của codesandbox để preview web
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-green-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Quản lý lịch sử giao dịch</h3>
                    <p className="text-muted-foreground">
                      Trang admin cho phép quản lý lịch sử giao dịch
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-green-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Thống kê</h3>
                    <p className="text-muted-foreground">
                        Trang admin cho phép thống kê số lượng khách hàng và số lượng giao dịch
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-green-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Đăng nhập/Đăng kí</h3>
                    <p className="text-muted-foreground">
                     Cho phép đăng nhập, đăng kí với google, facebook, github. Đăng nhập bằng OTP, quên mật khẩu
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-green-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Protected Route</h3>
                    <p className="text-muted-foreground">
                    Cho phép admin đăng nhập vào trang admin
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-green-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Gửi yêu cầu hỗ trợ</h3>
                    <p className="text-muted-foreground">
                    Cho phép người dùng gửi yêu cầu hỗ trợ
                    </p>
                  </div>
                </div>
                
              </div>
            </div>
            </div>
          </div>
        </section>
        {/* CTA Section */}
        <section className="w-full py-12 md:py-24">
          <div className="bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-cyan-500/10 rounded-xl p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Bạn đã thử ứng dụng của chúng tối chưa?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Nếu chưa các bạn hãy
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
              >
                Bắt đầu
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline">
                <Link href='/docs'>
                Xem tài liệu
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

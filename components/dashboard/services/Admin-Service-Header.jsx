'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';

export default function AdminServicesHeader({ setSearchResults }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('all');

  const handleSearch = async () => {
    if (!email) {
      alert("Vui lòng nhập email để tìm kiếm!");
      return;
    }

    try {
      // ✅ Gọi API để tìm đơn hàng theo email
      const orders = await api.orders.searchOrdersByEmail({ email });
      setSearchResults(orders);
      console.log("✅ Kết quả tìm kiếm:", orders);
    } catch (error) {
      console.error("❌ Lỗi khi tìm kiếm đơn hàng:", error);
    }
  };

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">
          Dịch vụ đã đăng kí
        </h2>
        <p className="text-muted-foreground">
          Quản lý dịch vụ đã được người dùng đăng kí
        </p>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="email"
            placeholder="Nhập email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pl-8"
          />
        </div>
        <Button onClick={handleSearch}>Tìm kiếm</Button>
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả trạng thái</SelectItem>
            <SelectItem value="active">Hoạt động</SelectItem>
            <SelectItem value="pending">Tạm dừng</SelectItem>
            <SelectItem value="suspended">Bị cấm</SelectItem>
          </SelectContent>
        </Select>
        <Button>Export</Button>
      </div>
    </div>
  );
}

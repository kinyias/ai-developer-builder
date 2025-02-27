'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';

const UserDetailContext = createContext(null);

export function UserDetailProvider({ children }) {
  const { user } = useUser();
  const [userDetail, setUserDetail] = useState(null);

  // ✅ Luôn gọi useQuery(), nhưng không fetch khi user chưa sẵn sàng
  const fetchedUser = useQuery(api.users.getUsers, {
    email: user?.primaryEmailAddress?.emailAddress || "",
  });

  useEffect(() => {
    if (fetchedUser !== undefined && fetchedUser !== null) {
      setUserDetail(fetchedUser);
    }
  }, [fetchedUser]);

  // ✅ Đặt lại userDetail khi user thay đổi (logout)
  useEffect(() => {
    if (!user) {
      setUserDetail(null);
    }
  }, [user]);

  return (
    <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
      {children}
    </UserDetailContext.Provider>
  );
}

export function useUserDetail() {
  const context = useContext(UserDetailContext);
  if (!context) {
    throw new Error('useUserDetail phải được dùng trong UserDetailProvider');
  }
  return context;
}

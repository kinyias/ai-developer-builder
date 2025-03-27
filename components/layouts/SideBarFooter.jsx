'use client'
import { HelpCircle, LogOut, Settings, Wallet } from 'lucide-react'
import React from 'react'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'
import path from 'path';
import { useClerk } from '@clerk/nextjs';

function SideBarFooter() {
    const router = useRouter();
    const { signOut } = useClerk();
    const options = [{
        name: 'Cài đặt',
        icon: Settings
    },
    {
        name: 'Trợ giúp',
        icon: HelpCircle
    },
    {
        name: 'Đăng kí',
        icon: Wallet,
        action: async () => {
            await signOut(); // Gọi hàm đăng xuất
            router.push('/pricing'); // Chuyển hướng về trang chủ sau khi đăng xuất
        },
    },



    ]
    return (
        <div className='p-2 mb-10'>
            {options.map((option, index) => (
                <Button variant="ghost" className="w-full flex justify-start my-3" key={index}
                    onClick={option.action}>
                    <option.icon />
                    {option.name}
                </Button>
            ))}
        </div>
    )
}

export default SideBarFooter
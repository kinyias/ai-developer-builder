
'use client'
import React from "react";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "../ui/button";
import { MessageCircleCode } from "lucide-react";
import WorkSpaceHistory from "./WorkspaceHistory";
import SideBarFooter from "./SideBarFooter";

import { useRouter } from "next/navigation";


function AppSideBar() {
    const router = useRouter();
    const handleStartNewChat = () => {
        router.replace('/'); // Chuyển hướng đến trang chủ
    };

    return (
        <Sidebar>
            <SidebarHeader className="p-5">
                <Button className="mt-5" onClick={handleStartNewChat} >
                    <MessageCircleCode /> Start new chat
                </Button>
            </SidebarHeader>

            <SidebarContent className="p-5">
                <SidebarGroup>
                    <WorkSpaceHistory />
                </SidebarGroup>
                <SidebarGroup />
            </SidebarContent>
            <SidebarFooter>
                <SideBarFooter />
            </SidebarFooter>
        </Sidebar>
    );
}

export default AppSideBar;
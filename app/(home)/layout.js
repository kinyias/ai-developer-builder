'use client';
import AppSideBar from "@/components/layouts/AppSideBar";
import Header from "@/components/layouts/Header";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import ChatView from "@/components/workspace/ChatView";
import { ActionContext } from "@/context/ActionContext";
import { MessageProvider } from "@/context/MessageContext";
import { useState } from "react";

export default function HomeLayout({ children }) {

  return (
    <>
      <SidebarProvider defaultOpen={false}>
        <AppSideBar />
        <SidebarTrigger/>
        <MessageProvider> {children}</MessageProvider>
      </SidebarProvider>

    </>
  );
}

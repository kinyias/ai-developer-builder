'use client';
import AppSideBar from '@/components/layouts/AppSideBar';
import Header from '@/components/layouts/Header';
import Footer from '@/components/layouts/Footer';
import { SidebarProvider } from '@/components/ui/sidebar';
import { MessageProvider } from '@/context/MessageContext';
export default function HomeLayout({ children }) {
  return (
    <>
      <SidebarProvider defaultOpen={false}>
        <AppSideBar />
        <div className="flex flex-col w-full">
          <Header />
          {children}
          <Footer/>
        </div>
        <MessageProvider></MessageProvider>
      </SidebarProvider>
    </>
  );
}

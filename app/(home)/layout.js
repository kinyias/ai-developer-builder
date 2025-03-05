import AppSideBar from "@/components/layouts/AppSideBar";
import Header from "@/components/layouts/Header";
import { SidebarProvider } from "@/components/ui/sidebar";
import { MessageProvider } from "@/context/MessageContext";

export default function HomeLayout({ children }) {
  return (
    <>
      <Header />
      <SidebarProvider>
        <AppSideBar />

        <MessageProvider>{children}</MessageProvider>
      </SidebarProvider>
    </>
  );
}

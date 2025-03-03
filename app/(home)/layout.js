import Header from "@/components/layouts/Header";
import { MessageProvider } from "@/context/MessageContext";

export default function HomeLayout({ children }) {
  return (
    <>
      <Header />
      <MessageProvider>{children}</MessageProvider>
    </>
  );
}

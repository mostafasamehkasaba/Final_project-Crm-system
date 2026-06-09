import Footer from "@/components/footer";
import Navbar from "@/components/Navbar";
import UserContextProvider from "./(Context)/Context";
import { FavoritesProvider } from "@/app/(site)/favorites/(FavoritesContext)/FavoritesContext";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserContextProvider>
      <FavoritesProvider>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </FavoritesProvider>
    </UserContextProvider>
  );
}
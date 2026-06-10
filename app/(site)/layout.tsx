import Footer from "@/components/footer";
import Navbar from "@/components/navbar/Navbar";
import UserContextProvider from "./(Context)/Context";
import { ThemeProvider } from "@/components/theme-provider";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <UserContextProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </UserContextProvider>
      </ThemeProvider>
    </>
  );
}

<<<<<<< HEAD
import Footer from "@/components/footer";
import Navbar from "@/components/Navbar";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      
      <Navbar />

      <main className="flex-1 w-full flex flex-col">
        {children}
      </main>

      <Footer />
      
    </>
  );
}
=======
import Navbar from "@/app/(site)/_component/Navbar";
import UserContextProvider from "./(Context)/Context";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <UserContextProvider>
        <Navbar />
        <main className="container mx-auto">{children}</main>
      </UserContextProvider>
    </>
  );
}
>>>>>>> c4485813f52247aa1f0ceb0c7b5f22710cb34898

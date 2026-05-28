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

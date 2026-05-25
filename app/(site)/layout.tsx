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
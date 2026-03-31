import Navbar from "@/components/pages/navbar";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-full flex flex-col ">
      <Navbar />
      <main className="bg-[#f4fcff] h-screen pt-[90px]">{children}</main>
    </div>
  );
}

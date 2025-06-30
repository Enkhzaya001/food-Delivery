import { NavBar } from "./_Components/Navbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex bg-[#F3F4F6] h-full ">
      <NavBar />
      <main className="flex-1">{children}</main>
    </div>
  );
}

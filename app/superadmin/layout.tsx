// app/admin/layout.tsx
import AppSidebar from "@/app/superadmin/components/Sidebar";
import { createClient } from "@/lib/client"; // gunakan client server-side
import { redirect } from "next/navigation";
import Toast from "@/components/Toast";

export default async function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="flex w-screen h-screen overflow-hidden">
      {/* Sidebar */}
      <AppSidebar />
      {/* Content */}
      <div className="flex-1 overflow-y-auto">{children}</div>
    </div>
  );
}

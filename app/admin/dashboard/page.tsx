import { createClient } from "@/lib/client";
import LogoutButton from "../../(auth)/route/logout";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  return (
    <div className="p-8">
      <h1 className="text-2xl">Dashboard Admin</h1>
      <p className="mt-4">Halo! Teacher, {data.user?.email}</p>
      <LogoutButton />
    </div>
  );
}

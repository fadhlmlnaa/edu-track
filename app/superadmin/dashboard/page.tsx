import { createClient } from "@/lib/client";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  console.log(data);

  return (
    <div className="p-8">
      <h1 className="text-2xl">Dashboard Admin</h1>
      <p className="mt-4">Halo! SuperAdmin, {data.user?.email}</p>
    </div>
  );
}

import React from "react";
import { createClient } from "@/lib/client";

export default async function DashboardAdmin() {
  const supabase = await createClient();
  const user = await supabase.auth.getUser();
  const data = user.data.user;

  console.log(data);

  return (
    <div className="p-8">
      <h1 className="text-2xl">Dashboard Admin</h1>
      <p className="mt-4">Halo, {data?.email}</p>

      <form action="/admin/logout" method="post">
        <button
          type="submit"
          className="mt-6 bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </form>
    </div>
  );
}

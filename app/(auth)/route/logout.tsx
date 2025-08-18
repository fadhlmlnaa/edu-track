"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/client-supabase";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = await createClient();
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="mt-6 bg-red-500 text-white px-4 py-2 rounded"
    >
      Logout
    </button>
  );
}

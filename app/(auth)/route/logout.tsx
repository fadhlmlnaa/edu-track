"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/client-supabase";
import { useState } from "react";
import Loading from "@/components/Loading";
import { ArrowLeftEndOnRectangleIcon } from "@heroicons/react/24/solid";

export default function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    const supabase = await createClient();
    await supabase.auth.signOut();
    router.push("/login");
    setLoading(false);
  };

  return (
    <>
      {loading && <Loading />}
      <div className="flex items-center gap-2 w-full py-3.5 px-5 hover:bg-[#d1d5dc]">
        <ArrowLeftEndOnRectangleIcon className="h-6 w-6 text-cyan-800" />
        <button
          onClick={handleLogout}
          className="flex w-full rounded cursor-pointer items-center justify-start"
        >
          Logout
        </button>
      </div>
    </>
  );
}


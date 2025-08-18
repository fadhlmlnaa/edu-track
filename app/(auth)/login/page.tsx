import React from "react";
import { createClient } from "@/lib/client";
import { redirect } from "next/navigation";
import Login from "./Login";

export default async function LoginPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/admin/dashboard");
  }
  return <Login />;
}

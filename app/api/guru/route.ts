import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/admin-supabase";

export async function POST(req: Request) {
  const supabase = createAdminClient();
  const { email, password, nama, sekolah_id, nip, gender, telp } = await req.json();

  // 1. buat user di auth
  const { data: userData, error: authError } =
    await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });

  if (authError) {
    return NextResponse.json({ error: authError.message }, { status: 400 });
  }
  if (!userData?.user) {
    return NextResponse.json({ error: "User gagal dibuat" }, { status: 400 });
  }

  // 2. insert ke profiles
  const { error: profileError } = await supabase.from("profiles").insert({
    id: userData.user.id,
    nama,
    sekolah_id,
    role: "admin",
    nip,
    gender,
    telp,
  });

  if (profileError) {
    return NextResponse.json({ error: profileError.message }, { status: 400 });
  }

  return NextResponse.json({ success: true, user: userData.user });

  
}

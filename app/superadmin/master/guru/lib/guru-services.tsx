import { createClient } from "@/lib/client-supabase";

export async function createGuru(form: any) {
  const res = await fetch("/api/guru", {
    method: "POST",
    body: JSON.stringify(form),
  });
  return res.json();
}

export async function getSekolahList() {
  const supabase = createClient();
  const { data, error } = await supabase.from("sekolah").select("*");
  if (error) throw new Error(error.message);
  return data;
}

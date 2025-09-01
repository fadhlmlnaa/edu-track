import { createAdminClient } from "@/lib/admin-supabase";

// dipakai client-side, jadi ini fetch ke API Next.js
export async function createGuru(form: any) {
  const res = await fetch("/api/guru", {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // wajib!
    },
    body: JSON.stringify(form),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Failed to create guru");
  }

  return res.json();
}

// jangan langsung panggil service role di client-side
// bikin API route baru: /api/sekolah
export async function getSekolahList() {
  const res = await fetch("/api/sekolah", { method: "GET" });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Failed to fetch sekolah");
  }

  return res.json();
}

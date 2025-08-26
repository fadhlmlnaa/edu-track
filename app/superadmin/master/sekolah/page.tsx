import SekolahClient from "./sekolah-client";
import { createClient } from "@/lib/client-supabase";
import { redirect } from "next/navigation";

export default async function SekolahPage({
  searchParams,
}: {
  searchParams?: { page?: string; id?: string };
}) {
  const supabase = await createClient();

  // Ambil page dari query param (?page=2), default = 1
  const params = await searchParams;
  const id = params?.id ?? null;
  const page = Number(params?.page ?? 1);
  const itemsPerPage = 10;

  const from = (page - 1) * itemsPerPage;
  const to = page * itemsPerPage - 1;

  const {
    data: sekolah,
    error,
    count,
  } = await supabase
    .from("sekolah")
    .select("*", { count: "exact" })
    .range(from, to);

  if (error) {
    console.error("Supabase error:", error);
    // Bisa juga redirect ke error page
  }

  const totalPages = count ? Math.ceil(count / itemsPerPage) : 1;

  return (
    <SekolahClient
      sekolah={sekolah ?? []}
      id={id}
      page={page}
      totalPages={totalPages}
      itemsPerPage={itemsPerPage}
    />
  );
}

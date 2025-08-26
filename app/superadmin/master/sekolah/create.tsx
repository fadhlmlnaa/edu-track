"use client";

import React, { useState } from "react";
import { createClient } from "@/lib/client-supabase";
import Button from "../../components/Button";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function CreateSekolahForm({
  onSuccess,
}: {
  onSuccess?: () => void;
}) {
  const supabase = createClient();
  const router = useRouter();

  const [nama, setNama] = useState("");
  const [alamat, setAlamat] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    const { error } = await supabase.from("sekolah").insert([
      {
        nama: nama,
        alamat: alamat,
      },
    ]);

    setLoading(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    // Reset form
    setNama("");
    setAlamat("");

    // Trigger refresh data di parent
    if (onSuccess) onSuccess();

    // Atau redirect ke halaman list
    router.refresh();
    toast.success("Sekolah berhasil ditambahkan");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      {errorMsg && <div className="text-red-500">{errorMsg}</div>}
      <div>
        <label className="block text-sm font-medium">Nama Sekolah</label>
        <input
          type="text"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md 
            focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
          placeholder="Input nama sekolah"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Alamat</label>
        <input
          type="text"
          value={alamat}
          onChange={(e) => setAlamat(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md 
            focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
          placeholder="Input alamat sekolah"
          required
        />
      </div>
      <div className="flex justify-end">
        <Button type="submit" variant="primary" disabled={loading}>
          {loading ? "Menyimpan..." : "Tambah Sekolah"}
        </Button>
      </div>
    </form>
  );
}

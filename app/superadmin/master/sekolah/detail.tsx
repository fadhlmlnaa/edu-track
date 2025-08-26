"use client";
import React, { useEffect, useState } from "react";
import { createClient } from "@/lib/client-supabase";
import ModalForm from "../../components/ModalForm";
import Button from "../../components/Button";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface DetailSekolahProps {
  id: string | null;
  open: boolean;
  onClose: () => void;
}

export default function DetailSekolah({
  id,
  open,
  onClose,
}: DetailSekolahProps) {
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false); // 👉 mode edit / detail
  const [form, setForm] = useState({ nama: "", alamat: "" });

  useEffect(() => {
    if (!id) return;

    const fetchDetail = async () => {
      setLoading(true);
      const supabase = await createClient();
      const { data, error } = await supabase
        .from("sekolah")
        .select("*")
        .eq("id", id)
        .single();

      if (!error && data) {
        setData(data);
        setForm({ nama: data.nama ?? "", alamat: data.alamat ?? "" });
      }
      setLoading(false);
    };

    fetchDetail();
  }, [id]);

  const handleDelete = async () => {
    if (!id) return;
    const supabase = await createClient();
    const { error } = await supabase.from("sekolah").delete().eq("id", id);
    if (!error) {
      toast.success("Data berhasil dihapus");
      router.refresh();
      onClose();
    }
  };

  const handleSave = async () => {
    if (!id) return;
    const supabase = await createClient();
    const { error } = await supabase
      .from("sekolah")
      .update({
        nama: form.nama,
        alamat: form.alamat,
      })
      .eq("id", id);

    if (!error) {
      toast.success("Data berhasil diupdate");
      router.refresh();
      setIsEdit(false);
      onClose();
    } else {
      toast.error("Gagal update data");
    }
  };

  return (
    <ModalForm open={open} onClose={onClose} title="Detail Sekolah">
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : !data ? (
        <p className="text-red-500">Data tidak ditemukan</p>
      ) : isEdit ? (
        // 👉 FORM EDIT
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Nama</label>
            <input
              type="text"
              className="border rounded px-2 py-1 w-full border-gray-300 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
              value={form.nama}
              onChange={(e) => setForm({ ...form, nama: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Alamat</label>
            <textarea
              className="border rounded px-2 py-1 w-full border-gray-300 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
              value={form.alamat}
              onChange={(e) => setForm({ ...form, alamat: e.target.value })}
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setIsEdit(false)}>
              Batal
            </Button>
            <Button variant="primary" onClick={handleSave}>
              Simpan
            </Button>
          </div>
        </div>
      ) : (
        // 👉 MODE DETAIL
        <>
          <div className="space-y-2">
            <p>
              <strong className="font-medium">Nama Sekolah :</strong>{" "}
              {data.nama}
            </p>
            <p>
              <strong className="font-medium">Alamat Sekolah :</strong>{" "}
              {data.alamat}
            </p>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
            <Button variant="primary" onClick={() => setIsEdit(true)}>
              Edit
            </Button>
          </div>
        </>
      )}
    </ModalForm>
  );
}

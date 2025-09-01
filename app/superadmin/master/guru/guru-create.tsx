"use client";
import { useState } from "react";
import Input, { NumberInput } from "@/components/Input";
import Loading from "@/components/Loading";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { createGuru, getSekolahList } from "./lib/guru-services";
import { toast } from "react-toastify";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

export default function CreateGuruForm({
  onSuccess,
}: {
  onSuccess?: () => void;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [sekolahList, setSekolahList] = useState<
    { id: string; nama: string }[]
  >([]);
  const [formData, setFormData] = useState({
    nama: "",
    nip: "",
    gender: "",
    telp: "",
    password: "",
    email: "",
    sekolah_id: "",
  });

  const [showPassword, setShowPassword] = useState(true);

  const isFormValid = Object.values(formData).every((val) => val.trim() !== "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (!isFormValid) {
      toast.error("Form wajib terisi");
      setLoading(false);
      return;
    }
    try {
      await createGuru(formData);
      toast.success("Guru berhasil ditambahkan");
      onSuccess?.();
      router.refresh();
    } catch (error) {
      toast.error("Error creating guru: " + error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchSekolahList = async () => {
      try {
        const list = await getSekolahList();
        setSekolahList(list);
      } catch (error) {
        console.error("Error fetching sekolah list:", error);
      }
    };
    fetchSekolahList();
  }, []);

  return (
    <>
      {loading && <Loading />}
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4">
          <label className="block text-sm font-medium">
            Nama<span className="text-red-500">*</span>:
          </label>
          <Input
            type="text"
            value={formData.nama}
            onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
            placeholder="Nama"
            variant="default"
          />
          <label className="block text-sm font-medium">
            NIP<span className="text-red-500">*</span>:
          </label>
          <Input
            type="text"
            value={formData.nip}
            onChange={(e) => setFormData({ ...formData, nip: e.target.value })}
            placeholder="NIP"
            variant="default"
          />
          <label className="block text-sm font-medium">
            Gender<span className="text-red-500">*</span>:
          </label>
          <select
            value={formData.gender}
            onChange={(e) =>
              setFormData({ ...formData, gender: e.target.value })
            }
            className="w-full p-2 border border-gray-300 rounded-md 
              focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
          >
            <option value="">Pilih Gender</option>
            <option value="Laki-laki">Laki-laki</option>
            <option value="Perempuan">Perempuan</option>
          </select>
          <label className="block text-sm font-medium">
            Nomor Telepon<span className="text-red-500">*</span>:
          </label>
          <NumberInput
            value={formData.telp}
            onChange={(e) => setFormData({ ...formData, telp: e.target.value })}
            placeholder="Nomor Telepon"
          />
          <label className="block text-sm font-medium">
            Email<span className="text-red-500">*</span>:
          </label>
          <Input
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            placeholder="Email"
            variant="default"
          />
          <label className="block text-sm font-medium">
            Password<span className="text-red-500">*</span>:
          </label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              placeholder="Password"
              variant="default"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showPassword ? (
                <EyeSlashIcon className="w-5 h-5" />
              ) : (
                <EyeIcon className="w-5 h-5" />
              )}
            </button>
          </div>
          <label className="block text-sm font-medium">
            Sekolah<span className="text-red-500">*</span>:
          </label>
          <select
            value={formData.sekolah_id}
            onChange={(e) =>
              setFormData({ ...formData, sekolah_id: e.target.value })
            }
            className="w-full p-2 border border-gray-300 rounded-md 
              focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
          >
            <option value="">Pilih Sekolah</option>
            {sekolahList.map((sekolah) => (
              <option key={sekolah.id} value={sekolah.id}>
                {sekolah.nama}
              </option>
            ))}
          </select>
          <div className="flex justify-end">
            <Button
              type="submit"
              variant={isFormValid ? "primary" : "ghost"}
              disabled={!isFormValid || loading}
            >
              {loading ? "Menyimpan..." : "Tambah Guru"}
            </Button>
          </div>
        </div>
      </form>
    </>
  );
}

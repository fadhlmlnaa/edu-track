"use client";
import Loading from "@/components/Loading";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import ModalForm from "../../components/ModalForm";
import Button from "../../components/Button";
import { PlusIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import CreateSekolah from "./create";

export default function SekolahPage() {
  const [searchInput, setSearchInput] = useState(""); // input yang diketik
  const [searchTerm, setSearchTerm] = useState(""); // keyword untuk filter
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const onClose = () => setOpen(false);

  const router = useRouter();

  // Data dummy guru
  const sekolahData = [
    {
      nama_sekolah: "SDN Cinagara 01",
      alamat_sekolah: "Jl. Cinagara No. 1, Cinagara, Kec. Cinagara, Kab. Bogor",
    },
    {
      nama_sekolah: "SDN Cinagara 02",
      alamat_sekolah: "Jl. Cinagara No. 2, Cinagara, Kec. Cinagara, Kab. Bogor",
    },
  ];

  const filteredData = sekolahData.filter(
    (sekolah) =>
      sekolah.nama_sekolah.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sekolah.alamat_sekolah.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="px-6 w-full">
        <div className="py-4">
          <h1 className="text-2xl font-bold">Data Sekolah</h1>
          <p className="text-md text-gray-500">
            Kelola data sekolah yang terdaftar dalam sistem. Anda dapat
            menambahkan, memperbarui, atau menghapus data sekolah sesuai
            kebutuhan.
          </p>
        </div>
        <div className="">
          <Button
            variant="primary"
            iconLeft={<PlusIcon />}
            onClick={() => setOpen(true)}
          >
            Tambah Sekolah
          </Button>
        </div>
      </div>
      <div className="p-6 flex w-full">
        <div className="w-1/2">
          <input
            type="text"
            placeholder="Cari sekolah..."
            className="w-full p-2 pr-8 border border-gray-300 rounded-md 
               focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setSearchTerm(searchInput);
              }
            }}
          />
          {searchInput && (
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer z-20 mr-2"
              onClick={() => {
                setSearchInput("");
                setSearchTerm("");
              }}
            >
              ✕
            </button>
          )}
        </div>
        <div className="flex ml-2 items-center">
          <Button
            variant="primary"
            iconLeft={<MagnifyingGlassIcon />}
            onClick={() => setSearchTerm(searchInput)}
            disabled={loading}
          >
            Cari
          </Button>
        </div>
      </div>
      {loading && <Loading />}
      <div className="w-full px-6">
        <div className="w-full overflow-hidden rounded-md border border-gray-300 shadow-md p-2">
          <table className="w-full table-auto border-collapse border rounded-lg border-gray-400">
            <thead>
              <tr>
                <th className="p-2 text-center border border-gray-300 w-10">
                  No
                </th>
                <th className="p-2 text-center border border-gray-300">
                  Nama Sekolah
                </th>
                <th className="p-2 text-center border border-gray-300">
                  Alamat Sekolah
                </th>
                <th className="p-2 text-center border border-gray-300">
                  Detail
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((sekolah, index) => (
                  <tr key={index}>
                    <td className="text-center p-2 border border-gray-300">
                      {index + 1}
                    </td>
                    <td className="p-2 border border-gray-300">
                      {sekolah.nama_sekolah}
                    </td>
                    <td className="p-2 border border-gray-300">
                      {sekolah.alamat_sekolah}
                    </td>
                    <td className="p-2 border border-gray-300">
                      <button
                        className="w-full bg-blue-50 hover:text-blue-600 cursor-pointer text-blue-800 px-4 py-2 rounded"
                        onClick={() =>
                          router.push(`/superadmin/master/sekolah/detail`)
                        }
                      >
                        Detail...
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center p-4 text-gray-500 border border-gray-300"
                  >
                    Tidak ada data ditemukan
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="p-2 flex justify-end items-center">
            <div className="text-end text-sm text-gray-400">
              Page 1 of 1 | 10 items
            </div>
            <div className="flex gap-2 ml-2">
              <Button variant="pagination" className="">
                Previous
              </Button>
              <Button variant="pagination" className="">
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
      <ModalForm open={open} onClose={onClose} title="Tambah Sekolah">
        <CreateSekolah onSuccess={() => setOpen(false)} />
      </ModalForm>
    </>
  );
}

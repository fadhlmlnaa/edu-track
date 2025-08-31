"use client";
import Loading from "@/components/Loading";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import ModalForm from "../../components/ModalForm";
import Button from "../../../../components/Button";
import { PlusIcon } from "@heroicons/react/24/outline";
import CreateGuruForm from "./guru-create";

export default function GuruClient() {
  const [searchInput, setSearchInput] = useState(""); // input yang diketik
  const [searchTerm, setSearchTerm] = useState(""); // keyword untuk filter
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const onClose = () => setOpen(false);

  const router = useRouter();

  // Data dummy guru
  const guruData = [
    {
      nama: "Sukanto Mulyono",
      nip: "123456789",
      gender: "Laki-laki",
      telp: "08123456789",
      email: "sukanto@gmail.com",
    },
    {
      nama: "Sri Wahyuni",
      nip: "987654321",
      gender: "Perempuan",
      telp: "08234567890",
      email: "sriwahyuni@gmail.com",
    },
  ];

  // Filter berdasarkan nama, nip, email, dll.
  const filteredData = guruData.filter(
    (guru) =>
      guru.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guru.nip.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guru.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div>
        <div className="px-6 w-full">
          <div className="py-4">
            <h1 className="text-2xl font-bold">Data Guru</h1>
            <p className="text-md text-gray-500">
              Kelola data guru yang terdaftar dalam sistem. Anda dapat
              menambahkan, memperbarui, atau menghapus data guru sesuai
              kebutuhan.
            </p>
          </div>
          <div className="">
            <Button
              variant="primary"
              iconLeft={<PlusIcon />}
              onClick={() => setOpen(true)}
            >
              Tambah Guru
            </Button>
          </div>
        </div>
      </div>
      {loading && <Loading />}
      <div className="w-full p-6">
        <div className="w-full overflow-hidden rounded-md border border-gray-300 shadow-md p-2">
          <table className="w-full table-auto border-collapse border rounded-lg border-gray-400">
            <thead>
              <tr>
                <th className="p-2 text-center border border-gray-300">Nama</th>
                <th className="p-2 text-center border border-gray-300">NIP</th>
                <th className="p-2 text-center border border-gray-300">
                  Gender
                </th>
                <th className="p-2 text-center border border-gray-300">
                  Nomor Telepon
                </th>
                <th className="p-2 text-center border border-gray-300">
                  Email
                </th>
                <th className="p-2 text-center border border-gray-300">
                  Detail
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((guru, index) => (
                  <tr key={index}>
                    <td className="p-2 border border-gray-300">{guru.nama}</td>
                    <td className="p-2 border border-gray-300">{guru.nip}</td>
                    <td className="p-2 border border-gray-300">
                      {guru.gender}
                    </td>
                    <td className="p-2 border border-gray-300">{guru.telp}</td>
                    <td className="p-2 border border-gray-300">{guru.email}</td>
                    <td className="p-2 border border-gray-300">
                      <button
                        className="w-full bg-blue-50 hover:text-blue-600 cursor-pointer text-blue-800 px-4 py-2 rounded"
                        onClick={() =>
                          router.push(`/superadmin/master/guru/detail`)
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
        </div>
      </div>
      <ModalForm open={open} onClose={onClose} title="Tambah Akun Guru">
        <CreateGuruForm onSuccess={() => setOpen(false)} />
      </ModalForm>
    </>
  );
}

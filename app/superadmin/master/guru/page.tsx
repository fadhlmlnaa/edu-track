"use client";
import Loading from "@/components/Loading";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import ModalForm from "../../components/ModalForm";

export default function GuruPage() {
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
      <div className="p-6 flex w-full justify-between">
        <div className="w-full relative z-10 ">
          <input
            type="text"
            placeholder="Cari guru..."
            className="w-full p-2 pr-8 border border-gray-300 rounded-md 
               focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
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
        <div className="flex items-center">
          <button
            className="ml-2 bg-blue-400 hover:bg-blue-500 cursor-pointer text-white px-4 py-2 rounded-2xl w-32"
            onClick={() => setSearchTerm(searchInput)} // filter baru jalan saat klik
            disabled={loading}
          >
            Cari Guru
          </button>
        </div>
      </div>
      {loading && <Loading />}
      <div className="px-6 flex w-full justify-start">
        <button
          className="p-2 bg-blue-400 hover:bg-blue-500 cursor-pointer text-white rounded w-32"
          onClick={() => setOpen(true)}
        >
          Tambah Guru
        </button>
      </div>
      <ModalForm open={open} onClose={onClose} title="Tambah Guru">
        <form action="">
          <div className="flex flex-col gap-4">
            <input type="text" placeholder="Nama" />
            <input type="text" placeholder="NIP" />
            <input type="text" placeholder="Gender" />
            <input type="text" placeholder="Nomor Telepon" />
            <input type="text" placeholder="Email" />
          </div>
        </form>
      </ModalForm>
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
    </>
  );
}

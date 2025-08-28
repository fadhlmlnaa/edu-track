"use client";
import Loading from "@/components/Loading";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import ModalForm from "../../components/ModalForm";
import Button from "../../components/Button";
import { PlusIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import CreateSekolah from "./create";
import SekolahTable from "./sekolah-table";

export default function SekolahPage({
  sekolah,
  id,
  page,
  totalPages,
  itemsPerPage,
}: {
  sekolah: {
    id: string;
    nama: string;
    alamat: string;
    kontak: string;
  }[];
  id: string | null;
  page: number;
  totalPages: number;
  itemsPerPage: number;
}) {
  const [searchInput, setSearchInput] = useState(""); // input yang diketik
  const [searchTerm, setSearchTerm] = useState(""); // keyword untuk filter
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const onClose = () => setOpen(false);

  const router = useRouter();

  const filteredData = sekolah.filter(
    (item) =>
      item.id === id ||
      item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.alamat.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.kontak.toLowerCase().includes(searchTerm.toLowerCase())
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
      <SekolahTable
        filteredData={filteredData}
        page={page}
        totalPages={totalPages}
        itemsPerPage={itemsPerPage}
      />
      <ModalForm open={open} onClose={onClose} title="Tambah Sekolah">
        <CreateSekolah onSuccess={() => setOpen(false)} />
      </ModalForm>
    </>
  );
}

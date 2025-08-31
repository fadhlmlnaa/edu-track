"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Button from "../../../../components/Button";
import DetailSekolah from "./detail";

export default function SekolahTable({
  filteredData,
  page,
  totalPages,
  itemsPerPage,
}: {
  filteredData: {
    id: string;
    nama: string;
    alamat: string;
    kontak: string;
  }[];
  page: number;
  totalPages: number;
  itemsPerPage: number;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  // 🔥 Handler ganti page
  const goToPage = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(newPage));
    router.push(`?${params.toString()}`);
  };

  return (
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
              <th className="p-2 text-center border border-gray-300">Kontak</th>
              <th className="p-2 text-center border border-gray-300">Detail</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <tr key={index}>
                  <td className="text-center p-2 border border-gray-300">
                    {index + 1}
                  </td>
                  <td className="p-2 border border-gray-300">{item.nama}</td>
                  <td className="p-2 border border-gray-300">{item.alamat}</td>
                  <td className="p-2 border border-gray-300">{item.kontak}</td>
                  <td className="p-2 border border-gray-300">
                    <button
                      className="w-full bg-blue-50 hover:text-blue-600 cursor-pointer text-blue-800 px-4 py-2 rounded"
                      onClick={() => {
                        setSelectedId(item.id);
                        setOpen(true);
                      }}
                    >
                      Detail
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
            Page {page} of {totalPages} | {itemsPerPage} items
          </div>
          <div className="flex gap-2 ml-2">
            <Button
              variant="pagination"
              disabled={page === 1}
              className=""
              onClick={() => goToPage(page - 1)}
            >
              Previous
            </Button>
            <Button
              variant="pagination"
              disabled={page === totalPages}
              className=""
              onClick={() => goToPage(page + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
      <DetailSekolah
        id={selectedId}
        open={open}
        onClose={() => setOpen(false)}
      />
    </div>
  );
}

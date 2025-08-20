import React from "react";

export default function GuruPage() {
  return (
    <div className="p-6">
      <div className="overflow-hidden rounded-md border border-gray-300 shadow-md p-2">
        <table className="w-full table-auto border-collapse border rounded-lg border-gray-400">
          <thead>
            <tr>
              <th className="border border-gray-300">Nama</th>
              <th className="border border-gray-300">NIP</th>
              <th className="border border-gray-300">Jenis Kelamin</th>
              <th className="border border-gray-300">Tempat Lahir</th>
              <th className="border border-gray-300">Tanggal Lahir</th>
              <th className="border border-gray-300">Alamat</th>
              <th className="border border-gray-300">No. Telp</th>
              <th className="border border-gray-300">Email</th>
              <th className="border border-gray-300">Password</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2 border border-gray-300">Nama</td>
              <td className="p-2 border border-gray-300">NIP</td>
              <td className="p-2 border border-gray-300">Jenis Kelamin</td>
              <td className="p-2 border border-gray-300">Tempat Lahir</td>
              <td className="p-2 border border-gray-300">Tanggal Lahir</td>
              <td className="p-2 border border-gray-300">Alamat</td>
              <td className="p-2 border border-gray-300">No. Telp</td>
              <td className="p-2 border border-gray-300">Email</td>
              <td className="p-2 border border-gray-300">Password</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

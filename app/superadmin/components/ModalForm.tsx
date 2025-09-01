"use client";
import React, { ReactNode } from "react";

export default function ModalForm({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}) {
  if (!open) return null;
  return (
    <>
      <div className="fixed inset-0 justify-center items-center z-50 flex w-full bg-black/40">
        {/* Container utama modal */}
        <div className="bg-white rounded-2xl shadow-lg w-full max-w-5xl p-6 animate-fadeIn">
          {/* Header modal */}
          <div className="flex justify-between items-center border-b border-gray-300 pb-3 mb-4">
            <h2 className="text-lg font-semibold">{title}</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-red-500 text-xl"
            >
              ✕
            </button>
          </div>

          {/* Konten modal dengan scroll */}
          <div className="max-h-[70vh] overflow-y-auto pr-2">{children}</div>
        </div>
      </div>
    </>
  );
}

export default function NotFound() {
    return (
      <div className="flex h-screen flex-col items-center justify-center">
        <h1 className="text-5xl font-bold text-cyan-700">404</h1>
        <p className="mt-2 text-gray-600">Halaman tidak ditemukan</p>
        <a
          href="/"
          className="mt-4 rounded-lg bg-cyan-600 px-4 py-2 text-white hover:bg-cyan-700"
        >
          Kembali ke Home
        </a>
      </div>
    );
  }
  
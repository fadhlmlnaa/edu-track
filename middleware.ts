// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createClient } from "@/lib/client"; // pakai helper supabase server-side

export async function middleware(req: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // kalau belum login -> redirect ke /login
  if (!user) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const isSuperAdmin = user.user_metadata?.is_super_admin === true;
  
  const pathname = req.nextUrl.pathname;

  // 🚨 Jika user BUKAN superadmin tapi coba akses /superadmin
  if (pathname.startsWith("/superadmin") && !isSuperAdmin) {
    return NextResponse.redirect(new URL("/admin/dashboard", req.url));
  }

  // 🚨 Jika user superadmin tapi coba akses /admin
  if (pathname.startsWith("/admin") && isSuperAdmin) {
    return NextResponse.redirect(new URL("/superadmin/dashboard", req.url));
  }

  return NextResponse.next();
}

// hanya cek route admin & superadmin
export const config = {
  matcher: ["/admin/:path*", "/superadmin/:path*"],
};

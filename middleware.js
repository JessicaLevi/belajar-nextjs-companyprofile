import { NextResponse } from "next/server";

export function middleware(request) {
  // 1. Latihan 1: Logger (Mencatat setiap request)
  const waktu = new Date().toISOString();
  console.log(`[${waktu}] ${request.method} ${request.nextUrl.pathname}`);

  // 2. Latihan 3: Maintenance Mode (Contoh pengecekan global)
  const isMaintenance = false; // Ubah jadi true jika ingin mengaktifkan mode maintenance
  if (isMaintenance && !request.nextUrl.pathname.startsWith("/maintenance")) {
    return NextResponse.redirect(new URL("/maintenance", request.url));
  }

  // 3. Latihan 2: Auth Guard untuk halaman tertentu (misal: /favorites)
  /*if (request.nextUrl.pathname.startsWith("/favorites")) {
    const token = request.cookies.get("token");
    if (!token) {
      // Belum login, lempar ke halaman login
      return NextResponse.redirect(new URL("/login", request.url));
    }
  } */

  // Lanjutkan request jika semua kondisi terpenuhi
  return NextResponse.next();
}

// Konfigurasi matcher global yang mencakup semua kebutuhan
export const config = {
  matcher: ["/api/:path*", "/favorites", "/((?!_next/static|_next/image|favicon.ico).*)"],
};
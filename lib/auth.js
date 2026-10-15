import { getCurrentUser } from "@/lib/supabase/server";

// Hanya pemilik situs (email di ADMIN_EMAIL) yang boleh mengelola pesan masuk
export async function isAdmin() {
  const adminEmail = process.env.ADMIN_EMAIL;
  if (!adminEmail) return false; // env belum diisi = tidak ada admin (aman secara default)

  const user = await getCurrentUser();
  return user?.email?.toLowerCase() === adminEmail.toLowerCase();
}
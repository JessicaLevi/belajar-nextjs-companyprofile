import { removeFavorite } from "@/lib/services/favoriteService";
import { getCurrentUser } from "@/lib/supabase/server";

export async function DELETE(request, { params }) {
  try {
    // 1. Harus login
    if (!(await getCurrentUser())) {
      return Response.json(
        { error: "Silakan login terlebih dahulu" },
        { status: 401 },
      );
    }

    // 2. id dari URL selalu berupa string, pastikan bentuknya angka bulat positif
    const { id } = await params;
    const userId = Number(id);
    if (!Number.isInteger(userId) || userId <= 0) {
      return Response.json({ error: "id tidak valid" }, { status: 400 });
    }

    // 3. Hapus, lalu teruskan hasil dari service apa adanya
    const result = await removeFavorite(userId);

    if (!result.success) {
      return Response.json({ error: result.error }, { status: result.status });
    }

    return Response.json({ message: result.message });
  } catch (error) {
    // 4. Detail error hanya di log server, klien dapat pesan umum
    console.error("[favorites] DELETE gagal:", error);
    return Response.json(
      { error: "Terjadi kesalahan pada server" },
      { status: 500 },
    );
  }
}

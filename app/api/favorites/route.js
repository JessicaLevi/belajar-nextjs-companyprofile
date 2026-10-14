import { getAllFavorites, addFavorite } from "@/lib/services/favoriteService";
import { getCurrentUser } from "@/lib/supabase/server";

const unauthorized = () =>
  Response.json({ error: "Silakan login terlebih dahulu" }, { status: 401 });

export async function GET() {
  try {
    if (!(await getCurrentUser())) return unauthorized();
    return Response.json(await getAllFavorites());
  } catch (error) {
    console.error("[favorites] gagal:", error);
    return Response.json(
      { error: "Terjadi kesalahan pada server" },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  try {
    if (!(await getCurrentUser())) return unauthorized();

    const body = await request.json();
    const result = await addFavorite(body);

    if (!result.success) {
      return Response.json({ error: result.error }, { status: result.status });
    }

    return Response.json(result.data, { status: result.status });
  } catch (error) {
    console.error("[favorites] gagal:", error);
    return Response.json(
      { error: "Terjadi kesalahan pada server" },
      { status: 500 },
    );
  }
}

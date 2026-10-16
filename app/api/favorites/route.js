import { getAllFavorites, addFavorite } from "@/lib/services/favoriteService";
import { getCurrentUser } from "@/lib/supabase/server";

const unauthorized = () =>
  Response.json({ error: "Please log in first" }, { status: 401 });

export async function GET() {
  try {
    if (!(await getCurrentUser())) return unauthorized();
    return Response.json(await getAllFavorites());
  } catch (error) {
    console.error("[favorites] gagal:", error);
    return Response.json(
      { error: "Something went wrong on the server" },
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
      { error: "Something went wrong on the server" },
      { status: 500 },
    );
  }
}

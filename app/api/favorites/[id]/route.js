import { removeFavorite } from "@/lib/services/favoriteService";
import { getCurrentUser } from "@/lib/supabase/server";

export async function DELETE(request, { params }) {
  try {
    if (!(await getCurrentUser())) {
      return Response.json(
        { error: "Silakan login terlebih dahulu" },
        { status: 401 },
      );
    }

    const { id } = await params;
    const result = await removeFavorite(id);

    if (!result.success) {
      return Response.json({ error: result.error }, { status: result.status });
    }

    return Response.json({ message: result.message });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
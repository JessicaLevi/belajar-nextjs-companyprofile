import { removeFavorite } from "@/lib/services/favoriteService";

export async function DELETE(request, { params }) {
  const { id } = await params;
  const numId = Number(id);
  const result = await removeFavorite(numId);

  if (!result.success) {
    return Response.json({ error: result.error }, { status: result.status });
  }

  return Response.json({ message: "Berhasil dihapus" });
}

/* import { favorites } from "@/lib/db";

export async function PATCH(request, { params }) {
  const { id } = await params;
  const body = await request.json();
  const { note } = body;

  const favorite = favorites.find((f) => String(f.id) === String(id));

  if (!favorite) {
    return Response.json({ error: "Data tidak ditemukan" }, { status: 404 });
  }

  if (note === undefined || note === null || note.trim() === "") {
    return Response.json(
      { error: "Field note tidak boleh kosong" },
      { status: 400 },
    );
  }

  favorite.note = note;

  return Response.json(
    { message: "Berhasil diperbarui", data: favorite },
    { status: 200 },
  );
}

export async function DELETE(request, { params }) {
  const { id } = await params;
  const index = favorites.findIndex((f) => String(f.id) === String(id));

  if (index === -1) {
    return Response.json({ error: "Data tidak ditemukan" }, { status: 404 });
  }

  favorites.splice(index, 1);
  return Response.json({ message: "Berhasil dihapus" });
} */

import { getAllFavorites, addFavorite } from "@/lib/services/favoriteService";

export async function GET() {
  return Response.json(await getAllFavorites());
}

export async function POST(request) {
  const body = await request.json();
  const result = await addFavorite(body);

  if (!result.success) {
    return Response.json({ error: result.error }, { status: result.status });
  }

  return Response.json(result.data, { status: result.status });
}

/*import { favorites } from "@/lib/db";

export async function GET() {
  return Response.json(favorites);
}

export async function POST(request) {
  const body = await request.json();

  if (!body || Object.keys(body).length === 0) {
    return Response.json(
      { error: "Body permintaan tidak boleh kosong" },
      { status: 400 },
    );
  }

  if (!body.id || !body.name) {
    return Response.json({ error: "id dan name wajib diisi" }, { status: 400 });
  }

  const alreadyExists = favorites.some((f) => f.id === body.id);
  if (alreadyExists) {
    return Response.json(
      { error: "User ini sudah difavoritkan" },
      { status: 400 },
    );
  }

  favorites.push(body);
  return Response.json(body, { status: 201 });
}*/

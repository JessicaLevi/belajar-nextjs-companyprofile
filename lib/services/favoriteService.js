import {
  findAllFavorites,
  findFavoriteById,
  insertFavorite,
  deleteFavoriteById,
} from "@/lib/repositories/favoriteRepository";
import { validateFavoriteInput } from "@/lib/validations/favoriteValidation";

export async function getAllFavorites() {
  return await findAllFavorites();
}

export async function addFavorite(body) {
  const validation = validateFavoriteInput(body);
  if (!validation.valid) {
    return { success: false, status: 400, error: validation.error };
  }

  const alreadyExists = await findFavoriteById(body.user_id);
  if (alreadyExists) {
    return { success: false, status: 400, error: "This user is already in your favorites" };
  }

  const saved = await insertFavorite({ user_id: body.user_id });
  return { success: true, status: 201, data: saved };
}

export async function removeFavorite(id) {
  const deleted = await deleteFavoriteById(id);
  if (!deleted) {
    return { success: false, status: 404, error: "Not found" };
  }

  return { success: true, status: 200, message: "Berhasil dihapus" };
}
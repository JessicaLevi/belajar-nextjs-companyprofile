import { addFavorite, removeFavorite } from "@/lib/services/favoriteService";
import {
  findFavoriteById,
  insertFavorite,
  deleteFavoriteById,
} from "@/lib/repositories/favoriteRepository";

// Repository dipalsukan supaya tes tidak menyentuh Supabase sungguhan
jest.mock("@/lib/repositories/favoriteRepository", () => ({
  findAllFavorites: jest.fn(),
  findFavoriteById: jest.fn(),
  insertFavorite: jest.fn(),
  deleteFavoriteById: jest.fn(),
}));

beforeEach(() => {
  jest.resetAllMocks();
});

describe("favoriteService", () => {
  describe("addFavorite", () => {
    test("berhasil menyimpan data valid yang belum difavoritkan", async () => {
      findFavoriteById.mockResolvedValue(null);
      insertFavorite.mockResolvedValue({ id: 10, user_id: 1 });

      const result = await addFavorite({ user_id: 1 });

      expect(result).toEqual({
        success: true,
        status: 201,
        data: { id: 10, user_id: 1 },
      });
      expect(insertFavorite).toHaveBeenCalledWith({ user_id: 1 });
    });

    test("hanya meneruskan user_id ke database (favorited_by diisi database)", async () => {
      findFavoriteById.mockResolvedValue(null);
      insertFavorite.mockResolvedValue({ id: 10, user_id: 1 });

      await addFavorite({ user_id: 1, favorited_by: "uuid-akun-lain" });

      expect(insertFavorite).toHaveBeenCalledWith({ user_id: 1 });
    });

    test("menolak data tanpa user_id", async () => {
      const result = await addFavorite({});

      expect(result.success).toBe(false);
      expect(result.status).toBe(400);
      expect(result.error).toBe("user_id wajib diisi");
      expect(insertFavorite).not.toHaveBeenCalled();
    });

    test("menolak user yang sudah difavoritkan", async () => {
      findFavoriteById.mockResolvedValue({ id: 5, user_id: 1 });

      const result = await addFavorite({ user_id: 1 });

      expect(result.success).toBe(false);
      expect(result.status).toBe(400);
      expect(result.error).toBe("User ini sudah difavoritkan");
      expect(insertFavorite).not.toHaveBeenCalled();
    });
  });

  describe("removeFavorite", () => {
    test("berhasil menghapus favorit", async () => {
      deleteFavoriteById.mockResolvedValue(true);

      const result = await removeFavorite(1);

      expect(result).toEqual({
        success: true,
        status: 200,
        message: "Berhasil dihapus",
      });
      expect(deleteFavoriteById).toHaveBeenCalledWith(1);
    });

    test("gagal 404 kalau repository tidak menghapus apa pun", async () => {
      deleteFavoriteById.mockResolvedValue(false);

      const result = await removeFavorite(999);

      expect(result.success).toBe(false);
      expect(result.status).toBe(404);
      expect(result.error).toBe("Data tidak ditemukan");
    });
  });
});
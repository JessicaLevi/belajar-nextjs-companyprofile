export function validateFavoriteInput(body) {
  const userId = body?.user_id;

  if (!userId) {
    return { valid: false, error: "user_id wajib diisi" };
  }

  if (!Number.isInteger(userId) || userId <= 0) {
    return { valid: false, error: "user_id harus berupa angka bulat positif" };
  }

  return { valid: true };
}
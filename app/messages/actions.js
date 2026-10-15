"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

import { isAdmin } from "@/lib/auth";

export async function deleteMessageAction(formData) {
  // Server action bisa dipanggil langsung dari luar halaman, jadi dicek lagi di sini
  if (!(await isAdmin())) return;
  
  const id = formData.get("id");

  if (!id) return;

  const supabase = await createClient();
  const { error } = await supabase.from("messages").delete().eq("id", id);

  if (error) {
    console.error("Gagal menghapus pesan:", error.message);
    return;
  }

  revalidatePath("/messages");
}
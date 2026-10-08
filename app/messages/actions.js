"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function deleteMessageAction(formData) {
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
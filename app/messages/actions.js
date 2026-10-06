"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export async function deleteMessageAction(formData) {
  const id = formData.get("id");

  if (!id) return;

  const { error } = await supabase.from("messages").delete().eq("id", id);

  if (error) {
    console.error("Gagal menghapus pesan:", error.message);
    return;
  }

  revalidatePath("/messages");
}
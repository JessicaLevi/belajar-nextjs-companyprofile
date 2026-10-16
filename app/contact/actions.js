"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function submitContactForm(formData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const message = formData.get("message");

  const supabase = await createClient();

  if (!name || !email || !message) {
    return { success: false, error: "All fields are required." };
  }

  const { error } = await supabase.from("messages").insert({
    name,
    email,
    message,
  });

  if (error) {
    console.error("[contact] gagal menyimpan pesan:", error);
    return { success: false, error: "Failed to send message. Please try again later." };
  }

  revalidatePath("/messages");

  return { success: true };
}

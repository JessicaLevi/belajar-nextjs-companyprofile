import { createClient } from "@/lib/supabase/server";

export async function findAllUsers() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("app_users")
    .select("id, name, email, company_name")
    .order("id");
  if (error) throw new Error(error.message);
  return data;
}
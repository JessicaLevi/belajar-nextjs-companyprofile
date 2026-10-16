import { findAllUsers } from "@/lib/repositories/userRepository";

export async function GET() {
  try {
    return Response.json(await findAllUsers());
  } catch (error) {
    console.error("[users] gagal:", error);
    return Response.json(
      { error: "Something went wrong on the server" },
      { status: 500 },
    );
  }
}
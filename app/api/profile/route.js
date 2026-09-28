const profileData = {
  name: "Jessica Levi",
  role: "peserta bootcamp",
  favoriteTech: ["Next.js", "Tailwind CSS"],
};

export async function GET() {
  return Response.json(profileData);
}

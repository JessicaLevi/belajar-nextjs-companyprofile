import { CheckCircle2 } from "lucide-react";

export const metadata = { title: "About" };

const values = [
  "A layered API: route → service → repository",
  "Supabase Auth, with per-account data protected by Row Level Security",
  "Business logic covered by unit tests (Jest)",
];

const stats = [
  { value: "Next.js 16", label: "App Router" },
  { value: "Supabase", label: "Auth & Postgres" },
  { value: "Tailwind 4", label: "Styling" },
  { value: "Jest", label: "Unit tests" },
];

export default function AboutPage() {
  return (
    <section className="relative">
      <div className="bg-grid bg-radial-fade absolute inset-0 -z-10" />

      <div className="mx-auto grid max-w-6xl gap-16 px-6 py-20 md:grid-cols-2 md:items-center">
        <div>
          <p className="text-sm font-semibold text-primary">About</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">
            About this project
          </h1>

          <p className="mt-4 max-w-md text-muted-foreground">
            A company-profile website built as a Next.js learning project by
            Jessica Levi — focused on clean structure, real authentication, and
            a database-backed feature built end to end during Bootcamp Perempuan Inovasi 2026.
          </p>

          <ul className="mt-8 space-y-3">
            {values.map((value) => (
              <li key={value} className="flex items-start gap-3 text-sm">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                <span className="text-muted-foreground">{value}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-white/10 bg-foreground/3 p-6"
            >
              <p className="text-3xl font-bold tracking-tight">{stat.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

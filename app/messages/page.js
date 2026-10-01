import { messages } from "@/lib/db";
import { deleteMessage } from "./action";

export default async function MessagesPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-20">
      <h1 className="text-3xl font-bold">Pesan Masuk</h1>

      <div className="mt-8 space-y-4">
        {messages.length === 0 ? (
          <p className="text-muted-foreground">Belum ada pesan masuk.</p>
        ) : (
          messages.map((msg) => {
            const deleteWithId = deleteMessage.bind(null, msg.id);

            return (
              <div
                key={msg.id}
                className="rounded-lg border p-4 flex justify-between items-start gap-4"
              >
                <div>
                  <p className="font-medium">
                    {msg.name} — {msg.email}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {msg.message}
                  </p>
                </div>

                <form action={deleteWithId}>
                  <button
                    type="submit"
                    className="text-sm font-semibold text-destructive hover:opacity-80 transition-opacity cursor-pointer"
                  >
                    Hapus
                  </button>
                </form>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}

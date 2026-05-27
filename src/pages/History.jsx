import HistoryCard from "../components/history/HistoryCard";

export default function History() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-5 sm:px-6">
      <div className="mb-8 rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-white sm:text-4xl">
              Riwayat Aktivitas
            </h1>

            <p className="mt-2 text-sm text-slate-400 sm:text-base">
              Semua transaksi penarikan & penambahan dana kamu.
            </p>
          </div>
        </div>
      </div>

      <HistoryCard />
    </main>
  );
}

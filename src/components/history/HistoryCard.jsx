import useBudgetStore from "../../store/budgetStore";
import { formatCurrency } from "../../utils/currency";

import { ArrowDownCircle, ArrowUpCircle, Clock3 } from "lucide-react";

export default function HistoryCard() {
  const { history } = useBudgetStore();

  return (
    <div className="space-y-4">
      {history.length === 0 ? (
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-800">
            <Clock3 size={30} className="text-slate-500" />
          </div>

          <h3 className="text-lg font-bold text-white">Belum Ada Aktivitas</h3>

          <p className="mt-2 text-sm text-slate-400">
            Riwayat penarikan dan penambahan dana akan muncul di sini.
          </p>
        </div>
      ) : (
        history.map((item) => {
          const isTopup = item.type === "topup";

          return (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/90 p-5 transition-all duration-300 hover:border-slate-700 hover:bg-slate-900 hover:shadow-xl"
            >
              <div
                className={`absolute inset-y-0 left-0 w-1 ${
                  isTopup ? "bg-emerald-500" : "bg-rose-500"
                } `}
              />

              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl ${
                      isTopup
                        ? "bg-emerald-500/10 text-emerald-400"
                        : "bg-rose-500/10 text-rose-400"
                    } `}
                  >
                    {isTopup ? (
                      <ArrowUpCircle size={28} />
                    ) : (
                      <ArrowDownCircle size={28} />
                    )}
                  </div>

                  <div>
                    <h3 className="font-black text-white">
                      {isTopup ? "Tambah Dana" : "Tarik Dana"}
                    </h3>

                    <p className="mt-1 text-xs text-slate-500">
                      {new Date(item.createdAt).toLocaleString("id-ID", {
                        day: "numeric",

                        month: "long",

                        year: "numeric",

                        hour: "2-digit",

                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p
                    className={`text-lg font-black sm:text-2xl ${
                      isTopup ? "text-emerald-400" : "text-rose-400"
                    } `}
                  >
                    {isTopup ? "+" : "-"}

                    {formatCurrency(item.amount)}
                  </p>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

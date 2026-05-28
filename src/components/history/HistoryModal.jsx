import { AnimatePresence, motion } from "framer-motion";

import { ArrowDownCircle, ArrowUpCircle, Clock3, X } from "lucide-react";

import useBudgetStore from "../../store/budgetStore";
import { formatCurrency } from "../../utils/currency";

export default function HistoryModal() {
  const { history, historyModal, setHistoryModal } = useBudgetStore();

  return (
    <AnimatePresence>
      {historyModal && (
        <motion.div
          onClick={() => setHistoryModal(false)}
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{
              scale: 0.96,
              opacity: 0,
            }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
            exit={{
              scale: 0.96,
              opacity: 0,
            }}
            className="relative flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-slate-800 bg-slate-950 shadow-2xl"
          >
            {/* HEADER */}

            <div className="sticky top-0 z-20 border-b border-slate-800 bg-slate-950/95 p-5 backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-black text-white">
                    Riwayat Aktivitas
                  </h2>

                  <p className="mt-1 text-sm text-slate-400">
                    Penarikan & penambahan dana.
                  </p>
                </div>

                <button
                  onClick={() => setHistoryModal(false)}
                  className="rounded-xl bg-slate-900 p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* BODY */}

            <div className="overflow-y-auto p-5">
              {history.length === 0 ? (
                <div className="py-16 text-center">
                  <Clock3 size={40} className="mx-auto text-slate-600" />

                  <h3 className="mt-5 text-lg font-bold">
                    Belum Ada Aktivitas
                  </h3>

                  <p className="mt-2 text-sm text-slate-500">
                    History transaksi akan muncul di sini.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {history.map((item) => {
                    const isTopup = item.type === "topup";

                    return (
                      <div
                        key={item.id}
                        className="rounded-3xl border border-slate-800 bg-slate-900 p-5 transition-all hover:border-slate-700"
                      >
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-4">
                            <div
                              className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                                isTopup
                                  ? "bg-emerald-500/10 text-emerald-400"
                                  : "bg-rose-500/10 text-rose-400"
                              } `}
                            >
                              {isTopup ? (
                                <ArrowUpCircle size={24} />
                              ) : (
                                <ArrowDownCircle size={24} />
                              )}
                            </div>

                            <div>
                              <h3 className="font-black text-white">
                                {isTopup ? "Tambah Dana" : "Tarik Dana"}
                              </h3>

                              <p className="mt-1 text-xs text-slate-500">
                                {new Date(item.createdAt).toLocaleString(
                                  "id-ID",
                                )}
                              </p>
                            </div>
                          </div>

                          <p
                            className={`text-lg font-black ${
                              isTopup ? "text-emerald-400" : "text-rose-400"
                            } `}
                          >
                            {isTopup ? "+" : "-"}

                            {formatCurrency(item.amount)}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

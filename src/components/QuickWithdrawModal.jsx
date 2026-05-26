import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import useBudgetStore from "../store/budgetStore";
import { formatCurrency } from "../utils/currency";

export default function QuickWithdrawModal() {
  const {
    quickModal,

    setQuickModal,

    quickWithdraw,

    slots,
    dailyBudget,
  } = useBudgetStore();

  const [amount, setAmount] = useState(dailyBudget);

  const maxAmount = slots

    .filter((slot) => slot.status === "available")

    .reduce(
      (sum, slot) => sum + slot.amount,

      0,
    );

  const availableSlots = slots.filter((slot) => slot.status === "available");

  const withdrawOptions = [];

  let running = 0;

  for (const slot of availableSlots) {
    running += slot.amount;

    withdrawOptions.push(running);
  }
  return (
    <AnimatePresence>
      {quickModal && (
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
        >
          <motion.div
            initial={{
              opacity: 0,

              scale: 0.96,

              y: 16,
            }}
            animate={{
              opacity: 1,

              scale: 1,

              y: 0,
            }}
            exit={{
              opacity: 0,

              scale: 0.96,

              y: 16,
            }}
            transition={{
              duration: 0.22,

              ease: "easeOut",
            }}
            className="flex max-h-[90vh] w-full max-w-sm flex-col overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl sm:max-w-xl lg:max-w-2xl"
          >
            {/* HEADER */}

            <div className="flex items-center justify-between border-b border-slate-800 p-5 sm:p-7">
              <div>
                <h2 className="text-xl font-black sm:text-2xl">Tarik Dana</h2>

                <p className="mt-2 text-sm text-slate-400">
                  Tarik budget yang tersedia
                </p>
              </div>

              <button
                onClick={() => setQuickModal(false)}
                className="cursor-pointer rounded-xl bg-slate-800 px-3 py-2 text-slate-400 transition hover:bg-slate-700 hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* BODY */}

            <div className="overflow-y-auto p-5 sm:p-7">
              <div className="mb-8 rounded-2xl border border-slate-800 bg-slate-950 p-5">
                <p className="text-sm text-slate-400">Budget Tersedia</p>

                <h3 className="mt-2 text-2xl font-black text-emerald-400 sm:text-3xl">
                  {formatCurrency(maxAmount)}
                </h3>
              </div>

              {/* OPTIONS */}

              <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
                {withdrawOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => setAmount(option)}
                    className={`cursor-pointer rounded-2xl border p-4 text-sm font-semibold transition-all duration-200 hover:scale-[1.02] ${
                      amount === option
                        ? `border-emerald-500 bg-emerald-500/20 text-emerald-400`
                        : `border-slate-700 bg-slate-800 hover:border-emerald-500/40`
                    } `}
                  >
                    {formatCurrency(option)}
                  </button>
                ))}
              </div>
            </div>

            {/* FOOTER */}

            <div className="border-t border-slate-800 p-5 sm:p-7">
              <button
                onClick={() => {
                  quickWithdraw(amount);

                  setQuickModal(false);
                }}
                className="w-full cursor-pointer rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-6 py-4 text-lg font-bold text-slate-950 transition-all duration-300 hover:scale-[1.01] hover:shadow-lg hover:shadow-cyan-500/20 active:scale-[0.98]"
              >
                Konfirmasi Penarikan {formatCurrency(amount)}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

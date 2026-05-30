import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import useBudgetStore from "../../store/budgetStore";
import { formatCurrency } from "../../utils/currency";

export default function QuickWithdrawModal() {
  const { quickModal, setQuickModal, quickWithdraw, slots, dailyBudget } =
    useBudgetStore();

  const STEP = 10000;

  const availableSlots = slots.filter((slot) => slot.status === "available");

  const maxAmount = availableSlots.reduce((sum, slot) => sum + slot.amount, 0);

  const optionLimit = Math.min(dailyBudget * 3, maxAmount);

  const withdrawOptions = [];

  for (let i = STEP; i <= optionLimit; i += STEP) {
    withdrawOptions.push(i);
  }

  const [amount, setAmount] = useState(withdrawOptions[0] || STEP);

  /* ---------- remaining preview ---------- */

  const remaining = Math.max(maxAmount - amount, 0);

  const remainingDays = Math.floor(remaining / dailyBudget);

  const remainder = remaining % dailyBudget;

  /* ---------- realtime debt preview ---------- */

  const simulated = slots.map((slot) => ({
    ...slot,
  }));

  let left = amount;

  const today = new Date();

  today.setHours(0, 0, 0, 0);

  for (let i = 0; i < simulated.length; i++) {
    if (left <= 0) {
      break;
    }

    const slot = simulated[i];

    if (slot.status !== "available") {
      continue;
    }

    const take = Math.min(
      slot.amount,

      left,
    );

    slot.amount -= take;

    left -= take;
  }

  const debtSlots = simulated.filter((slot) => {
    const slotDate = new Date(slot.date + "T00:00:00");

    return slotDate > today && slot.amount < dailyBudget;
  });

  const debtAmount = debtSlots.reduce(
    (sum, slot) => sum + (dailyBudget - slot.amount),

    0,
  );

  const debtDays = debtSlots.length;

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
            className="flex w-full max-w-sm flex-col overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl"
          >
            {/* HEADER */}

            <div className="flex items-center justify-between border-b border-slate-800 p-5">
              <div>
                <h2 className="text-xl font-black">Tarik Dana</h2>

                <p className="mt-1 text-sm text-slate-400">
                  Pilih nominal penarikan
                </p>
              </div>

              <button
                onClick={() => setQuickModal(false)}
                className="rounded-xl bg-slate-800 px-3 py-2 text-slate-400 transition hover:bg-slate-700 hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* BODY */}

            <div className="p-5">
              <div className="mb-6 rounded-2xl border border-slate-800 bg-slate-950 p-5">
                <p className="text-sm text-slate-400">Budget Tersedia</p>

                <h3 className="mt-2 text-3xl font-black text-emerald-400">
                  {formatCurrency(maxAmount)}
                </h3>

                <p className="mt-3 text-xs text-slate-500">
                  Budget tersisa{" "}
                  <span className="font-bold text-white">
                    {formatCurrency(remaining)}
                  </span>
                  {" / "}
                  {remainingDays}
                  {" hari"}
                  {remainder > 0 && ` + ${formatCurrency(remainder)}`}
                </p>

                {debtAmount > 0 && (
                  <div className="mt-4 rounded-xl border border-rose-500/20 bg-rose-500/5 p-3">
                    <p className="text-[11px] text-rose-300">
                      Hutang Setelah Tarik
                    </p>

                    <p className="mt-1 font-bold text-rose-400">
                      {formatCurrency(debtAmount)}

                      {" / "}

                      {debtDays}

                      {" hari"}
                    </p>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-3 gap-3">
                {withdrawOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => setAmount(option)}
                    className={`rounded-2xl border p-4 text-sm font-black transition-all ${
                      amount === option
                        ? "border-emerald-500 bg-emerald-500/15 text-emerald-400"
                        : "border-slate-700 bg-slate-800"
                    } `}
                  >
                    {formatCurrency(option)}
                  </button>
                ))}
              </div>
            </div>

            {/* FOOTER */}

            <div className="border-t border-slate-800 p-5">
              <button
                onClick={() => {
                  quickWithdraw(amount);

                  setQuickModal(false);
                }}
                className="w-full rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-6 py-4 text-lg font-black text-slate-950 transition-all hover:scale-[1.01]"
              >
                Konfirmasi {formatCurrency(amount)}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

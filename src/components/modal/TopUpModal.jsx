import { AnimatePresence, motion } from "framer-motion";

import { Plus, Wallet, X } from "lucide-react";

import { useState } from "react";

import useBudgetStore from "../../store/budgetStore";

import { formatCurrency } from "../../utils/currency";

const STEP = 10000;

export default function TopUpModal() {
  const {
    topUpModal,

    setTopUpModal,

    topUpFund,
  } = useBudgetStore();

  const [value, setValue] = useState(100000);

  return (
    <AnimatePresence>
      {topUpModal && (
        <motion.div
          onClick={() => setTopUpModal(false)}
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 p-4"
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{
              opacity: 0,

              scale: 0.95,

              y: 20,
            }}
            animate={{
              opacity: 1,

              scale: 1,

              y: 0,
            }}
            exit={{
              opacity: 0,

              scale: 0.95,

              y: 20,
            }}
            className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900 p-7"
          >
            <div className="mb-8 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Wallet size={24} className="text-emerald-400" />

                <h2 className="text-2xl font-black">Top Up Fund</h2>
              </div>

              <button
                onClick={() => setTopUpModal(false)}
                className="cursor-pointer rounded-xl p-2 text-slate-400 transition-all hover:bg-slate-800 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex items-center justify-between rounded-3xl border border-slate-800 bg-slate-950 p-5">
              <button
                onClick={() => {
                  setValue((prev) =>
                    Math.max(
                      prev - STEP,

                      STEP,
                    ),
                  );
                }}
                className="rounded-2xl bg-slate-800 p-3"
              >
                −
              </button>

              <h3 className="text-2xl font-black text-emerald-400">
                {formatCurrency(value)}
              </h3>

              <button
                onClick={() => {
                  setValue((prev) => prev + STEP);
                }}
                className="rounded-2xl bg-slate-800 p-3"
              >
                <Plus size={18} />
              </button>
            </div>

            <button
              onClick={() => {
                topUpFund({
                  totalFund: value,
                });

                setTopUpModal(false);
              }}
              className="mt-8 w-full rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-6 py-4 font-bold text-black"
            >
              Add Fund
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

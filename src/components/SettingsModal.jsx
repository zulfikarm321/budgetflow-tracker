import { AnimatePresence, motion } from "framer-motion";

import { useState } from "react";

import useBudgetStore from "../store/budgetStore";

import { formatCurrency } from "../utils/currency";
import { Settings, Minus, Plus, X } from "lucide-react";

import { MIN_BUDGET, MAX_BUDGET, BUDGET_STEP } from "../constants/budget";

export default function SettingsModal() {
  const {
    settingsModal,

    setSettingsModal,

    dailyBudget,

    setDailyBudget,
  } = useBudgetStore();

  return (
    <AnimatePresence>
      {settingsModal && (
        <SettingsPanel
          dailyBudget={dailyBudget}
          setDailyBudget={setDailyBudget}
          setSettingsModal={setSettingsModal}
        />
      )}
    </AnimatePresence>
  );
}

function SettingsPanel({ dailyBudget, setDailyBudget, setSettingsModal }) {
  const [value, setValue] = useState(dailyBudget);

  const increase = () => {
    setValue((prev) =>
      Math.min(
        prev + BUDGET_STEP,

        MAX_BUDGET,
      ),
    );
  };

  const decrease = () => {
    setValue((prev) =>
      Math.max(
        prev - BUDGET_STEP,

        MIN_BUDGET,
      ),
    );
  };

  return (
    <motion.div
      onClick={() => setSettingsModal(false)}
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
        onClick={(e) => e.stopPropagation()}
        initial={{
          opacity: 0,

          y: 16,

          scale: 0.96,
        }}
        animate={{
          opacity: 1,

          y: 0,

          scale: 1,
        }}
        exit={{
          opacity: 0,

          y: 16,

          scale: 0.96,
        }}
        className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900 p-7"
      >
        {/* HEADER */}

        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Settings size={24} className="text-emerald-400" />

            <h2 className="text-2xl font-black">Pengaturan</h2>
          </div>

          <button
            onClick={() => setSettingsModal(false)}
            className="cursor-pointer rounded-xl p-2 text-slate-400 transition-all hover:bg-slate-800 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* DAILY BUDGET */}

        <div>
          <p className="mb-5 text-sm text-slate-400">Budget Harian</p>

          <div className="flex items-center justify-between gap-5 rounded-3xl border border-slate-800 bg-slate-950 p-5">
            <button
              onClick={decrease}
              disabled={value <= MIN_BUDGET}
              className={`flex items-center justify-center rounded-2xl p-3 transition-all ${
                value <= MIN_BUDGET
                  ? `cursor-not-allowed bg-slate-900 text-slate-600`
                  : `cursor-pointer bg-slate-800 hover:bg-slate-700 active:scale-[0.95]`
              } `}
            >
              <Minus size={18} />
            </button>

            <h3 className="text-2xl font-black text-emerald-400">
              {formatCurrency(value)}
            </h3>

            <button
              onClick={increase}
              disabled={value >= MAX_BUDGET}
              className={`flex items-center justify-center rounded-2xl p-3 transition-all ${
                value >= MAX_BUDGET
                  ? `cursor-not-allowed bg-slate-900 text-slate-600`
                  : `cursor-pointer bg-slate-800 hover:bg-slate-700 active:scale-[0.95]`
              } `}
            >
              <Plus size={18} />
            </button>
          </div>

          <p className="mt-4 text-xs text-slate-500">
            Minimal 10K / Maksimal 100K / Kelipatan 10K
          </p>
        </div>

        {/* SAVE */}

        <button
          onClick={() => {
            setDailyBudget(value);

            setSettingsModal(false);
          }}
          className="mt-8 w-full rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-6 py-4 font-bold text-slate-950 transition-all hover:scale-[1.01] active:scale-[0.98]"
        >
          Simpan Pengaturan
        </button>
      </motion.div>
    </motion.div>
  );
}

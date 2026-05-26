import { AnimatePresence, motion } from "framer-motion";
import { Wallet, Coins, Calendar, X } from "lucide-react";
import { useMemo, useState } from "react";

import useBudgetStore from "../../store/budgetStore";
import { formatCurrency } from "../../utils/currency";
import Stepper from "../Stepper";

const STEP = 10000;

const MIN_TOTAL = 100000;
const MIN_DAILY = 10000;

export default function SetupModal() {
  const {
    hasSetup,
    setupModal,

    setupTracking,

    setSetupModal,
  } = useBudgetStore();

  const [mode, setMode] = useState("daily");

  const [totalFund, setTotalFund] = useState(100000);

  const [dailyBudget, setDailyBudget] = useState(10000);

  const [targetDate, setTargetDate] = useState(() => {
    const d = new Date();

    d.setDate(d.getDate() + 30);

    return d.toISOString().split("T")[0];
  });

  const remainingDays = useMemo(() => {
    if (mode === "daily") {
      return Math.max(
        1,

        Math.floor(totalFund / dailyBudget),
      );
    }

    const today = new Date();

    const target = new Date(targetDate);

    return Math.max(
      1,

      Math.ceil((target - today) / 86400000) + 1,
    );
  }, [mode, totalFund, dailyBudget, targetDate]);

  const calculatedTotal = useMemo(() => {
    if (mode === "daily") {
      return totalFund;
    }

    return remainingDays * dailyBudget;
  }, [mode, totalFund, remainingDays, dailyBudget]);

  const [budgetError, setBudgetError] = useState("");

  return (
    <AnimatePresence>
      {!hasSetup && setupModal && (
        <motion.div
          onClick={() => {
            setSetupModal?.(false);
          }}
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 p-4"
        >
          <motion.div
            onClick={(e) => {
              e.stopPropagation();
            }}
            initial={{
              opacity: 0,
              y: 24,
              scale: 0.96,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            className="max-h-[90vh] w-full max-w-md overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 sm:max-w-lg"
          >
            <div className="max-h-[90vh] overflow-y-auto p-5 sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-black sm:text-3xl">
                    Welcome to BudgetFlow
                  </h1>

                  <p className="mt-3 text-slate-400">
                    Atur budget harian kamu.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setSetupModal?.(false);
                  }}
                  className="cursor-pointer rounded-xl p-2 text-slate-400 transition-all hover:bg-slate-800 hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    setMode("daily");

                    setBudgetError("");
                  }}
                  className={`rounded-2xl py-3 transition-all ${
                    mode === "daily"
                      ? "bg-emerald-500 text-black"
                      : "bg-slate-800"
                  } `}
                >
                  Budget Harian
                </button>

                <button
                  onClick={() => {
                    setMode("target");

                    setBudgetError("");
                  }}
                  className={`rounded-2xl py-3 transition-all ${
                    mode === "target"
                      ? "bg-emerald-500 text-black"
                      : "bg-slate-800"
                  } `}
                >
                  Target Tanggal
                </button>
              </div>

              {/* TOTAL FUND */}

              {mode === "daily" && (
                <Stepper
                  className="mt-8"
                  icon={<Wallet size={16} />}
                  label="Total Dana"
                  value={totalFund}
                  min={MIN_TOTAL}
                  onInput={(value) => {
                    setTotalFund(value);
                  }}
                  increase={() => {
                    setTotalFund((prev) => prev + STEP);
                  }}
                  decrease={() => {
                    const nextFund = Math.max(
                      totalFund - STEP,

                      MIN_TOTAL,
                    );

                    setTotalFund(nextFund);

                    setDailyBudget((prev) =>
                      Math.min(
                        prev,

                        nextFund,
                      ),
                    );
                  }}
                />
              )}

              {/* DAILY PICKER */}

              <Stepper
                className="mt-6"
                icon={<Coins size={16} />}
                label="Budget Harian"
                value={dailyBudget}
                min={MIN_DAILY}
                disablePlus={mode === "daily" && dailyBudget >= totalFund}
                onInput={(value) => {
                  if (mode === "daily" && value > totalFund) {
                    setBudgetError(
                      "Budget harian tidak boleh melebihi total dana.",
                    );

                    return false;
                  }

                  if (mode === "daily") {
                    setBudgetError("");
                  }

                  setDailyBudget(value);

                  return true;
                }}
                increase={() => {
                  setDailyBudget((prev) =>
                    mode === "daily"
                      ? Math.min(
                          prev + STEP,

                          totalFund,
                        )
                      : prev + STEP,
                  );
                }}
                decrease={() => {
                  setDailyBudget((prev) =>
                    Math.max(
                      prev - STEP,

                      MIN_DAILY,
                    ),
                  );
                }}
              />
              {mode === "daily" && budgetError && (
                <p className="mt-3 text-sm text-red-400">{budgetError}</p>
              )}

              {/* TARGET MODE */}

              {mode === "target" && (
                <div className="mt-8">
                  <label className="mb-4 flex items-center gap-2 text-sm text-slate-400">
                    <Calendar size={16} />
                    Digunakan Sampai
                  </label>

                  <input
                    type="date"
                    value={targetDate}
                    min={
                      new Date()

                        .toISOString()

                        .split("T")[0]
                    }
                    onChange={(e) => {
                      setTargetDate(e.target.value);
                    }}
                    className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-5 py-4 outline-none"
                  />
                </div>
              )}

              {/* SUMMARY */}

              <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-950 p-5">
                <p className="text-slate-400">Sisa Hari</p>

                <h2 className="mt-2 text-2xl font-black text-emerald-400 sm:text-3xl">
                  {remainingDays}
                  hari
                </h2>

                <p className="mt-4 text-slate-400">Budget Harian</p>

                <h3 className="mt-2 text-xl font-black">
                  {formatCurrency(dailyBudget)}
                </h3>

                <p className="mt-4 text-slate-400">Total Dana</p>

                <h3 className="mt-2 text-xl font-black text-cyan-400">
                  {formatCurrency(calculatedTotal)}
                </h3>
              </div>

              <button
                onClick={() => {
                  setupTracking({
                    totalFund: calculatedTotal,
                    dailyBudget,
                  });
                }}
                disabled={
                  mode === "daily"
                    ? totalFund < MIN_TOTAL ||
                      dailyBudget < MIN_DAILY ||
                      dailyBudget > totalFund
                    : dailyBudget < MIN_DAILY
                }
                className="mt-8 w-full rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-6 py-4 font-bold text-black transition-all hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-40"
              >
                Mulai Tracking
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

import { AnimatePresence, motion } from "framer-motion";
import { Wallet, Coins, Calendar, X } from "lucide-react";
import { useMemo, useState } from "react";

import useBudgetStore from "../../store/budgetStore";
import { formatCurrency } from "../../utils/currency";

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

  const [totalFund, setTotalFund] = useState(0);

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
            className="max-h-[90vh] w-full max-w-lg overflow-hidden rounded-3xl border border-slate-800 bg-slate-900"
          >
            <div className="max-h-[90vh] overflow-y-auto p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-black">Welcome to BudgetFlow</h1>

                  <p className="mt-3 text-slate-400">
                    Setup your tracking budget.
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
                  onClick={() => setMode("daily")}
                  className={`rounded-2xl py-3 transition-all ${
                    mode === "daily"
                      ? "bg-emerald-500 text-black"
                      : "bg-slate-800"
                  } `}
                >
                  Daily Budget
                </button>

                <button
                  onClick={() => setMode("target")}
                  className={`rounded-2xl py-3 transition-all ${
                    mode === "target"
                      ? "bg-emerald-500 text-black"
                      : "bg-slate-800"
                  } `}
                >
                  Target Date
                </button>
              </div>

              {/* TOTAL FUND */}

              {mode === "daily" && (
                <Stepper
                  className="mt-8"
                  icon={<Wallet size={16} />}
                  label="Total Fund"
                  value={totalFund}
                  onInput={(value) => {
                    const nextFund = Math.max(
                      value,

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
                label="Daily Budget"
                value={dailyBudget}
                disablePlus={mode === "daily" && dailyBudget >= totalFund}
                onInput={(value) => {
                  const safeValue = Math.max(
                    value,

                    MIN_DAILY,
                  );

                  setDailyBudget(
                    mode === "daily"
                      ? Math.min(
                          safeValue,

                          totalFund,
                        )
                      : safeValue,
                  );
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

              {/* TARGET MODE */}

              {mode === "target" && (
                <div className="mt-8">
                  <label className="mb-4 flex items-center gap-2 text-sm text-slate-400">
                    <Calendar size={16} />
                    Use Until
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
                <p className="text-slate-400">Remaining Days</p>

                <h2 className="mt-2 text-3xl font-black text-emerald-400">
                  {remainingDays}
                  days
                </h2>

                <p className="mt-4 text-slate-400">Daily Budget</p>

                <h3 className="mt-2 text-xl font-black">
                  {formatCurrency(dailyBudget)}
                </h3>

                <p className="mt-4 text-slate-400">Total Fund</p>

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
                className="mt-8 w-full rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-6 py-4 font-bold text-black transition-all hover:scale-[1.01]"
              >
                Start Tracking
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Stepper({
  icon,
  label,
  value,
  increase,
  decrease,
  onInput,

  disablePlus = false,
  disableMinus = false,

  className = "",
}) {
  return (
    <div className={className}>
      <label className="mb-4 flex items-center gap-2 text-sm text-slate-400">
        {icon}

        {label}
      </label>

      <div className="flex items-center justify-between gap-3 rounded-3xl border border-slate-800 bg-slate-950 p-4">
        {/* MINUS */}

        <button
          onClick={decrease}
          disabled={disableMinus}
          className="rounded-2xl bg-slate-800 p-3 transition-all hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
        >
          −
        </button>

        {/* INPUT */}

        <input
          type="text"
          value={`Rp ${value.toLocaleString("id-ID")}`}
          onChange={(e) => {
            const raw = e.target.value.replace(/\D/g, "");

            if (!raw) {
              return;
            }

            const numeric = Math.round(Number(raw) / STEP) * STEP;

            onInput?.(numeric);
          }}
          className="w-full bg-transparent text-center text-2xl font-black text-emerald-400 outline-none"
        />

        {/* PLUS */}

        <button
          onClick={increase}
          disabled={disablePlus}
          className="rounded-2xl bg-slate-800 p-3 transition-all hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
        >
          +
        </button>
      </div>

      <p className="mt-2 text-center text-xs text-slate-500">
        Kelipatan 10.000
      </p>
    </div>
  );
}

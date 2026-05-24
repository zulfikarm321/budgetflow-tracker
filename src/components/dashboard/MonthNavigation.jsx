import { motion } from "framer-motion";
import useBudgetStore from "../../store/budgetStore";

const MonthNavigation = () => {
  const { month, year, changeMonth, goToCurrentMonth, currentDay } =
    useBudgetStore();

  const now = new Date();

  const firstUse = JSON.parse(localStorage.getItem("budgetflow-first-use"));

  const isFirstMonth = month === firstUse.month && year === firstUse.year;

  const isCurrentMonth = month === now.getMonth() && year === now.getFullYear();

  return (
    <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
      <motion.div
        key={`${month}-${year}`}
        initial={{
          opacity: 0,

          y: 8,
        }}
        animate={{
          opacity: 1,

          y: 0,
        }}
        transition={{
          duration: 0.25,
        }}
      >
        <h2 className="text-2xl font-black text-emerald-400 lg:text-3xl">
          {new Date(
            year,

            month,
          ).toLocaleString(
            "id-ID",

            {
              month: "long",

              year: "numeric",
            },
          )}
        </h2>

        <p className="mt-2 text-slate-400">Current Day: {currentDay}</p>
      </motion.div>

      <div className="flex flex-wrap gap-3">
        {/* PREVIOUS */}

        <button
          disabled={isFirstMonth}
          onClick={() => changeMonth(-1)}
          className={`rounded-2xl border px-5 py-3 transition-all active:scale-[0.98] ${
            isFirstMonth
              ? `cursor-not-allowed border-slate-800 bg-slate-900/40 text-slate-600`
              : `cursor-pointer border-slate-700 bg-slate-900 hover:bg-slate-800`
          } `}
        >
          ← Previous
        </button>

        {/* TODAY */}

        <button
          onClick={() => goToCurrentMonth()}
          className="cursor-pointer rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-5 py-3 text-emerald-400 transition-all hover:bg-emerald-500/20 active:scale-[0.98]"
        >
          This month
        </button>

        {/* NEXT */}

        <button
          disabled={isCurrentMonth}
          onClick={() => changeMonth(1)}
          className={`rounded-2xl border px-5 py-3 transition-all active:scale-[0.98] ${
            isCurrentMonth
              ? `cursor-not-allowed border-slate-800 bg-slate-900/40 text-slate-600`
              : `cursor-pointer border-slate-700 bg-slate-900 hover:bg-slate-800`
          } `}
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default MonthNavigation;

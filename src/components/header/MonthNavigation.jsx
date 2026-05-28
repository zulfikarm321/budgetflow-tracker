import { motion } from "framer-motion";
import useBudgetStore from "../../store/budgetStore";

const MonthNavigation = () => {
  const { month, year, changeMonth, goToCurrentMonth, currentDay, slots } =
    useBudgetStore();

  const now = new Date();

  const firstUse = JSON.parse(localStorage.getItem("budgetflow-first-use"));

  const isFirstMonth = month === firstUse.month && year === firstUse.year;

  const isCurrentMonth = month === now.getMonth() && year === now.getFullYear();
  const nextMonthDate = new Date(
    year,

    month + 1,

    1,
  );

  const prevMonthDate = new Date(
    year,

    month - 1,

    1,
  );

  const hasPrevMonth = slots.some((slot) => {
    const d = new Date(slot.date);

    return (
      d.getMonth() === prevMonthDate.getMonth() &&
      d.getFullYear() === prevMonthDate.getFullYear()
    );
  });

  const hasNextMonth = slots.some((slot) => {
    const d = new Date(slot.date);

    return (
      d.getMonth() === nextMonthDate.getMonth() &&
      d.getFullYear() === nextMonthDate.getFullYear()
    );
  });

  return (
    <div className="px-4 sm:px-6">
      <div className="inline-flex w-full items-center justify-between rounded-2xl border border-slate-800/70 bg-gradient-to-r from-slate-900/90 via-slate-900 to-slate-950 px-3 py-2 shadow-lg shadow-black/20">
        {/* LEFT */}

        <div className="min-w-0">
          <h2 className="truncate text-sm font-black text-white">
            {new Date(year, month).toLocaleString(
              "id-ID",

              {
                month: "long",

                year: "numeric",
              },
            )}
          </h2>

          <p className="mt-0.5 text-[10px] text-slate-500">
            {new Date().toLocaleDateString(
              "id-ID",

              {
                day: "numeric",

                month: "short",

                year: "numeric",
              },
            )}
          </p>
        </div>

        {/* BUTTONS */}

        <div className="flex items-center gap-1.5">
          {/* PREV */}

          <button
            onClick={() => changeMonth(-1)}
            disabled={!hasPrevMonth}
            className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-800 bg-slate-900/90 text-slate-400 transition-all duration-200 hover:border-cyan-500/40 hover:text-cyan-400 active:scale-[0.95] disabled:opacity-30"
          >
            ←
          </button>

          {/* TODAY */}

          <button
            onClick={goToCurrentMonth}
            className="rounded-xl bg-gradient-to-r from-emerald-500/15 to-cyan-500/15 px-3 py-1.5 text-[10px] font-black text-emerald-400 transition-all duration-200 hover:from-emerald-500/25 hover:to-cyan-500/25 active:scale-[0.96]"
          >
            Hari Ini
          </button>

          {/* NEXT */}

          <button
            onClick={() => changeMonth(1)}
            disabled={!hasNextMonth}
            className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-800 bg-slate-900/90 text-slate-400 transition-all duration-200 hover:border-cyan-500/40 hover:text-cyan-400 active:scale-[0.95] disabled:opacity-30"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
};

export default MonthNavigation;

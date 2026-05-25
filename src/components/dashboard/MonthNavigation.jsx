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
    <div className="sticky top-30 z-40 mb-6 flex flex-col gap-4 rounded-3xl border border-slate-800/70 bg-slate-950/80 p-4 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
      {/* LEFT */}

      <div className="min-w-0">
        <h2 className="truncate text-lg font-bold sm:text-xl">
          {new Date(year, month).toLocaleString(
            "id-ID",

            {
              month: "long",

              year: "numeric",
            },
          )}
        </h2>

        <p className="mt-1 text-sm text-slate-400">
          {new Date().toLocaleDateString(
            "id-ID",

            {
              day: "numeric",

              month: "long",

              year: "numeric",
            },
          )}
        </p>
      </div>

      {/* RIGHT */}

      <div className="grid grid-cols-3 gap-2 sm:flex">
        <button
          onClick={() => changeMonth(-1)}
          disabled={!hasPrevMonth}
          className="rounded-2xl border border-slate-700 bg-slate-900 px-3 py-3 text-sm transition-all hover:bg-slate-800 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-slate-900"
        >
          Prev
        </button>

        <button
          onClick={goToCurrentMonth}
          className="rounded-2xl bg-emerald-500/10 px-3 py-3 text-sm text-emerald-400 transition-all hover:bg-emerald-500/20"
        >
          Today
        </button>

        <button
          onClick={() => changeMonth(1)}
          disabled={!hasNextMonth}
          className="rounded-2xl border border-slate-700 bg-slate-900 px-3 py-3 text-sm transition-all hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MonthNavigation;

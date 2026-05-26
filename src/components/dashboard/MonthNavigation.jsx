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
    <div className="sticky top-24 z-40 mb-4 flex flex-col gap-3 rounded-2xl border border-slate-800/70 bg-slate-950/80 p-3 backdrop-blur-xl sm:mb-6 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:rounded-3xl sm:p-4">
      {/* LEFT */}

      <div className="min-w-0">
        <h2 className="truncate text-base font-bold sm:text-xl">
          {new Date(year, month).toLocaleString(
            "id-ID",

            {
              month: "long",

              year: "numeric",
            },
          )}
        </h2>

        <p className="mt-0.5 text-xs text-slate-400 sm:mt-1 sm:text-sm">
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

      <div className="grid grid-cols-3 gap-1.5 sm:flex sm:gap-2">
        <button
          onClick={() => changeMonth(-1)}
          disabled={!hasPrevMonth}
          className="rounded-2xl border border-slate-700 bg-slate-900 px-3 py-3 text-sm transition-all hover:bg-slate-800 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-slate-900"
        >
          Sebelumnya
        </button>

        <button
          onClick={goToCurrentMonth}
          className="rounded-xl border border-slate-700 bg-slate-900 px-2 py-2 text-[11px] transition-all hover:bg-slate-800 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-slate-900 sm:rounded-2xl sm:px-3 sm:py-3 sm:text-sm"
        >
          Hari Ini
        </button>

        <button
          onClick={() => changeMonth(1)}
          disabled={!hasNextMonth}
          className="rounded-xl bg-emerald-500/10 px-2 py-2 text-[11px] text-emerald-400 transition-all hover:bg-emerald-500/20 sm:rounded-2xl sm:px-3 sm:py-3 sm:text-sm"
        >
          Berikutnya
        </button>
      </div>
    </div>
  );
};

export default MonthNavigation;

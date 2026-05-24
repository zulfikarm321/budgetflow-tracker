import useBudgetStore from "../store/budgetStore";
import { motion } from "framer-motion";
import { formatCurrency } from "../utils/currency";

export default function CalendarView() {
  const { days, currentDay, month, year, dailyBudget } = useBudgetStore();

  const weekdays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const firstDayOffset = new Date(year, month, 1).getDay();

  const emptyCells = Array.from({
    length: firstDayOffset,
  });

  return (
    <div className="mt-10">
      {/* HEADER */}

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <motion.div
          initial={{
            opacity: 0,

            scale: 0.96,
          }}
          animate={{
            opacity: 1,

            scale: 1,
          }}
          transition={{
            duration: 0.25,
          }}
        >
          <h2 className="text-2xl font-bold">Budget Calendar</h2>

          <p className="mt-2 text-slate-400">
            {new Date(year, month).toLocaleString("id-ID", {
              month: "long",
              year: "numeric",
            })}
          </p>
        </motion.div>

        {/* LEGEND */}

        <div className="flex flex-wrap gap-3 text-[10px] sm:text-xs">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-green-500" />
            Available Budget
          </div>

          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-blue-500" />
            Withdrawn
          </div>

          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-orange-500" />
            Future Debt
          </div>

          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-slate-600" />
            Future Locked
          </div>
        </div>
      </div>

      {/* WEEKDAYS */}

      <div className="mb-3 grid grid-cols-7 gap-1 sm:gap-2 lg:gap-3">
        {weekdays.map((day) => (
          <div
            key={day}
            className="text-center text-sm font-bold text-slate-500"
          >
            {day}
          </div>
        ))}
      </div>

      {/* CALENDAR GRID */}

      <div className="grid grid-cols-7 gap-1 sm:gap-2 lg:gap-3">
        {emptyCells.map((_, i) => (
          <div key={`empty-${i}`} />
        ))}

        {days.map((day) => {
          const isFuture = day.day > currentDay;

          const visualStatus =
            isFuture && day.status === "available" ? "locked" : day.status;

          const colors = {
            available: "bg-slate-900 border-green-500",

            used: "bg-blue-950 border-blue-500",

            "future-used": "bg-orange-950 border-orange-500",

            locked: "bg-slate-950 border-slate-700",
          };

          return (
            <div
              key={day.id}
              className={`min-h-[70px] overflow-hidden rounded-lg border p-1.5 transition-all duration-300 hover:scale-[1.02] sm:min-h-[90px] sm:rounded-xl sm:p-2 lg:min-h-[110px] lg:rounded-2xl lg:p-3 ${colors[visualStatus]} `}
            >
              <div className="flex items-start justify-between gap-1">
                <h3 className="text-xs font-bold sm:text-sm lg:text-base">
                  {day.day}
                </h3>

                {day.day === currentDay && (
                  <span className="hidden shrink-0 rounded-full bg-emerald-500 px-1.5 py-0.5 text-[9px] font-bold text-black sm:inline-flex lg:px-2 lg:text-[10px]">
                    TODAY
                  </span>
                )}
              </div>

              <p className="mt-1 hidden text-[14px] text-slate-400 sm:block lg:mt-2 lg:text-[16px]">
                {formatCurrency(dailyBudget)}
              </p>

              <div className="mt-3 text-xs sm:mt-4 sm:text-sm lg:mt-5 lg:text-base">
                {visualStatus === "available" && (
                  <p className="text-green-400">Available Budget</p>
                )}

                {visualStatus === "used" && (
                  <p className="text-blue-400">Withdrawn</p>
                )}

                {visualStatus === "future-used" && (
                  <p className="text-orange-400">Future Debt</p>
                )}

                {visualStatus === "locked" && (
                  <p className="text-slate-500">Future Locked</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

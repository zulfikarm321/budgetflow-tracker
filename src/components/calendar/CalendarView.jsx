import useBudgetStore from "../../store/budgetStore";
import { motion } from "framer-motion";
import { formatCurrency } from "../../utils/currency";

export default function CalendarView() {
  const { slots, currentDay, month, year } = useBudgetStore();

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const weekdays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const firstDayOffset = new Date(year, month, 1).getDay();

  const emptyCells = Array.from({
    length: firstDayOffset,
  });
  const formatCompact = (amount) => {
    return `${Math.round(amount / 1000)}K`;
  };

  const calendarDays = Array.from(
    {
      length: daysInMonth,
    },

    (_, i) => {
      const dayNumber = i + 1;

      const matchingSlot = slots.find((slot) => {
        const d = new Date(slot.date);

        return (
          d.getDate() === dayNumber &&
          d.getMonth() === month &&
          d.getFullYear() === year
        );
      });

      return {
        day: dayNumber,

        slot: matchingSlot,
      };
    },
  );

  return (
    <div className="mt-10">
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
            {new Date(year, month).toLocaleString(
              "id-ID",

              {
                month: "long",

                year: "numeric",
              },
            )}
          </p>
        </motion.div>

        <div className="flex flex-wrap gap-3 text-[10px] sm:text-xs">
          <Legend color="bg-green-500" label="Available Budget" />

          <Legend color="bg-blue-500" label="Withdrawn" />

          <Legend color="bg-orange-500" label="Future Debt" />

          <Legend color="bg-slate-600" label="Disabled" />
        </div>
      </div>

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

      <div className="grid grid-cols-7 gap-1 sm:gap-2 lg:gap-3">
        {emptyCells.map((_, i) => (
          <div key={`empty-${i}`} />
        ))}

        {calendarDays.map(
          ({
            day,

            slot,
          }) => {
            const visualStatus = slot ? slot.status : "disabled";

            const colors = {
              available: "bg-slate-900 border-green-500",

              used: "bg-blue-950 border-blue-500",

              "future-used": "bg-orange-950 border-orange-500",

              disabled: "bg-slate-950 border-slate-800",
            };

            return (
              <div
                key={slot?.id ?? `day-${day}`}
                className={`min-h-[70px] overflow-hidden rounded-lg border p-1.5 transition-all duration-300 hover:scale-[1.02] sm:min-h-[90px] sm:rounded-xl sm:p-2 lg:min-h-[110px] lg:rounded-2xl lg:p-3 ${
                  colors[visualStatus]
                } `}
              >
                <div className="flex items-start justify-between gap-1">
                  <h3 className="text-xs font-bold sm:text-sm lg:text-base">
                    {day}
                  </h3>

                  {day === currentDay && (
                    <span className="hidden shrink-0 rounded-full bg-emerald-500 px-1.5 py-0.5 text-[9px] font-bold text-black sm:inline-flex lg:px-2 lg:text-[10px]">
                      TODAY
                    </span>
                  )}
                </div>

                <p className="mt-2 text-sm font-black whitespace-nowrap text-emerald-400 sm:text-base lg:text-lg">
                  {formatCompact(slot?.amount ?? 0)}
                </p>

                <div className="mt-3 hidden text-xs sm:mt-4 sm:block sm:text-sm lg:mt-5 lg:text-base">
                  {visualStatus === "available" && (
                    <p className="text-green-400"></p>
                  )}

                  {visualStatus === "used" && (
                    <p className="text-blue-400">Withdrawn</p>
                  )}

                  {visualStatus === "future-used" && (
                    <p className="text-orange-400">Future Debt</p>
                  )}

                  {visualStatus === "disabled" && (
                    <p className="text-slate-500">Disabled</p>
                  )}
                </div>
              </div>
            );
          },
        )}
      </div>
    </div>
  );
}

function Legend({
  color,

  label,
}) {
  return (
    <div className="flex items-center gap-2">
      <div className={`h-3 w-3 rounded-full ${color}`} />

      {label}
    </div>
  );
}

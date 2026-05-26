import { motion } from "framer-motion";

import useBudgetStore from "../../store/budgetStore";
import useDashboardStats from "../../hooks/useDashboardStats";

const AnalyticsCard = () => {
  const { slots } = useBudgetStore();

  const {
    usedSlots,

    futureDebtSlots,

    availableSlots,
  } = useDashboardStats();

  const totalSlots = slots.length;
  const usedPercent = totalSlots ? (usedSlots / totalSlots) * 100 : 0;
  const futurePercent = totalSlots ? (futureDebtSlots / totalSlots) * 100 : 0;
  const availablePercent = totalSlots ? (availableSlots / totalSlots) * 100 : 0;

  return (
    <motion.div
      initial={{
        opacity: 0,

        y: 16,
      }}
      animate={{
        opacity: 1,

        y: 0,
      }}
      transition={{
        duration: 0.45,

        ease: "easeOut",
      }}
      className="mt-5 rounded-2xl border border-slate-800 bg-slate-900 p-4 sm:mt-8 sm:rounded-3xl sm:p-6"
    >
      <h3 className="mb-4 text-base font-bold sm:mb-6 sm:text-xl">
        Analisis Budget
      </h3>

      <div className="space-y-4 sm:space-y-6">
        {/* USED */}

        <div>
          <div className="mb-2 flex justify-between">
            <span className="text-blue-400">Terpakai</span>

            <span>{usedSlots} slot</span>
          </div>

          <div className="h-3 overflow-hidden rounded-full bg-slate-800 sm:h-3">
            <motion.div
              initial={{
                width: 0,
              }}
              animate={{
                width: `${usedPercent}%`,
              }}
              transition={{
                duration: 0.8,

                ease: "easeOut",
              }}
              className="h-full bg-blue-500"
            />
          </div>
        </div>

        {/* FUTURE */}

        <div>
          <div className="mb-2 flex justify-between">
            <span className="text-orange-400">Hutang Mendatang</span>

            <span>{futureDebtSlots} slot</span>
          </div>

          <div className="h-3 overflow-hidden rounded-full bg-slate-800">
            <motion.div
              initial={{
                width: 0,
              }}
              animate={{
                width: `${futurePercent}%`,
              }}
              transition={{
                duration: 0.9,

                delay: 0.08,

                ease: "easeOut",
              }}
              className="h-full bg-orange-500"
            />
          </div>
        </div>

        {/* AVAILABLE */}

        <div>
          <div className="mb-2 flex justify-between">
            <span className="text-green-400">Tersedia</span>

            <span className="text-slate-300">{usedSlots} slot</span>
          </div>

          <div className="h-3 overflow-hidden rounded-full bg-slate-800">
            <motion.div
              initial={{
                width: 0,
              }}
              animate={{
                width: `${availablePercent}%`,
              }}
              transition={{
                duration: 1,

                delay: 0.12,

                ease: "easeOut",
              }}
              className="h-full bg-green-500"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AnalyticsCard;

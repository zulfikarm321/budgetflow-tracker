import { exportBackup, importBackup } from "../utils/backup";
import { motion } from "framer-motion";

import MonthNavigation from "./dashboard/MonthNavigation";
import SummaryCardList from "./dashboard/SummaryCardList";
import AnalyticsCard from "./dashboard/AnalyticsCard";
import useBudgetStore from "../store/budgetStore";

export default function Dashboard() {
  const { setQuickModal, resetMonth } = useBudgetStore();

  return (
    <>
      {/* MONTH NAV */}
      <MonthNavigation />

      {/* SUMMARY CARDS */}
      <SummaryCardList />

      {/* ANALYTICS */}
      <AnalyticsCard />

      {/* ACTIONS */}

      <div className="mt-8 flex flex-wrap gap-4">
        <button
          onClick={() => setQuickModal(true)}
          className="cursor-pointer rounded-xl bg-green-600 px-6 py-3 font-bold"
        >
          Withdraw
        </button>

        <button
          onClick={() => {
            if (window.confirm("Reset bulan ini?")) {
              resetMonth();
            }
          }}
          className="cursor-pointer rounded-xl bg-red-600 px-6 py-3 font-bold hover:bg-red-700"
        >
          Reset Month
        </button>
        <button
          onClick={exportBackup}
          className="cursor-pointer rounded-xl bg-cyan-600 px-6 py-3 font-bold hover:bg-cyan-700"
        >
          Export Backup
        </button>
        <label className="cursor-pointer rounded-xl bg-violet-600 px-6 py-3 font-bold hover:bg-violet-700">
          Import Backup
          <input
            type="file"
            accept=".json"
            hidden
            onChange={(e) => {
              const file = e.target.files[0];

              if (!file) return;

              importBackup(
                file,

                (success) => {
                  if (success) {
                    alert("Backup restored!");

                    window.location.reload();
                  } else {
                    alert("Invalid backup file.");
                  }
                },
              );
            }}
          />
        </label>
      </div>
    </>
  );
}

import Dashboard from "../components/Dashboard";

import CalendarView from "../components/CalendarView";

import QuickWithdrawModal from "../components/QuickWithdrawModal";

import useBudgetStore from "../store/budgetStore";
import SettingsModal from "../components/SettingsModal";

import { Wallet2, Settings } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const { setQuickModal, setSettingsModal } = useBudgetStore();

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* STICKY HEADER */}

      <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div>
            <h1 className="text-3xl font-black sm:text-4xl lg:text-5xl">
              BudgetFlow
            </h1>

            <p className="mt-2 text-sm text-slate-400 sm:text-base">
              Personal Budget Tracker
            </p>
          </div>

          <div className="mb-6 flex items-center justify-end gap-3">
            <button
              onClick={() => setSettingsModal(true)}
              className="group flex cursor-pointer items-center justify-center rounded-2xl border border-slate-700 bg-slate-900 p-3 transition-all duration-300 hover:bg-slate-800 active:scale-[0.98]"
            >
              <Settings
                size={20}
                className="text-slate-300 transition-transform duration-300 group-hover:rotate-90"
              />
            </button>

            <button
              onClick={() => setQuickModal(true)}
              className="group flex cursor-pointer items-center gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 font-semibold text-emerald-400 transition-all duration-300 hover:scale-[1.03] hover:bg-emerald-500/20 hover:shadow-lg hover:shadow-emerald-500/10 sm:px-5 lg:px-6"
            >
              <Wallet2
                size={18}
                className="transition-transform duration-300 group-hover:rotate-6"
              />

              <span className="hidden sm:block">Withdraw Budget</span>
            </button>
          </div>
        </div>
      </header>

      {/* CONTENT */}

      <motion.main
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.45,
        }}
        className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10"
      >
        <Dashboard />

        <div className="mt-14">
          <CalendarView />
        </div>
      </motion.main>

      <QuickWithdrawModal />
      <SettingsModal />
    </div>
  );
}

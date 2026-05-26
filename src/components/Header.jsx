import React from "react";
import setTopUpModal from "../store/budgetStore";
import setSettingsModal from "../store/budgetStore";
import setQuickModal from "../store/budgetStore";
import useBudgetStore from "../store/budgetStore";
import { PlusCircle, Wallet2, Settings } from "lucide-react";

const Header = () => {
  const { setQuickModal, setSettingsModal, setTopUpModal } = useBudgetStore();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 sm:py-5">
        <div>
          <h1 className="text-xl font-black sm:text-4xl lg:text-5xl">
            BudgetFlow
          </h1>

          <p className="mt-1 text-[10px] text-slate-400 sm:mt-2 sm:text-base">
            Personal Budget Tracker
          </p>
        </div>

        <div className="flex items-center justify-end gap-2 sm:gap-3">
          <button
            onClick={() => setTopUpModal(true)}
            className="group flex items-center justify-center rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-3 text-cyan-400"
          >
            <PlusCircle size={20} />
          </button>
          <button
            onClick={() => setSettingsModal(true)}
            className="group flex items-center justify-center rounded-xl border border-cyan-500/20 bg-cyan-500/10 p-2.5 text-cyan-400 sm:rounded-2xl sm:p-3"
          >
            <Settings
              size={18}
              className="text-slate-300 transition-transform duration-300 group-hover:rotate-90"
            />
          </button>

          <button
            onClick={() => setQuickModal(true)}
            className="group flex cursor-pointer items-center justify-center rounded-xl border border-slate-700 bg-slate-900 p-2.5 transition-all duration-300 hover:bg-slate-800 active:scale-[0.98] sm:rounded-2xl sm:p-3"
          >
            <Wallet2
              size={18}
              className="transition-transform duration-300 group-hover:rotate-6"
            />

            <>
              <span className="hidden px-1 sm:block">Tarik Dana</span>

              <span className="px-1 sm:hidden">Tarik</span>
            </>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

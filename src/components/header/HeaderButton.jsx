import { PlusCircle, Wallet2, Settings, History } from "lucide-react";

import useBudgetStore from "../../store/budgetStore";

const HeaderButton = () => {
  const { setQuickModal, setSettingsModal, setTopUpModal, setHistoryModal } =
    useBudgetStore();

  return (
    <div className="flex items-center justify-end gap-2 sm:gap-3">
      <button
        onClick={() => setHistoryModal(true)}
        className="group flex cursor-pointer items-center justify-center rounded-xl border border-slate-700 bg-slate-900 p-2.5 transition hover:bg-slate-800"
      >
        <History size={18} className="text-slate-300" />
      </button>
      <button
        onClick={() => setTopUpModal(true)}
        className="group flex cursor-pointer items-center justify-center rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-3 text-cyan-400"
      >
        <PlusCircle size={16} />
      </button>
      <button
        onClick={() => setSettingsModal(true)}
        className="group flex cursor-pointer items-center justify-center rounded-xl border border-cyan-500/20 bg-cyan-500/10 p-2.5 text-cyan-400 sm:rounded-2xl sm:p-3"
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
          className="text-emerald-300 transition-transform duration-300 group-hover:rotate-6"
        />

        <>
          <span className="hidden px-1 font-black text-emerald-300 sm:block">
            Tarik Dana
          </span>

          <span className="px-1 text-emerald-300 sm:hidden">Tarik</span>
        </>
      </button>
    </div>
  );
};

export default HeaderButton;

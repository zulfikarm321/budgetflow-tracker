import useBudgetStore from "../../store/budgetStore";
import { exportBackup, importBackup } from "../../utils/backup";

import { Wallet2, RotateCcw, Download, Upload, Settings2 } from "lucide-react";

const ButtonSection = () => {
  const {
    setQuickModal,
    setSetupModal,

    resetMonth,
  } = useBudgetStore();

  return (
    <div className="my-8 grid grid-cols-2 gap-2 sm:mt-8 sm:flex sm:flex-wrap sm:gap-3">
      {/* SETUP */}

      <button
        onClick={() => setSetupModal(true)}
        className="group relative overflow-hidden rounded-xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/15 to-violet-500/10 px-3 py-2.5 text-left transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/40 hover:shadow-lg hover:shadow-cyan-500/20 active:scale-[0.98] sm:rounded-2xl sm:px-4 sm:py-3"
      >
        <div className="relative flex items-center gap-2 sm:gap-3">
          <div className="rounded-lg bg-cyan-500/15 p-1.5 text-cyan-400 sm:rounded-xl sm:p-2">
            <Settings2 size={15} />
          </div>

          <div>
            <p className="text-[10px] text-slate-500 sm:text-xs">Planning</p>

            <h3 className="text-xs font-black text-cyan-300 sm:text-sm">
              Setup
            </h3>
          </div>
        </div>
      </button>
      {/* WITHDRAW */}

      <button
        onClick={() => setQuickModal(true)}
        className="group relative cursor-pointer overflow-hidden rounded-xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/15 to-cyan-500/10 px-3 py-2.5 text-left transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400/40 hover:shadow-lg hover:shadow-emerald-500/20 active:scale-[0.98] sm:rounded-2xl sm:px-4 sm:py-3"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />

        <div className="relative flex items-center gap-2 sm:gap-3">
          <div className="rounded-lg bg-emerald-500/15 p-1.5 text-emerald-400 sm:rounded-xl sm:p-2">
            <Wallet2 size={15} />
          </div>

          <div>
            <p className="text-[10px] text-slate-500 sm:text-xs">Budget</p>

            <h3 className="text-xs font-black text-emerald-300 sm:text-sm">
              Tarik Dana
            </h3>
          </div>
        </div>
      </button>

      {/* RESET */}

      <button
        onClick={() => {
          if (window.confirm("Yakin ingin mereset semua data?")) {
            resetMonth();
          }
        }}
        className="group relative cursor-pointer overflow-hidden rounded-xl border border-rose-500/20 bg-gradient-to-br from-rose-500/15 to-red-500/10 px-3 py-2.5 text-left transition-all duration-300 hover:-translate-y-1 hover:border-rose-400/40 hover:shadow-lg hover:shadow-rose-500/20 active:scale-[0.98] sm:rounded-2xl sm:px-4 sm:py-3"
      >
        <div className="relative flex items-center gap-2 sm:gap-3">
          <div className="rounded-lg bg-rose-500/15 p-1.5 text-rose-400 sm:rounded-xl sm:p-2">
            <RotateCcw size={15} />
          </div>

          <div>
            <p className="text-[10px] text-slate-500 sm:text-xs">Danger</p>

            <h3 className="text-xs font-black text-rose-300 sm:text-sm">
              Reset
            </h3>
          </div>
        </div>
      </button>

      {/* EXPORT */}

      <button
        onClick={exportBackup}
        className="group relative cursor-pointer overflow-hidden rounded-xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/15 to-blue-500/10 px-3 py-2.5 text-left transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/40 hover:shadow-lg hover:shadow-cyan-500/20 active:scale-[0.98] sm:rounded-2xl sm:px-4 sm:py-3"
      >
        <div className="relative flex items-center gap-2 sm:gap-3">
          <div className="rounded-lg bg-cyan-500/15 p-1.5 text-cyan-400 sm:rounded-xl sm:p-2">
            <Download size={15} />
          </div>

          <div>
            <p className="text-[10px] text-slate-500 sm:text-xs">Backup</p>

            <h3 className="text-xs font-black text-cyan-300 sm:text-sm">
              Export
            </h3>
          </div>
        </div>
      </button>

      {/* IMPORT */}

      <label className="group relative cursor-pointer overflow-hidden rounded-xl border border-violet-500/20 bg-gradient-to-br from-violet-500/15 to-fuchsia-500/10 px-3 py-2.5 text-left transition-all duration-300 hover:-translate-y-1 hover:border-violet-400/40 hover:shadow-lg hover:shadow-violet-500/20 active:scale-[0.98] sm:rounded-2xl sm:px-4 sm:py-3">
        <div className="relative flex items-center gap-2 sm:gap-3">
          <div className="rounded-lg bg-violet-500/15 p-1.5 text-violet-400 sm:rounded-xl sm:p-2">
            <Upload size={15} />
          </div>

          <div>
            <p className="text-[10px] text-slate-500 sm:text-xs">Restore</p>

            <h3 className="text-xs font-black text-violet-300 sm:text-sm">
              Import
            </h3>
          </div>
        </div>

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
                  alert("Data berhasil diimpor!");

                  window.location.reload();
                } else {
                  alert("File backup tidak valid.");
                }
              },
            );
          }}
        />
      </label>
    </div>
  );
};

export default ButtonSection;

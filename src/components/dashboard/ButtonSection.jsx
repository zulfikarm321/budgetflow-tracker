import useBudgetStore from "../../store/budgetStore";
import { exportBackup, importBackup } from "../../utils/backup";

import { AnimatePresence, motion } from "framer-motion";

const ButtonSection = () => {
  const { setQuickModal, resetMonth } = useBudgetStore();

  return (
    <div className="mt-5 grid grid-cols-2 gap-2 sm:mt-8 sm:flex sm:flex-wrap sm:gap-4">
      <button
        onClick={() => setQuickModal(true)}
        className="cursor-pointer rounded-xl bg-green-600 px-3 py-2.5 text-xs font-bold transition-all hover:bg-green-700 sm:px-6 sm:py-3 sm:text-base"
      >
        Tarik Dana
      </button>

      <button
        onClick={() => {
          if (window.confirm("Yakin ingin mereset bulan ini?")) {
            resetMonth();
          }
        }}
        className="cursor-pointer rounded-xl bg-red-600 px-3 py-2.5 text-xs font-bold transition-all hover:bg-red-700 sm:px-6 sm:py-3 sm:text-base"
      >
        Reset Semua
      </button>
      <button
        onClick={exportBackup}
        className="cursor-pointer rounded-xl bg-cyan-600 px-3 py-2.5 text-xs font-bold transition-all hover:bg-cyan-700 sm:px-6 sm:py-3 sm:text-base"
      >
        Export Data
      </button>
      <label className="cursor-pointer rounded-xl bg-violet-600 px-3 py-2.5 text-center text-xs font-bold transition-all hover:bg-violet-700 sm:px-6 sm:py-3 sm:text-base">
        Import Data
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

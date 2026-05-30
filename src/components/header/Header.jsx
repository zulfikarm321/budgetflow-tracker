import useBudgetStore from "../../store/budgetStore";

import HeaderLogo from "./HeaderLogo";
import HeaderButton from "./HeaderButton";
import MonthNavigation from "./MonthNavigation";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/70 bg-slate-950/85 backdrop-blur-2xl">
      <div className="mx-auto max-w-7xl">
        {/* TOP HEADER */}

        <div className="flex items-center justify-between px-4 py-3 sm:px-6">
          <HeaderLogo />

          <HeaderButton />
        </div>

        {/* MONTH NAV */}

        <div className="pb-3">
          <MonthNavigation />
        </div>
      </div>
    </header>
  );
};

export default Header;

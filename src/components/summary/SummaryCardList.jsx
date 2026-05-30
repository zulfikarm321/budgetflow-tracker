import SummaryCard from "./SummaryCard";
import { formatCurrency } from "../../utils/currency";
import useDashboardStats from "../../hooks/useDashboardStats";

const SummaryCardList = () => {
  const { totalWithdraw, allowanceUntilToday, remainingBudget } =
    useDashboardStats();

  const balance = allowanceUntilToday - totalWithdraw;

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-2 xl:grid-cols-4">
      <SummaryCard
        title="Total Penarikan"
        value={formatCurrency(totalWithdraw)}
        color="blue"
      />

      <SummaryCard
        title="Budget Sampai Hari Ini"
        value={formatCurrency(allowanceUntilToday)}
        color="purple"
      />

      <SummaryCard
        title={balance >= 0 ? "Surplus" : "Minus"}
        value={formatCurrency(Math.abs(balance))}
        color={balance >= 0 ? "green" : "red"}
      />

      <SummaryCard
        title="Sisa Budget"
        value={formatCurrency(remainingBudget)}
        color="green"
      />
    </div>
  );
};

export default SummaryCardList;

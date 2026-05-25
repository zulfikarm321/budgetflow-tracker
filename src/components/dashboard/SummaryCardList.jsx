import SummaryCard from "./SummaryCard";
import { formatCurrency } from "../../utils/currency";
import useDashboardStats from "../../hooks/useDashboardStats";

const SummaryCardList = () => {
  const { totalWithdraw, allowanceUntilToday, remainingBudget } =
    useDashboardStats();

  const balance = allowanceUntilToday - totalWithdraw;

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
      <SummaryCard
        title="Total Withdraw"
        value={formatCurrency(totalWithdraw)}
        color="blue"
      />

      <SummaryCard
        title="Allowance Until Today"
        value={formatCurrency(allowanceUntilToday)}
        color="purple"
      />

      <SummaryCard
        title={balance >= 0 ? "Surplus" : "Minus"}
        value={formatCurrency(Math.abs(balance))}
        color={balance >= 0 ? "green" : "red"}
      />

      <SummaryCard
        title="Remaining Budget"
        value={formatCurrency(remainingBudget)}
        color="green"
      />
    </div>
  );
};

export default SummaryCardList;

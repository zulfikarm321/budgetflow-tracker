import useBudgetStore from "../store/budgetStore";

export default function useDashboardStats() {
  const {
    days,

    currentDay,

    dailyBudget,
  } = useBudgetStore();

  const usedSlots = days.filter((d) => d.status === "used").length;

  const futureDebtSlots = days.filter((d) => d.status === "future-used").length;

  const availableSlots = days.filter((d) => d.status === "available").length;

  const totalWithdraw = (usedSlots + futureDebtSlots) * dailyBudget;

  const allowanceUntilToday = currentDay * dailyBudget;

  const remainingBudget = availableSlots * dailyBudget;

  return {
    usedSlots,

    futureDebtSlots,

    availableSlots,

    totalWithdraw,

    allowanceUntilToday,

    remainingBudget,
  };
}

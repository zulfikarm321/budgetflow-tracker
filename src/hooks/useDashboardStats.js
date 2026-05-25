import useBudgetStore from "../store/budgetStore";

export default function useDashboardStats() {
  const { slots } = useBudgetStore();

  const usedSlots = slots.filter((s) => s.status === "used").length;

  const futureDebtSlots = slots.filter(
    (s) => s.status === "future-used",
  ).length;

  const availableSlots = slots.filter((s) => s.status === "available").length;

  const totalWithdraw = slots

    .filter((s) => s.status === "used" || s.status === "future-used")

    .reduce(
      (sum, slot) => sum + slot.amount,

      0,
    );

  const allowanceUntilToday = slots

    .filter((slot) => {
      const slotDate = new Date(slot.date);

      return slotDate <= new Date();
    })

    .reduce(
      (sum, slot) => sum + slot.amount,

      0,
    );

  const remainingBudget = slots

    .filter((s) => s.status === "available")

    .reduce(
      (sum, slot) => sum + slot.amount,

      0,
    );

  return {
    usedSlots,

    futureDebtSlots,

    availableSlots,

    totalWithdraw,

    allowanceUntilToday,

    remainingBudget,
  };
}

import useBudgetStore from "../store/budgetStore";

export default function useDashboardStats() {
  const { slots, dailyBudget } = useBudgetStore();

  const today = new Date();

  today.setHours(0, 0, 0, 0);

  /* ANALYTICS */

  const usedSlots = slots.filter((slot) => {
    const slotDate = new Date(slot.date + "T00:00:00");

    return slotDate <= today && slot.amount < dailyBudget;
  }).length;

  const futureDebtSlots = slots.filter((slot) => {
    const slotDate = new Date(slot.date + "T00:00:00");

    return slotDate > today && slot.amount < dailyBudget;
  }).length;

  const availableSlots = slots.filter(
    (slot) => slot.amount >= dailyBudget,
  ).length;

  /* TOTAL WITHDRAW */

  const totalWithdraw = slots.reduce(
    (sum, slot) =>
      sum +
      Math.max(
        dailyBudget - slot.amount,

        0,
      ),

    0,
  );

  /* ALLOWANCE TODAY */

  const allowanceUntilToday = slots.reduce(
    (sum, slot) => {
      const slotDate = new Date(slot.date + "T00:00:00");

      if (slotDate <= today) {
        return sum + dailyBudget;
      }

      return sum;
    },

    0,
  );

  /* REMAINING */

  const remainingBudget = slots.reduce(
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

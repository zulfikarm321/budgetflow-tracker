export function formatDate(date) {
  const year = date.getFullYear();

  const month = String(date.getMonth() + 1).padStart(2, "0");

  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function createSlots({
  startDate,

  totalFund,

  dailyBudget,
}) {
  const slotCount = Math.floor(totalFund / dailyBudget);

  const remainder = totalFund % dailyBudget;

  const slots = [];

  const cursor = new Date(startDate);

  for (let i = 0; i < slotCount; i++) {
    slots.push({
      id: formatDate(cursor),

      date: formatDate(cursor),

      amount: dailyBudget,

      status: "available",
    });

    cursor.setDate(cursor.getDate() + 1);
  }

  /* remainder slot */

  if (remainder > 0) {
    slots.push({
      id: formatDate(cursor),

      date: formatDate(cursor),

      amount: remainder,

      status: "available",
    });
  }

  return slots;
}

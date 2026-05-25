export function formatDate(date) {
  return date

    .toISOString()

    .split("T")[0];
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
    const amount = i === 0 ? dailyBudget + remainder : dailyBudget;

    slots.push({
      id: formatDate(cursor),

      date: formatDate(cursor),

      amount,

      status: "available",
    });

    cursor.setDate(cursor.getDate() + 1);
  }

  return slots;
}

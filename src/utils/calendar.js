export function getStorageKey(
  year,

  month,
) {
  return `budget-month-${year}-${month}`;
}

export function createDays(
  year,

  month,
) {
  const daysInMonth = new Date(
    year,

    month + 1,

    0,
  ).getDate();

  return Array.from(
    {
      length: daysInMonth,
    },

    (_, i) => ({
      id: i + 1,

      day: i + 1,

      status: "available",
    }),
  );
}

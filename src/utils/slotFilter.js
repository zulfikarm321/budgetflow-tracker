export function getMonthSlots(
  slots,

  year,

  month,
) {
  return slots.filter((day, slot) => {
    const date = new Date(slot.date);

    return date.getFullYear() === year && date.getMonth() === month;
  });
}

import useBudgetStore from "../store/budgetStore";

export default function SlotPreview() {
  const { slots } = useBudgetStore();

  return (
    <div className="mt-8">
      <h2 className="mb-4 text-xl font-bold">Generated Slots</h2>

      <div className="flex flex-wrap gap-3">
        {slots.map((day, slot) => (
          <div
            key={slot.id}
            className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3"
          >
            {slot.date}
          </div>
        ))}
      </div>
    </div>
  );
}

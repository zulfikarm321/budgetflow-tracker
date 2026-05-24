import { create } from "zustand";
import { getStorageKey, createDays } from "../utils/calendar";

const today = new Date();

import { DEFAULT_DAILY_BUDGET } from "../constants/budget";

const initialYear = today.getFullYear();

const initialMonth = today.getMonth();

const firstUseDate = JSON.parse(
  localStorage.getItem("budgetflow-first-use"),
) || {
  month: initialMonth,

  year: initialYear,
};

localStorage.setItem(
  "budgetflow-first-use",

  JSON.stringify(firstUseDate),
);

const initialKey = getStorageKey(
  initialYear,

  initialMonth,
);

const savedDays = JSON.parse(localStorage.getItem(initialKey));

export default create((set, get) => ({
  year: initialYear,

  month: initialMonth,

  currentDay: today.getDate(),

  days:
    savedDays ||
    createDays(
      initialYear,

      initialMonth,
    ),

  dailyBudget:
    Number(localStorage.getItem("budgetflow-daily-budget")) ||
    DEFAULT_DAILY_BUDGET,

  quickModal: false,

  settingsModal: false,

  setQuickModal: (value) => {
    set({
      quickModal: value,
    });
  },

  setSettingsModal: (value) => {
    set({
      settingsModal: value,
    });
  },

  setDailyBudget: (amount) => {
    localStorage.setItem(
      "budgetflow-daily-budget",

      amount,
    );

    set({
      dailyBudget: amount,
    });
  },

  saveMonth: () => {
    const state = get();

    const key = getStorageKey(
      state.year,

      state.month,
    );

    localStorage.setItem(
      key,

      JSON.stringify(state.days),
    );
  },

  quickWithdraw: (amount) => {
    const state = get();

    const slotCount = amount / state.dailyBudget;

    const updated = [...state.days];

    let taken = 0;

    for (let i = 0; i < updated.length; i++) {
      if (updated[i].status === "available") {
        updated[i] = {
          ...updated[i],

          status: updated[i].day <= state.currentDay ? "used" : "future-used",
        };

        taken++;
      }

      if (taken >= slotCount) {
        break;
      }
    }

    const key = getStorageKey(
      state.year,

      state.month,
    );

    localStorage.setItem(
      key,

      JSON.stringify(updated),
    );

    set({
      days: updated,
    });
  },

  changeMonth: (direction) => {
    const state = get();

    let newMonth = state.month + direction;

    let newYear = state.year;

    if (newMonth > 11) {
      newMonth = 0;

      newYear++;
    }

    if (newMonth < 0) {
      newMonth = 11;

      newYear--;
    }

    const currentMonth = today.getMonth();

    const currentYear = today.getFullYear();

    if (
      newYear > currentYear ||
      (newYear === currentYear && newMonth > currentMonth)
    ) {
      return;
    }

    if (
      newYear < firstUseDate.year ||
      (newYear === firstUseDate.year && newMonth < firstUseDate.month)
    ) {
      return;
    }

    const key = getStorageKey(
      newYear,

      newMonth,
    );

    const saved = JSON.parse(localStorage.getItem(key));

    const freshDays =
      saved ||
      createDays(
        newYear,

        newMonth,
      );

    const isCurrentMonth = newMonth === currentMonth && newYear === currentYear;

    set({
      month: newMonth,

      year: newYear,

      days: freshDays,

      currentDay: isCurrentMonth ? today.getDate() : 1,
    });
  },

  goToCurrentMonth: () => {
    const key = getStorageKey(
      initialYear,

      initialMonth,
    );

    const saved = JSON.parse(localStorage.getItem(key));

    set({
      year: initialYear,

      month: initialMonth,

      currentDay: today.getDate(),

      days:
        saved ||
        createDays(
          initialYear,

          initialMonth,
        ),
    });
  },

  resetMonth: () => {
    const state = get();

    const fresh = createDays(
      state.year,

      state.month,
    );

    const key = getStorageKey(
      state.year,

      state.month,
    );

    localStorage.setItem(
      key,

      JSON.stringify(fresh),
    );

    set({
      days: fresh,
    });
  },
}));

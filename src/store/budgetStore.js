import { create } from "zustand";
import { getStorageKey, createDays } from "../utils/calendar";
import { createSlots } from "../utils/slot";

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

// STATE STRUCTURE
export default create((set, get) => ({
  // GETTERS
  year: initialYear,

  month: initialMonth,

  currentDay: today.getDate(),

  history: JSON.parse(localStorage.getItem("budgetflow-history")) || [],

  days:
    savedDays ||
    createDays(
      initialYear,

      initialMonth,
    ),

  dailyBudget:
    Number(localStorage.getItem("budgetflow-daily-budget")) ||
    DEFAULT_DAILY_BUDGET,

  historyModal: false,

  quickModal: false,
  slots:
    JSON.parse(localStorage.getItem("budgetflow-slots")) ||
    createSlots({
      startDate: new Date(),

      totalFund: Number(localStorage.getItem("budgetflow-total-fund")) || 0,

      dailyBudget: Number(localStorage.getItem("budgetflow-daily-budget")) || 0,
      slots: [],
    }),

  totalFund: Number(localStorage.getItem("budgetflow-total-fund")) || 0,

  settingsModal: false,

  hasSetup: Boolean(localStorage.getItem("budgetflow-has-setup")),
  topUpModal: false,
  setupModal: !Boolean(localStorage.getItem("budgetflow-has-setup")),

  // SETTERS
  setHistoryModal: (value) => {
    set({
      historyModal: value,
    });
  },

  setTopUpModal: (value) => {
    set({
      topUpModal: value,
    });
  },
  setSetupModal: (value) => {
    set({
      setupModal: value,
    });
  },

  setupTracking: ({
    totalFund,

    dailyBudget,
  }) => {
    localStorage.setItem(
      "budgetflow-has-setup",

      "true",
    );
    localStorage.setItem(
      "budgetflow-total-fund",

      totalFund,
    );

    localStorage.setItem(
      "budgetflow-daily-budget",

      dailyBudget,
    );

    const generated = createSlots({
      startDate: new Date(),

      totalFund,

      dailyBudget,
    });

    localStorage.setItem(
      "budgetflow-slots",

      JSON.stringify(generated),
    );

    set({
      totalFund,

      dailyBudget,

      slots: generated,

      hasSetup: true,
    });
  },

  topUpFund: ({ totalFund }) => {
    const state = get();

    let remainingFund = totalFund;

    let updated = [...state.slots];

    /* ===== FILL PARTIAL SLOTS FIRST ===== */

    for (let i = 0; i < updated.length; i++) {
      const slot = updated[i];

      if (slot.amount >= state.dailyBudget) {
        continue;
      }

      if (remainingFund <= 0) {
        break;
      }

      const needed = state.dailyBudget - slot.amount;

      const give = Math.min(
        needed,

        remainingFund,
      );

      remainingFund -= give;

      const restored = slot.amount + give;

      updated[i] = {
        ...slot,

        amount: restored,

        status: restored >= state.dailyBudget ? "available" : slot.status,
      };
    }

    /* ===== APPEND NEW DAYS ===== */

    if (remainingFund > 0) {
      const lastSlot = updated[updated.length - 1];

      const startDate = lastSlot ? new Date(lastSlot.date) : new Date();

      startDate.setDate(startDate.getDate() + 1);

      const generated = createSlots({
        startDate,

        totalFund: remainingFund,

        dailyBudget: state.dailyBudget,
      });

      updated = [...updated, ...generated];
    }

    /* ===== HISTORY ===== */

    const nextHistory = [
      {
        id: crypto.randomUUID(),

        type: "topup",

        amount: totalFund,

        createdAt: new Date().toISOString(),
      },

      ...state.history,
    ];

    localStorage.setItem(
      "budgetflow-slots",

      JSON.stringify(updated),
    );

    localStorage.setItem(
      "budgetflow-history",

      JSON.stringify(nextHistory),
    );

    localStorage.setItem(
      "budgetflow-total-fund",

      state.totalFund + totalFund,
    );

    set({
      slots: updated,

      history: nextHistory,

      totalFund: state.totalFund + totalFund,
    });
  },

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

  setDailyBudget: (newDailyBudget) => {
    const state = get();

    const currentFund = state.slots.reduce(
      (sum, slot) => sum + slot.amount,

      0,
    );

    const generated = createSlots({
      startDate: new Date(),

      totalFund: currentFund,

      dailyBudget: newDailyBudget,
    });

    localStorage.setItem(
      "budgetflow-daily-budget",

      newDailyBudget,
    );

    localStorage.setItem(
      "budgetflow-slots",

      JSON.stringify(generated),
    );

    localStorage.setItem(
      "budgetflow-total-fund",

      currentFund,
    );

    set({
      dailyBudget: newDailyBudget,

      totalFund: currentFund,

      slots: generated,
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

    const updated = [...state.slots];

    let remaining = amount;

    for (let i = 0; i < updated.length; i++) {
      const slot = updated[i];

      if (slot.status !== "available") {
        continue;
      }

      if (remaining <= 0) {
        break;
      }

      const slotAmount = slot.amount;

      const take = Math.min(
        slotAmount,

        remaining,
      );

      const newAmount = slotAmount - take;

      remaining -= take;

      const slotDate = new Date(slot.date + "T00:00:00");

      const today = new Date();

      today.setHours(0, 0, 0, 0);
      updated[i] = {
        ...slot,

        amount: newAmount,

        status:
          newAmount <= 0
            ? slotDate <= today
              ? "used"
              : "future-used"
            : "available",
      };
    }

    localStorage.setItem(
      "budgetflow-slots",

      JSON.stringify(updated),
    );

    const nextHistory = [
      {
        id: crypto.randomUUID(),

        type: "withdraw",

        amount,

        createdAt: new Date().toISOString(),
      },

      ...state.history,
    ];

    localStorage.setItem(
      "budgetflow-history",

      JSON.stringify(nextHistory),
    );

    set({
      slots: updated,
      history: nextHistory,
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

    const slotMonths = state.slots.map((slot) => {
      const d = new Date(slot.date);

      return {
        year: d.getFullYear(),

        month: d.getMonth(),
      };
    });

    const monthExists = slotMonths.some(
      (m) => m.year === newYear && m.month === newMonth,
    );

    if (!monthExists) {
      return;
    }

    set({
      month: newMonth,

      year: newYear,
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
    localStorage.removeItem("budgetflow-slots");

    localStorage.removeItem("budgetflow-total-fund");

    localStorage.removeItem("budgetflow-daily-budget");

    localStorage.removeItem("budgetflow-has-setup");

    localStorage.removeItem("budgetflow-history");

    set({
      hasSetup: false,

      setupModal: true,

      totalFund: 0,

      dailyBudget: 0,

      slots: [],

      quickModal: false,

      settingsModal: false,

      topUpModal: false,
      history: [],
    });
  },
}));

import { useEffect, useMemo, useState } from "react";

const STEP = 10000;

export default function Stepper({
  icon,
  label,
  value,
  increase,
  decrease,
  onInput,

  min = 0,

  disablePlus = false,
  disableMinus = false,

  className = "",
}) {
  const [editing, setEditing] = useState(false);

  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (!editing) {
      setInputValue(String(value));
    }
  }, [value, editing]);

  const numericValue = inputValue === "" ? null : Number(inputValue);

  const isInvalid = numericValue === null || numericValue < min;

  const formatted =
    inputValue === ""
      ? "Rp "
      : `Rp ${Number(inputValue).toLocaleString("id-ID")}`;

  return (
    <div className={className}>
      <label className="mb-4 flex items-center gap-2 text-sm text-slate-400">
        {icon}

        {label}
      </label>

      <div className="flex items-center justify-between gap-3 rounded-3xl border border-slate-800 bg-slate-950 p-3 sm:p-4">
        {/* MINUS */}

        <button
          onClick={decrease}
          disabled={disableMinus}
          className="rounded-2xl bg-slate-800 p-3 transition-all hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
        >
          −
        </button>

        {/* INPUT */}

        <input
          type="text"
          value={formatted}
          onFocus={() => {
            setEditing(true);
          }}
          onChange={(e) => {
            const raw = e.target.value.replace(/\D/g, "");

            const numeric =
              raw === "" ? 0 : Math.round(Number(raw) / STEP) * STEP;

            const accepted = onInput?.(numeric);

            if (accepted !== false) {
              setInputValue(raw);
            }
          }}
          onBlur={() => {
            setEditing(false);
          }}
          className={`w-full bg-transparent text-center text-lg font-black transition-colors outline-none sm:text-2xl ${
            isInvalid ? "text-red-400" : "text-emerald-400"
          } `}
        />

        {/* PLUS */}

        <button
          onClick={increase}
          disabled={disablePlus}
          className="rounded-2xl bg-slate-800 p-3 transition-all hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
        >
          +
        </button>
      </div>

      <p
        className={`mt-2 text-center text-xs ${
          isInvalid ? "text-red-400" : "text-slate-500"
        } `}
      >
        {isInvalid
          ? `Minimal Rp ${min.toLocaleString("id-ID")}`
          : "Kelipatan 10.000"}
      </p>
    </div>
  );
}

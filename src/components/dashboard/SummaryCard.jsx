import { motion } from "framer-motion";

export default function SummaryCard({
  title,

  value,

  color,
}) {
  const colors = {
    blue: "from-blue-600/30 to-blue-400/5",

    green: "from-green-600/30 to-green-400/5",

    red: "from-red-600/30 to-red-400/5",

    purple: "from-purple-600/30 to-purple-400/5",
  };

  const numericValue =
    typeof value === "number"
      ? value
      : Number(String(value).replace(/[^\d]/g, ""));

  return (
    <motion.div
      initial={{
        opacity: 0,

        y: 12,
      }}
      animate={{
        opacity: 1,

        y: 0,
      }}
      transition={{
        duration: 0.35,
      }}
      className={`bg-gradient-to-br ${colors[color]} cursor-pointer rounded-3xl border border-slate-800 p-6 transition-all duration-300 hover:scale-[1.02]`}
    >
      <p className="text-sm text-slate-400">{title}</p>

      <h3 className="mt-4 text-3xl font-black">
        Rp {numericValue.toLocaleString("id-ID")}
      </h3>
    </motion.div>
  );
}

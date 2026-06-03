import { motion } from "framer-motion";

export default function StatCard({
  title,
  value,
  icon: Icon,
  color,
}) {
  return (
    <motion.div
      whileHover={{
        y: -4,
      }}
      className="
      bg-white
      rounded-2xl
      shadow-sm
      p-5
      border
      "
    >
      <div className="flex justify-between">
        <div>
          <p className="text-slate-500">
            {title}
          </p>

          <h2 className="text-3xl font-bold">
            {value}
          </h2>
        </div>

        <div
          className="p-3 rounded-xl"
          style={{
            backgroundColor: color,
          }}
        >
          <Icon className="text-white" />
        </div>
      </div>
    </motion.div>
  );
}
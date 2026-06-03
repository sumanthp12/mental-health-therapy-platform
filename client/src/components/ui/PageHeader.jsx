import { motion } from "framer-motion";

export default function PageHeader({
  title,
  subtitle,
  action,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6"
    >
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            {title}
          </h1>

          <p className="text-slate-500 mt-1">
            {subtitle}
          </p>
        </div>

        {action}
      </div>
    </motion.div>
  );
}


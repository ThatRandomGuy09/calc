import React from "react";
import { motion } from "framer-motion";

interface DisplayProps {
  value: string;
  expression: string;
  mode: "standard" | "scientific";
}

export const Display: React.FC<DisplayProps> = ({
  value,
  expression,
  mode,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full p-6 mb-4 rounded-2xl backdrop-blur-md bg-white/10 border border-white/20"
    >
      <div className="flex justify-between items-center mb-2">
        <span className="text-purple-300 text-sm font-medium">
          {mode.toUpperCase()}
        </span>
        <span className="text-gray-400 text-lg">{expression || "\u00A0"}</span>
      </div>
      <div className="h-12 text-right overflow-x-auto whitespace-nowrap">
        <motion.span
          key={value}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-white text-3xl font-semibold"
        >
          {value || "0"}
        </motion.span>
      </div>
    </motion.div>
  );
};
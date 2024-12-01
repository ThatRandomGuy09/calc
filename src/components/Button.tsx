import React from "react";
import { motion } from "framer-motion";

interface ButtonProps {
  value: string;
  onClick: () => void;
  variant?: "default" | "operator" | "function" | "scientific";
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  value,
  onClick,
  variant = "default",
  className = "",
}) => {
  const baseStyles =
    "w-full h-14 md:h-16 rounded-2xl backdrop-blur-md transition-all duration-200 active:scale-95 text-lg md:text-xl font-semibold relative overflow-hidden group shadow-lg";

  const variants = {
    default:
      "bg-white/15 hover:bg-white/25 text-white/90 border border-white/20 shadow-white/5",
    operator:
      "bg-purple-500/25 hover:bg-purple-500/35 text-purple-200 border border-purple-500/30 shadow-purple-500/5",
    function:
      "bg-gray-500/25 hover:bg-gray-500/35 text-gray-200 border border-gray-500/30 shadow-gray-500/5",
    scientific:
      "bg-blue-500/25 hover:bg-blue-500/35 text-blue-200 border border-blue-500/30 shadow-blue-500/5",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      <span className="relative z-10 text-shadow">{value}</span>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -skew-x-12"></div>
    </motion.button>
  );
};

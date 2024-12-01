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
    "w-full h-14 md:h-16 rounded-2xl backdrop-blur-md transition-all duration-200 active:scale-95 text-lg md:text-xl font-medium relative overflow-hidden group";

  const variants = {
    default: "bg-white/10 hover:bg-white/20 text-white border border-white/10",
    operator:
      "bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/20",
    function:
      "bg-gray-500/20 hover:bg-gray-500/30 text-gray-300 border border-gray-500/20",
    scientific:
      "bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border border-blue-500/20",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      <span className="relative z-10">{value}</span>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -skew-x-12"></div>
    </motion.button>
  );
};

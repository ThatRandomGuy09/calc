import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { HistoryEntry } from "../utils/calculator";

interface HistoryProps {
  entries: HistoryEntry[];
  onSelectEntry: (expression: string) => void;
  onClearHistory: () => void;
}

export const History: React.FC<HistoryProps> = ({
  entries,
  onSelectEntry,
  onClearHistory,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="w-full mt-4 rounded-2xl backdrop-blur-md bg-white/15 border border-white/30 overflow-hidden shadow-lg"
    >
      <div className="flex justify-between items-center p-4 border-b border-white/20">
        <h3 className="text-white font-semibold tracking-wide">History</h3>
        <button
          onClick={onClearHistory}
          className="text-sm text-purple-200 hover:text-purple-300 transition-colors font-medium"
        >
          Clear
        </button>
      </div>
      <div className="max-h-48 overflow-y-auto">
        <AnimatePresence>
          {entries.map((entry, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="p-3 border-b border-white/10 hover:bg-white/10 cursor-pointer transition-colors"
              onClick={() => onSelectEntry(entry.expression)}
            >
              <div className="text-sm text-gray-300">{entry.expression}</div>
              <div className="text-lg text-white font-medium">
                {entry.result}
              </div>
              <div className="text-xs text-purple-200/70">
                {entry.timestamp.toLocaleTimeString()}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

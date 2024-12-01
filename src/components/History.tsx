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
      className="w-full mt-4 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 overflow-hidden"
    >
      <div className="flex justify-between items-center p-4 border-b border-white/10">
        <h3 className="text-white font-medium">History</h3>
        <button
          onClick={onClearHistory}
          className="text-sm text-purple-300 hover:text-purple-400 transition-colors"
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
              className="p-3 border-b border-white/5 hover:bg-white/5 cursor-pointer transition-colors"
              onClick={() => onSelectEntry(entry.expression)}
            >
              <div className="text-sm text-gray-400">{entry.expression}</div>
              <div className="text-lg text-white">{entry.result}</div>
              <div className="text-xs text-purple-300/50">
                {entry.timestamp.toLocaleTimeString()}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

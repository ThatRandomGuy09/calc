import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./Button";
import { Display } from "./Display";
import { History } from "./History";
import {
  calculate,
  scientific,
  CalculatorMode,
  HistoryEntry,
} from "../utils/calculator";

export const Calculator: React.FC = () => {
  const [display, setDisplay] = useState("");
  const [expression, setExpression] = useState("");
  const [shouldResetDisplay, setShouldResetDisplay] = useState(false);
  const [mode, setMode] = useState<CalculatorMode>("standard");
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  const handleNumber = (num: string) => {
    if (shouldResetDisplay) {
      setDisplay(num);
      setShouldResetDisplay(false);
    } else {
      setDisplay(display + num);
    }
  };

  const handleOperator = (operator: string) => {
    if (display) {
      setExpression(expression + display + operator);
      setShouldResetDisplay(true);
    } else if (expression) {
      setExpression(expression.slice(0, -1) + operator);
    }
  };

  const handleEqual = () => {
    if (
      !display ||
      (!expression && !["log", "sqrt"].some((fn) => display.startsWith(fn)))
    )
      return;

    const fullExpression = expression + display;
    const result = calculate(fullExpression);

    setHistory((prev) =>
      [
        {
          expression: fullExpression,
          result,
          timestamp: new Date(),
        },
        ...prev,
      ].slice(0, 10)
    );

    setDisplay(result);
    setExpression("");
    setShouldResetDisplay(true);
  };

  const handleScientific = (fn: string) => {
    const num = parseFloat(display);
    if (isNaN(num)) return;

    let result;
    switch (fn) {
      case "log":
      case "sqrt":
        result = scientific[fn](num);
        break;
      case "x²":
        result = scientific.square(num);
        break;
      case "x³":
        result = scientific.cube(num);
        break;
      case "π":
        result = scientific.pi();
        break;
    }

    if (result !== undefined) {
      const formattedResult = result.toString();
      setDisplay(formattedResult);
      setShouldResetDisplay(true);
    }
  };

  const scientificButtons = [
    { value: "log", fn: "log" },
    { value: "√", fn: "sqrt" },
    { value: "x²", fn: "x²" },
    { value: "x³", fn: "x³" },
    { value: "π", fn: "π" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-gray-900 to-black p-4 md:p-6 flex items-center justify-center">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-sm  bg-white/10 p-6 rounded-3xl shadow-2xl border border-white/20"
      >
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() =>
              setMode(mode === "standard" ? "scientific" : "standard")
            }
            className="text-purple-300 text-sm hover:text-purple-200 transition-colors"
          >
            {mode === "standard" ? "Scientific" : "Standard"}
          </button>
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="text-purple-300 text-sm hover:text-purple-200 transition-colors"
          >
            History
          </button>
        </div>

        <Display value={display} expression={expression} mode={mode} />

        <div className="grid grid-cols-4 gap-3">
          {mode === "scientific" && (
            <div className="col-span-4 grid grid-cols-4 gap-3 mb-3">
              {scientificButtons.map(({ value, fn }) => (
                <Button
                  key={value}
                  value={value}
                  onClick={() => handleScientific(fn)}
                  variant="scientific"
                />
              ))}
            </div>
          )}

          <Button
            value="C"
            onClick={() => {
              setDisplay("");
              setExpression("");
            }}
            variant="function"
          />
          <Button
            value="±"
            onClick={() =>
              setDisplay(
                display.startsWith("-") ? display.slice(1) : "-" + display
              )
            }
            variant="function"
          />
          <Button
            value="%"
            onClick={() => setDisplay((parseFloat(display) / 100).toString())}
            variant="function"
          />
          <Button
            value="÷"
            onClick={() => handleOperator("÷")}
            variant="operator"
          />

          {[7, 8, 9].map((num) => (
            <Button
              key={num}
              value={num.toString()}
              onClick={() => handleNumber(num.toString())}
            />
          ))}
          <Button
            value="×"
            onClick={() => handleOperator("×")}
            variant="operator"
          />

          {[4, 5, 6].map((num) => (
            <Button
              key={num}
              value={num.toString()}
              onClick={() => handleNumber(num.toString())}
            />
          ))}
          <Button
            value="-"
            onClick={() => handleOperator("-")}
            variant="operator"
          />

          {[1, 2, 3].map((num) => (
            <Button
              key={num}
              value={num.toString()}
              onClick={() => handleNumber(num.toString())}
            />
          ))}
          <Button
            value="+"
            onClick={() => handleOperator("+")}
            variant="operator"
          />

          <Button
            value="0"
            onClick={() => handleNumber("0")}
            className="col-span-2"
          />
          <Button
            value="."
            onClick={() => !display.includes(".") && handleNumber(".")}
          />
          <Button value="=" onClick={handleEqual} variant="operator" />
        </div>

        <AnimatePresence>
          {showHistory && (
            <History
              entries={history}
              onSelectEntry={(expr) => {
                setDisplay(expr);
                setExpression("");
              }}
              onClearHistory={() => setHistory([])}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

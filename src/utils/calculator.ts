/* eslint-disable @typescript-eslint/no-unused-vars */

//Defines Several mathematical Operations
export const scientific = {
  log: (x: number) => Math.log10(x),
  sqrt: (x: number) => Math.sqrt(x),
  square: (x: number) => x * x,
  cube: (x: number) => x * x * x,
  pi: () => Math.PI,
};

//Formats a number to a maximum of 8 decimal places
export const formatNumber = (num: number): string => {
  if (Number.isInteger(num)) return num.toString();
  return num.toFixed(8).replace(/\.?0+$/, "");
};

//Calculates the result of an expression
export const calculate = (expression: string): string => {
  try {
    const sanitizedExpression = expression
      .replace(/×/g, "*")
      .replace(/÷/g, "/")
      .replace(/π/g, Math.PI.toString());

    const result = new Function("return " + sanitizedExpression)();
    return formatNumber(result);
  } catch (error) {
    return "Error";
  }
};

//Checks if a character is an operator
export const isOperator = (char: string): boolean => {
  return ["+", "-", "×", "÷"].includes(char);
};

export type CalculatorMode = "standard" | "scientific";

//Defines a history entry
export type HistoryEntry = {
  expression: string;
  result: string;
  timestamp: Date;
};

import convert, { Unit } from "convert-units";

type unitTypes = "day" | "hour" | "minute" | "second";

const unitDictionary = {
  day: "d",
  hour: "h",
  minute: "min",
  second: "s",
};

const getFormattedApiUnit = (unit: unitTypes) => {
  return (unitDictionary[unit] ?? unit) as Unit;
};

export const performConversion = (
  targetUnit: unitTypes,
  sourceUnit: unitTypes,
  duration: number
) => {
  if (targetUnit === sourceUnit) return duration;
  const formattedTargetUnit = getFormattedApiUnit(targetUnit);
  const formattedSourceUnit = getFormattedApiUnit(sourceUnit);
  return convert(duration).from(formattedSourceUnit).to(formattedTargetUnit);
};

export const getRightTimeUnit = (time: number, unit: Unit) => {
  return convert(time).from(unit).to("s").toFixed(2);
};

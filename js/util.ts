import { BatteryType } from "./types";

const convert = (datetime?: Date | string | null): Date => {
  if (!datetime) datetime = new Date();
  else if (!(datetime instanceof Date)) datetime = new Date(datetime);

  return datetime;
};

export const getDatetimeLocal = (datetime?: Date | string | null): string => {
  datetime = convert(datetime);
  return datetime.toLocaleString("de-AT", {
    year: "numeric",
    month: "long",
    day: "2-digit",
    hour: "numeric",
    minute: "numeric",
  });
};

export const getDatetimeISO = (datetime?: Date | string | null): string => {
  // YYYY-MM-DD HH:MM:SS.SSS
  datetime = convert(datetime);
  return datetime.toISOString();
};

export const prepareTextSQLite = (text: string): string => {
  let newDesc = ``;
  text.split("").forEach((char) => {
    if (char === `'`) newDesc += `''`;
    else newDesc += char;
  });
  return newDesc;
};

export const prepareTextSearch = (text: string) => {
  if (!text) return "";
  return text.toLowerCase().replace(/[\/\\#,+()$~%.:*?<>{}-]/gm, "");
};

export const getBatteryTypeText = (batteryType: BatteryType): string => {
  if (batteryType === BatteryType.LION) return "Lithium-Ion";
  else if (batteryType === BatteryType.LIPO) return "Lithium-Polymer";
  else return "Lithium-Polymer High Voltage";
};

export const getDateDiffNow = (date: Date, type?: number): number => {
  const diffInMilli = new Date().getTime() - date.getTime();
  // default is in days
  return diffInMilli / (type || 1);
};

export const getDateDiff = (d1: Date | string, d2: Date | string): number => {
  if (!d1 || !d2) throw Error("No dates provided!");

  if (!(d1 instanceof Date)) d1 = new Date(d1);
  if (!(d2 instanceof Date)) d2 = new Date(d2);

  return d1.getTime() - d2.getTime();
};

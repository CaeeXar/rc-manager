import { DynamicKeys, Rate, RateType } from "./types";

export const RestrictedPages: string[] = [
  "/batteries",
  "/builds",
  "/places",
  "/rates",
];

export const RatePropsByType: Record<
  RateType,
  Record<"roll" | "pitch" | "yaw", Array<DynamicKeys>> &
    Record<"colName1" | "colName2" | "colName3" | "title", string>
> = {
  [RateType.ACTUAL]: {
    roll: ["rollCenterSens", "rollMaxRate", "rollExpo"],
    pitch: ["pitchCenterSens", "pitchMaxRate", "pitchExpo"],
    yaw: ["yawCenterSens", "yawMaxRate", "yawExpo"],
    colName1: "Center Sensitivity",
    colName2: "Max Rate",
    colName3: "Expo",
    title: "Actual",
  },

  [RateType.BETAFLIGHT]: {
    roll: ["rollRcRate", "rollRate", "rollExpo"],
    pitch: ["pitchRcRate", "pitchRate", "pitchExpo"],
    yaw: ["yawRcRate", "yawRate", "yawExpo"],
    colName1: "RC Rate",
    colName2: "Rate",
    colName3: "RC Expo",
    title: "Betaflight 4.3",
  },

  [RateType.KISS]: {
    roll: ["rollRcRate", "rollRate", "rollCurve"],
    pitch: ["pitchRcRate", "pitchRate", "pitchCurve"],
    yaw: ["yawRcRate", "yawRate", "yawCurve"],
    colName1: "RC Rate",
    colName2: "Rate",
    colName3: "Curve",
    title: "KISS",
  },

  [RateType.QUICKRATES]: {
    roll: ["rollRcRate", "rollMaxRate", "rollExpo"],
    pitch: ["pitchRcRate", "pitchMaxRate", "pitchExpo"],
    yaw: ["yawRcRate", "yawMaxRate", "yawExpo"],
    colName1: "RC Rate",
    colName2: "Max Rate",
    colName3: "Expo",
    title: "Quickrates",
  },

  [RateType.RACEFLIGHT]: {
    roll: ["rollRate", "rollAcroPlus", "rollExpo"],
    pitch: ["pitchRate", "pitchAcroPlus", "pitchExpo"],
    yaw: ["yawRate", "yawAcroPlus", "yawExpo"],
    colName1: "Rate",
    colName2: "Acro+",
    colName3: "Expo",
    title: "RaceFlight",
  },
};

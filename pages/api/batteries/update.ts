import type { NextApiRequest, NextApiResponse } from "next";
import { updateUserBattery } from "../../../js/database";
import { Battery } from "../../../js/types";
import { prepareTextSQLite } from "../../../js/util";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const battery: Battery = req.body;
  if (battery.description)
    battery.description = prepareTextSQLite(battery.description);

  // parsing
  // battery.cells = +battery.cells;

  if (req.method === "POST") {
    let success = await updateUserBattery(battery);
    if (success) return res.status(200).json({ message: "Battery updated." });
    else
      return res.status(400).json({ message: "Battery could not be added!" });
  }
}

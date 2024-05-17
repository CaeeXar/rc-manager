import type { NextApiRequest, NextApiResponse } from "next";
import { addUserBattery } from "../../../js/database";
import { Battery } from "../../../js/types";
import { prepareTextSQLite } from "../../../js/util";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const battery: Battery = req.body;
  if (battery.description)
    battery.description = prepareTextSQLite(battery.description);

  if (req.method === "POST") {
    let success = await addUserBattery(battery);
    if (success) return res.status(200).json({ message: "Battery added." });
    else
      return res.status(400).json({ message: "Battery could not be added!" });
  }
}

import type { NextApiRequest, NextApiResponse } from "next";
import { addUserRate } from "../../../js/database";
import { Rate } from "../../../js/types";
import { prepareTextSQLite } from "../../../js/util";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const rate: Rate = req.body;
  if (rate.description) rate.description = prepareTextSQLite(rate.description);

  if (req.method === "POST") {
    let success = await addUserRate(rate);
    if (success) return res.status(200).json({ message: "Rate added." });
    else return res.status(400).json({ message: "Rate could not be added!" });
  }
}

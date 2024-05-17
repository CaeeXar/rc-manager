import type { NextApiRequest, NextApiResponse } from "next";
import { getUserRates } from "../../../js/database";
import { Rate } from "../../../js/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { username } = JSON.parse(req.body);

  if (req.method === "POST") {
    let rates: Rate[] = await getUserRates(username);
    if (!!rates) return res.status(200).json({ rates });
    else return res.status(400).json({ message: "No rates found" });
  }
}

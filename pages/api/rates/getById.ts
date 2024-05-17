import type { NextApiRequest, NextApiResponse } from "next";
import { getUserRateById } from "../../../js/database";
import { Rate } from "../../../js/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id, username } = JSON.parse(req.body);

  if (req.method === "POST") {
    let rate: Rate = await getUserRateById(username, id);
    if (!!rate) return res.status(200).json({ ...rate });
    else
      return res.status(400).json({ message: "No rate found with given id." });
  }
}

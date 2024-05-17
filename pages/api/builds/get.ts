import type { NextApiRequest, NextApiResponse } from "next";
import { getUserBuilds } from "../../../js/database";
import { Build } from "../../../js/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { username } = JSON.parse(req.body);

  if (req.method === "POST") {
    let builds: Build[] = await getUserBuilds(username);
    if (!!builds) return res.status(200).json({ builds });
    else return res.status(400).json({ message: "No builds found" });
  }
}

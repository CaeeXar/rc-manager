import type { NextApiRequest, NextApiResponse } from "next";
import { updateUserBuild } from "../../../js/database";
import { Build } from "../../../js/types";
import { prepareTextSQLite } from "../../../js/util";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const build: Build = req.body;
  if (build.description)
    build.description = prepareTextSQLite(build.description);

  if (req.method === "POST") {
    let success = await updateUserBuild(build);
    if (success) return res.status(200).json({ message: "Build updated." });
    else return res.status(400).json({ message: "Build could not be added!" });
  }
}

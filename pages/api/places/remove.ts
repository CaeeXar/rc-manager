import type { NextApiRequest, NextApiResponse } from "next";
import { ISqlite } from "sqlite";
import { removeUserPlace } from "../../../js/database";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = JSON.parse(req.body);

  if (req.method === "POST") {
    let stmt: ISqlite.RunResult = await removeUserPlace(id);

    if (!stmt || stmt.changes === 0)
      return res.status(400).json({ message: "Place could not be deleted!" });
    return res.status(200).json({ message: "Place deleted." });
  }
}

import type { NextApiRequest, NextApiResponse } from "next";
import { addUserPlace } from "../../../js/database";
import { Place } from "../../../js/types";
import { prepareTextSQLite } from "../../../js/util";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const place: Place = req.body;
  if (place.description)
    place.description = prepareTextSQLite(place.description);

  if (req.method === "POST") {
    let success = await addUserPlace(place);
    if (success) return res.status(200).json({ message: "Place added." });
    else return res.status(400).json({ message: "Place could not be added!" });
  }
}

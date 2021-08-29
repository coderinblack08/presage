import Cors from "cors";
import { NextApiRequest, NextApiResponse } from "next";
import { generateHTML } from "@tiptap/html";
import { extensions } from "../../modules/editor/extensions";
import { runMiddleware } from "../../lib/runMiddleware";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "1mb",
    },
  },
};

const cors = Cors({ origin: "*", methods: ["POST"] });

export default async function (req: NextApiRequest, res: NextApiResponse) {
  await runMiddleware(req, res, cors);

  const { editorJSON } = req.body;
  const html = generateHTML(editorJSON, extensions);
  res.status(200).send(html);
}

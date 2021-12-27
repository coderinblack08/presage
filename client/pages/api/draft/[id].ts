import { NextApiRequest, NextApiResponse } from "next";
import { admin } from "../../../lib/admin";
import { RouteController } from "../../../lib/RouteController";
import { verifySessionCookie } from "../../../lib/utils/verifySessionCookie";
import { Article } from "../../../types";

class DraftController extends RouteController {
  async get(req: NextApiRequest, res: NextApiResponse) {
    const { uid = "" } = await verifySessionCookie(req);
    const { id } = req.query;

    const draft = await admin.db.doc(`/articles/${id.toString()}`).get();
    const data = draft.data() as Article;
    if (data.userId !== uid && !data.isPublished) {
      return res.status(403).json(new Error("Forbidden"));
    }
    res.status(200).json({ ...data, id: draft.id });
  }
}

export default new DraftController().handleRoutes();

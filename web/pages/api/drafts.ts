import { NextApiRequest, NextApiResponse } from "next";
import { admin } from "../../lib/admin";
import { RouteController } from "../../lib/RouteController";
import { snapshotToArray } from "../../lib/utils/snapshotToArray";
import { verifySessionCookie } from "../../lib/utils/verifySessionCookie";

class DraftsController extends RouteController {
  async get(req: NextApiRequest, res: NextApiResponse) {
    const { uid = "" } = await verifySessionCookie(req);
    console.log(uid);

    const drafts = await admin.db
      .collection("articles")
      .where("userId", "==", uid)
      // .orderBy("createdAt", "desc")
      .select("id", "title", "createdAt")
      .get();
    res.status(200).json(snapshotToArray(drafts));
  }
}

export default new DraftsController().handleRoutes();

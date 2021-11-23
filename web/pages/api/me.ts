import { NextApiRequest, NextApiResponse } from "next";
import { admin } from "../../lib/admin";
import { RouteController } from "../../lib/RouteController";
import { verifySessionCookie } from "../../lib/utils/verifySessionCookie";

class MeController extends RouteController {
  async get(req: NextApiRequest, res: NextApiResponse) {
    const { uid = "" } = await verifySessionCookie(req);
    const me = await admin.db.doc(`users/${uid}`).get();
    res.status(200).json({ ...me.data(), id: uid });
  }
}

export default new MeController().handleRoutes();
